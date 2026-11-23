import { createHash, timingSafeEqual } from "crypto";

/**
 * Escape các ký tự đặc biệt HTML — dùng trước khi chèn chuỗi do người dùng
 * kiểm soát (nội dung chuyển khoản, tên khách...) vào message Telegram
 * `parse_mode: "HTML"` hoặc bất kỳ ngữ cảnh HTML nào.
 */
export function escapeHtml(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * So sánh hai chuỗi bí mật (API key, secret webhook) theo thời gian hằng.
 *
 * Băm SHA-256 cả hai vế trước khi `timingSafeEqual` để hai buffer luôn cùng
 * độ dài — vừa tránh `timingSafeEqual` throw khi lệch độ dài, vừa không lộ
 * độ dài của secret qua thời gian phản hồi. Thiếu một trong hai vế → false.
 */
export function safeCompareSecret(
  provided: string | null | undefined,
  expected: string | null | undefined
): boolean {
  if (typeof provided !== "string" || typeof expected !== "string") {
    return false;
  }
  if (provided.length === 0 || expected.length === 0) return false;
  const a = createHash("sha256").update(provided, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

/**
 * Lấy IP client từ header do reverse proxy gắn: ưu tiên `x-real-ip`, sau đó
 * phần tử đầu tiên của `x-forwarded-for`. Không có header nào → "unknown"
 * (khi đó mọi request chung một bucket rate limit theo IP).
 */
export function getClientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}
