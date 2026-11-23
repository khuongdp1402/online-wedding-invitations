import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { isWeddingExpired } from "@/lib/payment";
import { rsvpInputSchema } from "@/lib/public-input-schemas";
import { checkRateLimits } from "@/lib/public-rate-limit";
import { getClientIp } from "@/lib/security-utils";

const TEN_MINUTES = 10 * 60 * 1000;

/**
 * Public RSVP submission endpoint
 * Guests can confirm/decline attendance
 *
 * - Validate bằng zod (tên ≤ 100, numberOfGuests nguyên 1–20).
 * - Rate limit theo IP, IP + thiệp, và theo thiệp (in-memory).
 * - Chỉ nhận cho thiệp PUBLISHED còn hạn; DRAFT chỉ chủ thiệp/ADMIN (xem trước).
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    const ipLimited = checkRateLimits([
      { key: `rsvp:ip:${ip}`, max: 30, windowMs: TEN_MINUTES },
    ]);
    if (ipLimited) return ipLimited;

    const body = await request.json().catch(() => null);
    const parsed = rsvpInputSchema.safeParse(body);
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
    const {
      weddingId,
      guestName,
      attendance: rsvpStatus,
      numberOfGuests,
    } = parsed.data;

    const limited = checkRateLimits([
      { key: `rsvp:ipw:${ip}:${weddingId}`, max: 10, windowMs: TEN_MINUTES },
      { key: `rsvp:w:${weddingId}`, max: 200, windowMs: TEN_MINUTES },
    ]);
    if (limited) return limited;

    // Verify wedding exists and is active
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      select: { id: true, status: true, expiresAt: true, userId: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // `status` trong DB không tự chuyển "EXPIRED" khi `expiresAt` trôi qua
    // (không có cron) — phải tính hiệu lực thực tế on-the-fly.
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

    // Try to find existing guest by name (case-insensitive)
    const existingGuest = await prisma.guest.findFirst({
      where: {
        weddingId,
        name: { equals: guestName, mode: "insensitive" },
      },
    });

    if (existingGuest) {
      // Update existing guest RSVP
      await prisma.guest.update({
        where: { id: existingGuest.id },
        data: {
          rsvpStatus,
          rsvpAt: new Date(),
          numberOfGuests: numberOfGuests ?? existingGuest.numberOfGuests,
        },
      });

      return NextResponse.json({
        success: true,
        message: "RSVP đã được cập nhật",
        status: rsvpStatus,
      });
    }

    // Guest not found in pre-registered list - create a new entry
    await prisma.guest.create({
      data: {
        weddingId,
        name: guestName,
        rsvpStatus,
        rsvpAt: new Date(),
        numberOfGuests: numberOfGuests ?? 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "RSVP đã được ghi nhận",
      status: rsvpStatus,
    });
  } catch (error) {
    console.error("Error processing RSVP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
