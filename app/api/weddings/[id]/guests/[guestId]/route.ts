import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string; guestId: string } }
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

    await prisma.guest.delete({
      where: { id: params.guestId, weddingId: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
