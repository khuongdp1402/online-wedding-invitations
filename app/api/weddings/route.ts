import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const weddings = await prisma.wedding.findMany({
      where: { userId: session.user.id },
      include: {
        template: { select: { name: true, slug: true, thumbnail: true } },
        _count: { select: { wishes: true, guests: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ weddings });
  } catch (error) {
    console.error("Error fetching weddings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      templateId,
      slug,
      groomName,
      brideName,
      groomParents,
      brideParents,
      groomCeremony,
      brideCeremony,
      quote,
      gallery,
      gifting,
      primaryColor,
      accentColor,
      backgroundMusic,
    } = body;

    if (!templateId || !slug || !groomName || !brideName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.wedding.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Slug đã được sử dụng, vui lòng chọn slug khác" },
        { status: 409 }
      );
    }

    const wedding = await prisma.wedding.create({
      data: {
        userId: session.user.id,
        templateId,
        slug,
        groomName,
        brideName,
        groomParents: groomParents || { father: "", mother: "" },
        brideParents: brideParents || { father: "", mother: "" },
        groomCeremony: groomCeremony || {},
        brideCeremony: brideCeremony || {},
        quote: quote || null,
        gallery: gallery || [],
        gifting: gifting || null,
        primaryColor: primaryColor || "#800020",
        accentColor: accentColor || "#d4a853",
        backgroundMusic: backgroundMusic || null,
        status: "DRAFT",
        plan: "FREE",
      },
      include: { template: true },
    });

    return NextResponse.json({ wedding }, { status: 201 });
  } catch (error) {
    console.error("Error creating wedding:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
