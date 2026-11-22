"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeroTemplateKey = "classic" | "cinematic";

type HeroTemplateData = {
  key: HeroTemplateKey;
  slug: string;
  label: string;
  /** Vị trí xếp chồng cố định (0 = trái, 1 = phải) — không đổi
   * theo mẫu nào đang active, chỉ mẫu active mới nổi lên giữa/trên cùng. */
  slot: 0 | 1;
  line: string;
  barBg: string;
  urlBg: string;
  urlColor: string;
  urlBorder: string;
  viewportBg: string;
  heroBlockBg: string;
  tag: string;
  coupleName: string;
  tagColor: string;
  ringColor: string;
  h3Color: string;
  countdown: { d: string; h: string; m: string } | null;
  countdownNBg: string;
  countdownColor: string;
  galleryTag: string;
  galleryGradients: [string, string, string];
  quote: string;
  quoteColor: string;
  rsvpYesBg: string;
  rsvpNoBg: string;
  rsvpNoColor: string;
  rsvpNoBorder: string;
};

const HERO_TEMPLATES: HeroTemplateData[] = [
  {
    key: "classic",
    slug: "classic-elegance",
    label: "Classic Elegance",
    slot: 0,
    line: "#EEDDBF",
    barBg: "#FBF3E6",
    urlBg: "#FFFFFF",
    urlColor: "#B7A488",
    urlBorder: "#E9D9BA",
    viewportBg: "#FFFFFF",
    heroBlockBg: "linear-gradient(165deg,#F7E4E9,#FFFFFF 80%)",
    tag: "Trân trọng kính mời",
    coupleName: "Thanh Tùng & Hương Giang",
    tagColor: "#D4A853",
    ringColor: "#D4A853",
    h3Color: "#4A1620",
    countdown: { d: "12", h: "08", m: "45" },
    countdownNBg: "#F6EAD6",
    countdownColor: "#800020",
    galleryTag: "Bộ ảnh kỷ niệm",
    galleryGradients: [
      "linear-gradient(140deg,#800020,#a3324c)",
      "linear-gradient(140deg,#D4A853,#b8862e)",
      "linear-gradient(140deg,#4A1620,#800020)",
    ],
    quote: '"Trăm năm tình viên mãn."',
    quoteColor: "#7C6A57",
    rsvpYesBg: "#800020",
    rsvpNoBg: "#F6EAD6",
    rsvpNoColor: "#7C6A57",
    rsvpNoBorder: "#E9D9BA",
  },
  {
    key: "cinematic",
    slug: "modern-cinematic",
    label: "Modern Cinematic",
    slot: 1,
    line: "#33332B",
    barBg: "#111111",
    urlBg: "#1A1A1A",
    urlColor: "#A99A6B",
    urlBorder: "#333333",
    viewportBg: "#0A0A0A",
    heroBlockBg: "linear-gradient(165deg,#161616,#0a0a0a 80%)",
    tag: "The Beginning",
    coupleName: "Phú Khương & Cẩm Hiền",
    tagColor: "#C9B98A",
    ringColor: "#D4AF37",
    h3Color: "#F3E9C9",
    countdown: null,
    countdownNBg: "#1C1C1C",
    countdownColor: "#D4AF37",
    galleryTag: "Our Journey",
    galleryGradients: [
      "linear-gradient(140deg,#D4AF37,#8a7423)",
      "linear-gradient(140deg,#3a3a3a,#111)",
      "linear-gradient(140deg,#8a7423,#D4AF37)",
    ],
    quote: '"Every love story begins with a moment."',
    quoteColor: "#C9B98A",
    rsvpYesBg: "#D4AF37",
    rsvpNoBg: "#1C1C1C",
    rsvpNoColor: "#A99A6B",
    rsvpNoBorder: "#333333",
  },
];

const RESUME_DELAY_MS = 2200;
const SCROLL_STEP = 0.5;

function getSlotTransformClass(slot: 0 | 1, isActive: boolean) {
  if (isActive) {
    return "translate-x-0 -translate-y-[14px] rotate-0 scale-[1.05]";
  }
  if (slot === 0) {
    return "-translate-x-[72px] translate-y-[14px] -rotate-[8deg] scale-[.95]";
  }
  return "translate-x-[72px] translate-y-[14px] rotate-[8deg] scale-[.95]";
}

/** Nội dung bên trong 1 "điện thoại" xem trước — render 2 lần (bản gốc +
 * bản sao `hidden`) để tạo vòng lặp cuộn liền mạch. */
function DeviceBlocks({ t, hidden }: { t: HeroTemplateData; hidden?: boolean }) {
  return (
    <>
      <div
        aria-hidden={hidden || undefined}
        className="flex flex-col items-center gap-[9px] border-b border-dashed px-[18px] pb-[26px] pt-[30px] text-center"
        style={{ borderColor: t.line, background: t.heroBlockBg }}
      >
        <span
          className="text-[0.6rem] font-extrabold uppercase tracking-[.15em]"
          style={{ color: t.tagColor }}
        >
          {t.tag}
        </span>
        <h3
          className="font-wg-display text-[1.28rem] font-medium italic"
          style={{ color: t.h3Color }}
        >
          {t.coupleName}
        </h3>
        <span
          className="mt-0.5 h-6 w-6 rounded-full border-[2.5px]"
          style={{ borderColor: t.ringColor }}
        />
      </div>

      {t.countdown && (
        <div
          aria-hidden={hidden || undefined}
          className="flex flex-col gap-[9px] border-b border-dashed px-[18px] py-[22px]"
          style={{ borderColor: t.line }}
        >
          <span
            className="self-center text-[0.6rem] font-extrabold uppercase tracking-[.15em]"
            style={{ color: t.tagColor }}
          >
            Đếm ngược ngày cưới
          </span>
          <div className="flex justify-center gap-2">
            {[
              { n: t.countdown.d, u: "Ngày" },
              { n: t.countdown.h, u: "Giờ" },
              { n: t.countdown.m, u: "Phút" },
            ].map((item) => (
              <div key={item.u}>
                <span
                  className="block min-w-[38px] rounded-[9px] px-2.5 py-[5px] text-center font-wg-display text-[1.3rem] font-semibold tabular-nums"
                  style={{ background: t.countdownNBg, color: t.countdownColor }}
                >
                  {item.n}
                </span>
                <span className="mt-[3px] block text-center text-[0.56rem] uppercase tracking-[.07em] text-winglove-ink-faint">
                  {item.u}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        aria-hidden={hidden || undefined}
        className="flex flex-col gap-[9px] border-b border-dashed px-[18px] py-[22px]"
        style={{ borderColor: t.line }}
      >
        <span
          className="self-center text-[0.6rem] font-extrabold uppercase tracking-[.15em]"
          style={{ color: t.tagColor }}
        >
          {t.galleryTag}
        </span>
        <div className="grid grid-cols-3 gap-[5px]">
          {t.galleryGradients.map((gradient, i) => (
            <span
              key={i}
              className="block aspect-square rounded-[7px]"
              style={{ background: gradient }}
            />
          ))}
        </div>
      </div>

      <div
        aria-hidden={hidden || undefined}
        className="flex flex-col gap-[9px] border-b border-dashed px-[18px] py-[22px]"
        style={{ borderColor: t.line }}
      >
        <p
          className="px-1 text-center font-wg-display text-[0.94rem] italic"
          style={{ color: t.quoteColor }}
        >
          {t.quote}
        </p>
        <div className="flex justify-center gap-[7px]">
          <span
            className="rounded-full px-3.5 py-[7px] text-[0.68rem] font-bold text-white"
            style={{ background: t.rsvpYesBg }}
          >
            Tôi sẽ đến
          </span>
          <span
            className="rounded-full border px-3.5 py-[7px] text-[0.68rem] font-bold"
            style={{
              background: t.rsvpNoBg,
              color: t.rsvpNoColor,
              borderColor: t.rsvpNoBorder,
            }}
          >
            Xin vắng
          </span>
        </div>
      </div>
    </>
  );
}

/**
 * Hero stage: 3 "điện thoại" xem trước mẫu thiệp xếp chồng nhau — bấm vào
 * 1 mẫu (hoặc pill bên dưới), mẫu đó nổi lên trên cùng và tự cuộn xem nội
 * dung, 2 mẫu còn lại đứng yên, mờ đi ở phía sau. Port từ `.tpl-stage` +
 * script cuối trang trong mockup tĩnh.
 */
export function HeroStage() {
  const [activeKey, setActiveKey] = useState<HeroTemplateKey>("classic");
  const activeKeyRef = useRef(activeKey);
  const viewportRefs = useRef<Partial<Record<HeroTemplateKey, HTMLDivElement | null>>>({});
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    activeKeyRef.current = activeKey;
  }, [activeKey]);

  const selectTemplate = useCallback((key: HeroTemplateKey) => {
    setActiveKey(key);
    const vp = viewportRefs.current[key];
    if (vp) vp.scrollTop = 0;
  }, []);

  const pauseThenResume = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // Vòng lặp tự cuộn — chỉ chạy trên viewport của mẫu đang active, tạm
  // dừng sau khi người dùng tự thao tác, tôn trọng prefers-reduced-motion.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const handleChange = () => {
      reducedMotionRef.current = mql.matches;
    };
    mql.addEventListener?.("change", handleChange);

    function tick() {
      if (!pausedRef.current && !reducedMotionRef.current) {
        const vp = viewportRefs.current[activeKeyRef.current];
        if (vp) {
          const half = vp.scrollHeight / 2;
          vp.scrollTop += SCROLL_STEP;
          if (vp.scrollTop >= half) {
            vp.scrollTop -= half;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      mql.removeEventListener?.("change", handleChange);
    };
  }, []);

  return (
    <div>
      <div className="relative mt-2.5 h-[400px] md:mt-0 md:h-[460px]">
        <span
          aria-hidden="true"
          className="wg-petal absolute left-[4%] top-[-20px] z-0 block h-[18px] w-[14px] rounded-[70%_0_70%_0]"
          style={{
            background: "linear-gradient(140deg,#F1E0B8,#C99A44)",
            animationDuration: "9s",
            animationDelay: "0s",
          }}
        />
        <span
          aria-hidden="true"
          className="wg-petal absolute left-[90%] top-[-35px] z-0 block h-[13px] w-[10px] rounded-[70%_0_70%_0]"
          style={{
            background: "linear-gradient(140deg,#F7DEDD,#B3242E)",
            animationDuration: "9.5s",
            animationDelay: "3.3s",
          }}
        />

        {HERO_TEMPLATES.map((t) => {
          const isActive = t.key === activeKey;
          return (
            <div
              key={t.key}
              role="button"
              tabIndex={0}
              aria-label={`Xem mẫu ${t.label}`}
              aria-pressed={isActive}
              onClick={() => selectTemplate(t.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectTemplate(t.key);
                }
              }}
              className={cn(
                "absolute left-1/2 top-1/2 -ml-[105px] -mt-[170px] flex h-[340px] w-[210px] cursor-pointer flex-col rounded-3xl border border-winglove-line bg-white transition-all duration-300 ease-out md:-ml-[125px] md:-mt-[196px] md:h-[392px] md:w-[250px]",
                getSlotTransformClass(t.slot, isActive),
                isActive
                  ? "z-[5] opacity-100 shadow-[0_24px_48px_-24px_rgba(43,30,21,0.30)]"
                  : "z-[1] opacity-[.62] saturate-[.75] brightness-[.98] shadow-[0_12px_28px_-16px_rgba(43,30,21,0.22)] hover:opacity-[.88]"
              )}
            >
              <div
                className="flex shrink-0 items-center gap-[9px] rounded-t-3xl border-b px-3.5 py-3"
                style={{ background: t.barBg, borderColor: t.line }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-winglove-red" />
                <span className="h-1.5 w-1.5 rounded-full bg-winglove-gold" />
                <span className="h-1.5 w-1.5 rounded-full bg-winglove-pine" />
                <span
                  className="ml-[5px] flex-1 truncate rounded-full border px-2.5 py-0.5 text-[0.62rem] font-semibold"
                  style={{ background: t.urlBg, color: t.urlColor, borderColor: t.urlBorder }}
                >
                  {`winglove.vn/w/${t.slug}`}
                </span>
              </div>
              <div
                ref={(el) => {
                  viewportRefs.current[t.key] = el;
                }}
                onPointerDown={pauseThenResume}
                onWheel={pauseThenResume}
                onTouchStart={pauseThenResume}
                className={cn(
                  "wg-device-viewport relative flex-1 rounded-b-3xl",
                  isActive ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
                )}
                style={{
                  background: t.viewportBg,
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 18px), transparent 100%)",
                }}
              >
                <div className="flex flex-col">
                  <DeviceBlocks t={t} />
                  <DeviceBlocks t={t} hidden />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-[6] mt-5 flex flex-wrap justify-center gap-2.5">
        {HERO_TEMPLATES.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => selectTemplate(t.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-[0.78rem] font-bold transition-colors",
              t.key === activeKey
                ? "border-winglove-red bg-winglove-red text-white"
                : "border-winglove-line bg-white text-winglove-ink-soft hover:border-winglove-red"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-2.5 text-center text-[0.78rem] text-winglove-ink-faint">
        2 mẫu thiệp cao cấp được hoàn thiện tỉ mỉ từng chi tiết —{" "}
        <a href="#templates" className="font-bold text-winglove-red-deep no-underline">
          xem chi tiết mẫu ↓
        </a>
      </p>
    </div>
  );
}
