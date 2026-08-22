import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminPaymentList } from "./AdminPaymentList";
import { AdminContactList } from "./AdminContactList";

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

  const contactRequests = await prisma.contactRequest.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: {
      wedding: { select: { slug: true, groomName: true, brideName: true } },
    },
  });

  const contactsForClient = contactRequests.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    message: c.message,
    status: c.status,
    context: c.context,
    wedding: c.wedding,
    createdAt: c.createdAt.toISOString(),
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

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Yêu cầu liên hệ
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Khách hàng muốn trao đổi trực tiếp về cấu trúc thiệp cưới.
          </p>
          <AdminContactList contacts={contactsForClient} />
        </div>
      </div>
    </div>
  );
}
