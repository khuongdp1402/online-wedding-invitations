import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyVNPayReturn, calculateExpiryDate } from "@/lib/payment";

/**
 * VNPay IPN (Instant Payment Notification) handler
 * VNPay calls this server-to-server to confirm payment
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = body as Record<string, string>;

    const { isValid, responseCode, transactionId, orderId } =
      verifyVNPayReturn(query);

    if (!isValid) {
      return NextResponse.json(
        { RspCode: "97", Message: "Invalid checksum" },
        { status: 200 }
      );
    }

    // Find payment
    const payment = await prisma.payment.findUnique({
      where: { id: orderId },
      include: { wedding: true },
    });

    if (!payment) {
      return NextResponse.json(
        { RspCode: "01", Message: "Order not found" },
        { status: 200 }
      );
    }

    if (payment.status === "COMPLETED") {
      return NextResponse.json(
        { RspCode: "02", Message: "Order already confirmed" },
        { status: 200 }
      );
    }

    if (responseCode === "00") {
      // Payment successful
      const expiresAt = calculateExpiryDate(payment.plan);

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            transactionId,
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

      return NextResponse.json(
        { RspCode: "00", Message: "Confirm Success" },
        { status: 200 }
      );
    } else {
      // Payment failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });

      return NextResponse.json(
        { RspCode: "00", Message: "Confirm Success" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("VNPay IPN error:", error);
    return NextResponse.json(
      { RspCode: "99", Message: "Unknown error" },
      { status: 200 }
    );
  }
}

/**
 * GET handler for VNPay return URL (user redirect back)
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      query[key] = value;
    });

    const { isValid, responseCode, orderId } = verifyVNPayReturn(query);

    if (!isValid) {
      return NextResponse.redirect(
        new URL("/dashboard?payment=invalid", request.url)
      );
    }

    // Find payment to get weddingId
    const payment = await prisma.payment.findUnique({
      where: { id: orderId },
    });

    if (!payment) {
      return NextResponse.redirect(
        new URL("/dashboard?payment=not-found", request.url)
      );
    }

    if (responseCode === "00") {
      // Process the payment if not already done by IPN
      if (payment.status !== "COMPLETED") {
        const expiresAt = calculateExpiryDate(payment.plan);
        const transactionId = query["vnp_TransactionNo"] || "";

        await prisma.$transaction([
          prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: "COMPLETED",
              transactionId,
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
      }

      return NextResponse.redirect(
        new URL(
          `/dashboard/weddings/${payment.weddingId}?payment=success`,
          request.url
        )
      );
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });

      return NextResponse.redirect(
        new URL(
          `/dashboard/weddings/${payment.weddingId}/publish?payment=failed`,
          request.url
        )
      );
    }
  } catch (error) {
    console.error("VNPay return error:", error);
    return NextResponse.redirect(
      new URL("/dashboard?payment=error", request.url)
    );
  }
}
