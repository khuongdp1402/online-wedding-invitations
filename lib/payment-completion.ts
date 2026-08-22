import type { Prisma, Payment } from "@prisma/client";
import { calculateExpiryDate } from "@/lib/payment";

type Tx = Prisma.TransactionClient;

/**
 * Áp dụng hiệu lực của một `Payment` vừa chuyển sang COMPLETED lên `Wedding`
 * liên quan: cập nhật hạn sử dụng, số tiền đã trả, đổi template (nếu là
 * TEMPLATE_CHANGE), và tăng lượt dùng coupon (nếu có).
 *
 * Dùng chung giữa webhook xác nhận thủ công (chuyển khoản) và luồng VNPay để
 * hai nơi không lệch nhau khi sửa logic hiệu lực/gia hạn.
 *
 * `payment` phải đang ở trạng thái COMPLETED (hoặc đang được set COMPLETED
 * trong cùng transaction) — hàm này chỉ áp dụng hệ quả, không tự đổi status
 * của chính `Payment`.
 */
export async function applyCompletedPayment(
  tx: Tx,
  payment: Payment
): Promise<void> {
  const now = new Date();
  const wedding = await tx.wedding.findUniqueOrThrow({
    where: { id: payment.weddingId },
  });

  const isTemplateChange = payment.type === "TEMPLATE_CHANGE";

  const expiresAt = isTemplateChange
    ? wedding.expiresAt
    : calculateExpiryDate(
        payment.type === "RENEW" && wedding.expiresAt && wedding.expiresAt > now
          ? wedding.expiresAt
          : now
      );

  const purchasePrice = isTemplateChange
    ? (wedding.purchasePrice ?? 0) + payment.amount
    : payment.amount;

  await tx.wedding.update({
    where: { id: payment.weddingId },
    data: {
      status: "PUBLISHED",
      paidAt: now,
      expiresAt,
      purchasePrice,
      ...(isTemplateChange && payment.targetTemplateId
        ? { templateId: payment.targetTemplateId }
        : {}),
    },
  });

  if (payment.couponId) {
    await tx.coupon.update({
      where: { id: payment.couponId },
      data: { redemptionCount: { increment: 1 } },
    });
  }
}
