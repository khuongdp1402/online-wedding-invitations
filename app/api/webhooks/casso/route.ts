import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTransferContent } from "@/lib/payment";
import { completePaymentIfPending } from "@/lib/payment-complete";
import { sendTelegramMessage } from "@/lib/telegram";
import { escapeHtml, safeCompareSecret } from "@/lib/security-utils";

/**
 * Webhook nhận biến động số dư ngân hàng (Casso).
 *
 * Bảo mật: bắt buộc header `x-api-key` khớp `CASSO_WEBHOOK_SECRET` (so sánh
 * thời gian hằng). Nếu biến môi trường chưa cấu hình thì từ chối toàn bộ —
 * route này publish được thiệp nên KHÔNG bao giờ được mở công khai.
 *
 * Nội dung chuyển khoản có dạng `TC<8 ký tự cuối weddingId> <TYPE>`, sinh bởi
 * `generateTransferContent`. Nội dung này không lưu trong DB nên ta dựng lại từ
 * payment đang chờ rồi so khớp chính xác, thay vì dò `endsWith` như trước.
 *
 * Idempotency: dùng mã giao dịch thật của Casso (`id`, rồi `reference`/`tid`)
 * làm `Payment.transactionId`; nếu đã có payment mang mã đó thì bỏ qua (Casso
 * retry / replay). Ngoài ra `completePaymentIfPending` chỉ áp dụng khi payment
 * còn PENDING nên một payment không bao giờ bị cộng hạn hai lần.
 */

type CassoTransaction = {
  id?: string | number;
  tid?: string | number;
  reference?: string | number;
  description?: string;
  amount?: number;
};

/** Mã giao dịch ổn định từ payload Casso, hoặc null nếu không có. */
function cassoTransactionId(txn: CassoTransaction): string | null {
  for (const v of [txn.id, txn.reference, txn.tid]) {
    if ((typeof v === "string" && v.trim()) || typeof v === "number") {
      return `casso-${String(v).trim()}`;
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const expectedKey = process.env.CASSO_WEBHOOK_SECRET;
    if (!expectedKey) {
      console.error(
        "[Casso] CASSO_WEBHOOK_SECRET chưa được cấu hình — từ chối webhook."
      );
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 503 }
      );
    }
    if (!safeCompareSecret(request.headers.get("x-api-key"), expectedKey)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);

    // Casso v1 gửi { data: [ {...} ] }, Casso v2 gửi { data: {...} } (một giao
    // dịch); vẫn chấp nhận dạng phẳng { description, amount } cho tiện test.
    const transactions: CassoTransaction[] = Array.isArray(body?.data)
      ? body.data
      : body?.data && typeof body.data === "object" && body.data.description
        ? [body.data]
        : body?.description
          ? [body]
          : [];

    if (transactions.length === 0) {
      return NextResponse.json(
        { error: "No transaction found" },
        { status: 400 }
      );
    }

    let processed = 0;
    const skipped: string[] = [];

    // Chỉ truy vấn danh sách payment đang chờ MỘT lần cho cả request.
    // Payment đã được hoàn tất trong vòng lặp sẽ bị loại khỏi danh sách.
    const pending = await prisma.payment.findMany({
      where: { status: "PENDING", method: "bank_transfer" },
      orderBy: { createdAt: "desc" },
    });
    const completedInThisRequest = new Set<string>();

    for (const txn of transactions) {
      const desc = typeof txn?.description === "string" ? txn.description : "";
      if (!desc) continue;
      const safeDesc = escapeHtml(desc.slice(0, 500));

      const match = desc.match(/TC([a-zA-Z0-9_-]{8})/i);
      if (!match) {
        skipped.push("no_match");
        continue;
      }
      const shortId = match[1].toUpperCase();

      const realTxnId = cassoTransactionId(txn);
      if (realTxnId) {
        const dup = await prisma.payment.findFirst({
          where: { transactionId: realTxnId },
          select: { id: true },
        });
        if (dup) {
          skipped.push("duplicate_transaction");
          continue;
        }
      }

      // Lọc sơ bộ theo 8 ký tự cuối weddingId, rồi so khớp chính xác nội dung
      // chuyển khoản (gồm cả PLAN) để tránh nhận nhầm payment của thiệp khác.
      const payment = pending.find((p) => {
        if (completedInThisRequest.has(p.id)) return false;
        if (p.weddingId.slice(-8).toUpperCase() !== shortId) return false;
        return desc
          .toUpperCase()
          .includes(generateTransferContent(p.weddingId, p.type).toUpperCase());
      });

      const paidAmount = typeof txn.amount === "number" ? txn.amount : 0;

      if (!payment) {
        skipped.push("payment_not_found");
        sendTelegramMessage(
          `⚠️ <b>Casso: giao dịch không khớp payment nào</b>\n` +
            `Nội dung CK: <code>${safeDesc}</code>\n` +
            `Số tiền: ${paidAmount.toLocaleString("vi-VN")}đ\n` +
            `Cần admin kiểm tra tay.`
        ).catch(() => {});
        continue;
      }

      // Số tiền chuyển phải đủ, nếu không giữ nguyên PENDING để admin xử lý tay.
      if (paidAmount < payment.amount) {
        console.warn(
          `[Casso] Thiếu tiền cho payment ${payment.id}: nhận ${paidAmount} / cần ${payment.amount}`
        );
        skipped.push("insufficient_amount");
        sendTelegramMessage(
          `⚠️ <b>Casso: thiếu tiền</b>\n` +
            `Payment: <code>${escapeHtml(payment.id)}</code>\n` +
            `Nội dung CK: <code>${safeDesc}</code>\n` +
            `Nhận: ${paidAmount.toLocaleString("vi-VN")}đ / Cần: ${payment.amount.toLocaleString("vi-VN")}đ\n` +
            `Còn thiếu: ${(payment.amount - paidAmount).toLocaleString("vi-VN")}đ\n` +
            `Cần admin kiểm tra tay.`
        ).catch(() => {});
        continue;
      }

      // Dùng lại luồng hoàn tất chung: idempotent, chạy trong $transaction và
      // tự tính hạn sử dụng theo loại giao dịch (PUBLISH/RENEW/TEMPLATE_CHANGE).
      const result = await completePaymentIfPending(
        prisma,
        payment.id,
        realTxnId ?? `casso-${Date.now()}`
      );
      completedInThisRequest.add(payment.id);
      if (result.ok && !result.wasAlreadyCompleted) {
        processed++;
        sendTelegramMessage(
          `✅ <b>Đã xác nhận thanh toán tự động</b>\n` +
            `Payment: <code>${escapeHtml(payment.id)}</code>\n` +
            `Số tiền: ${paidAmount.toLocaleString("vi-VN")}đ\n` +
            `Loại: ${escapeHtml(payment.type)}`
        ).catch(() => {});
      } else {
        skipped.push(result.ok ? "already_completed" : result.reason);
      }
    }

    return NextResponse.json({ success: true, processed, skipped });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
