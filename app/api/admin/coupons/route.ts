import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
    include: { template: { select: { name: true } } },
  });

  return NextResponse.json({ coupons });
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      code,
      discountType,
      discountValue,
      templateId,
      maxRedemptions,
      startsAt,
      endsAt,
      isActive,
    } = body;

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json({ error: "Thiếu mã giảm giá" }, { status: 400 });
    }
    if (discountType !== "FIXED" && discountType !== "PERCENT") {
      return NextResponse.json({ error: "Loại giảm giá không hợp lệ" }, { status: 400 });
    }
    if (typeof discountValue !== "number" || discountValue <= 0) {
      return NextResponse.json({ error: "Giá trị giảm giá không hợp lệ" }, { status: 400 });
    }
    if (discountType === "PERCENT" && discountValue > 100) {
      return NextResponse.json(
        { error: "Giảm giá theo % không được vượt quá 100" },
        { status: 400 }
      );
    }

    const normalizedCode = code.trim().toUpperCase();
    const existing = await prisma.coupon.findUnique({ where: { code: normalizedCode } });
    if (existing) {
      return NextResponse.json({ error: "Mã giảm giá đã tồn tại" }, { status: 409 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: normalizedCode,
        discountType,
        discountValue,
        templateId: templateId || null,
        maxRedemptions: typeof maxRedemptions === "number" ? maxRedemptions : null,
        startsAt: startsAt ? new Date(startsAt) : null,
        endsAt: endsAt ? new Date(endsAt) : null,
        isActive: isActive !== false,
      },
    });

    return NextResponse.json({ coupon }, { status: 201 });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
