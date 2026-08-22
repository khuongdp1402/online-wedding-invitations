import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTransferContent } from "@/lib/payment";
import { completeVnPayIfPending } from "@/lib/vnpay-complete";

/**
 * Webhook nhận biến động số dư ngân hàng (Casso).
 *
 * Bảo mật: bắt buộc header `x-api-key` khớp `CASSO_WEBHOOK_SECRET`. Nếu biến môi
 * trường chưa cấu hình thì từ chối toàn bộ — route này publish được thiệp nên
 * KHÔNG bao giờ được mở công khai.
 *
 * Nội dung chuyển khoản có dạng `TC<8 ký tự cuối weddingId> <TYPE>`, sinh bởi
 * `generateTransferContent`. Nội dung này không lưu trong DB nên ta dựng lại từ
 * payment đang chờ rồi so khớp chính xác, thay vì dò `endsWith` như trước.
 */

type CassoTransaction = {
  description?: string;
  amount?: number;
};

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
    if (request.headers.get("x-api-key") !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Casso gửi { data: [ { description, amount, ... } ] };
    // vẫn chấp nhận dạng phẳng { description, amount } cho tiện test.
    const transactions: CassoTransaction[] = Array.isArray(body?.data)
      ? body.data
      : body?.description
        ? [{ description: body.description, amount: body.amount }]
        : [];

    if (transactions.length === 0) {
      return NextResponse.json(
        { error: "No transaction found" },
        { status: 400 }
      );
    }

    let processed = 0;
    const skipped: string[] = [];

    for (const txn of transactions) {
      const desc = txn.description;
      if (!desc) continue;

      const match = desc.match(/TC([a-zA-Z0-9_-]{8})/i);
      if (!match) {
        skipped.push("no_match");
        continue;
      }
      const shortId = match[1].toUpperCase();

      // Lọc sơ bộ theo 8 ký tự cuối weddingId, rồi so khớp chính xác nội dung
      // chuyển khoản (gồm cả PLAN) để tránh nhận nhầm payment của thiệp khác.
      const candidates = await prisma.payment.findMany({
        where: { status: "PENDING", method: "bank_transfer" },
        orderBy: { createdAt: "desc" },
      });

      const payment = candidates.find((p) => {
        if (p.weddingId.slice(-8).toUpperCase() !== shortId) return false;
        return desc
          .toUpperCase()
          .includes(generateTransferContent(p.weddingId, p.type).toUpperCase());
      });

      if (!payment) {
        skipped.push("payment_not_found");
        continue;
      }

      // Số tiền chuyển phải đủ, nếu không giữ nguyên PENDING để admin xử lý tay.
      const paidAmount = typeof txn.amount === "number" ? txn.amount : 0;
      if (paidAmount < payment.amount) {
        console.warn(
          `[Casso] Thiếu tiền cho payment ${payment.id}: nhận ${paidAmount} / cần ${payment.amount}`
        );
        skipped.push("insufficient_amount");
        continue;
      }

      // Dùng lại luồng hoàn tất chung: idempotent, chạy trong $transaction và
      // tự tính hạn sử dụng theo loại giao dịch (PUBLISH/RENEW/TEMPLATE_CHANGE).
      const result = await completeVnPayIfPending(
        prisma,
        payment.id,
        `casso-${Date.now()}`
      );
      if (result.ok && !result.wasAlreadyCompleted) processed++;
    }

    return NextResponse.json({ success: true, processed, skipped });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
