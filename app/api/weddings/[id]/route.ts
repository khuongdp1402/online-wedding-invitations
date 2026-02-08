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

    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
      include: {
        template: true,
        _count: { select: { wishes: true, guests: true } },
      },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ wedding });
  } catch (error) {
    console.error("Error fetching wedding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const existing = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();

    // If changing slug, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.wedding.findUnique({
        where: { slug: body.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "Slug đã được sử dụng" },
          { status: 409 }
        );
      }
    }

    const wedding = await prisma.wedding.update({
      where: { id: params.id },
      data: {
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.groomName !== undefined && { groomName: body.groomName }),
        ...(body.brideName !== undefined && { brideName: body.brideName }),
        ...(body.groomParents !== undefined && {
          groomParents: body.groomParents,
        }),
        ...(body.brideParents !== undefined && {
          brideParents: body.brideParents,
        }),
        ...(body.groomCeremony !== undefined && {
          groomCeremony: body.groomCeremony,
        }),
        ...(body.brideCeremony !== undefined && {
          brideCeremony: body.brideCeremony,
        }),
        ...(body.quote !== undefined && { quote: body.quote }),
        ...(body.gallery !== undefined && { gallery: body.gallery }),
        ...(body.gifting !== undefined && { gifting: body.gifting }),
        ...(body.primaryColor !== undefined && {
          primaryColor: body.primaryColor,
        }),
        ...(body.accentColor !== undefined && {
          accentColor: body.accentColor,
        }),
        ...(body.backgroundMusic !== undefined && {
          backgroundMusic: body.backgroundMusic,
        }),
        ...(body.templateId !== undefined && { templateId: body.templateId }),
        ...(body.status !== undefined && { status: body.status }),
      },
      include: { template: true },
    });

    return NextResponse.json({ wedding });
  } catch (error) {
    console.error("Error updating wedding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.wedding.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting wedding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
