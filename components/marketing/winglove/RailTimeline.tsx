import { Fragment } from "react";

/**
 * Cột "đường ray" chấm vàng nối các section (process → templates → stats →
 * testimonials → faq), có marker tròn (số/emoji) ở mỗi mốc — thuần trang
 * trí (`aria-hidden`), chỉ hiện trên desktop. Port từ `.timeline`/`.rail-node`
 * trong mockup tĩnh.
 */
type RailItem = {
  icon: string;
  content: React.ReactNode;
};

export function RailTimeline({ items }: { items: RailItem[] }) {
  return (
    // `minmax(0,1fr)` (không phải `1fr` suông) — nếu không, 1 grid-item có
    // nội dung rất rộng không co lại được (như track marquee `width:
    // max-content` của Testimonials) sẽ làm cả cột giãn theo, đẩy lệch
    // sang phải MỌI section khác trong cùng lưới.
    <div className="relative grid grid-cols-1 md:grid-cols-[56px_minmax(0,1fr)] md:gap-x-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[27px] top-16 bottom-16 hidden w-px md:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #F1E0B8 0 8px, transparent 8px 16px)",
        }}
      />
      {items.map((item, index) => (
        // Dùng Fragment (không tạo DOM node) thay vì `div.contents` — CSS
        // `display: contents` có bug đã biết ở Chromium khiến
        // IntersectionObserver ngừng báo thay đổi cho phần tử con bên trong,
        // làm các animation "cuộn để hiện" (Reveal) bị kẹt ở trạng thái ẩn.
        <Fragment key={index}>
          <div
            aria-hidden="true"
            className="relative z-[2] hidden items-start justify-center pt-16 md:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-winglove-gold-soft bg-white text-winglove-gold shadow-[0_12px_28px_-16px_rgba(43,30,21,0.22)]">
              {item.icon}
            </span>
          </div>
          <div className="min-w-0">{item.content}</div>
        </Fragment>
      ))}
    </div>
  );
}
