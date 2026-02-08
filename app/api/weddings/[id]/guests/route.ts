import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const guests = await prisma.guest.findMany({
      where: { weddingId: params.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ guests });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
      select: { id: true, slug: true },
    });
    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, salutation, side, group, phone, email, numberOfGuests } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Tên khách mời không được để trống" },
        { status: 400 }
      );
    }

    // Generate unique invite link
    const inviteLink = `/w/${wedding.slug}?guest=${encodeURIComponent(name)}&salutation=${encodeURIComponent(salutation || "")}&mode=${side === "BRIDE" ? "bride" : "groom"}`;

    const guest = await prisma.guest.create({
      data: {
        weddingId: params.id,
        name: name.trim(),
        salutation: salutation || null,
        side: side || "GROOM",
        group: group || null,
        phone: phone || null,
        email: email || null,
        numberOfGuests: numberOfGuests || 1,
        inviteLink,
      },
    });

    return NextResponse.json({ guest }, { status: 201 });
  } catch (error) {
    console.error("Error creating guest:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
