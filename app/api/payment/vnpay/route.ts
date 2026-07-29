import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyVNPayReturn,
  parseVNPayIpnBody,
} from "@/lib/payment";
import { completeVnPayIfPending } from "@/lib/vnpay-complete";

/**
 * VNPay IPN (Instant Payment Notification) — form-urlencoded hoặc JSON.
 */
export async function POST(request: Request) {
  try {
    const query = await parseVNPayIpnBody(request);

    const { isValid, responseCode, transactionId, orderId } =
      verifyVNPayReturn(query);

    if (!isValid) {
      return NextResponse.json(
        { RspCode: "97", Message: "Invalid checksum" },
        { status: 200 }
      );
    }

    if (responseCode === "00") {
      const pay = await prisma.payment.findUnique({ where: { id: orderId } });
      if (!pay) {
        return NextResponse.json(
          { RspCode: "01", Message: "Order not found" },
          { status: 200 }
        );
      }
      if (pay.status === "COMPLETED") {
        return NextResponse.json(
          { RspCode: "02", Message: "Order already confirmed" },
          { status: 200 }
        );
      }

      const result = await completeVnPayIfPending(
        prisma,
        orderId,
        transactionId
      );
      if (!result.ok) {
        return NextResponse.json(
          { RspCode: "01", Message: "Order not found" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { RspCode: "00", Message: "Confirm Success" },
        { status: 200 }
      );
    }

    await prisma.payment.updateMany({
      where: { id: orderId, status: "PENDING" },
      data: { status: "FAILED" },
    });

    return NextResponse.json(
      { RspCode: "00", Message: "Confirm Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("VNPay IPN error:", error);
    return NextResponse.json(
      { RspCode: "99", Message: "Unknown error" },
      { status: 200 }
    );
  }
}

/**
 * GET — VNPay return URL (redirect người dùng).
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

    const payment = await prisma.payment.findUnique({
      where: { id: orderId },
    });

    if (!payment) {
      return NextResponse.redirect(
        new URL("/dashboard?payment=not-found", request.url)
      );
    }

    if (responseCode === "00") {
      const transactionId = query["vnp_TransactionNo"] || "";
      await completeVnPayIfPending(prisma, orderId, transactionId);

      return NextResponse.redirect(
        new URL(
          `/dashboard/weddings/${payment.weddingId}?payment=success`,
          request.url
        )
      );
    }

    await prisma.payment.updateMany({
      where: { id: payment.id, status: "PENDING" },
      data: { status: "FAILED" },
    });

    return NextResponse.redirect(
      new URL(
        `/dashboard/weddings/${payment.weddingId}/publish?payment=failed`,
        request.url
      )
    );
  } catch (error) {
    console.error("VNPay return error:", error);
    return NextResponse.redirect(
      new URL("/dashboard?payment=error", request.url)
    );
  }
}
