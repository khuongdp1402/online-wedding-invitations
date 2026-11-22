import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applyCompletedPayment } from "@/lib/payment-completion";
import { auth } from "@/lib/auth";

/**
 * Manual payment confirmation webhook (for bank transfer)
 * Cho phép: header x-api-key = ADMIN_API_KEY HOẶC đăng nhập với tài khoản admin
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentId, action } = body;

    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.ADMIN_API_KEY;
    const session = await auth();

    const isAdminByKey = expectedKey && apiKey === expectedKey;
    const isAdminBySession =
      session?.user?.role === "ADMIN" ||
      (session?.user?.role === "STAFF" &&
        session.user.permissions?.includes("MANAGE_PAYMENTS"));

    if (!isAdminByKey && !isAdminBySession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!paymentId) {
      return NextResponse.json(
        { error: "Missing paymentId" },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (action === "confirm") {
      await prisma.$transaction(async (tx) => {
        const updated = await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            paidAt: new Date(),
          },
        });
        await applyCompletedPayment(tx, updated);
      });

      return NextResponse.json({ success: true, status: "COMPLETED" });
    }

    if (action === "reject") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });

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
