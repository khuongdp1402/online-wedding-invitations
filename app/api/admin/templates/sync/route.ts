import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { TEMPLATE_DEFS } = require("@/prisma/template-defs.cjs");

/**
 * Đồng bộ tất cả templates từ Registry/TEMPLATE_DEFS vào cơ sở dữ liệu.
 * Admin-only: Hỗ trợ tạo mới nếu chưa có, hoặc đồng bộ cấu hình mặc định an toàn.
 */
export async function POST() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const templateDefs = TEMPLATE_DEFS as (Prisma.TemplateCreateInput & { slug: string })[];
    const synced = [];

    for (const def of templateDefs) {
      const { slug, ...data } = def;

      // Upsert: nếu chưa có thì tạo mới với giá ban đầu, nếu có thì giữ nguyên giá bán/khuyến mãi hiện tại của admin trừ khi thiếu config
      const existing = await prisma.template.findUnique({
        where: { slug },
      });

      if (!existing) {
        const created = await prisma.template.create({
          data: {
            slug,
            ...data,
          },
        });
        synced.push({ slug, status: "created", id: created.id });
      } else {
        const updated = await prisma.template.update({
          where: { slug },
          data: {
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail,
            category: data.category,
            // Giữ nguyên config hiện tại nếu có, hoặc dùng default
            config: existing.config ?? data.config,
          },
        });
        synced.push({ slug, status: "updated", id: updated.id });
      }
    }

    return NextResponse.json({
      success: true,
      count: synced.length,
      synced,
    });
  } catch (error) {
    console.error("Error syncing templates:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
