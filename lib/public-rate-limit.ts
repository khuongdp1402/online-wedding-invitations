import { NextResponse } from "next/server";
import { allowRateLimit } from "@/lib/auth-rate-limit";

export type RateRule = { key: string; max: number; windowMs: number };

/**
 * Kiểm tra lần lượt nhiều rule rate limit (vd. theo IP, theo IP + thiệp, theo
 * thiệp). Rule đầu tiên vượt hạn → trả response 429 kèm `Retry-After`;
 * tất cả đều qua → null.
 *
 * Lưu ý: dùng bộ đếm in-memory của `allowRateLimit` — chỉ đúng trong một
 * process. Khi scale nhiều instance cần chuyển sang Redis/DB.
 */
export function checkRateLimits(rules: RateRule[]): NextResponse | null {
  for (const rule of rules) {
    const r = allowRateLimit(rule.key, rule.max, rule.windowMs);
    if (!r.ok) {
      return NextResponse.json(
        { error: "Bạn thao tác quá nhanh, vui lòng thử lại sau." },
        {
          status: 429,
          headers: { "Retry-After": String(r.retryAfterSec) },
        }
      );
    }
  }
  return null;
}
