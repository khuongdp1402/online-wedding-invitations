import { useEffect } from "react";

/**
 * Port từ app/w/[slug]/WeddingPageClient.tsx — track mở link cá nhân hoá
 * (POST /api/guests). `guestName` là cá nhân hoá theo URL (?guest=/?name=)
 * — HTML build sẵn dùng chung cho mọi khách nên đọc thẳng
 * `window.location.search` ở đây thay vì nhận qua prop build-time (khác bản
 * gốc, nơi Next đọc `searchParams` server-side rồi truyền xuống qua props).
 */
export default function GuestViewTrackerIsland({ weddingSlug }: { weddingSlug: string }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get("guest") || params.get("name") || undefined;
    if (guestName && weddingSlug) {
      fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weddingSlug, guestName }),
      }).catch(() => {});
    }
  }, [weddingSlug]);

  return null;
}
