import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { Reveal } from "@/components/marketing/winglove/Reveal";
import { cn } from "@/lib/utils";

const stats = [
  { num: "3.400+", label: "Thiệp đã tạo" },
  { num: "98%", label: "Khách xác nhận qua RSVP" },
  { num: "<5 phút", label: "Để có thiệp riêng" },
  { num: "10", label: "Phong cách thiệp" },
];

/** Dải nền tối điểm nhấn giữa trang — port từ `.band-dark`/`.stats-band`. */
export function StatsBand() {
  return (
    <section className="bg-gradient-to-b from-winglove-band to-winglove-band-deep py-[76px] text-winglove-band-ink">
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal className="mx-auto mb-12 max-w-[560px] text-center">
          <Eyebrow center className="justify-center text-winglove-gold">
            Vài con số
          </Eyebrow>
          <h2 className="font-wg-display text-[clamp(1.6rem,2.8vw,2.1rem)] font-semibold text-winglove-band-ink">
            Được các cặp đôi thật tin dùng
          </h2>
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-x-0 gap-y-9 md:grid-cols-4 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "border-white/[0.14] px-4 text-center",
                index % 2 === 1 ? "border-r-0" : "border-r",
                "md:border-r",
                index === stats.length - 1 && "md:border-r-0"
              )}
            >
              <div className="font-wg-display text-[2.7rem] font-semibold tabular-nums text-winglove-gold">
                {stat.num}
              </div>
              <div className="mt-1.5 text-[0.8rem] font-semibold text-winglove-band-ink-soft">
                {stat.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
