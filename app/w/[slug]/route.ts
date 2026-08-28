import { readFile } from "fs/promises";
import { prisma } from "@/lib/prisma";
import { getStaticSiteHtmlPath } from "@/lib/static-site/paths";
import { generateStaticWeddingSite } from "@/lib/static-site/generate";

/**
 * Route công khai `/w/[slug]` — thay cho `page.tsx` cũ (di chuyển sang
 * `react/page.tsx`) vì phục vụ HTML tĩnh do Astro build cần trả về
 * `Response` thô (không qua JSX/dangerouslySetInnerHTML — script hydrate
 * island không tự chạy nếu chèn qua innerHTML, xem plan Giai đoạn 0).
 *
 * `middleware.ts` đã lọc trước qua `/api/static-wedding-eligible`: request
 * chỉ tới được đây khi wedding chắc chắn "Astro-eligible & không DRAFT".
 * `NextResponse.rewrite()` không dùng được trong Route Handler (chỉ dùng
 * được trong middleware) — đó là lý do check eligibility phải nằm ở
 * middleware, không nằm trong chính route này.
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const wedding = await prisma.wedding.findUnique({
    where: { slug: params.slug },
    select: { id: true },
  });
  if (!wedding) {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const modeParam = url.searchParams.get("mode");
  const mode: "groom" | "bride" =
    modeParam === "bride" || modeParam === "nhagai" ? "bride" : "groom";

  const htmlPath = getStaticSiteHtmlPath(params.slug, mode);

  let html: string;
  try {
    html = await readFile(htmlPath, "utf-8");
  } catch {
    // Tự-heal: file chưa tồn tại (lần publish đầu, hoặc mất cache sau
    // container restart — xem TODO trong lib/static-site/paths.ts). Generate
    // đồng bộ 1 lần rồi đọc lại.
    try {
      await generateStaticWeddingSite(wedding.id);
      html = await readFile(htmlPath, "utf-8");
    } catch (err) {
      // middleware.ts đã xác nhận eligible trước khi route tới đây — lỗi ở
      // đây nghĩa là build thật sự thất bại (bug trong template Astro),
      // không phải trường hợp "chưa port sang Astro". Không rewrite được
      // (NextResponse.rewrite không hỗ trợ trong Route Handler) nên trả lỗi
      // rõ ràng thay vì im lặng — error.tsx của Next xử lý hiển thị cho khách.
      console.error("Static site build failed:", err);
      throw err;
    }
  }

  // Tăng lượt xem — fire-and-forget, giữ đúng hành vi của page.tsx cũ.
  prisma.wedding
    .update({ where: { id: wedding.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => {});

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
