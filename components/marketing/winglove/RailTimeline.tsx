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
    <div className="relative grid grid-cols-1 md:grid-cols-[56px_1fr] md:gap-x-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[27px] top-16 bottom-16 hidden w-px md:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #F1E0B8 0 8px, transparent 8px 16px)",
        }}
      />
      {items.map((item, index) => (
        <div key={index} className="contents">
          <div
            aria-hidden="true"
            className="relative z-[2] hidden items-start justify-center pt-16 md:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-winglove-gold-soft bg-white text-winglove-gold shadow-[0_12px_28px_-16px_rgba(43,30,21,0.22)]">
              {item.icon}
            </span>
          </div>
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  );
}
