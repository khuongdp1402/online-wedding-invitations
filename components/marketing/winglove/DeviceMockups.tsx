"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Thời gian (giây) để tự cuộn hết từ đầu tới cuối ảnh khi không có tương tác. */
const SWEEP_SECONDS = 65;
/** Dừng lại bao lâu ở cuối ảnh trước khi tự reset về đầu và cuộn lại. */
const BOTTOM_PAUSE_MS = 5000;
/** Độ mượt khi nội soi vị trí hiện tại đuổi theo vị trí mục tiêu (0–1, càng nhỏ càng mượt/trễ). */
const LERP = 0.14;

/**
 * Cuộn qua 1 ảnh chụp toàn trang thật (dài hơn khung hiển thị rất nhiều) —
 * tự động từ trên xuống dưới cùng, dừng 5s rồi reset về đầu và cuộn lại.
 * Khi khách rê chuột vào: tạm dừng tự cuộn, wheel của khách điều khiển
 * cuộn ngay trong khung hình (không cuộn cả trang) — mượt nhờ nội suy
 * (lerp) mỗi khung hình thay vì nhảy thẳng theo từng nấc wheel. Rời chuột
 * ra là tự cuộn tiếp ngay.
 */
function useAutoScrollImage(threshold: number) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const offsetRef = useRef(0); // vị trí hiển thị hiện tại (đã làm mượt)
  const targetRef = useRef(0); // vị trí muốn tới
  const hoveringRef = useRef(false);
  const inViewRef = useRef(false);
  const maxOffsetRef = useRef(0);
  const speedPerFrameRef = useRef(0);
  const bottomPauseUntilRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const applyOffset = useCallback((y: number) => {
    const img = imgRef.current;
    if (img) img.style.transform = `translateY(-${y}px)`;
  }, []);

  const recomputeBounds = useCallback(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img || !img.naturalWidth) return;
    const displayedHeight = wrapper.clientWidth * (img.naturalHeight / img.naturalWidth);
    const max = Math.max(0, displayedHeight - wrapper.clientHeight);
    maxOffsetRef.current = max;
    speedPerFrameRef.current = max / (SWEEP_SECONDS * 60);
    if (targetRef.current > max) targetRef.current = max;
    if (offsetRef.current > max) {
      offsetRef.current = max;
      applyOffset(max);
    }
  }, [applyOffset]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ro = new ResizeObserver(() => recomputeBounds());
    ro.observe(wrapper);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
          setIsActive(entry.isIntersecting);
        });
      },
      { threshold }
    );
    io.observe(wrapper);

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mql.matches;
    const handleChange = () => {
      reducedMotion = mql.matches;
    };
    mql.addEventListener?.("change", handleChange);

    function tick(now: number) {
      const max = maxOffsetRef.current;
      if (inViewRef.current && !reducedMotion && max > 0) {
        if (!hoveringRef.current) {
          // Chế độ tự cuộn — chỉ chạy khi khách không rê chuột vào.
          if (bottomPauseUntilRef.current !== null) {
            if (now >= bottomPauseUntilRef.current) {
              bottomPauseUntilRef.current = null;
              targetRef.current = 0;
              offsetRef.current = 0; // reset tức thì, không cuộn ngược lên
              applyOffset(0);
            }
          } else {
            targetRef.current = Math.min(max, targetRef.current + speedPerFrameRef.current);
            if (targetRef.current >= max) bottomPauseUntilRef.current = now + BOTTOM_PAUSE_MS;
          }
        }
        // Luôn nội suy vị trí hiển thị đuổi theo mục tiêu — mượt cho cả
        // tự cuộn lẫn cuộn tay bằng wheel.
        const next = offsetRef.current + (targetRef.current - offsetRef.current) * LERP;
        offsetRef.current = Math.abs(next - targetRef.current) < 0.3 ? targetRef.current : next;
        applyOffset(offsetRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      io.disconnect();
      mql.removeEventListener?.("change", handleChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [threshold, recomputeBounds, applyOffset]);

  // Wheel gắn thủ công (không passive) để preventDefault được — chặn cuộn
  // trang khi khách đang cuộn trong khung hình, chỉ khung hình cuộn thôi.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const onWheel = (e: WheelEvent) => {
      if (maxOffsetRef.current <= 0) return;
      e.preventDefault();
      targetRef.current = Math.min(Math.max(targetRef.current + e.deltaY, 0), maxOffsetRef.current);
      bottomPauseUntilRef.current = null;
    };
    wrapper.addEventListener("wheel", onWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", onWheel);
  }, []);

  const onImgLoad = () => recomputeBounds();
  // Lưu ý: KHÔNG dùng onPointerEnter để bật hoveringRef — Chrome tự sinh
  // pointerenter/mouseenter "giả" khi trang cuộn và nội dung dịch chuyển
  // ngay dưới con trỏ chuột đang đứng yên (không phải khách thật sự rê
  // chuột vào). Nếu tin sự kiện đó, khung sẽ bị "đứng hình" đúng lúc vừa
  // cuộn tới section này — y hệt hiện tượng "ảnh trống" dù thực chất là
  // bị treo tự-cuộn từ đầu, không phải mất ảnh. Chỉ pointermove (chuột
  // thực sự di chuyển) mới đáng tin để coi là khách đang hover.
  const onPointerMove = () => {
    hoveringRef.current = true;
  };
  const onPointerLeave = () => {
    hoveringRef.current = false;
  };

  return { wrapperRef, imgRef, isActive, onImgLoad, onPointerMove, onPointerLeave };
}

function LiveBadge({ isPlaying, title }: { isPlaying: boolean; title: string }) {
  return (
    <span
      className="absolute -top-3 right-4 z-20 inline-flex items-center gap-1 rounded-full border border-winglove-line bg-white px-2 py-0.5 text-[0.58rem] font-extrabold uppercase tracking-[.06em] text-winglove-ink-soft shadow-sm"
      title={title}
    >
      <span className="relative flex h-1.5 w-1.5">
        {isPlaying && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-winglove-pine opacity-75" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-winglove-pine" />
      </span>
      Đang chạy thực tế
    </span>
  );
}

type MockupProps = {
  /** Ảnh chụp toàn trang thật, từ trên xuống dưới cùng. */
  image: string;
  title: string;
  className?: string;
};

/** Khung MacBook — thanh chrome trình duyệt + đế máy, cuộn qua ảnh chụp desktop thật.
 * Rê chuột vào để cuộn tay (mượt), rời chuột ra tự cuộn tiếp. */
export function LaptopMockup({ image, title, className }: MockupProps) {
  const { wrapperRef, imgRef, isActive, onImgLoad, onPointerMove, onPointerLeave } =
    useAutoScrollImage(0.35);

  return (
    <div className={cn("relative w-full", className)}>
      <LiveBadge isPlaying={isActive} title={title} />
      <div
        className="overflow-hidden rounded-t-xl border border-[#333] bg-[#111] shadow-[0_40px_80px_-32px_rgba(0,0,0,0.6)] [backface-visibility:hidden] will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="flex items-center gap-1.5 border-b border-black/40 bg-[#1c1c1c] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div
          ref={wrapperRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative aspect-[16/10] w-full cursor-ns-resize overflow-hidden bg-black"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={image}
            onLoad={onImgLoad}
            alt={title}
            className="absolute left-0 top-0 w-full will-change-transform"
          />
        </div>
      </div>
      {/* Đế MacBook */}
      <div className="mx-auto h-[10px] w-[92%] rounded-b-2xl bg-gradient-to-b from-[#d9d9d9] to-[#b8b8b8]" />
      <div className="mx-auto h-[4px] w-[30%] rounded-b-lg bg-[#a6a6a6]" />
    </div>
  );
}
