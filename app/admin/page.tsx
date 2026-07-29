import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminPaymentList } from "./AdminPaymentList";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const pendingPayments = await prisma.payment.findMany({
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
  });

  const allPayments = await prisma.payment.findMany({
    take: 50,
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
  });

  const pendingPaymentsForClient = pendingPayments.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  const allPaymentsForClient = allPayments.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Khu vực Admin</h1>
        <p className="text-gray-600 mb-8">
          Xác nhận thanh toán chuyển khoản và xem danh sách giao dịch.
        </p>

        <AdminPaymentList
          pendingPayments={pendingPaymentsForClient}
          allPayments={allPaymentsForClient}
        />
      </div>
    </div>
  );
}
