"use client";

import React, { useCallback, useMemo, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";

type GalleryProps = {
  gallery?: string[];
};

const FALLBACK_IMAGE = "/templates/classic-burgundy/samples/01.jpg";

// How far (in carousel "slots") a photo can be from the active center
// before it is no longer rendered at all.
const MAX_VISIBLE_OFFSET = 2;

function shortestOffset(index: number, active: number, length: number) {
  let diff = index - active;
  // wrap around so e.g. last photo can appear just to the left of the first
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export function Gallery({ gallery }: GalleryProps) {
  const editOverlay = useEditOverlay();
  const images = useMemo(() => (gallery ?? []).filter(Boolean), [gallery]);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      const next = ((index % images.length) + images.length) % images.length;
      setActive(next);
    },
    [images.length]
  );

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  const handleDragEnd = useCallback(
    (_e: unknown, info: PanInfo) => {
      setDragging(false);
      const swipe = info.offset.x;
      const velocity = info.velocity.x;
      if (swipe < -60 || velocity < -400) {
        goNext();
      } else if (swipe > 60 || velocity > 400) {
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  if (images.length === 0) {
    return null;
  }

  const hasMultiple = images.length > 1;

  return (
    <section
      className="relative py-16 px-4 sm:px-8 overflow-hidden border-b"
      style={{
        background: "linear-gradient(180deg, #FFF7F9 0%, #FFEDF3 55%, #FFF7F9 100%)",
        borderColor: "var(--ss-border, #F6D6DF)",
      }}
      data-section="gallery"
    >
      {/* Decorative falling petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
        <span className="absolute top-6 left-[8%] text-2xl opacity-30 ss-branch-deco">🌸</span>
        <span className="absolute top-16 right-[10%] text-3xl opacity-20 ss-branch-deco" style={{ animationDelay: "1.5s" }}>
          🌸
        </span>
        <span className="absolute bottom-10 left-[14%] text-2xl opacity-20 ss-branch-deco" style={{ animationDelay: "3s" }}>
          🌸
        </span>
        <span className="absolute bottom-4 right-[18%] text-xl opacity-25 ss-branch-deco" style={{ animationDelay: "2s" }}>
          🌸
        </span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFE4EC] text-[#D4456B] border border-[#F8B4C4] text-[11px] font-serif uppercase tracking-[0.25em] mb-3">
          <Camera className="w-3 h-3" />
          Sakura Coverflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#3D1A26] font-medium mb-3">
          Khoảnh Khắc Cánh Hoa
        </h2>
        <p className="text-xs sm:text-sm text-[#8A5163] max-w-md mx-auto mb-10 leading-relaxed font-serif">
          Chạm mũi tên hoặc vuốt nhẹ như gió xuân để lướt qua từng khung hình kỷ niệm.
        </p>

        {/* 3D Coverflow Stage */}
        <div
          className="relative mx-auto w-full max-w-md h-[320px] sm:h-[400px] flex items-center justify-center touch-pan-y"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ transformStyle: "preserve-3d" }}
            drag={hasMultiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {images.map((src, index) => {
              const offset = shortestOffset(index, active, images.length);
              const abs = Math.abs(offset);
              if (abs > MAX_VISIBLE_OFFSET) return null;

              const isCenter = offset === 0;
              const translateX = offset * 128;
              const translateZ = -abs * 120;
              const rotateY = offset === 0 ? 0 : offset > 0 ? -42 : 42;
              const scale = isCenter ? 1 : 1 - abs * 0.18;
              const opacity = isCenter ? 1 : Math.max(0.25, 0.75 - abs * 0.25);
              const zIndex = 100 - abs;

              const slotKey = `gallery.image.${index}`;
              const imgClassName = editSlotClass(
                editOverlay,
                slotKey,
                "w-full h-full object-cover rounded-[18px] pointer-events-none"
              );

              return (
                <motion.div
                  key={src + index}
                  className="absolute w-52 sm:w-64 aspect-[3/4]"
                  style={{ zIndex }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  onClick={(e) => {
                    if (dragging) return;
                    if (!isCenter) {
                      goTo(index);
                      return;
                    }
                    editOverlay?.onSlotClick?.(slotKey, e.currentTarget as HTMLElement);
                  }}
                >
                  <div
                    className="w-full h-full rounded-[18px] bg-white p-2 sm:p-2.5"
                    style={{
                      boxShadow: isCenter
                        ? "0 24px 48px rgba(212, 69, 107, 0.35), 0 0 0 1px rgba(248,180,196,0.5)"
                        : "0 12px 28px rgba(212, 69, 107, 0.18)",
                      border: "1px solid #F6D6DF",
                    }}
                  >
                    <div className="w-full h-full rounded-[12px] overflow-hidden bg-[#FFF0F5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Ảnh cưới ${index + 1}`}
                        loading="lazy"
                        className={imgClassName}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.endsWith(FALLBACK_IMAGE)) return;
                          target.src = FALLBACK_IMAGE;
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Soft pink glow behind the active photo */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(248,180,196,0.55) 0%, transparent 70%)", zIndex: 0 }}
            aria-hidden
          />
        </div>

        {hasMultiple && (
          <>
            {/* Arrows + dots */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                type="button"
                onClick={goPrev}
                className="p-2.5 rounded-full bg-white border border-[#F8B4C4] text-[#D4456B] hover:bg-[#D4456B] hover:text-white transition-colors shadow-sm"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 max-w-[220px] sm:max-w-xs overflow-x-auto py-1 px-1 no-scrollbar">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all shrink-0 ${
                      active === i ? "w-6 bg-[#D4456B]" : "w-2 bg-[#F8B4C4]/60 hover:bg-[#F8B4C4]"
                    }`}
                    aria-label={`Đi tới ảnh ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                className="p-2.5 rounded-full bg-white border border-[#F8B4C4] text-[#D4456B] hover:bg-[#D4456B] hover:text-white transition-colors shadow-sm"
                aria-label="Ảnh kế tiếp"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-3 text-[11px] tracking-[0.2em] uppercase text-[#B85070]/70 font-serif">
              {active + 1} / {images.length}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
