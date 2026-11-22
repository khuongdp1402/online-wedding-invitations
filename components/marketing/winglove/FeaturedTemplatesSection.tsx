"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { Reveal } from "@/components/marketing/winglove/Reveal";
import { BgIcon } from "@/components/marketing/winglove/BgIcon";
import { LaptopMockup } from "@/components/marketing/winglove/DeviceMockups";
import { Camera, QrCode } from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalContext";

type FeaturedTemplate = {
  key: string;
  slug: string;
  label: string;
  coupleName: string;
  date: string;
  desktopImage: string;
};

const FEATURED_TEMPLATES: FeaturedTemplate[] = [
  {
    key: "classic",
    slug: "classic-elegance",
    label: "Classic Elegance",
    coupleName: "Thanh Tùng & Hương Giang",
    date: "13.02.2026",
    desktopImage: "/videos/live-templates/classic-elegance-desktop-scroll.jpg",
  },
  {
    key: "cinematic",
    slug: "modern-cinematic",
    label: "Modern Cinematic",
    coupleName: "Phú Khương & Cẩm Hiền",
    date: "19.07.2026",
    desktopImage: "/videos/live-templates/modern-cinematic-desktop-scroll.jpg",
  },
];

/**
 * Section "2 mẫu thiệp nổi bật" — chỉ show màn hình desktop (bản mobile đã
 * có ở banner rồi). Rê chuột vào 1 khung là tạm dừng tự cuộn, cuộn tay
 * bằng wheel ngay trong khung đó (không cuộn cả trang); rời chuột ra tự
 * cuộn tiếp. Gói gọn trong 1 màn hình.
 */
export function FeaturedTemplatesSection() {
  const { data: session } = useSession();
  const { openAuth } = useAuthModal();

  return (
    <section
      id="featured-templates"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-b from-winglove-band to-winglove-band-deep py-10 text-winglove-band-ink"
    >
      <BgIcon
        icon={Camera}
        size={200}
        className="-right-10 top-6 hidden text-winglove-gold/[0.07] lg:block"
      />
      <BgIcon
        icon={QrCode}
        size={180}
        className="-left-10 bottom-10 hidden text-winglove-gold/[0.06] lg:block"
      />
      <div className="relative mx-auto w-full max-w-[1180px] px-8">
        <Reveal className="mx-auto mb-9 max-w-[620px] text-center">
          <Eyebrow center className="justify-center text-winglove-gold">
            2 mẫu thiệp nổi bật
          </Eyebrow>
          <h2 className="font-wg-display text-[clamp(1.6rem,2.8vw,2.3rem)] font-semibold text-winglove-band-ink">
            Không phải ảnh dựng — đây là thiệp thật, đang chạy thật
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-[0.98rem] leading-[1.6] text-winglove-band-ink-soft">
            Rê chuột vào để tự cuộn xem. Thả chuột ra, thiệp tự chạy tiếp.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {FEATURED_TEMPLATES.map((t, index) => {
            const createHref = `/dashboard/weddings/new?template=${t.slug}`;

            return (
              <Reveal key={t.key} delayMs={index * 100}>
                <LaptopMockup
                  image={t.desktopImage}
                  title={`Xem trên máy tính — thiệp của ${t.coupleName}`}
                />
                <div className="mt-5 text-center">
                  <p className="font-wg-display text-[1.05rem] italic text-winglove-band-ink">
                    {t.coupleName}
                  </p>
                  <p className="mt-0.5 text-[0.72rem] font-semibold uppercase tracking-[.08em] text-winglove-band-ink-soft">
                    {t.label} · {t.date}
                  </p>
                  {session ? (
                    <Link
                      href={createHref}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-winglove-gold px-4 py-2 text-[0.8rem] font-bold text-winglove-band-deep transition-colors hover:bg-winglove-gold-soft"
                    >
                      Tạo thiệp ngay với mẫu này →
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuth({ mode: "register", callbackUrl: createHref })}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-winglove-gold px-4 py-2 text-[0.8rem] font-bold text-winglove-band-deep transition-colors hover:bg-winglove-gold-soft"
                    >
                      Tạo thiệp ngay với mẫu này →
                    </button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
