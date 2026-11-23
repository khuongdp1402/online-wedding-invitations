import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { completePaymentIfPending } from "@/lib/payment-complete";
import { auth } from "@/lib/auth";
import { safeCompareSecret } from "@/lib/security-utils";

/**
 * Manual payment confirmation webhook (for bank transfer)
 * Cho phép: header x-api-key = ADMIN_API_KEY HOẶC đăng nhập với tài khoản admin
 *
 * - "confirm": dùng luồng hoàn tất chung `completePaymentIfPending` (idempotent,
 *   chỉ áp dụng khi payment còn PENDING) — bấm xác nhận lại không cộng hạn
 *   sử dụng / tăng lượt coupon lần nữa.
 * - "reject": chỉ áp dụng cho payment PENDING.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const { paymentId, action } = (body ?? {}) as {
      paymentId?: unknown;
      action?: unknown;
    };

    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.ADMIN_API_KEY;

    // So sánh thời gian hằng; chỉ gọi auth() khi không có key hợp lệ.
    const isAdminByKey = safeCompareSecret(apiKey, expectedKey);
    let isAdminBySession = false;
    if (!isAdminByKey) {
      const session = await auth();
      isAdminBySession =
        session?.user?.role === "ADMIN" ||
        (session?.user?.role === "STAFF" &&
          !!session.user.permissions?.includes("MANAGE_PAYMENTS"));
    }

    if (!isAdminByKey && !isAdminBySession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof paymentId !== "string" || !paymentId) {
      return NextResponse.json(
        { error: "Missing paymentId" },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: { id: true, status: true },
    });

    if (!payment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (action === "confirm") {
      // transactionId rỗng → giữ nguyên giá trị hiện có (xác nhận tay không
      // có mã giao dịch ngân hàng).
      const result = await completePaymentIfPending(prisma, payment.id, "");
      if (!result.ok) {
        return NextResponse.json(
          {
            error:
              result.reason === "not_found"
                ? "Not found"
                : "Payment không còn ở trạng thái chờ xác nhận",
          },
          { status: result.reason === "not_found" ? 404 : 409 }
        );
      }

      return NextResponse.json({
        success: true,
        status: "COMPLETED",
        alreadyCompleted: result.wasAlreadyCompleted,
      });
    }

    if (action === "reject") {
      const updated = await prisma.payment.updateMany({
        where: { id: payment.id, status: "PENDING" },
        data: { status: "FAILED" },
      });

      if (updated.count === 0) {
        return NextResponse.json(
          { error: "Chỉ có thể từ chối payment đang chờ xác nhận" },
          { status: 409 }
        );
      }

      return NextResponse.json({ success: true, status: "FAILED" });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'confirm' or 'reject'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
