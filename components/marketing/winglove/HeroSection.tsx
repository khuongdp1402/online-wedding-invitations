"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { HeroStage } from "@/components/marketing/winglove/HeroStage";

export function HeroSection() {
  const { data: session } = useSession();
  const ctaBaseHref = session ? "/dashboard/weddings/new" : "/login";

  return (
    <header className="overflow-hidden pt-16 pb-10 md:pt-24">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-8 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>10 phong cách · Ra mắt trong 5 phút</Eyebrow>
          <h1 className="font-wg-display text-[clamp(2.5rem,4.6vw,3.6rem)] font-semibold leading-[1.1] text-winglove-ink">
            Thiệp cưới đẹp như một{" "}
            <em className="font-wg-display italic text-winglove-red">
              câu chuyện tình yêu
            </em>
            .
          </h1>
          <p className="my-[22px] max-w-[52ch] text-[1.08rem] leading-[1.7] text-winglove-ink-soft">
            Chọn 1 trong 10 mẫu thiệp, điền tên hai bạn, ngày cưới và vài tấm
            ảnh — có ngay đường link thiệp riêng để gửi cho họ hàng, bạn bè.
            Không cần biết thiết kế, không cần chờ thợ.
          </p>

          <div className="mb-[34px] flex flex-wrap gap-4">
            <Link
              href={ctaBaseHref}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-br from-winglove-red to-winglove-red-deep px-[26px] py-[13px] text-[0.94rem] font-bold text-white shadow-[0_12px_28px_-16px_rgba(43,30,21,0.22)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(43,30,21,0.30)]"
            >
              Tạo thiệp miễn phí →
            </Link>
            <Link
              href="#templates"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-winglove-line px-[26px] py-[13px] text-[0.94rem] font-bold text-winglove-ink transition-all hover:-translate-y-0.5 hover:border-winglove-red hover:text-winglove-red-deep"
            >
              Xem 10 mẫu thiệp
            </Link>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex">
              {[
                { label: "T", bg: "bg-winglove-red" },
                { label: "H", bg: "bg-winglove-gold" },
                { label: "M", bg: "bg-winglove-pine" },
                { label: "+", bg: "bg-winglove-red-deep" },
              ].map((avatar, index) => (
                <span
                  key={avatar.label}
                  className={`flex h-[34px] w-[34px] items-center justify-center rounded-full border-[2.5px] border-winglove-ivory font-wg-body text-[0.72rem] font-extrabold text-white ${avatar.bg} ${
                    index > 0 ? "-ml-2.5" : ""
                  }`}
                >
                  {avatar.label}
                </span>
              ))}
            </div>
            <small className="text-[0.86rem] font-semibold text-winglove-ink-soft">
              1.240+ cặp đôi đã gửi thiệp qua Winglove
            </small>
          </div>
        </div>

        <HeroStage />
      </div>
    </header>
  );
}
