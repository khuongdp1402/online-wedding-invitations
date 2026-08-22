import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminCouponList } from "./AdminCouponList";

export default async function AdminCouponsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [coupons, templates] = await Promise.all([
    prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
      include: { template: { select: { name: true } } },
    }),
    prisma.template.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Mã giảm giá</h1>
      <p className="text-gray-600 mb-8">
        Tạo mã giảm giá dùng lúc thanh toán — độc lập với khuyến mãi đặt sẵn trên từng mẫu thiệp.
      </p>
      <AdminCouponList
        coupons={JSON.parse(JSON.stringify(coupons))}
        templates={templates}
      />
    </div>
  );
}
