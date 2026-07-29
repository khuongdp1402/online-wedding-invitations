import type { PrismaClient } from "@prisma/client";
import { calculateExpiryDate } from "@/lib/payment";

/**
 * Hoàn tất thanh toán VNPay một lần (idempotent): chỉ cập nhật khi payment còn PENDING.
 */
export async function completeVnPayIfPending(
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

    const expiresAt = calculateExpiryDate(pay.plan);
    await tx.wedding.update({
      where: { id: pay.weddingId },
      data: {
        status: "PUBLISHED",
        plan: pay.plan,
        paidAt: new Date(),
        expiresAt,
      },
    });

    return {
      ok: true,
      weddingId: pay.weddingId,
      wasAlreadyCompleted: false,
    };
  });
}
