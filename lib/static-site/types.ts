import type { WeddingData } from "@/types/template";

/**
 * Dữ liệu build-time truyền cho `astro-templates` qua file JSON tạm (xem
 * generate.ts) — mọi thứ phải serialize được.
 *
 * KHÔNG có `guestName`/`guestSalutation` ở đây: đó là cá nhân hoá theo TỪNG
 * khách qua URL (?name=.../?salutation=...), nhưng HTML tĩnh được build 1
 * lần dùng chung cho mọi khách — nơi cần hiển thị tên khách phải tự đọc
 * `window.location.search` lúc chạy (xem WeddingCardOpeningIsland,
 * GuestViewTrackerIsland, guest-personalize.js).
 */
export type StaticSiteInput = {
  wedding: WeddingData;
  templateSlug: string;
  mode: "groom" | "bride";
  googleFontsUrl: string | null;
  headingFont: string;
  bodyFont: string;
  scriptFont: string;
};
