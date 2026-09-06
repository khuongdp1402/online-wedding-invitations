"use client";

import React, { useMemo, useState } from "react";
import { Sun } from "lucide-react";

type GalleryProps = {
  gallery?: string[];
};

const MIN_ROW_ITEMS = 8;

/**
 * Repeats the given photos deterministically until the row has at least
 * `MIN_ROW_ITEMS` items, then duplicates that padded list once so the track
 * can loop seamlessly with a `translateX(-50%)` animation. No randomness is
 * used so server/client markup always match (no hydration mismatch).
 */
function buildLoopTrack(images: string[]): string[] {
  if (images.length === 0) return [];
  const padded: string[] = [];
  let i = 0;
  while (padded.length < MIN_ROW_ITEMS) {
    padded.push(images[i % images.length]);
    i++;
  }
  return [...padded, ...padded];
}

function MarqueeRow({
  images,
  direction,
  rowIndex,
}: {
  images: string[];
  direction: "left" | "right";
  rowIndex: number;
}) {
  const [brokenKeys, setBrokenKeys] = useState<Set<number>>(new Set());

  if (images.length === 0) return null;

  return (
    <div className="bt-marquee-row group relative w-full overflow-hidden">
      <div
        className={`bt-marquee-track flex items-stretch gap-4 sm:gap-5 md:gap-6 w-max ${
          direction === "left" ? "bt-marquee-anim-left" : "bt-marquee-anim-right"
        }`}
      >
        {images.map((src, idx) => {
          const key = rowIndex * 1000 + idx;
          const isBroken = brokenKeys.has(key);
          return (
            <div
              key={key}
              className="bt-marquee-card flex-shrink-0 w-[150px] h-[190px] sm:w-[200px] sm:h-[240px] md:w-[240px] md:h-[280px] rounded-2xl overflow-hidden border-2 border-[#EEDFD5] bg-gradient-to-br from-[#EEDFD5] to-[#F5E6DD] shadow-[0_10px_28px_rgba(196,94,66,0.15)]"
            >
              {!isBroken && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={`Khoảnh khắc boho ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={() =>
                    setBrokenKeys((prev) => {
                      const next = new Set(prev);
                      next.add(key);
                      return next;
                    })
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Gallery({ gallery }: GalleryProps) {
  const images = useMemo(() => (gallery ?? []).filter(Boolean), [gallery]);

  const { row1, row2 } = useMemo(() => {
    if (images.length === 0) return { row1: [] as string[], row2: [] as string[] };
    const first = images.filter((_, idx) => idx % 2 === 0);
    const second = images.filter((_, idx) => idx % 2 === 1);
    return {
      row1: buildLoopTrack(first.length > 0 ? first : images),
      row2: buildLoopTrack(second.length > 0 ? second : images),
    };
  }, [images]);

  if (images.length === 0) return null;

  return (
    <section className="py-20 sm:px-8 bg-[#FDF8F5] border-b border-[#EEDFD5] relative overflow-hidden text-center">
      {/* Subtle desert glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#DDA15E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#EEDFD5] text-[#C25E42] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
          <Sun className="w-3.5 h-3.5" />
          BOHO MEMORY MARQUEE
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#3A231B] mb-3">
          Dòng Chảy Kỷ Niệm
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-12 leading-relaxed font-serif">
          Từng khung hình lặng lẽ trôi qua như những cơn gió sa mạc ấm áp, mang theo bao khoảnh khắc yêu thương của chúng mình.
        </p>
      </div>

      <div className="bt-marquee-wrap w-full space-y-4 sm:space-y-5 md:space-y-6 relative z-10">
        <MarqueeRow images={row1} direction="left" rowIndex={0} />
        {row2.length > 0 && <MarqueeRow images={row2} direction="right" rowIndex={1} />}
      </div>
    </section>
  );
}
