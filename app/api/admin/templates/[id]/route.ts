import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Sửa giá/khuyến mãi của một template. Admin-only — đây là nơi duy nhất
 * đổi giá bán mà không cần sửa code/deploy lại.
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
    const { price, salePrice, saleStartsAt, saleEndsAt } = body;

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
      return NextResponse.json({ error: "Giá không hợp lệ" }, { status: 400 });
    }

    const nextPrice = typeof price === "number" ? price : undefined;

    if (salePrice !== undefined && salePrice !== null) {
      if (typeof salePrice !== "number" || salePrice < 0) {
        return NextResponse.json({ error: "Giá khuyến mãi không hợp lệ" }, { status: 400 });
      }
      const template = await prisma.template.findUnique({
        where: { id: params.id },
        select: { price: true },
      });
      if (!template) {
        return NextResponse.json({ error: "Template không tồn tại" }, { status: 404 });
      }
      const basePrice = nextPrice ?? template.price;
      if (salePrice >= basePrice) {
        return NextResponse.json(
          { error: "Giá khuyến mãi phải nhỏ hơn giá gốc" },
          { status: 400 }
        );
      }
    }

    const hasStart = saleStartsAt !== undefined && saleStartsAt !== null;
    const hasEnd = saleEndsAt !== undefined && saleEndsAt !== null;
    if (hasStart && hasEnd) {
      if (new Date(saleEndsAt) <= new Date(saleStartsAt)) {
        return NextResponse.json(
          { error: "Ngày kết thúc khuyến mãi phải sau ngày bắt đầu" },
          { status: 400 }
        );
      }
    }

    const template = await prisma.template.update({
      where: { id: params.id },
      data: {
        ...(price !== undefined && { price }),
        ...(salePrice !== undefined && { salePrice }),
        ...(saleStartsAt !== undefined && {
          saleStartsAt: saleStartsAt ? new Date(saleStartsAt) : null,
        }),
        ...(saleEndsAt !== undefined && {
          saleEndsAt: saleEndsAt ? new Date(saleEndsAt) : null,
        }),
      },
    });

    return NextResponse.json({ template });
  } catch (error) {
    console.error("Error updating template pricing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
