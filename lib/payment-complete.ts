import type { PrismaClient } from "@prisma/client";
import { applyCompletedPayment } from "@/lib/payment-completion";

/**
 * Hoàn tất một payment đang chờ (idempotent) — dùng chung cho mọi phương
 * thức thanh toán (chuyển khoản/Casso, v.v.). Chỉ cập nhật khi payment còn
 * PENDING.
 */
export async function completePaymentIfPending(
  prisma: PrismaClient,
  orderId: string,
  transactionId: string
): Promise<
  | { ok: true; weddingId: string; wasAlreadyCompleted: boolean }
  | { ok: false; reason: "not_found" | "stale" }
> {
  return prisma.$transaction(async (tx) => {
    const pay = await tx.payment.findUnique({ where: { id: orderId } });
    if (!pay) return { ok: false, reason: "not_found" };
    if (pay.status === "COMPLETED") {
      return {
        ok: true,
        weddingId: pay.weddingId,
        wasAlreadyCompleted: true,
      };
    }

    const updated = await tx.payment.updateMany({
      where: { id: orderId, status: "PENDING" },
      data: {
        status: "COMPLETED",
        transactionId: transactionId || undefined,
        paidAt: new Date(),
      },
    });

    if (updated.count === 0) {
      const again = await tx.payment.findUnique({ where: { id: orderId } });
      if (again?.status === "COMPLETED") {
        return {
          ok: true,
          weddingId: again.weddingId,
          wasAlreadyCompleted: true,
        };
      }
      return { ok: false, reason: "stale" };
    }

    const completed = await tx.payment.findUniqueOrThrow({
      where: { id: orderId },
    });
    await applyCompletedPayment(tx, completed);

    return {
      ok: true,
      weddingId: pay.weddingId,
      wasAlreadyCompleted: false,
    };
  });
}
