import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TEMPLATE_DEFS } from "@/prisma/template-defs.cjs";
import { THIEPONLINE_BY_SLUG } from "@/lib/thieponline-catalog";

const SLUG_ORDER = new Map<string, number>(
  (TEMPLATE_DEFS as Array<{ slug: string }>).map((t, idx) => [t.slug, idx])
);

const BUILT_IN_META: Record<
  string,
  {
    tags: string[];
    colors: string[];
    badges: string[];
    occasion: "wedding";
    trendingScore: number;
    isHot: boolean;
    isNew: boolean;
    isFeatured: boolean;
    releasedAt: string;
  }
> = {
  "classic-elegance": {
    tags: ["Truyền thống", "Chữ Hỷ", "Sang trọng", "Cổ điển"],
    colors: ["Đỏ", "Vàng"],
    badges: ["Hot", "Mẫu Gốc"],
    occasion: "wedding",
    trendingScore: 20,
    isHot: true,
    isNew: false,
    isFeatured: true,
    releasedAt: "2026-04-20",
  },
  "modern-cinematic": {
    tags: ["Hiện đại", "Có ảnh", "Tối giản", "Lãng mạn"],
    colors: ["Trắng", "Vàng"],
    badges: ["Hot", "Mẫu Gốc"],
    occasion: "wedding",
    trendingScore: 19,
    isHot: true,
    isNew: false,
    isFeatured: true,
    releasedAt: "2026-04-20",
  },
};

/**
 * Danh sách mẫu thiệp công khai (dùng cho trang Bảng giá/Marketing & Kho mẫu) —
 * sắp xếp 2 mẫu gốc trên banner lên đầu, tiếp theo là toàn bộ kho mẫu thiệp từ thieponline.app,
 * kèm đầy đủ metadata chủ đề, dịp sự kiện, Hot/Trending, tag và màu sắc.
 */
export async function GET() {
  try {
    const rows = await prisma.template.findMany({
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

    const templates = rows
      .sort(
        (a, b) =>
          (SLUG_ORDER.get(a.slug) ?? 9999) - (SLUG_ORDER.get(b.slug) ?? 9999)
      )
      .map((row) => {
        const thiep = THIEPONLINE_BY_SLUG[row.slug];
        const builtIn = BUILT_IN_META[row.slug];

        return {
          ...row,
          category: thiep?.category || row.category,
          tags: thiep?.tags || builtIn?.tags || [],
          colors: thiep?.colors || builtIn?.colors || [],
          badges: thiep?.badges || builtIn?.badges || [],
          occasion: thiep?.occasion || builtIn?.occasion || "wedding",
          trendingScore: thiep?.trendingScore ?? builtIn?.trendingScore ?? 0,
          isHot: thiep?.isHot ?? builtIn?.isHot ?? false,
          isNew: thiep?.isNew ?? builtIn?.isNew ?? false,
          isFeatured: Boolean(builtIn?.isFeatured),
          releasedAt: thiep?.releasedAt || builtIn?.releasedAt || "2026-01-01",
        };
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
