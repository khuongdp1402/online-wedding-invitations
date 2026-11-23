/**
 * Chuyển hướng asset template (ảnh theme, nhạc, font...) sang MinIO/S3 lúc RUNTIME.
 *
 * - Đọc `ASSETS_BASE_URL` (vd. https://wingloveminio.phukhuong.io.vn/wedding-uploads)
 *   mỗi lần gọi → đổi env + restart container là đủ, không cần build lại image.
 * - Không đặt env → trả về null → Next phục vụ file trong public/ như cũ.
 * - Edge-safe (middleware dùng), không import gì của Node.
 */
import assetDirs from "./asset-dirs.json";

/** Prefix URL, dạng "/images/themes/" (có "/" cuối để "/font/" không khớp "/fonts"). */
export const ASSET_PREFIXES: readonly string[] = (assetDirs as string[]).map(
  (d) => `/${d.replace(/^\/+|\/+$/g, "")}/`
);

export function isAssetPath(pathname: string): boolean {
  return ASSET_PREFIXES.some((p) => pathname.startsWith(p));
}

/**
 * URL đích trên MinIO cho một request asset, hoặc null nếu không áp dụng
 * (env chưa đặt / env không phải URL http(s) / path không thuộc asset).
 * `pathname` là pathname đã percent-encode (như `req.nextUrl.pathname`).
 */
export function assetRedirectUrl(
  pathname: string,
  search = "",
  base: string | undefined = process.env.ASSETS_BASE_URL
): string | null {
  const raw = base?.trim();
  if (!raw || !isAssetPath(pathname)) return null;
  if (!/^https?:\/\//i.test(raw)) return null;
  // Chặn path traversal trước khi ghép vào URL ngoài.
  if (pathname.includes("..")) return null;
  return `${raw.replace(/\/+$/, "")}${pathname}${search}`;
}
