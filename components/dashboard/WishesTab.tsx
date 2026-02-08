"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  PartyPopper,
  XCircle,
} from "lucide-react";

type Wish = {
  id: string;
  name: string;
  message: string;
  attendance: string | null;
  isApproved: boolean;
  createdAt: string;
};

export function WishesTab({ weddingId }: { weddingId: string }) {
  const { toast } = useToast();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch(`/api/weddings/${weddingId}/wishes`);
      if (res.ok) {
        const data = await res.json();
        setWishes(data.wishes);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, [weddingId]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  async function toggleApprove(wishId: string, isApproved: boolean) {
    try {
      const res = await fetch(`/api/weddings/${weddingId}/wishes/${wishId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !isApproved }),
      });
      if (res.ok) {
        toast({ title: isApproved ? "Đã ẩn lời chúc" : "Đã duyệt lời chúc" });
        fetchWishes();
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  }

  async function handleDelete(wishId: string) {
    if (!confirm("Xoá lời chúc này?")) return;
    try {
      const res = await fetch(`/api/weddings/${weddingId}/wishes/${wishId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Đã xoá lời chúc" });
        fetchWishes();
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
  }

  const attending = wishes.filter((w) => w.attendance === "Tham dự").length;
  const notAttending = wishes.filter((w) => w.attendance === "Rất tiếc không thể").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <MessageSquare className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="text-lg font-bold">{wishes.length}</p>
            <p className="text-xs text-gray-500">Tổng lời chúc</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <PartyPopper className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-600">{attending}</p>
            <p className="text-xs text-gray-500">Tham dự</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-red-600">{notAttending}</p>
            <p className="text-xs text-gray-500">Không tham dự</p>
          </CardContent>
        </Card>
      </div>

      {wishes.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Tham dự</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày gửi</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wishes.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell className="font-medium">{w.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{w.message}</TableCell>
                    <TableCell>
                      {w.attendance ? (
                        <Badge variant={w.attendance === "Tham dự" ? "default" : "destructive"} className="text-xs">
                          {w.attendance}
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={w.isApproved ? "outline" : "secondary"} className="text-xs">
                        {w.isApproved ? "Đã duyệt" : "Đã ẩn"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {new Date(w.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleApprove(w.id, w.isApproved)}
                          title={w.isApproved ? "Ẩn" : "Duyệt"}
                        >
                          {w.isApproved ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(w.id)}>
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
            <MessageSquare className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Chưa có lời chúc nào</p>
            <p className="text-gray-400 text-xs mt-1">Lời chúc sẽ xuất hiện khi khách mời gửi trên thiệp</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
