import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { isWeddingExpired } from "@/lib/payment";
import { wishInputSchema } from "@/lib/public-input-schemas";
import { checkRateLimits } from "@/lib/public-rate-limit";
import { getClientIp } from "@/lib/security-utils";

const TEN_MINUTES = 10 * 60 * 1000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const weddingId = searchParams.get("weddingId");

    if (!weddingId) {
      return NextResponse.json({ wishes: [] });
    }

    const wishes = await prisma.wish.findMany({
      where: {
        weddingId,
        isApproved: true,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        message: true,
        attendance: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ wishes });
  } catch (error) {
    console.error("Error fetching wishes:", error);
    return NextResponse.json({ wishes: [] });
  }
}

/**
 * Gửi lời chúc (công khai, không cần đăng nhập).
 *
 * - Validate + cắt độ dài (tên ≤ 100, lời chúc ≤ 1000), loại ký tự điều khiển.
 * - Rate limit theo IP, theo IP + thiệp, và theo thiệp (in-memory).
 * - Chỉ nhận cho thiệp PUBLISHED còn hạn. Thiệp DRAFT: chỉ chủ thiệp/ADMIN
 *   (đang xem bản nháp ở /w/[slug]) mới gửi được — khớp quy tắc hiển thị của
 *   trang public, nơi khách lạ không xem được bản nháp.
 * - Vẫn tự duyệt (isApproved = true) theo quyết định sản phẩm.
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    const ipLimited = checkRateLimits([
      { key: `wish:ip:${ip}`, max: 30, windowMs: TEN_MINUTES },
    ]);
    if (ipLimited) return ipLimited;

    const body = await request.json().catch(() => null);
    const parsed = wishInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }
    const { weddingId, name, message, attendance } = parsed.data;

    const limited = checkRateLimits([
      { key: `wish:ipw:${ip}:${weddingId}`, max: 5, windowMs: TEN_MINUTES },
      { key: `wish:w:${weddingId}`, max: 200, windowMs: TEN_MINUTES },
    ]);
    if (limited) return limited;

    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      select: { id: true, status: true, expiresAt: true, userId: true },
    });

    if (!wedding) {
      return NextResponse.json(
        { error: "Wedding not found" },
        { status: 404 }
      );
    }

    if (wedding.status === "EXPIRED" || isWeddingExpired(wedding)) {
      return NextResponse.json(
        { error: "Thiệp cưới đã hết hạn" },
        { status: 410 }
      );
    }

    if (wedding.status !== "PUBLISHED") {
      // Bản nháp: cho phép chủ thiệp/ADMIN thử gửi khi xem trước.
      const session = wedding.status === "DRAFT" ? await auth() : null;
      const isOwnerOrAdmin =
        !!session?.user &&
        (session.user.id === wedding.userId || session.user.role === "ADMIN");
      if (!isOwnerOrAdmin) {
        return NextResponse.json(
          { error: "Thiệp cưới chưa được phát hành" },
          { status: 403 }
        );
      }
    }

    const wish = await prisma.wish.create({
      data: {
        weddingId,
        name,
        message,
        attendance,
        isApproved: true,
      },
    });

    return NextResponse.json({ wish }, { status: 201 });
  } catch (error) {
    console.error("Error creating wish:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
