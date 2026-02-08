import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Check payment status (for polling from client during bank transfer)
 */
export async function GET(
  _request: Request,
  { params }: { params: { paymentId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: params.paymentId },
      include: {
        wedding: {
          select: { userId: true },
        },
      },
    });

    if (!payment || payment.wedding.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: payment.status,
      paidAt: payment.paidAt,
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
