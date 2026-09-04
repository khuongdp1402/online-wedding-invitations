"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Sun } from "lucide-react";

interface DesertArchGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function DesertArchGallery({
  images,
  title = "Bộ Sưu Tập Mái Vòm Kỷ Niệm",
  subtitle = "Từng khung hình được đóng trong những vòm sa mạc nồng ấm đượm sắc hoàng hôn Bohemian.",
  badge = "BOHO ARCH PANORAMA",
}: DesertArchGalleryProps) {
  const displayImages = images && images.length > 0 ? images : [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/05.jpg",
    "/templates/classic-burgundy/samples/06.jpg",
  ];

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % displayImages.length);
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FDF8F5] border-b border-[#EEDFD5] relative overflow-hidden text-center">
      {/* Subtle terracotta arch backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-t-full bg-[#EEDFD5]/30 pointer-events-none blur-2xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#EEDFD5] text-[#C25E42] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Sun className="w-3.5 h-3.5" />
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-[#3A231B] mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-14 leading-relaxed font-serif">
            {subtitle}
          </p>
        )}

        {/* Highlight Main Arch Slider */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div
            onClick={() => setLightboxIndex(activeIdx)}
            className="rounded-t-full rounded-b-3xl overflow-hidden border-4 border-[#C25E42] bg-white p-3 shadow-2xl cursor-pointer group hover:border-[#DDA15E] transition-all duration-500"
          >
            <div className="w-full h-96 sm:h-[450px] rounded-t-full rounded-b-2xl overflow-hidden relative bg-[#FAF3EE]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayImages[activeIdx]}
                alt={`Boho arch ${activeIdx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#3A231B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ZoomIn className="w-10 h-10 drop-shadow-lg text-[#DDA15E]" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between px-3 pb-1 text-xs font-serif">
              <span className="font-bold text-[#C25E42] tracking-wider uppercase">
                Vòm Sa Mạc #{String(activeIdx + 1).padStart(2, "0")}
              </span>
              <span className="text-[#DDA15E] italic">Bohemian Sunset</span>
            </div>
          </div>

          {/* Prev/Next buttons floating at sides */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#C25E42] text-white hover:bg-[#A84C32] transition-colors shadow-lg active:scale-95 z-20"
            aria-label="Vòm trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#C25E42] text-white hover:bg-[#A84C32] transition-colors shadow-lg active:scale-95 z-20"
            aria-label="Vòm sau"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Arch Gallery Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4">
          {displayImages.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`rounded-t-full rounded-b-xl overflow-hidden p-1.5 border-2 cursor-pointer transition-all ${
                activeIdx === idx
                  ? "border-[#C25E42] bg-[#EEDFD5]/50 scale-105 shadow-md"
                  : "border-[#EEDFD5] bg-white opacity-70 hover:opacity-100"
              }`}
            >
              <div className="w-full h-24 sm:h-28 rounded-t-full rounded-b-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Thumb arch ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] bg-[#FFFDF9] p-4 pb-8 rounded-t-full rounded-b-3xl border-2 border-[#C25E42] shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[lightboxIndex]}
              alt={`Xem chi tiết ${lightboxIndex + 1}`}
              className="max-h-[70vh] w-auto object-contain mx-auto rounded-t-full rounded-b-2xl"
            />
            <div className="mt-3 font-serif text-sm text-[#C25E42] font-bold">
              VÒM SA MẠC #{lightboxIndex + 1} / {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
