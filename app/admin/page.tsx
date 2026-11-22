import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { canAccessAdmin } from "@/lib/permissions";
import { AdminQuickStats } from "./AdminQuickStats";
import { AdminPaymentList } from "./AdminPaymentList";
import { AdminContactList } from "./AdminContactList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  MessageSquareHeart,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user || !canAccessAdmin(session.user)) {
    redirect("/dashboard");
  }

  // Aggregate Stats
  const [
    completedPayments,
    pendingPayments,
    totalWeddings,
    publishedWeddings,
    totalUsers,
    staffCount,
    newContactsCount,
    topTemplates,
    recentPayments,
    recentContacts,
  ] = await Promise.all([
    // Completed payments sum
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETED" },
    }),
    // Pending bank transfer payments
    prisma.payment.findMany({
      where: { status: "PENDING", method: "bank_transfer" },
      include: {
        wedding: {
          select: {
            id: true,
            slug: true,
            groomName: true,
            brideName: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    // Total weddings count
    prisma.wedding.count(),
    // Published weddings count
    prisma.wedding.count({ where: { status: "PUBLISHED" } }),
    // Total registered users
    prisma.user.count(),
    // Admins and Staff
    prisma.user.count({ where: { role: { in: [Role.ADMIN, Role.STAFF] } } }),
    // New contact requests
    prisma.contactRequest.count({ where: { status: "NEW" } }),
    // Top 5 templates
    prisma.template.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        price: true,
        salePrice: true,
        _count: { select: { weddings: true } },
      },
      orderBy: { weddings: { _count: "desc" } },
    }),
    // Recent 10 payments
    prisma.payment.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        wedding: {
          select: {
            slug: true,
            groomName: true,
            brideName: true,
          },
        },
      },
    }),
    // Recent 5 contact requests
    prisma.contactRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        wedding: { select: { slug: true, groomName: true, brideName: true } },
      },
    }),
  ]);

  const totalRevenue = completedPayments._sum.amount || 0;

  const pendingPaymentsForClient = pendingPayments.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  const recentPaymentsForClient = recentPayments.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  const recentContactsForClient = recentContacts.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    message: c.message,
    status: c.status,
    context: c.context,
    wedding: c.wedding,
    createdAt: c.createdAt.toISOString(),
  }));

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

  return (
    <div className="space-y-8">
      {/* KPI Stats & Quick Action Bar */}
      <AdminQuickStats
        totalRevenue={totalRevenue}
        pendingPaymentCount={pendingPayments.length}
        totalWeddings={totalWeddings}
        publishedWeddings={publishedWeddings}
        totalUsers={totalUsers}
        staffCount={staffCount}
        newContactsCount={newContactsCount}
      />

      {/* Analytics & Top Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Templates */}
        <Card className="lg:col-span-2 border border-amber-900/10 shadow-sm bg-white rounded-xl overflow-hidden">
          <CardHeader className="bg-[#FAF7F2] border-b border-amber-900/10 py-4 px-6 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-800" />
              <CardTitle className="text-base font-bold font-serif text-stone-900">
                Mẫu Thiệp Được Tạo Nhiều Nhất
              </CardTitle>
            </div>
            <Link
              href="/admin/templates"
              className="text-xs font-semibold text-[#8C1C24] hover:underline flex items-center gap-1"
            >
              <span>Quản lý giá</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-50/70 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Tên Mẫu</th>
                    <th className="py-3 px-4">Phong cách</th>
                    <th className="py-3 px-4">Giá hiện hành</th>
                    <th className="py-3 px-4 text-right">Số thiệp tạo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {topTemplates.map((t, idx) => {
                    const effectivePrice = t.salePrice ?? t.price;
                    return (
                      <tr key={t.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        <td className="py-3 px-4 font-semibold text-stone-900 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-amber-900/10 text-stone-600 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span>{t.name}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-stone-600 capitalize">
                          {t.category}
                        </td>
                        <td className="py-3 px-4 text-xs font-medium text-stone-800">
                          {formatMoney(effectivePrice)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 font-bold text-xs bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                            {t._count.weddings} thiệp
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Summary Card */}
        <Card className="border border-amber-900/10 shadow-sm bg-white rounded-xl overflow-hidden flex flex-col justify-between">
          <div>
            <CardHeader className="bg-[#FAF7F2] border-b border-amber-900/10 py-4 px-6">
              <CardTitle className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
                Chỉ Số Vận Hành
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-stone-600">Tỷ lệ thiệp Xuất bản:</span>
                <span className="font-bold text-stone-900">
                  {totalWeddings > 0
                    ? Math.round((publishedWeddings / totalWeddings) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-stone-600">Doanh thu trung bình / thiệp:</span>
                <span className="font-bold text-[#8C1C24]">
                  {publishedWeddings > 0
                    ? formatMoney(Math.round(totalRevenue / publishedWeddings))
                    : formatMoney(0)}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-stone-600">Yêu cầu tư vấn tồn đọng:</span>
                <Badge
                  className={
                    newContactsCount > 0
                      ? "bg-rose-100 text-rose-800 border-0 text-xs"
                      : "bg-stone-100 text-stone-700 border-0 text-xs"
                  }
                >
                  {newContactsCount} yêu cầu mới
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Nhân sự quản trị & Staff:</span>
                <span className="font-bold text-stone-900">{staffCount} tài khoản</span>
              </div>
            </CardContent>
          </div>

          <div className="p-4 bg-[#FAF7F2] border-t border-amber-900/10">
            <Link
              href="/admin/users"
              className="text-xs font-semibold text-[#8C1C24] hover:underline flex items-center justify-center gap-1.5"
            >
              <span>Quản lý vai trò & quyền hạn nhân viên</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Pending Bank Transfers List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-700" />
            Thanh Toán Chuyển Khoản Cần Đối Soát
          </h2>
          <Link
            href="/admin/payments"
            className="text-xs font-semibold text-[#8C1C24] hover:underline flex items-center gap-1"
          >
            <span>Tất cả giao dịch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <AdminPaymentList
          pendingPayments={pendingPaymentsForClient}
          allPayments={recentPaymentsForClient}
          showRecentOnly={true}
        />
      </div>

      {/* Customer Contact Requests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-rose-700" />
            Yêu Cầu Tư Vấn Mới Nhất
          </h2>
          <Link
            href="/admin/contacts"
            className="text-xs font-semibold text-[#8C1C24] hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả yêu cầu</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <AdminContactList contacts={recentContactsForClient} />
      </div>
    </div>
  );
}
