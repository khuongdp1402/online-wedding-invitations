import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveTemplatePrice, applyCoupon } from "@/lib/template-pricing";

/**
 * Báo giá xuất bản/gia hạn theo giá của template (đã áp khuyến mãi nếu có),
 * và preview mã giảm giá nếu client truyền `?coupon=`. Không tạo `Payment`
 * (chỉ đọc) — `PublishPage` gọi route này trước khi người dùng bấm thanh toán.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
      include: {
        template: {
          select: { id: true, price: true, salePrice: true, saleStartsAt: true, saleEndsAt: true },
        },
      },
    });
    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const priceInfo = resolveTemplatePrice(wedding.template);
    const isRenewal = wedding.status === "PUBLISHED";

    const couponCode = new URL(request.url).searchParams.get("coupon");
    let couponPreview:
      | { valid: true; discount: number; finalAmount: number }
      | { valid: false; reason: string }
      | undefined;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });
      const result = applyCoupon(
        priceInfo.effectivePrice,
        coupon,
        wedding.templateId
      );
      couponPreview = result.ok
        ? { valid: true, discount: result.discount, finalAmount: result.finalAmount }
        : { valid: false, reason: result.reason };
    }

    return NextResponse.json({
      templatePrice: priceInfo.basePrice,
      effectivePrice: priceInfo.effectivePrice,
      isOnSale: priceInfo.isOnSale,
      saleEndsAt: priceInfo.saleEndsAt,
      isRenewal,
      currentExpiresAt: wedding.expiresAt,
      couponPreview,
    });
  } catch (error) {
    console.error("Error quoting publish price:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
