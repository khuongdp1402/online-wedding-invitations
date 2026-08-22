import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Danh sách mẫu thiệp công khai (dùng cho trang Bảng giá/Marketing) —
 * chỉ trả field cần cho hiển thị giá, không lộ `config` nội bộ.
 */
export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      orderBy: [{ price: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        thumbnail: true,
        category: true,
        price: true,
        salePrice: true,
        saleStartsAt: true,
        saleEndsAt: true,
      },
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
