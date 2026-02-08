import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { weddingId, name, message, attendance } = body;

    if (!weddingId || !name || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify wedding exists
    const wedding = await prisma.wedding.findUnique({
      where: { id: weddingId },
    });

    if (!wedding) {
      return NextResponse.json(
        { error: "Wedding not found" },
        { status: 404 }
      );
    }

    const wish = await prisma.wish.create({
      data: {
        weddingId,
        name,
        message,
        attendance: attendance || null,
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
