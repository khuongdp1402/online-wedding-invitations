"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryProps = {
  images?: string[];
  weddingId?: string;
  editOverlay?: unknown;
};

const FALLBACK_IMAGES = [
  "/templates/classic-burgundy/samples/01.jpg",
  "/templates/classic-burgundy/samples/02.jpg",
  "/templates/classic-burgundy/samples/03.jpg",
  "/templates/classic-burgundy/samples/04.jpg",
  "/templates/classic-burgundy/samples/05.jpg",
  "/templates/classic-burgundy/samples/06.jpg",
];

// Deterministic "scattered leaf" presets, cycled by index so the layout never
// jumps around between renders (no Math.random — avoids hydration mismatch).
const ROTATIONS = [-6, 5, -3, 7, -8, 4, -5, 8, -2, 6, -7, 3];
const OFFSETS_Y = [0, 26, -16, 34, -22, 12, -30, 18, -12, 28, -20, 15];
const DRIFT_DURATIONS = [6.5, 7.4, 8.1, 6.9, 7.7, 8.4, 7.1, 7.9, 6.7, 8.2, 7.3, 8.6];
const DRIFT_DELAYS = [0, 0.6, 1.2, 0.3, 0.9, 1.5, 0.2, 1.1, 0.5, 1.4, 0.1, 0.8];
const LEAF_EMOJI = ["\u{1F342}", "\u{1F343}"]; // 🍂 🍃

export function Gallery({ images }: GalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages = images && images.length > 0 ? images : FALLBACK_IMAGES;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".aw-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("aw-in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "-40px" }
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, [displayImages.length]);

  if (!displayImages || displayImages.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayImages.length) % displayImages.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayImages.length);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 sm:px-8 relative bg-[#F7F1EB] border-b border-[#E3D4C5] overflow-hidden"
    >
      {/* Drifting autumn leaves, decorative only */}
      <span className="aw-leaf absolute top-10 left-[8%] text-2xl opacity-30 pointer-events-none select-none hidden sm:inline-block">
        {LEAF_EMOJI[0]}
      </span>
      <span
        className="aw-leaf absolute bottom-16 right-[10%] text-3xl opacity-25 pointer-events-none select-none hidden sm:inline-block"
        style={{ animationDelay: "1.2s" }}
      >
        {LEAF_EMOJI[1]}
      </span>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <span className="aw-reveal inline-block px-4 py-1 rounded-full bg-[#EADCCF] text-[#8C5338] border border-[#D5C0B0] text-xs font-serif uppercase tracking-[0.25em] mb-3">
          AUTUMN LEAVES GALLERY
        </span>
        <h2 className="aw-reveal text-3xl sm:text-4xl font-serif text-[#422114] font-medium mb-3" style={{ animationDelay: "0.15s" }}>
          Khoảnh Khắc Rơi Theo Gió Thu
        </h2>
        <p
          className="aw-reveal text-xs sm:text-sm text-[#7D5C4C] max-w-lg mx-auto mb-16 font-serif leading-relaxed"
          style={{ animationDelay: "0.3s" }}
        >
          Từng bức ảnh trôi nhẹ như những chiếc lá thu, rải rác lưu giữ những
          khoảnh khắc yêu thương trong hành trình của đôi ta.
        </p>

        {/* Scattered floating grid — flat & tidy on mobile, gently airborne from md+ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 md:gap-y-16 lg:gap-y-20">
          {displayImages.map((src, idx) => {
            const rotate = ROTATIONS[idx % ROTATIONS.length];
            const offsetY = OFFSETS_Y[idx % OFFSETS_Y.length];
            const driftDuration = DRIFT_DURATIONS[idx % DRIFT_DURATIONS.length];
            const driftDelay = DRIFT_DELAYS[idx % DRIFT_DELAYS.length];

            return (
              <div
                key={idx}
                className="aw-reveal"
                style={{ animationDelay: `${0.06 * (idx % 8)}s` }}
              >
                <div
                  className="translate-y-0 rotate-0 md:rotate-[var(--aw-sr)] md:translate-y-[var(--aw-sy)] transition-transform duration-500 ease-out"
                  style={
                    {
                      "--aw-sr": `${rotate}deg`,
                      "--aw-sy": `${offsetY}px`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="aw-scatter-drift"
                    style={{
                      animationDuration: `${driftDuration}s`,
                      animationDelay: `${driftDelay}s`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`Xem ảnh ${idx + 1}`}
                      className="group relative block w-full cursor-pointer bg-[#FFFDF9] p-2.5 pb-5 rounded-[1.4rem] shadow-[0_14px_30px_rgba(70,40,20,0.16)] border border-[#E8DCCF] hover:shadow-[0_20px_44px_rgba(70,40,20,0.26)] hover:-translate-y-1 transition-all duration-500"
                    >
                      <div className="aw-scatter-photo w-full aspect-[4/5] overflow-hidden bg-[#F2ECE4] rounded-[1.1rem]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Khoảnh khắc mùa thu ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
                          }}
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] bg-[#FFFDF9] p-4 pb-8 rounded-sm shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[lightboxIndex]}
              alt={`Xem chi tiết ${lightboxIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
            <div className="mt-3 text-center font-serif text-sm text-stone-600">
              Ảnh {lightboxIndex + 1} / {displayImages.length}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Ảnh kế tiếp"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </section>
  );
}
