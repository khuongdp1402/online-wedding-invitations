import path from "path";

/**
 * Thư mục lưu HTML tĩnh do Astro build ra, theo slug/mode.
 * TODO Giai đoạn 1 production: xác nhận volume persistent trong Docker —
 * nếu container restart mất thư mục này, lần đọc đầu sau restart phải
 * generate đồng bộ (xem generate.ts) nên sẽ chậm hơn bình thường.
 */
export function getStaticSiteDir(): string {
  return process.env.STATIC_SITE_DIR || path.join(process.cwd(), ".static-site");
}

export type WeddingMode = "groom" | "bride";

export function getStaticSiteHtmlPath(slug: string, mode: WeddingMode): string {
  return path.join(getStaticSiteDir(), slug, `${mode}.html`);
}

export function getStaticSiteSlugDir(slug: string): string {
  return path.join(getStaticSiteDir(), slug);
}
