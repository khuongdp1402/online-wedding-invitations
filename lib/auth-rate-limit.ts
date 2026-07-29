type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

function pruneIfNeeded(): void {
  if (buckets.size <= MAX_KEYS) return;
  const now = Date.now();
  const keys = Array.from(buckets.keys());
  for (const k of keys) {
    const b = buckets.get(k);
    if (b && now > b.resetAt) buckets.delete(k);
    if (buckets.size <= MAX_KEYS * 0.7) break;
  }
}

/**
 * Giới hạn số request theo key (ví dụ IP + nhãn route). Trả về false khi vượt hạn.
 */
export function allowRateLimit(
  key: string,
  max: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfterSec: number } {
  pruneIfNeeded();
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now > b.resetAt) {
    b = { count: 1, resetAt: now + windowMs };
    buckets.set(key, b);
    return { ok: true };
  }
  if (b.count >= max) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((b.resetAt - now) / 1000)),
    };
  }
  b.count += 1;
  return { ok: true };
}
