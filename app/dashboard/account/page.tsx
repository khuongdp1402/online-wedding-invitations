import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, ArrowLeft } from "lucide-react";
import { ChangePasswordForm } from "@/components/dashboard/ChangePasswordForm";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { name, email, role } = session.user;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về tổng quan
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Tài khoản</h1>
        <p className="text-gray-600 mt-1">
          Thông tin đăng nhập và vai trò của bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-rose-600" />
            Hồ sơ
          </CardTitle>
          <CardDescription>
            Dữ liệu từ phiên đăng nhập hiện tại (NextAuth).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{email ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Tên hiển thị</p>
              <p className="text-gray-900">{name ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Vai trò</p>
              <div className="mt-1">
                {role === "ADMIN" ? (
                  <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">
                    Quản trị viên
                  </Badge>
                ) : (
                  <Badge variant="secondary">Người dùng</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bảo mật</CardTitle>
          <CardDescription>
            Đổi mật khẩu cho tài khoản đăng ký bằng email. Tài khoản chỉ Google
            OAuth có thể chưa có mật khẩu cục bộ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ChangePasswordForm />
          <p className="text-sm text-gray-600">
            Bạn cũng có thể đăng xuất và đăng nhập lại bằng Google nếu được bật.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
