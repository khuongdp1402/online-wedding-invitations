import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên").max(120),
  phone: z.string().trim().min(6, "Số điện thoại không hợp lệ").max(40),
  message: z.string().trim().min(1, "Vui lòng nhập nội dung").max(4000),
  weddingId: z.string().optional(),
  context: z
    .object({
      templateSlug: z.string().optional(),
      enabledSections: z.array(z.string()).optional(),
      plan: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    const parsed = ContactSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const { name, phone, message, weddingId, context } = parsed.data;

    // Chỉ gắn weddingId khi người gửi thực sự sở hữu thiệp đó
    let ownedWeddingId: string | undefined;
    if (weddingId && session?.user?.id) {
      const wedding = await prisma.wedding.findFirst({
        where: { id: weddingId, userId: session.user.id },
        select: { id: true },
      });
      ownedWeddingId = wedding?.id;
    }

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        phone,
        message,
        userId: session?.user?.id,
        weddingId: ownedWeddingId,
        context: context ?? undefined,
      },
    });

    return NextResponse.json({ contactRequest }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
