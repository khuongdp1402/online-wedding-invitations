import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  generateTransferContent,
  BANK_TRANSFER_INFO,
} from "@/lib/payment";
import { applyCompletedPayment } from "@/lib/payment-completion";
import { buildVietQrUrl } from "@/lib/vietqr";
import { resolveTemplatePrice, applyCoupon } from "@/lib/template-pricing";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weddingId, method, couponCode, targetTemplateId } = body;

    if (!weddingId || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify wedding ownership
    const wedding = await prisma.wedding.findFirst({
      where: { id: weddingId, userId: session.user.id },
      include: {
        template: {
          select: { id: true, price: true, salePrice: true, saleStartsAt: true, saleEndsAt: true },
        },
      },
    });
    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // `targetTemplateId`: chỉ gửi khi client đang trả phần chênh lệch để đổi
    // sang một template khác đắt hơn (xem 402 ở PUT /api/weddings/[id]).
    // Giá dùng để tính tiền khi đó là của template ĐÍCH, không phải template
    // hiện tại của wedding.
    const isTemplateChange =
      typeof targetTemplateId === "string" &&
      targetTemplateId !== wedding.templateId;

    const pricingTemplate = isTemplateChange
      ? await prisma.template.findUnique({
          where: { id: targetTemplateId },
          select: { id: true, price: true, salePrice: true, saleStartsAt: true, saleEndsAt: true },
        })
      : wedding.template;

    if (isTemplateChange && !pricingTemplate) {
      return NextResponse.json({ error: "Template không tồn tại" }, { status: 400 });
    }

    const priceInfo = resolveTemplatePrice(pricingTemplate!);

    const type: "PUBLISH" | "RENEW" | "TEMPLATE_CHANGE" = isTemplateChange
      ? "TEMPLATE_CHANGE"
      : wedding.status === "PUBLISHED"
        ? "RENEW"
        : "PUBLISH";

    // Đổi template: số tiền cần thu chỉ là phần CHÊNH LỆCH so với đã trả,
    // không phải giá đầy đủ của template mới (khớp logic 402 ở PUT wedding).
    const baseAmount = isTemplateChange
      ? Math.max(0, priceInfo.effectivePrice - (wedding.purchasePrice ?? 0))
      : priceInfo.effectivePrice;

    let finalAmount = baseAmount;
    let couponId: string | null = null;
    let couponDiscount: number | null = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: String(couponCode).trim().toUpperCase() },
      });
      const result = applyCoupon(baseAmount, coupon, pricingTemplate!.id);
      if (!result.ok) {
        return NextResponse.json(
          { error: "Mã giảm giá không hợp lệ", reason: result.reason },
          { status: 400 }
        );
      }
      finalAmount = result.finalAmount;
      couponId = coupon!.id;
      couponDiscount = result.discount;
    }

    // Không tăng redemptionCount ở đây — chỉ tăng khi payment COMPLETED
    // (xem lib/payment-completion.ts), để không đốt lượt dùng coupon cho
    // giao dịch bị bỏ dở/thất bại.
    const payment = await prisma.payment.create({
      data: {
        weddingId,
        type,
        amount: finalAmount,
        basePrice: baseAmount,
        couponId,
        couponDiscount,
        targetTemplateId: isTemplateChange ? targetTemplateId : null,
        plan: null,
        method,
        status: "PENDING",
      },
    });

    if (finalAmount <= 0) {
      await prisma.$transaction(async (tx) => {
        const completedPayment = await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            transactionId: `FREE-${Date.now()}`,
            paidAt: new Date(),
          },
        });
        await applyCompletedPayment(tx, completedPayment);
      });

      return NextResponse.json({
        completed: true,
        payment: { id: payment.id, method: "free", status: "COMPLETED" },
      });
    }

    if (method === "bank_transfer") {
      const transferContent = generateTransferContent(weddingId, type);
      const qrUrl = buildVietQrUrl({
        bankName: BANK_TRANSFER_INFO.bankName,
        accountNumber: BANK_TRANSFER_INFO.accountNumber,
        accountHolder: BANK_TRANSFER_INFO.accountHolder,
        message: transferContent,
      });

      return NextResponse.json({
        payment: { id: payment.id, method: "bank_transfer" },
        bankInfo: {
          ...BANK_TRANSFER_INFO,
          amount: finalAmount,
          transferContent,
          qrUrl,
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
