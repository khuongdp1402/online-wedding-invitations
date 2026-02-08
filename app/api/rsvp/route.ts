import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Public RSVP submission endpoint
 * Guests can confirm/decline attendance
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { weddingId, guestName, attendance, numberOfGuests } = body;

    if (!weddingId || !guestName || !attendance) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify wedding exists and is active
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
      select: { id: true, status: true },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (wedding.status === "EXPIRED") {
      return NextResponse.json(
        { error: "Thiệp cưới đã hết hạn" },
        { status: 410 }
      );
    }

    const rsvpStatus =
      attendance === "accept" || attendance === "Tham dự"
        ? "ACCEPTED"
        : "DECLINED";

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
          numberOfGuests: numberOfGuests || existingGuest.numberOfGuests,
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
        numberOfGuests: numberOfGuests || 1,
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
