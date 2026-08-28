/**
 * Danh sách template đã port sang Astro (Giai đoạn 1+ của kế hoạch static-site).
 * "modern-cinematic" cố ý đứng ngoài — kiến trúc scroll-driven GSAP+Lenis
 * không decompose được thành island nhỏ, giữ nguyên đường React/Next hiện tại.
 *
 * TẮT (2026-08-24): quyết định giữ 100% React/Next cho trang thiệp public —
 * chi phí duy trì bản Astro song song (viết mỗi template 2 lần, bug đồng bộ
 * dữ liệu giữa 2 bản, Dockerfile chưa build được production) chưa xứng đáng
 * so với lợi ích. Code Astro/lib/static-site vẫn giữ nguyên trong repo,
 * không xoá — chỉ cần trả `ASTRO_ELIGIBLE_TEMPLATE_SLUGS` (đổi dòng return
 * bên dưới) để bật lại nếu sau này muốn tiếp tục.
 */
const ASTRO_ELIGIBLE_TEMPLATE_SLUGS = new Set<string>([
  "classic-burgundy",
  "autumn-watercolor",
  "classic-elegance"
]);

export function isAstroEligibleTemplate(_templateSlug: string): boolean {
  // Tắt toàn bộ đường Astro — luôn false bất kể whitelist ở trên.
  // Đổi lại thành `ASTRO_ELIGIBLE_TEMPLATE_SLUGS.has(_templateSlug)` để bật lại.
  return false;
}
