"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  ShieldCheck,
  UserCheck,
  Settings2,
  Loader2,
  Check,
  Heart,
  Mail,
} from "lucide-react";
import { PERMISSIONS, ALL_PERMISSIONS, PermissionKey } from "@/lib/permissions";

export type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  permissions: string[];
  createdAt: string;
  _count: {
    weddings: number;
    contactRequests: number;
  };
};

interface Props {
  initialUsers: UserRow[];
  currentUserId: string;
}

export function AdminUserList({ initialUsers, currentUserId }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [filterRole, setFilterRole] = useState<string>("ALL");

  // Modal State
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [selectedRole, setSelectedRole] = useState<"USER" | "STAFF" | "ADMIN">("USER");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function openEditModal(u: UserRow) {
    setSelectedUser(u);
    setSelectedRole(u.role as "USER" | "STAFF" | "ADMIN");
    setSelectedPerms(u.permissions || []);
  }

  function togglePermission(key: string) {
    if (selectedPerms.includes(key)) {
      setSelectedPerms(selectedPerms.filter((p) => p !== key));
    } else {
      setSelectedPerms([...selectedPerms, key]);
    }
  }

  function selectAllPerms() {
    setSelectedPerms([...ALL_PERMISSIONS]);
  }

  function clearAllPerms() {
    setSelectedPerms([]);
  }

  async function handleSave() {
    if (!selectedUser) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          role: selectedRole,
          permissions: selectedRole === "STAFF" ? selectedPerms : [],
        }),
      });

      if (res.ok) {
        toast({ title: "Đã cập nhật phân quyền người dùng thành công" });
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id
              ? {
                  ...u,
                  role: selectedRole,
                  permissions: selectedRole === "STAFF" ? selectedPerms : [],
                }
              : u
          )
        );
        setSelectedUser(null);
        router.refresh();
      } else {
        const d = await res.json();
        toast({ title: "Lỗi", description: d.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi kết nối", variant: "destructive" });
    }
    setSaving(false);
  }

  const filteredUsers = users.filter((u) => {
    if (filterRole === "ALL") return true;
    return u.role === filterRole;
  });

  return (
    <div className="space-y-6">
      {/* Role filter buttons */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {["ALL", "ADMIN", "STAFF", "USER"].map((r) => (
            <Button
              key={r}
              variant={filterRole === r ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterRole(r)}
              className={
                filterRole === r
                  ? "bg-winglove-red hover:bg-winglove-red-deep text-white text-xs"
                  : "border-stone-200 text-stone-700 hover:bg-stone-50 text-xs"
              }
            >
              {r === "ALL" && `Tất cả (${users.length})`}
              {r === "ADMIN" && `Quản trị viên (${users.filter((u) => u.role === "ADMIN").length})`}
              {r === "STAFF" && `Nhân viên (${users.filter((u) => u.role === "STAFF").length})`}
              {r === "USER" && `Khách hàng (${users.filter((u) => u.role === "USER").length})`}
            </Button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card className="border border-amber-900/10 shadow-sm bg-white rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#FAF7F2] border-b border-amber-900/10 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Tài khoản & Email</th>
                  <th className="py-3.5 px-4">Vai trò (Role)</th>
                  <th className="py-3.5 px-4">Quyền hạn chi tiết (Permissions)</th>
                  <th className="py-3.5 px-4 text-center">Số thiệp</th>
                  <th className="py-3.5 px-4">Ngày tham gia</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-500 text-sm">
                      Không tìm thấy tài khoản phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelf = u.id === currentUserId;
                    return (
                      <tr key={u.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-xs shrink-0">
                              {u.name ? u.name[0].toUpperCase() : u.email?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                                <span className="truncate">{u.name || "Chưa đặt tên"}</span>
                                {isSelf && (
                                  <Badge variant="outline" className="text-[10px] py-0 px-1 border-stone-300 text-stone-500">
                                    Bạn
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-stone-500 flex items-center gap-1 truncate">
                                <Mail className="w-3 h-3 text-stone-400" />
                                <span>{u.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {u.role === "ADMIN" && (
                            <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-200 border-0 text-xs font-semibold flex items-center gap-1 w-fit">
                              <ShieldCheck className="w-3 h-3" />
                              <span>ADMIN</span>
                            </Badge>
                          )}
                          {u.role === "STAFF" && (
                            <Badge className="bg-teal-100 text-teal-900 hover:bg-teal-200 border-0 text-xs font-semibold flex items-center gap-1 w-fit">
                              <UserCheck className="w-3 h-3" />
                              <span>STAFF</span>
                            </Badge>
                          )}
                          {u.role === "USER" && (
                            <Badge variant="outline" className="text-stone-600 border-stone-200 text-xs w-fit">
                              USER
                            </Badge>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {u.role === "ADMIN" ? (
                            <span className="text-xs text-stone-500 italic">
                              Toàn quyền quản trị hệ thống
                            </span>
                          ) : u.role === "STAFF" ? (
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {u.permissions && u.permissions.length > 0 ? (
                                u.permissions.map((p) => {
                                  const def = PERMISSIONS[p as PermissionKey];
                                  return (
                                    <span
                                      key={p}
                                      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-800 border border-teal-200/80"
                                      title={def?.description}
                                    >
                                      {def?.label || p}
                                    </span>
                                  );
                                })
                              ) : (
                                <span className="text-xs text-amber-600 italic">
                                  Chưa được cấp quyền nào
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-stone-400">—</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 font-semibold text-xs text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full">
                            <Heart className="w-3 h-3 text-rose-500" />
                            {u._count.weddings}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-xs text-stone-500 whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs border-stone-200 hover:bg-[#FAF7F2] hover:text-winglove-red hover:border-amber-900/20"
                            onClick={() => openEditModal(u)}
                          >
                            <Settings2 className="w-3.5 h-3.5 mr-1" />
                            Phân Quyền
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Phân quyền Modal */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="max-w-lg bg-white border-amber-900/10">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-700" />
              Cấu hình phân quyền tài khoản
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-500">
              Thiết lập cấp bậc vai trò và các quyền hạn chi tiết cho:{" "}
              <strong className="text-stone-800">{selectedUser?.name || selectedUser?.email}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-3">
            {/* Chọn Role */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                1. Chọn vai trò (Role):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { r: "USER", label: "Người dùng", desc: "Tạo & sửa thiệp cá nhân" },
                  { r: "STAFF", label: "Nhân viên", desc: "Vận hành theo quyền cấp" },
                  { r: "ADMIN", label: "Quản trị viên", desc: "Toàn quyền hệ thống" },
                ].map(({ r, label, desc }) => {
                  const isChecked = selectedRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRole(r as "USER" | "STAFF" | "ADMIN")}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isChecked
                          ? "border-amber-700 bg-[#F7DEDD]/40 ring-1 ring-amber-700"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className="font-semibold text-xs text-stone-900">{label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5 leading-tight">{desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cấu hình chi tiết quyền hạn nếu là STAFF */}
            {selectedRole === "STAFF" && (
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    2. Quyền hạn chi tiết:
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={selectAllPerms}
                      className="text-[#8C1C24] hover:underline text-[11px]"
                    >
                      Chọn tất cả
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={clearAllPerms}
                      className="text-stone-500 hover:underline text-[11px]"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {ALL_PERMISSIONS.map((key) => {
                    const item = PERMISSIONS[key];
                    const isChecked = selectedPerms.includes(key);
                    return (
                      <label
                        key={key}
                        onClick={() => togglePermission(key)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-teal-50/60 border-teal-300"
                            : "bg-white border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                            isChecked
                              ? "bg-teal-700 border-teal-700 text-white"
                              : "border-stone-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-stone-900">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-stone-500 leading-tight">
                            {item.description}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedRole === "ADMIN" && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Quản trị viên có toàn quyền truy cập tất cả các tính năng và dữ liệu của hệ thống.</span>
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-stone-100 pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedUser(null)}
              disabled={saving}
              className="text-xs border-stone-200"
            >
              Hủy
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="bg-winglove-red hover:bg-winglove-red-deep text-white text-xs px-4 shadow-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Đang lưu...
                </>
              ) : (
                "Lưu Phân Quyền"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
