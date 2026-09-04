"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Crown, Sparkles } from "lucide-react";

interface SymmetricTriptychGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  badge?: string;
  theme?: {
    goldAccent?: boolean;
    traditionalRed?: boolean;
  };
}

export function SymmetricTriptychGallery({
  images,
  title = "Triển Lãm Hoàng Gia",
  subtitle = "Bố cục tam tấu đối xứng trang trọng tôn vinh những khoảnh khắc vàng son của tình yêu vĩnh cửu.",
  badge = "ROYAL SYMMETRIC TRIPTYCH",
}: SymmetricTriptychGalleryProps) {
  const displayImages = images && images.length > 0 ? images : [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/05.jpg",
    "/templates/classic-burgundy/samples/06.jpg",
  ];

  const [centerIdx, setCenterIdx] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Derive left and right indices
  const leftIdx = (centerIdx - 1 + displayImages.length) % displayImages.length;
  const rightIdx = (centerIdx + 1) % displayImages.length;

  const handlePrev = () => {
    setCenterIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleNext = () => {
    setCenterIdx((prev) => (prev + 1) % displayImages.length);
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FFFDF9] border-b border-[#E5A93C]/30 relative overflow-hidden">
      {/* Royal gilded subtle corner decor */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#E5A93C]/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#E5A93C]/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#E5A93C]/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#E5A93C]/40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {badge && (
          <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-[#8B0000]/5 border border-[#E5A93C]/50 text-[#8B0000] text-xs font-serif uppercase tracking-[0.3em] mb-3">
            <Crown className="w-3.5 h-3.5 text-[#E5A93C]" />
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-[#4A0E17] font-bold mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#7D4A52] max-w-lg mx-auto mb-14 font-serif leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Symmetric 3-Column Triptych Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-8">
          {/* Left Flank Wing (col-span-3) */}
          <div
            onClick={() => setCenterIdx(leftIdx)}
            className="md:col-span-3 order-2 md:order-1 cursor-pointer group transition-all duration-500 hover:scale-102"
          >
            <div className="bg-white p-3 border-2 border-[#E5A93C]/40 rounded-xl shadow-md group-hover:border-[#E5A93C] group-hover:shadow-xl transition-all">
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayImages[leftIdx]}
                  alt={`Triptych left ${leftIdx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-[10px] font-serif text-[#8B0000] font-semibold tracking-wider">
                    ← XEM TẤM NÀY
                  </span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs font-serif text-stone-500">
                Khung Tả #{leftIdx + 1}
              </div>
            </div>
          </div>

          {/* Grand Center Focal Masterpiece (col-span-6) */}
          <div
            onClick={() => setLightboxIndex(centerIdx)}
            className="md:col-span-6 order-1 md:order-2 cursor-pointer group transition-all duration-500 hover:scale-[1.01]"
          >
            <div className="bg-white p-4 sm:p-5 border-4 border-[#E5A93C] rounded-2xl shadow-2xl relative group-hover:shadow-[0_20px_50px_rgba(229,169,60,0.3)] transition-all">
              {/* Crown Emblem badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#8B0000] text-[#E5A93C] px-4 py-1 rounded-full border-2 border-[#E5A93C] shadow-lg flex items-center gap-1.5 z-20">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[11px] font-serif tracking-widest uppercase font-bold">
                  KIỆT TÁC CHÍNH
                </span>
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              </div>

              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 relative mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayImages[centerIdx]}
                  alt={`Triptych center ${centerIdx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="w-10 h-10 drop-shadow-xl text-[#E5A93C]" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between font-serif px-2 text-xs">
                <span className="text-[#8B0000] font-bold tracking-wider">
                  HOÀNG GIA #{String(centerIdx + 1).padStart(2, "0")}
                </span>
                <span className="text-[#A4782A] italic">Tình Yêu Vĩnh Hằng</span>
              </div>
            </div>
          </div>

          {/* Right Flank Wing (col-span-3) */}
          <div
            onClick={() => setCenterIdx(rightIdx)}
            className="md:col-span-3 order-3 md:order-3 cursor-pointer group transition-all duration-500 hover:scale-102"
          >
            <div className="bg-white p-3 border-2 border-[#E5A93C]/40 rounded-xl shadow-md group-hover:border-[#E5A93C] group-hover:shadow-xl transition-all">
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayImages[rightIdx]}
                  alt={`Triptych right ${rightIdx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-[10px] font-serif text-[#8B0000] font-semibold tracking-wider">
                    XEM TẤM NÀY →
                  </span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs font-serif text-stone-500">
                Khung Hữu #{rightIdx + 1}
              </div>
            </div>
          </div>
        </div>

        {/* Quick controls & indicators */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-[#8B0000] text-[#E5A93C] hover:bg-[#A31212] transition-colors shadow-md active:scale-95 border border-[#E5A93C]/40"
            aria-label="Tác phẩm trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {displayImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCenterIdx(i)}
                className={`h-2.5 rounded-full transition-all ${
                  centerIdx === i ? "w-8 bg-[#8B0000] border border-[#E5A93C]" : "w-2.5 bg-[#E5A93C]/40"
                }`}
                aria-label={`Chọn tác phẩm ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-[#8B0000] text-[#E5A93C] hover:bg-[#A31212] transition-colors shadow-md active:scale-95 border border-[#E5A93C]/40"
            aria-label="Tác phẩm sau"
          >
            <ChevronRight className="w-5 h-5" />
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
            className="max-w-4xl max-h-[85vh] bg-white p-4 pb-8 rounded-xl border-2 border-[#E5A93C] shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[lightboxIndex]}
              alt={`Xem chi tiết ${lightboxIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain mx-auto rounded-lg"
            />
            <div className="mt-3 font-serif text-sm text-[#8B0000] font-bold">
              HOÀNG GIA #{lightboxIndex + 1} / {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
