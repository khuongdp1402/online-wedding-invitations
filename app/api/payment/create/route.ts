import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createVNPayUrl,
  PLAN_PRICES,
  generateTransferContent,
  BANK_TRANSFER_INFO,
} from "@/lib/payment";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weddingId, plan, method } = body;

    if (!weddingId || !plan || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!PLAN_PRICES[plan]) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    // Verify wedding ownership
    const wedding = await prisma.wedding.findFirst({
      where: { id: weddingId, userId: session.user.id },
    });
    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Check if already paid for same/higher plan
    if (
      wedding.status === "PUBLISHED" &&
      getPlanLevel(wedding.plan) >= getPlanLevel(plan)
    ) {
      return NextResponse.json(
        { error: "Thiệp đã được xuất bản với gói tương đương hoặc cao hơn" },
        { status: 400 }
      );
    }

    const amount = PLAN_PRICES[plan];

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        weddingId,
        amount,
        plan,
        method,
        status: "PENDING",
      },
    });

    if (method === "vnpay") {
      // Get client IP
      const forwarded = request.headers.get("x-forwarded-for");
      const ipAddr = forwarded?.split(",")[0]?.trim() || "127.0.0.1";

      const paymentUrl = createVNPayUrl({
        orderId: payment.id,
        amount,
        orderInfo: `Thanh toan thiepcuoi ${wedding.groomName} & ${wedding.brideName} - Goi ${plan}`,
        ipAddr,
      });

      return NextResponse.json({
        payment: { id: payment.id, method: "vnpay" },
        paymentUrl,
      });
    }

    if (method === "bank_transfer") {
      const transferContent = generateTransferContent(weddingId, plan);

      return NextResponse.json({
        payment: { id: payment.id, method: "bank_transfer" },
        bankInfo: {
          ...BANK_TRANSFER_INFO,
          amount,
          transferContent,
        },
      });
    }

    return NextResponse.json(
      { error: "Phương thức thanh toán không hợp lệ" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getPlanLevel(plan: string): number {
  const levels: Record<string, number> = {
    FREE: 0,
    BASIC: 1,
    STANDARD: 2,
    PREMIUM: 3,
  };
  return levels[plan] || 0;
}
