import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAstroEligibleTemplate } from "@/lib/static-site/eligibility";

/**
 * Middleware (Edge runtime, không dùng Prisma trực tiếp được) gọi route này
 * để quyết định rewrite `/w/[slug]` sang `react/` hay để `route.ts` xử lý
 * nhánh Astro tĩnh — xem middleware.ts.
 */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ eligible: false });

  const wedding = await prisma.wedding.findUnique({
    where: { slug },
    select: { status: true, template: { select: { slug: true } } },
  });

  const eligible =
    !!wedding &&
    wedding.status !== "DRAFT" &&
    isAstroEligibleTemplate(wedding.template.slug);

  return NextResponse.json({ eligible });
}
