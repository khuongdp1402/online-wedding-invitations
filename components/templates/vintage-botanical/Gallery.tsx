"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type GalleryProps = {
  gallery?: string[];
};

/* Desktop bento pattern: cycles every 6 photos to create an asymmetric
   rhythm of hero tiles, tall tiles and small tiles across the grid. */
const DESKTOP_SPAN: Array<{ col: string; row: string }> = [
  { col: "md:col-span-2", row: "md:row-span-2" }, // hero
  { col: "md:col-span-1", row: "md:row-span-1" }, // small
  { col: "md:col-span-1", row: "md:row-span-2" }, // tall
  { col: "md:col-span-1", row: "md:row-span-1" }, // small
  { col: "md:col-span-2", row: "md:row-span-1" }, // wide
  { col: "md:col-span-1", row: "md:row-span-1" }, // small
];

/* Mobile aspect ratios cycle to keep the two-column CSS-columns masonry
   visually varied without any photo looking cramped or stretched. */
const MOBILE_ASPECT = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[5/4]"];

function PressedLeafFlourish({ className = "", tone = "sage" }: { className?: string; tone?: "sage" | "gold" }) {
  const stroke = tone === "gold" ? "#C4A96A" : "#8A9A5B";
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M40 8 C48 24 60 30 70 32 C58 36 48 46 44 62 C42 46 30 38 14 34 C28 30 36 22 40 8Z"
        fill={stroke}
        fillOpacity="0.16"
        stroke={stroke}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M40 14 C40 30 40 46 40 60"
        stroke={stroke}
        strokeOpacity="0.4"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Cell =
  | { type: "photo"; src: string; index: number }
  | { type: "accent"; key: string; tone: "sage" | "gold" };

function buildCells(images: string[]): Cell[] {
  const cells: Cell[] = [];
  images.forEach((src, index) => {
    cells.push({ type: "photo", src, index });
    if ((index + 1) % 5 === 0 && index !== images.length - 1) {
      cells.push({ type: "accent", key: `accent-${index}`, tone: index % 2 === 0 ? "sage" : "gold" });
    }
  });
  return cells;
}

export function Gallery({ gallery }: GalleryProps) {
  const images = (gallery ?? []).filter(Boolean);
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".vb-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("vb-in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  const cells = buildCells(images);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 relative overflow-hidden bg-[#FAF6EE] border-b border-[#E8DFC8]"
    >
      {/* Subtle botanical corner flourishes framing the whole section */}
      <PressedLeafFlourish
        tone="sage"
        className="hidden sm:block absolute -top-2 -left-4 w-28 h-28 opacity-60 pointer-events-none -rotate-12"
      />
      <PressedLeafFlourish
        tone="gold"
        className="hidden sm:block absolute -bottom-4 -right-2 w-32 h-32 opacity-50 pointer-events-none rotate-[150deg] scale-x-[-1]"
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-[#EAE2D0] text-[#4A5D3F] border border-[#D5C6A8] text-xs font-serif uppercase tracking-[0.25em] mb-3">
          HERBARIUM PRESS GALLERY
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#2D3E2E] font-medium mb-3">
          Tiêu Bản Kỷ Niệm Thảo Mộc
        </h2>
        <p className="text-xs sm:text-sm text-[#6C7865] max-w-lg mx-auto mb-14 font-serif leading-relaxed">
          Mỗi khung ảnh như một trang ép hoa trong cuốn nhật ký vườn xưa, lưu giữ những khoảnh khắc ngát hương của đôi ta.
        </p>

        {/* Mobile / small screens: CSS-columns masonry, simple & clean */}
        <div className="md:hidden columns-2 gap-3 [column-fill:_balance]">
          {cells.map((cell) => {
            if (cell.type === "accent") {
              return (
                <div
                  key={cell.key}
                  className="mb-3 break-inside-avoid rounded-[1.5rem] bg-[#F0EFE5] border border-[#E1DAC4] flex items-center justify-center aspect-square vb-reveal"
                >
                  <PressedLeafFlourish tone={cell.tone} className="w-10 h-10" />
                </div>
              );
            }
            const aspect = MOBILE_ASPECT[cell.index % MOBILE_ASPECT.length];
            return (
              <button
                type="button"
                key={cell.index}
                onClick={() => setLightboxIndex(cell.index)}
                className={`group relative mb-3 w-full break-inside-avoid overflow-hidden rounded-[1.5rem] shadow-[0_10px_25px_rgba(40,30,20,0.12)] border border-[#EDE4D0] bg-white vb-reveal ${aspect}`}
                style={{ animationDelay: `${(cell.index % 8) * 0.06}s` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cell.src}
                  alt={`Khoảnh khắc ${cell.index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#2D3E2E]/0 group-active:bg-[#2D3E2E]/20 transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Desktop / tablet: asymmetric bento masonry grid */}
        <div className="hidden md:grid grid-cols-4 auto-rows-[130px] lg:auto-rows-[150px] gap-4 grid-flow-dense">
          {cells.map((cell) => {
            if (cell.type === "accent") {
              return (
                <div
                  key={cell.key}
                  className="rounded-[1.75rem] bg-[#F0EFE5] border border-[#E1DAC4] flex items-center justify-center vb-reveal"
                >
                  <PressedLeafFlourish tone={cell.tone} className="w-12 h-12" />
                </div>
              );
            }
            const span = DESKTOP_SPAN[cell.index % DESKTOP_SPAN.length];
            return (
              <button
                type="button"
                key={cell.index}
                onClick={() => setLightboxIndex(cell.index)}
                className={`group relative overflow-hidden rounded-[1.75rem] shadow-[0_10px_25px_rgba(40,30,20,0.12)] border border-[#EDE4D0] bg-white vb-reveal ${span.col} ${span.row}`}
                style={{ animationDelay: `${(cell.index % 8) * 0.07}s` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cell.src}
                  alt={`Khoảnh khắc ${cell.index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#2D3E2E]/0 group-hover:bg-[#2D3E2E]/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1F14]/92 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-[#F5F0E8] hover:text-[#C4A96A] transition-colors"
            onClick={() => setLightboxIndex(null)}
            aria-label="Đóng"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            type="button"
            className="absolute left-3 sm:left-8 text-[#F5F0E8] hover:text-[#C4A96A] transition-colors"
            onClick={handlePrev}
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-9 h-9" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightboxIndex]}
            alt={`Khoảnh khắc ${lightboxIndex + 1}`}
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-3 sm:right-8 text-[#F5F0E8] hover:text-[#C4A96A] transition-colors"
            onClick={handleNext}
            aria-label="Ảnh sau"
          >
            <ChevronRight className="w-9 h-9" />
          </button>
        </div>
      )}
    </section>
  );
}
