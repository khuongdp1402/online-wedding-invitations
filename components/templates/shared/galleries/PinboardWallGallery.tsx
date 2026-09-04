"use client";

import React, { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface PinboardWallGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function PinboardWallGallery({
  images,
  title = "Bảng Kỷ Niệm Tình Yêu",
  subtitle = "Từng thước ảnh màu nước được đính ghim lưu giữ trên bức tường kỷ niệm ngọt ngào.",
  badge = "MEMORIES PINBOARD",
}: PinboardWallGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages = images && images.length > 0 ? images : [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/05.jpg",
    "/templates/classic-burgundy/samples/06.jpg",
  ];

  // Random-looking but deterministic rotations and tape styles
  const cardStyles = [
    { rotate: "-2deg", pinColor: "#C59B27", tape: "left" },
    { rotate: "3deg", pinColor: "#B85D38", tape: "right" },
    { rotate: "-3.5deg", pinColor: "#5B7065", tape: "both" },
    { rotate: "2deg", pinColor: "#C59B27", tape: "none" },
    { rotate: "-1.5deg", pinColor: "#B85D38", tape: "left" },
    { rotate: "3.5deg", pinColor: "#5B7065", tape: "right" },
  ];

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
    <section className="py-20 px-4 sm:px-8 relative bg-[#F7F1EB] border-b border-[#E3D4C4] overflow-hidden">
      {/* Corkboard / Paper texture simulation */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#A3704C 1px, transparent 1px), radial-gradient(#D6A275 1px, #F7F1EB 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {badge && (
          <span className="inline-block px-4 py-1 rounded-full bg-[#EADCCF] text-[#8C5338] border border-[#D5C0B0] text-xs font-serif uppercase tracking-[0.25em] mb-3">
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-[#422114] font-medium mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#7D5C4C] max-w-lg mx-auto mb-16 font-serif leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Pinboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {displayImages.map((src, idx) => {
            const style = cardStyles[idx % cardStyles.length];
            return (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="relative cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-20 p-2"
                style={{
                  transform: `rotate(${style.rotate})`,
                }}
              >
                {/* Copper Pushpin */}
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-20 shadow-md flex items-center justify-center pointer-events-none"
                  style={{
                    backgroundColor: style.pinColor,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.4)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                </div>

                {/* Washi Tape Accent */}
                {style.tape === "left" && (
                  <div className="absolute -top-3 left-4 w-16 h-5 bg-[#E6CCB2]/80 -rotate-12 z-10 shadow-xs border-dashed border-x border-[#C5A88A]" />
                )}
                {style.tape === "right" && (
                  <div className="absolute -top-3 right-4 w-16 h-5 bg-[#DDBEA9]/80 rotate-12 z-10 shadow-xs border-dashed border-x border-[#BA9A83]" />
                )}
                {style.tape === "both" && (
                  <>
                    <div className="absolute -top-3 left-4 w-14 h-5 bg-[#E6CCB2]/80 -rotate-12 z-10 shadow-xs border-dashed border-x border-[#C5A88A]" />
                    <div className="absolute -bottom-2 right-4 w-14 h-5 bg-[#DDBEA9]/80 -rotate-6 z-10 shadow-xs border-dashed border-x border-[#BA9A83]" />
                  </>
                )}

                {/* Photo Card */}
                <div className="bg-[#FFFDF9] p-3 pb-6 rounded-sm shadow-[0_12px_24px_rgba(70,40,20,0.12)] border border-[#E8DCCF] group-hover:shadow-[0_18px_36px_rgba(70,40,20,0.22)] transition-shadow">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[#F2ECE4] relative rounded-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Pinboard photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#422114]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ZoomIn className="w-6 h-6 drop-shadow-md" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between font-serif text-xs text-[#8C6D58] px-1">
                    <span>#KhoảnhKhắc_{idx + 1}</span>
                    <span className="italic text-[#B9856F]">Forever &amp; Always</span>
                  </div>
                </div>
              </div>
            );
          })}
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
