import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { AdminCouponList } from "./AdminCouponList";

export default async function AdminCouponsPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, "MANAGE_COUPONS")) {
    redirect("/admin");
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
    <div className="space-y-6">
      <AdminCouponList
        coupons={JSON.parse(JSON.stringify(coupons))}
        templates={templates}
      />
    </div>
  );
}
