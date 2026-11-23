import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guestTrackInputSchema } from "@/lib/public-input-schemas";
import { checkRateLimits } from "@/lib/public-rate-limit";
import { getClientIp } from "@/lib/security-utils";

const TEN_MINUTES = 10 * 60 * 1000;

/**
 * Track when a guest opens their invite link
 * Called from the public wedding page
 *
 * Endpoint công khai: validate bằng zod + rate limit theo IP / IP + thiệp.
 * Chỉ cập nhật cờ `linkOpened` của khách đã có sẵn — không tạo bản ghi mới,
 * nên không cần chặn theo trạng thái thiệp.
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    const ipLimited = checkRateLimits([
      { key: `guest:ip:${ip}`, max: 60, windowMs: TEN_MINUTES },
    ]);
    if (ipLimited) return ipLimited;

    const body = await request.json().catch(() => null);
    const parsed = guestTrackInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }
    const { weddingSlug, guestName } = parsed.data;

    const limited = checkRateLimits([
      {
        key: `guest:ipw:${ip}:${weddingSlug}`,
        max: 20,
        windowMs: TEN_MINUTES,
      },
    ]);
    if (limited) return limited;

    // Find wedding
    const wedding = await prisma.wedding.findUnique({
      where: { slug: weddingSlug },
      select: { id: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Find guest by name (case-insensitive)
    const guest = await prisma.guest.findFirst({
      where: {
        weddingId: wedding.id,
        name: { equals: guestName, mode: "insensitive" },
      },
    });

    if (guest && !guest.linkOpened) {
      await prisma.guest.update({
        where: { id: guest.id },
        data: {
          linkOpened: true,
          linkOpenedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking guest link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
