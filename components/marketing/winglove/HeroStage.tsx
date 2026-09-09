"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TEMPLATES = [
  {
    image: "/videos/live-templates/classic-elegance-mobile-scroll.jpg",
    title: "Thiệp của Thanh Tùng & Hương Giang — Classic Elegance",
  },
  {
    image: "/videos/live-templates/modern-cinematic-mobile-scroll.jpg",
    title: "Thiệp của Phú Khương & Cẩm Hiền — Modern Cinematic",
  },
];

/** Thời gian (giây) 1 thiệp tự cuộn hết từ đầu tới cuối trước khi đổi lượt —
 * khớp tốc độ với `LaptopMockup` (DeviceMockups.tsx) ở section desktop bên dưới. */
const SWEEP_SECONDS = 65;
/** Chờ bao lâu sau khi 1 thiệp cuộn xong rồi mới đổi sang thiệp kia. */
const HANDOFF_DELAY_MS = 2000;

/**
 * Visual chính của hero — 2 mẫu thiệp thật (điện thoại) luân phiên nhau:
 * thiệp đang active nổi lên trước, tự cuộn hết từ đầu tới cuối; 2s sau đổi
 * lượt, thiệp kia nổi lên và tự cuộn, cứ thế lặp lại. Khoá tương tác —
 * khách không cuộn/bấm được 2 màn hình này (bản demo desktop bên dưới mới
 * cho tương tác).
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tiltEnabledRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tiltEnabledRef.current = window.matchMedia("(pointer: fine)").matches && !reducedMotion;
  }, []);

  const handleSweepComplete = useCallback((finishedIndex: number) => {
    window.setTimeout(() => {
      setActiveIndex((current) => (current === finishedIndex ? (finishedIndex + 1) % TEMPLATES.length : current));
    }, HANDOFF_DELAY_MS);
  }, []);

  // Khách bấm vào thẻ đang nằm phía sau — đưa nó lên trước & chạy luôn,
  // thẻ đang active thì lùi ra sau (reset về đầu, theo đúng logic sẵn có).
  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!tiltEnabledRef.current) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const maxDeg = 6;
    stage.style.transform = `perspective(1000px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg)`;
  }

  function handlePointerLeave() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      className="relative mt-2.5 h-[400px] md:mt-0 md:h-[460px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
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

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-winglove-red/15 via-winglove-gold/15 to-transparent blur-3xl md:h-[380px] md:w-[380px]"
      />

      <div
        ref={stageRef}
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform [backface-visibility:hidden]"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {TEMPLATES.map((t, index) => (
          <AlternatingPhone
            key={t.image}
            image={t.image}
            title={t.title}
            isActive={activeIndex === index}
            onSweepComplete={() => handleSweepComplete(index)}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </div>

      <span className="absolute right-[8%] top-0 z-[6] hidden items-center gap-1.5 rounded-full border border-winglove-line bg-white px-3 py-1.5 text-[0.68rem] font-bold text-winglove-ink-soft shadow-[0_12px_28px_-16px_rgba(43,30,21,0.22)] sm:inline-flex">
        <span aria-hidden="true" className="text-winglove-gold">
          ✦
        </span>
        10 phong cách khác biệt
      </span>
      <span className="absolute bottom-2 left-0 z-[6] hidden items-center gap-1.5 rounded-full border border-winglove-line bg-white px-3 py-1.5 text-[0.68rem] font-bold text-winglove-ink-soft shadow-[0_12px_28px_-16px_rgba(43,30,21,0.22)] sm:inline-flex">
        <span aria-hidden="true" className="text-winglove-red">
          ❤
        </span>
        1.240+ cặp đôi đã dùng
      </span>
    </div>
  );
}

/**
 * 1 thẻ điện thoại trong cặp luân phiên — khi `isActive`, nổi lên vị trí
 * trước và tự cuộn từ đầu tới cuối ảnh trong `SWEEP_SECONDS` giây rồi báo
 * `onSweepComplete`; khi không active, lùi ra sau (mờ, nghiêng) và đứng
 * yên ở đầu ảnh. Khoá cuộn/wheel hoàn toàn — chỉ nhận 1 thao tác duy nhất:
 * bấm vào thẻ đang nằm sau để chủ động đưa nó lên trước.
 */
function AlternatingPhone({
  image,
  title,
  isActive,
  onSweepComplete,
  onSelect,
}: {
  image: string;
  title: string;
  isActive: boolean;
  onSweepComplete: () => void;
  onSelect: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const maxOffsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const notifiedRef = useRef(false);

  const applyOffset = useCallback((y: number) => {
    const img = imgRef.current;
    if (img) img.style.transform = `translateY(-${y}px)`;
  }, []);

  const recomputeMax = useCallback(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img || !img.naturalWidth) return;
    const displayedHeight = wrapper.clientWidth * (img.naturalHeight / img.naturalWidth);
    maxOffsetRef.current = Math.max(0, displayedHeight - wrapper.clientHeight);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(() => recomputeMax());
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [recomputeMax]);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;
    notifiedRef.current = false;

    if (!isActive) {
      applyOffset(0); // lùi ra sau thì luôn đứng yên ở đầu ảnh
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function tick(now: number) {
      const max = maxOffsetRef.current;
      if (startTimeRef.current === null) startTimeRef.current = now;
      if (max <= 0) {
        // Ảnh chưa load xong nên chưa biết chiều cao thật — cứ chờ khung
        // hình sau, KHÔNG được coi là "đã cuộn xong" (nếu không sẽ đổi
        // lượt giả ngay khi vừa mount, trước khi ảnh kịp hiện).
        startTimeRef.current = now; // giữ mốc bắt đầu luôn cập nhật tới khi ảnh sẵn sàng
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (reducedMotion) {
        applyOffset(max);
        if (!notifiedRef.current) {
          notifiedRef.current = true;
          onSweepComplete();
        }
        return;
      }
      const elapsed = (now - startTimeRef.current) / 1000;
      const progress = Math.min(1, elapsed / SWEEP_SECONDS);
      applyOffset(progress * max);
      if (progress >= 1) {
        if (!notifiedRef.current) {
          notifiedRef.current = true;
          onSweepComplete();
        }
        return; // dừng hẳn ở cuối ảnh, chờ đổi lượt
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, applyOffset]);

  return (
    <div
      role="button"
      tabIndex={isActive ? -1 : 0}
      aria-label={isActive ? undefined : `Xem ${title}`}
      onClick={isActive ? undefined : onSelect}
      onKeyDown={(e) => {
        if (!isActive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect();
        }
      }}
      className={
        "absolute left-1/2 top-1/2 -ml-[105px] -mt-[170px] w-[210px] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:-ml-[125px] md:-mt-[196px] md:w-[250px] " +
        (isActive
          // pointer-events-none: thẻ trước không cần bấm, và để click xuyên
          // qua tới thẻ sau ở vùng 2 thẻ chồng lấn hình học (dù z-index thấp
          // hơn, thẻ sau vẫn nằm "dưới" thẻ trước tại đúng chỗ đó).
          ? "z-[2] translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 pointer-events-none"
          : "z-[1] translate-x-[70px] translate-y-[30px] rotate-[7deg] scale-[0.94] cursor-pointer opacity-70 hover:opacity-90")
      }
    >
      {isActive && (
        <span className="absolute -top-3 right-4 z-20 inline-flex items-center gap-1 rounded-full border border-winglove-line bg-white px-2 py-0.5 text-[0.58rem] font-extrabold uppercase tracking-[.06em] text-winglove-ink-soft shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-winglove-pine opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-winglove-pine" />
          </span>
          Đang chạy thực tế
        </span>
      )}
      <div className="relative flex aspect-[9/19.5] w-full flex-col rounded-[2.2rem] border-[6px] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_24px_48px_-24px_rgba(43,30,21,0.30)] [backface-visibility:hidden] will-change-transform">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-20 h-[16px] w-[86px] -translate-x-1/2 rounded-b-xl bg-[#1a1a1a]"
        />
        <div
          ref={wrapperRef}
          className="relative flex-1 overflow-hidden rounded-[1.65rem] bg-black"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={image}
            onLoad={recomputeMax}
            alt={title}
            className="pointer-events-none absolute left-0 top-0 w-full will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}
