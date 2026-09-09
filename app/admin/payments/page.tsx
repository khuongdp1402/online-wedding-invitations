import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { AdminPaymentList } from "../AdminPaymentList";

export default async function AdminPaymentsPage() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, "MANAGE_PAYMENTS")) {
    redirect("/admin");
  }

  const [pendingPayments, allPayments] = await Promise.all([
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
    prisma.payment.findMany({
      take: 100,
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
  ]);

  const pendingPaymentsForClient = pendingPayments.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  const allPaymentsForClient = allPayments.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <AdminPaymentList
        pendingPayments={pendingPaymentsForClient}
        allPayments={allPaymentsForClient}
        showRecentOnly={false}
      />
    </div>
  );
}
