"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Layers, Heart } from "lucide-react";

interface StackedCardDeckGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function StackedCardDeckGallery({
  images,
  title = "Khoảnh Khắc Ngọt Ngào",
  subtitle = "Bộ thẻ ảnh xếp lớp dịu dàng, chạm hoặc nhấn để lật xem từng trang nhật ký tình yêu.",
  badge = "STACKED POLAROID DECK",
}: StackedCardDeckGalleryProps) {
  const displayImages = images && images.length > 0 ? images : [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/05.jpg",
    "/templates/classic-burgundy/samples/06.jpg",
  ];

  const [topIndex, setTopIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const flipNext = () => {
    setTopIndex((prev) => (prev + 1) % displayImages.length);
  };

  const flipPrev = () => {
    setTopIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // Stack offsets for top 4 cards
  const stackOffsets = [
    { rotate: "0deg", translateY: "0px", scale: 1, zIndex: 40, opacity: 1 },
    { rotate: "4deg", translateY: "10px", scale: 0.95, zIndex: 30, opacity: 0.85 },
    { rotate: "-4deg", translateY: "20px", scale: 0.9, zIndex: 20, opacity: 0.7 },
    { rotate: "6deg", translateY: "30px", scale: 0.85, zIndex: 10, opacity: 0.5 },
  ];

  return (
    <section
      className="py-20 px-4 sm:px-8 border-b border-[#F6D6DF] relative overflow-hidden text-center"
      style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FFF7F9 100%)" }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFE4EC] text-[#D4456B] border border-[#F8B4C4] text-xs font-serif uppercase tracking-[0.25em] mb-3">
            <Heart className="w-3 h-3 fill-[#D4456B]" />
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-[#3D1A26] font-medium mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#8A5163] max-w-md mx-auto mb-12 leading-relaxed font-serif">
            {subtitle}
          </p>
        )}

        {/* Stacked Deck Stage */}
        <div className="relative w-72 sm:w-84 h-[440px] sm:h-[490px] mx-auto my-6 flex items-center justify-center">
          {displayImages.map((src, i) => {
            const relativePosition = (i - topIndex + displayImages.length) % displayImages.length;
            if (relativePosition >= 4) return null;

            const config = stackOffsets[relativePosition];
            const isTop = relativePosition === 0;

            return (
              <div
                key={i}
                onClick={() => {
                  if (isTop) flipNext();
                  else setTopIndex(i);
                }}
                className={`absolute inset-0 bg-white p-3.5 pb-6 rounded-2xl shadow-[0_15px_35px_rgba(212,69,107,0.18)] border-2 border-[#FAD2DE] transition-all duration-500 cursor-pointer select-none`}
                style={{
                  transform: `translateY(${config.translateY}) rotate(${config.rotate}) scale(${config.scale})`,
                  zIndex: config.zIndex,
                  opacity: config.opacity,
                }}
              >
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#FFF5F7] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Sakura card ${i + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {isTop && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full shadow-md text-[#D4456B]">
                      <Layers className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between font-serif text-xs text-[#8A5163] px-1">
                  <span className="font-semibold text-[#D4456B]">
                    Khoảnh Khắc #{i + 1}
                  </span>
                  <span className="italic">Chạm để lật thẻ →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deck Navigation and Counter */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={flipPrev}
            className="p-3 rounded-full bg-white text-[#D4456B] hover:bg-[#FFE4EC] transition-all shadow-md active:scale-95 border border-[#F8B4C4]"
            aria-label="Thẻ trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-serif text-sm font-semibold text-[#D4456B] tracking-wider">
            {topIndex + 1} / {displayImages.length}
          </span>

          <button
            onClick={flipNext}
            className="p-3 rounded-full bg-white text-[#D4456B] hover:bg-[#FFE4EC] transition-all shadow-md active:scale-95 border border-[#F8B4C4]"
            aria-label="Thẻ kế tiếp"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setLightboxIndex(topIndex)}
            className="inline-flex items-center gap-1.5 text-xs font-serif text-[#D4456B] hover:underline"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            Xem ảnh đang mở ở kích thước lớn
          </button>
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
            className="max-w-4xl max-h-[85vh] bg-white p-4 pb-8 rounded-2xl border-2 border-[#F8B4C4] shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[lightboxIndex]}
              alt={`Xem chi tiết ${lightboxIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain mx-auto rounded-xl"
            />
            <div className="mt-3 font-serif text-sm text-[#D4456B] font-bold">
              Thẻ #{lightboxIndex + 1} / {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
