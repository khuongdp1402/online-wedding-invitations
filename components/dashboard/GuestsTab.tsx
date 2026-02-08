"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Copy, Loader2, Users, Download, Share2 } from "lucide-react";

type Guest = {
  id: string;
  name: string;
  salutation: string | null;
  phone: string | null;
  email: string | null;
  side: "GROOM" | "BRIDE";
  group: string | null;
  rsvpStatus: "PENDING" | "ACCEPTED" | "DECLINED";
  numberOfGuests: number;
  inviteLink: string | null;
  createdAt: string;
};

export function GuestsTab({ weddingId }: { weddingId: string }) {
  const { toast } = useToast();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Add guest form
  const [name, setName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [side, setSide] = useState<"GROOM" | "BRIDE">("GROOM");
  const [group, setGroup] = useState("");
  const [phone, setPhone] = useState("");
  const [numGuests, setNumGuests] = useState(1);

  const fetchGuests = useCallback(async () => {
    try {
      const res = await fetch(`/api/weddings/${weddingId}/guests`);
      if (res.ok) {
        const data = await res.json();
        setGuests(data.guests);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, [weddingId]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  async function handleAddGuest() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/weddings/${weddingId}/guests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          salutation: salutation || null,
          side,
          group: group || null,
          phone: phone || null,
          numberOfGuests: numGuests,
        }),
      });
      if (res.ok) {
        toast({ title: "Đã thêm khách mời" });
        setOpen(false);
        setName("");
        setSalutation("");
        setGroup("");
        setPhone("");
        setNumGuests(1);
        fetchGuests();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setSaving(false);
  }

  async function handleDelete(guestId: string) {
    if (!confirm("Bạn có chắc muốn xoá khách mời này?")) return;
    try {
      const res = await fetch(`/api/weddings/${weddingId}/guests/${guestId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Đã xoá khách mời" });
        fetchGuests();
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  }

  function copyInviteLink(guest: Guest) {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const link = guest.inviteLink || `${baseUrl}/w/${weddingId}?guest=${encodeURIComponent(guest.name)}&salutation=${encodeURIComponent(guest.salutation || "")}&mode=${guest.side === "GROOM" ? "groom" : "bride"}`;
    navigator.clipboard.writeText(link);
    toast({ title: "Đã sao chép link mời" });
  }

  const rsvpColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-green-100 text-green-700",
    DECLINED: "bg-red-100 text-red-700",
  };

  const rsvpLabels: Record<string, string> = {
    PENDING: "Chờ phản hồi",
    ACCEPTED: "Tham dự",
    DECLINED: "Từ chối",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500">{guests.length} khách mời</span>
        </div>
        <div className="flex items-center gap-2">
          {guests.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.open(`/api/weddings/${weddingId}/export`, "_blank");
                }}
              >
                <Download className="w-4 h-4 mr-1.5" /> Export Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const links = guests.map((g) => {
                    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
                    return `${g.salutation ? g.salutation + " " : ""}${g.name}: ${g.inviteLink ? baseUrl + g.inviteLink : ""}`;
                  }).join("\n");
                  navigator.clipboard.writeText(links);
                  toast({ title: "Đã sao chép tất cả link mời" });
                }}
              >
                <Share2 className="w-4 h-4 mr-1.5" /> Sao chép tất cả link
              </Button>
            </>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
              <Plus className="w-4 h-4 mr-1.5" /> Thêm khách
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm khách mời</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên khách mời *</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Xưng hô</label>
                  <Select value={salutation} onValueChange={setSalutation}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Chọn..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Anh">Anh</SelectItem>
                      <SelectItem value="Chị">Chị</SelectItem>
                      <SelectItem value="Cô">Cô</SelectItem>
                      <SelectItem value="Chú">Chú</SelectItem>
                      <SelectItem value="Bác">Bác</SelectItem>
                      <SelectItem value="Em">Em</SelectItem>
                      <SelectItem value="Bạn">Bạn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Bên</label>
                  <Select value={side} onValueChange={(v) => setSide(v as "GROOM" | "BRIDE")}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GROOM">Nhà trai</SelectItem>
                      <SelectItem value="BRIDE">Nhà gái</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nhóm</label>
                  <Input value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Bạn đại học" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Số khách đi kèm</label>
                  <Input type="number" min={1} value={numGuests} onChange={(e) => setNumGuests(parseInt(e.target.value) || 1)} className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Số điện thoại</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912345678" className="mt-1" />
              </div>
              <Button onClick={handleAddGuest} disabled={saving || !name.trim()} className="w-full bg-rose-600 hover:bg-rose-700">
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Thêm khách mời
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {guests.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Xưng hô</TableHead>
                  <TableHead>Bên</TableHead>
                  <TableHead>Nhóm</TableHead>
                  <TableHead>RSVP</TableHead>
                  <TableHead>Số khách</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell className="font-medium">{g.name}</TableCell>
                    <TableCell>{g.salutation || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {g.side === "GROOM" ? "Nhà trai" : "Nhà gái"}
                      </Badge>
                    </TableCell>
                    <TableCell>{g.group || "-"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${rsvpColors[g.rsvpStatus]}`}>
                        {rsvpLabels[g.rsvpStatus]}
                      </span>
                    </TableCell>
                    <TableCell>{g.numberOfGuests}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyInviteLink(g)}>
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(g.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Chưa có khách mời nào</p>
            <p className="text-gray-400 text-xs mt-1">Thêm khách mời để tạo link mời cá nhân</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
