"use client";

import React, { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface ClothespinWireGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  badge?: string;
  theme?: {
    woodPegColor?: string;
    ropeColor?: string;
    bgStyle?: string;
    textColor?: string;
  };
}

export function ClothespinWireGallery({
  images,
  title = "Khoảnh Khắc Kỷ Niệm",
  subtitle = "Từng bức ảnh kỷ niệm được kẹp trên dây thừng mộc mạc lưu giữ tháng ngày hạnh phúc.",
  badge = "PHOTO HANGING WIRE",
}: ClothespinWireGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages = images && images.length > 0 ? images : [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/05.jpg",
    "/templates/classic-burgundy/samples/06.jpg",
  ];

  // Natural tilt angles for photos hanging on the line
  const tilts = [-2.5, 3.2, -1.8, 2.7, -3.5, 1.9, -2.1, 2.4];

  // Split images into 2 rows of hanging lines
  const half = Math.ceil(displayImages.length / 2);
  const row1 = displayImages.slice(0, half);
  const row2 = displayImages.slice(half);

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
    <section className="py-20 px-4 sm:px-8 relative overflow-hidden bg-[#FAF6EE] border-b border-[#E8DFC8]">
      {/* Rustic background subtle pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#8A9A5B 0.75px, transparent 0.75px), radial-gradient(#8A9A5B 0.75px, #FAF6EE 0.75px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 15px 15px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {badge && (
          <span className="inline-block px-4 py-1 rounded-full bg-[#EAE2D0] text-[#4A5D3F] border border-[#D5C6A8] text-xs font-serif uppercase tracking-[0.25em] mb-3">
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-[#2D3E2E] font-medium mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#6C7865] max-w-lg mx-auto mb-16 font-serif leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Hanging Wire Row 1 */}
        <div className="relative mb-20 pt-8 pb-4">
          {/* Jute Twine Line */}
          <div className="absolute top-10 left-2 right-2 h-[3px] bg-gradient-to-r from-[#C2A677] via-[#9F804C] to-[#C2A677] shadow-[0_2px_4px_rgba(0,0,0,0.15)] rounded-full" />

          {/* Wall Anchors */}
          <div className="absolute top-[34px] left-0 w-4 h-4 rounded-full bg-[#7D5F36] border-2 border-[#574022] shadow-md -translate-y-1/2" />
          <div className="absolute top-[34px] right-0 w-4 h-4 rounded-full bg-[#7D5F36] border-2 border-[#574022] shadow-md -translate-y-1/2" />

          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 pt-4">
            {row1.map((src, idx) => {
              const tilt = tilts[idx % tilts.length];
              return (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="relative cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-20"
                  style={{
                    transform: `rotate(${tilt}deg)`,
                    transformOrigin: "top center",
                  }}
                >
                  {/* Wooden Clothespin */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-9 z-20 pointer-events-none drop-shadow-md">
                    <div className="w-full h-full bg-gradient-to-b from-[#D4A373] via-[#BA8150] to-[#8C582B] rounded-xs border border-[#7A4B23]">
                      <div className="w-full h-[3px] bg-[#3B2F2F] mt-3" />
                    </div>
                  </div>

                  {/* Polaroid Frame */}
                  <div className="bg-white p-3 pt-3.5 pb-6 rounded-xs shadow-[0_10px_25px_rgba(40,30,20,0.15)] border border-[#E5DAC6] w-48 sm:w-56 group-hover:shadow-[0_15px_35px_rgba(40,30,20,0.25)] transition-shadow">
                    <div className="w-full aspect-[4/5] overflow-hidden bg-[#FAF6EE] relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#2D3E2E]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-6 h-6 drop-shadow-md" />
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <span className="font-serif italic text-xs text-[#5D6B58]">
                        Memory #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hanging Wire Row 2 (if exists) */}
        {row2.length > 0 && (
          <div className="relative pt-8 pb-4">
            {/* Jute Twine Line */}
            <div className="absolute top-10 left-2 right-2 h-[3px] bg-gradient-to-r from-[#C2A677] via-[#9F804C] to-[#C2A677] shadow-[0_2px_4px_rgba(0,0,0,0.15)] rounded-full" />
            <div className="absolute top-[34px] left-0 w-4 h-4 rounded-full bg-[#7D5F36] border-2 border-[#574022] shadow-md -translate-y-1/2" />
            <div className="absolute top-[34px] right-0 w-4 h-4 rounded-full bg-[#7D5F36] border-2 border-[#574022] shadow-md -translate-y-1/2" />

            <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 pt-4">
              {row2.map((src, i) => {
                const idx = half + i;
                const tilt = tilts[idx % tilts.length];
                return (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-20"
                    style={{
                      transform: `rotate(${tilt}deg)`,
                      transformOrigin: "top center",
                    }}
                  >
                    {/* Wooden Clothespin */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-9 z-20 pointer-events-none drop-shadow-md">
                      <div className="w-full h-full bg-gradient-to-b from-[#D4A373] via-[#BA8150] to-[#8C582B] rounded-xs border border-[#7A4B23]">
                        <div className="w-full h-[3px] bg-[#3B2F2F] mt-3" />
                      </div>
                    </div>

                    {/* Polaroid Frame */}
                    <div className="bg-white p-3 pt-3.5 pb-6 rounded-xs shadow-[0_10px_25px_rgba(40,30,20,0.15)] border border-[#E5DAC6] w-48 sm:w-56 group-hover:shadow-[0_15px_35px_rgba(40,30,20,0.25)] transition-shadow">
                      <div className="w-full aspect-[4/5] overflow-hidden bg-[#FAF6EE] relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#2D3E2E]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ZoomIn className="w-6 h-6 drop-shadow-md" />
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <span className="font-serif italic text-xs text-[#5D6B58]">
                          Memory #{String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
            className="max-w-4xl max-h-[85vh] bg-white p-3 pb-8 rounded-sm shadow-2xl relative"
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
