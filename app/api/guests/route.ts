import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Track when a guest opens their invite link
 * Called from the public wedding page
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { weddingSlug, guestName } = body;

    if (!weddingSlug || !guestName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
