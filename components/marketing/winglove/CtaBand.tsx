"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Reveal } from "@/components/marketing/winglove/Reveal";

/** Dải CTA tối cuối trang — port từ `.cta-band`/`.cta-inner`. */
export function CtaBand() {
  const { data: session } = useSession();
  const ctaBaseHref = session ? "/dashboard/weddings/new" : "/login";

  return (
    <section className="py-[90px] pb-[100px]">
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.14] bg-gradient-to-br from-winglove-band-deep to-winglove-band to-70% px-6 py-16 text-center text-winglove-band-ink sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(201,154,68,.16), transparent 55%)",
              }}
            />
            <div className="relative">
              <h2 className="font-wg-display text-[clamp(2rem,3.6vw,2.7rem)] font-semibold text-winglove-band-ink">
                Sẵn sàng kể câu chuyện{" "}
                <em className="font-wg-display italic text-winglove-gold">
                  của hai bạn
                </em>
                ?
              </h2>
              <p className="mx-auto my-4 max-w-[50ch] text-winglove-band-ink-soft">
                Bắt đầu miễn phí ngay hôm nay — chưa cần thanh toán gì cho tới
                khi bạn thật sự muốn gửi thiệp.
              </p>
              <form
                className="mx-auto flex max-w-[440px] flex-wrap justify-center gap-2.5"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Tên hai bạn, vd. Thanh Tùng & Hương Giang"
                  className="min-w-[220px] flex-1 rounded-full border border-white/[0.14] bg-white/[0.06] px-5 py-3.5 font-wg-body text-[0.92rem] text-winglove-band-ink placeholder:text-winglove-band-ink-soft focus:outline-none"
                />
                <Link
                  href={ctaBaseHref}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-winglove-gold px-6 py-3.5 text-[0.94rem] font-bold text-winglove-band-deep transition-colors hover:bg-winglove-gold-soft"
                >
                  Bắt đầu →
                </Link>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
