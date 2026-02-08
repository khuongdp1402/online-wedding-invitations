"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Loader2, Users, CheckCircle, XCircle, Clock } from "lucide-react";

type Guest = {
  id: string;
  name: string;
  salutation: string | null;
  side: "GROOM" | "BRIDE";
  group: string | null;
  rsvpStatus: "PENDING" | "ACCEPTED" | "DECLINED";
  numberOfGuests: number;
  rsvpAt: string | null;
};

export function RsvpTab({ weddingId }: { weddingId: string }) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSide, setFilterSide] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

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

  const total = guests.length;
  const accepted = guests.filter((g) => g.rsvpStatus === "ACCEPTED");
  const declined = guests.filter((g) => g.rsvpStatus === "DECLINED");
  const pending = guests.filter((g) => g.rsvpStatus === "PENDING");
  const totalAcceptedGuests = accepted.reduce((sum, g) => sum + g.numberOfGuests, 0);

  const filtered = guests.filter((g) => {
    if (filterSide !== "all" && g.side !== filterSide) return false;
    if (filterStatus !== "all" && g.rsvpStatus !== filterStatus) return false;
    return true;
  });

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="text-lg font-bold">{total}</p>
            <p className="text-xs text-gray-500">Tổng khách mời</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4 pb-4 text-center">
            <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-700">{accepted.length}</p>
            <p className="text-xs text-green-600">Đã xác nhận ({totalAcceptedGuests} người)</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-4 pb-4 text-center">
            <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-red-600">{declined.length}</p>
            <p className="text-xs text-red-500">Từ chối</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-4 pb-4 text-center">
            <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-yellow-700">{pending.length}</p>
            <p className="text-xs text-yellow-600">Chưa phản hồi</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">Tỷ lệ phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden flex">
              {accepted.length > 0 && (
                <div className="bg-green-500 h-full transition-all" style={{ width: `${(accepted.length / total) * 100}%` }} />
              )}
              {declined.length > 0 && (
                <div className="bg-red-400 h-full transition-all" style={{ width: `${(declined.length / total) * 100}%` }} />
              )}
              {pending.length > 0 && (
                <div className="bg-yellow-300 h-full transition-all" style={{ width: `${(pending.length / total) * 100}%` }} />
              )}
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500" /> Tham dự ({Math.round((accepted.length / total) * 100)}%)</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-400" /> Từ chối ({Math.round((declined.length / total) * 100)}%)</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-300" /> Chờ ({Math.round((pending.length / total) * 100)}%)</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={filterSide} onValueChange={setFilterSide}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Bên" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="GROOM">Nhà trai</SelectItem>
            <SelectItem value="BRIDE">Nhà gái</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Trạng thái" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="ACCEPTED">Tham dự</SelectItem>
            <SelectItem value="DECLINED">Từ chối</SelectItem>
            <SelectItem value="PENDING">Chưa phản hồi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Bên</TableHead>
                  <TableHead>Nhóm</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Số khách</TableHead>
                  <TableHead>Ngày phản hồi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((g) => {
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
                  return (
                    <TableRow key={g.id}>
                      <TableCell className="font-medium">{g.salutation ? `${g.salutation} ` : ""}{g.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{g.side === "GROOM" ? "Nhà trai" : "Nhà gái"}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{g.group || "-"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${rsvpColors[g.rsvpStatus]}`}>
                          {rsvpLabels[g.rsvpStatus]}
                        </span>
                      </TableCell>
                      <TableCell>{g.numberOfGuests}</TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {g.rsvpAt ? new Date(g.rsvpAt).toLocaleDateString("vi-VN") : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Không có kết quả</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
