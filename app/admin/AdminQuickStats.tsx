import {
  DollarSign,
  Clock,
  Heart,
  Users,
  MessageSquareHeart,
  TrendingUp,
  Tag,
  Ticket,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface StatsProps {
  totalRevenue: number;
  pendingPaymentCount: number;
  totalWeddings: number;
  publishedWeddings: number;
  totalUsers: number;
  staffCount: number;
  newContactsCount: number;
}

export function AdminQuickStats({
  totalRevenue,
  pendingPaymentCount,
  totalWeddings,
  publishedWeddings,
  totalUsers,
  staffCount,
  newContactsCount,
}: StatsProps) {
  const formatMoney = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

  return (
    <div className="space-y-6">
      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Doanh thu */}
        <Card className="border border-amber-900/10 shadow-sm bg-white hover:shadow-md transition-shadow rounded-xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Tổng Thực Thu
              </span>
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold font-serif text-stone-900">
                {formatMoney(totalRevenue)}
              </div>
              <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 inline" />
                Giao dịch đã xác nhận thành công
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chờ xác nhận */}
        <Link href="/admin/payments" className="block">
          <Card className="border border-amber-900/10 shadow-sm bg-white hover:shadow-md hover:border-amber-700/30 transition-all rounded-xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Chờ Duyệt Tiền
                </span>
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-bold font-serif text-stone-900">
                  {pendingPaymentCount}
                </div>
                {pendingPaymentCount > 0 ? (
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0 text-xs">
                    Cần xử lý ngay
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-stone-500 text-xs border-stone-200">
                    Đã xử lý hết
                  </Badge>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-1">Chuyển khoản ngân hàng chờ đối soát</p>
            </CardContent>
          </Card>
        </Link>

        {/* Tổng số thiệp */}
        <Card className="border border-amber-900/10 shadow-sm bg-white hover:shadow-md transition-shadow rounded-xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Thiệp Cưới Khởi Tạo
              </span>
              <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-2xl font-bold font-serif text-stone-900">
                {totalWeddings}
              </div>
              <Badge className="bg-teal-50 text-teal-800 border-teal-200 text-xs font-medium">
                {publishedWeddings} Đã xuất bản
              </Badge>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {totalWeddings - publishedWeddings} bản nháp đang thiết kế
            </p>
          </CardContent>
        </Card>

        {/* Tài khoản & Phân quyền */}
        <Link href="/admin/users" className="block">
          <Card className="border border-amber-900/10 shadow-sm bg-white hover:shadow-md hover:border-amber-700/30 transition-all rounded-xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Người Dùng & Phân Quyền
                </span>
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-bold font-serif text-stone-900">
                  {totalUsers}
                </div>
                <Badge className="bg-amber-50 text-amber-800 border-amber-200 text-xs">
                  {staffCount} Nhân sự Admin
                </Badge>
              </div>
              <p className="text-xs text-stone-500 mt-1">Quản lý và gán quyền nhân viên</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Lối tắt tác vụ nhanh (Quick Action Bar) */}
      <div className="bg-white border border-amber-900/10 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 uppercase tracking-wider">
          <span>Lối tắt điều hành:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/payments"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF7F2] hover:bg-[#F7DEDD] hover:text-[#8C1C24] text-stone-700 transition-colors border border-amber-900/10"
          >
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Duyệt Thanh Toán ({pendingPaymentCount})</span>
          </Link>
          <Link
            href="/admin/contacts"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF7F2] hover:bg-[#F7DEDD] hover:text-[#8C1C24] text-stone-700 transition-colors border border-amber-900/10"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-700" />
            <span>Yêu Cầu Tư Vấn ({newContactsCount})</span>
          </Link>
          <Link
            href="/admin/templates"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF7F2] hover:bg-[#F7DEDD] hover:text-[#8C1C24] text-stone-700 transition-colors border border-amber-900/10"
          >
            <Tag className="w-3.5 h-3.5 text-blue-700" />
            <span>Cập Nhật Giá Mẫu</span>
          </Link>
          <Link
            href="/admin/coupons"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF7F2] hover:bg-[#F7DEDD] hover:text-[#8C1C24] text-stone-700 transition-colors border border-amber-900/10"
          >
            <Ticket className="w-3.5 h-3.5 text-teal-700" />
            <span>Tạo Mã Giảm Giá</span>
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF7F2] hover:bg-[#F7DEDD] hover:text-[#8C1C24] text-stone-700 transition-colors border border-amber-900/10"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>Phân Quyền User</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
