"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Home,
  ChevronRight,
} from "lucide-react";

interface AdminHeaderProps {
  userRole?: string | null;
  userName?: string | null;
  userEmail?: string | null;
}

const PAGE_TITLES: Record<string, { title: string; desc: string }> = {
  "/admin": {
    title: "Trung Tâm Điều Hành & Thống Kê",
    desc: "Tổng quan doanh thu, số liệu thiệp cưới và các tác vụ vận hành nhanh",
  },
  "/admin/payments": {
    title: "Quản Lý Giao Dịch & Thanh Toán",
    desc: "Đối soát chuyển khoản ngân hàng và lịch sử thanh toán toàn hệ thống",
  },
  "/admin/contacts": {
    title: "Yêu Cầu Tư Vấn Khách Hàng",
    desc: "Danh sách cô dâu chú rể để lại thông tin cần hỗ trợ cấu trúc thiệp",
  },
  "/admin/templates": {
    title: "Kho Mẫu Thiệp & Giá Bán",
    desc: "Thiết lập giá bán, khuyến mãi và đồng bộ kho mẫu từ mã nguồn",
  },
  "/admin/coupons": {
    title: "Quản Lý Mã Giảm Giá",
    desc: "Tạo và theo dõi hiệu lực của các mã ưu đãi thanh toán",
  },
  "/admin/users": {
    title: "Quản Lý Người Dùng & Phân Quyền",
    desc: "Kiểm soát tài khoản, thăng cấp nhân viên và cấu hình quyền hạn chi tiết",
  },
};

export function AdminHeader({ userRole, userName, userEmail }: AdminHeaderProps) {
  const pathname = usePathname();
  const current = PAGE_TITLES[pathname] || {
    title: "Khu Vực Quản Trị",
    desc: "Hệ thống quản lý thiệp cưới online Winglove",
  };

  const isAdmin = userRole === "ADMIN";

  return (
    <header className="mb-8 border-b border-amber-900/10 pb-6 bg-white/70 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 font-medium">
            <Link
              href="/dashboard"
              className="hover:text-winglove-red transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <Link
              href="/admin"
              className="hover:text-winglove-red transition-colors"
            >
              Quản trị
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="w-3 h-3 text-stone-400" />
                <span className="text-stone-800 font-semibold truncate max-w-[200px]">
                  {current.title.split(" & ")[0]}
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 tracking-tight">
            {current.title}
          </h1>
          <p className="text-sm text-stone-600 mt-1">{current.desc}</p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center flex-wrap">
          {/* User profile pill */}
          {(userName || userEmail) && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#FAF7F2] rounded-full border border-amber-900/10 text-xs text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-stone-900 truncate max-w-[150px]">
                {userName || userEmail}
              </span>
            </div>
          )}

          {/* Role badge */}
          {isAdmin ? (
            <Badge className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white border-0 px-3 py-1 text-xs shadow-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Quản Trị Viên (Admin)</span>
            </Badge>
          ) : (
            <Badge className="bg-gradient-to-r from-teal-700 to-teal-900 text-white border-0 px-3 py-1 text-xs shadow-sm flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Nhân Viên (Staff)</span>
            </Badge>
          )}

          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-winglove-red text-xs h-8"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Xem Trang Chủ
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
