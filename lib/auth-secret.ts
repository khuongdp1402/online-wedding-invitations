/**
 * Xác định secret ký JWT cho NextAuth — dùng chung cho lib/auth.ts (Node) và
 * middleware.ts (Edge runtime). KHÔNG import prisma / node:crypto ở đây để
 * file luôn chạy được trên Edge.
 *
 * - Ưu tiên env: NEXTAUTH_SECRET || AUTH_SECRET || JWT_SECRET.
 * - Production thiếu secret: trả về null (lib/auth.ts sẽ throw khi khởi động,
 *   middleware sẽ chặn truy cập /dashboard và /admin).
 * - Dev thiếu secret: sinh secret ngẫu nhiên theo từng process và cảnh báo.
 *   Lưu ý: middleware (Edge) và server (Node) là 2 module instance khác nhau nên
 *   không dùng chung secret ngẫu nhiên này được → middleware dùng envSecret()
 *   và khi dev thiếu secret chỉ kiểm tra cookie phiên (trang/API vẫn tự xác thực).
 *   Nên đặt NEXTAUTH_SECRET ngay cả khi dev.
 */

let devSecret: string | null = null;

/** Secret lấy từ env (không sinh ngẫu nhiên). */
export function envSecret(): string | undefined {
  return (
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.JWT_SECRET ||
    undefined
  );
}

function generateDevSecret(): string {
  const bytes = new Uint8Array(32);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Trả về secret hoặc null nếu đang chạy production mà chưa cấu hình secret.
 */
export function resolveAuthSecret(): string | null {
  const fromEnv = envSecret();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") return null;

  if (!devSecret) {
    devSecret = generateDevSecret();
    console.warn(
      "[Auth] Chưa đặt NEXTAUTH_SECRET / AUTH_SECRET / JWT_SECRET — đang dùng secret ngẫu nhiên tạm thời (chỉ cho dev). Phiên đăng nhập sẽ mất khi restart."
    );
  }
  return devSecret;
}

export const MISSING_SECRET_MESSAGE =
  "[Auth] Thiếu NEXTAUTH_SECRET (hoặc AUTH_SECRET / JWT_SECRET) trong môi trường production. Hãy đặt biến này (ví dụ: openssl rand -base64 32).";
