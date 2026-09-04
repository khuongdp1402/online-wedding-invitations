"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Film } from "lucide-react";

interface FilmStripHorizontalGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  badge?: string;
  theme?: {
    filmBorderColor?: string;
    textColor?: string;
    accentColor?: string;
  };
}

export function FilmStripHorizontalGallery({
  images,
  title = "Cuộn Phim Kỷ Niệm",
  subtitle = "Từng khung hình lưu lại khoảnh khắc rực rỡ như những thước phim điện ảnh kinh điển.",
  badge = "35MM FILM REEL",
}: FilmStripHorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages = images && images.length > 0 ? images : [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/05.jpg",
    "/templates/classic-burgundy/samples/06.jpg",
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
    <section className="py-20 px-4 sm:px-8 bg-[#040D0A] text-white border-b border-[#D4AF37]/30 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0E3B2E]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono tracking-[0.25em] uppercase mb-3">
              <Film className="w-3.5 h-3.5" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-serif leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-[#0E3B2E] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#040D0A] transition-all shadow-lg active:scale-95"
              aria-label="Cuộn trái"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#D4AF37]/70 tracking-widest uppercase">
              SCROLL OR DRAG FILMSTRIP
            </span>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-[#0E3B2E] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#040D0A] transition-all shadow-lg active:scale-95"
              aria-label="Cuộn phải"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 35mm Film Strip Reel Container */}
        <div className="relative py-6 bg-[#0E1714] border-y-4 border-[#1B2B24] rounded-lg shadow-2xl">
          {/* Top Sprocket Holes (Perforations) */}
          <div className="flex items-center justify-between gap-3 px-4 py-1.5 bg-[#08100C] border-b border-black select-none overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-3.5 h-4.5 bg-black rounded-xs border border-stone-800 shrink-0" />
            ))}
          </div>

          {/* Film Frames Scroll Area */}
          <div
            ref={scrollRef}
            className="flex items-center gap-6 px-6 py-8 overflow-x-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayImages.map((src, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="shrink-0 snap-center group relative cursor-pointer"
              >
                {/* Film Frame Edge */}
                <div className="bg-black p-3 border-2 border-stone-800 rounded-xs shadow-2xl group-hover:border-[#D4AF37] transition-all duration-300 w-64 sm:w-80">
                  {/* Photo with 3:2 cinema ratio */}
                  <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-stone-900 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Cinema shot ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ZoomIn className="w-8 h-8 drop-shadow-lg" />
                    </div>
                  </div>

                  {/* Frame markings */}
                  <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-[#D4AF37]/80 px-1 border-t border-stone-900 pt-1.5">
                    <span className="font-bold tracking-wider">KODAK 400TX</span>
                    <span className="tracking-widest">FRAME #{String(idx + 1).padStart(2, "0")}A</span>
                    <span className="text-stone-500">35MM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Sprocket Holes (Perforations) */}
          <div className="flex items-center justify-between gap-3 px-4 py-1.5 bg-[#08100C] border-t border-black select-none overflow-hidden">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-3.5 h-4.5 bg-black rounded-xs border border-stone-800 shrink-0" />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] p-3 rounded-full bg-black/60 border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black transition-all"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] bg-black border-2 border-[#D4AF37] p-4 pb-8 rounded-sm shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[lightboxIndex]}
              alt={`Xem chi tiết frame ${lightboxIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
            <div className="mt-3 font-mono text-xs text-[#D4AF37] tracking-widest uppercase">
              FRAME #{String(lightboxIndex + 1).padStart(2, "0")}A • GATSBY CINEMA ARCHIVE
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] p-3 rounded-full bg-black/60 border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black transition-all"
            aria-label="Ảnh kế tiếp"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </section>
  );
}
