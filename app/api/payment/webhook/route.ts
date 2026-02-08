import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateExpiryDate } from "@/lib/payment";

/**
 * Manual payment confirmation webhook (for bank transfer)
 * Called by admin to confirm a bank transfer payment
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentId, action } = body;

    // Simple API key check for admin actions
    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey || apiKey !== expectedKey) {
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
      const expiresAt = calculateExpiryDate(payment.plan);

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            paidAt: new Date(),
          },
        }),
        prisma.wedding.update({
          where: { id: payment.weddingId },
          data: {
            status: "PUBLISHED",
            plan: payment.plan,
            paidAt: new Date(),
            expiresAt,
          },
        }),
      ]);

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
