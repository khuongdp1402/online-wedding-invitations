import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Sửa/deactivate một coupon. Không hỗ trợ DELETE thật — coupon đã dùng bị
 * `Payment.couponId` tham chiếu (FK RESTRICT) nên không xoá được; "xoá" ở UI
 * nghĩa là set `isActive: false`.
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      discountType,
      discountValue,
      templateId,
      maxRedemptions,
      startsAt,
      endsAt,
      isActive,
    } = body;

    if (discountType !== undefined && discountType !== "FIXED" && discountType !== "PERCENT") {
      return NextResponse.json({ error: "Loại giảm giá không hợp lệ" }, { status: 400 });
    }
    if (
      discountValue !== undefined &&
      (typeof discountValue !== "number" || discountValue <= 0)
    ) {
      return NextResponse.json({ error: "Giá trị giảm giá không hợp lệ" }, { status: 400 });
    }

    const coupon = await prisma.coupon.update({
      where: { id: params.id },
      data: {
        ...(discountType !== undefined && { discountType }),
        ...(discountValue !== undefined && { discountValue }),
        ...(templateId !== undefined && { templateId: templateId || null }),
        ...(maxRedemptions !== undefined && {
          maxRedemptions: typeof maxRedemptions === "number" ? maxRedemptions : null,
        }),
        ...(startsAt !== undefined && { startsAt: startsAt ? new Date(startsAt) : null }),
        ...(endsAt !== undefined && { endsAt: endsAt ? new Date(endsAt) : null }),
        ...(isActive !== undefined && { isActive: !!isActive }),
      },
    });

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
