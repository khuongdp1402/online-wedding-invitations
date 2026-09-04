"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface PortraitCoverflowGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  badge?: string;
}

export function PortraitCoverflowGallery({
  images,
  title = "Lookbook Chân Dung",
  subtitle = "Tuyển tập những khung hình chân dung thanh lịch theo phong cách tối giản Seoul Studio.",
  badge = "EDITORIAL COVERFLOW",
}: PortraitCoverflowGalleryProps) {
  const displayImages = images && images.length > 0 ? images : [
    "/templates/classic-burgundy/samples/01.jpg",
    "/templates/classic-burgundy/samples/02.jpg",
    "/templates/classic-burgundy/samples/03.jpg",
    "/templates/classic-burgundy/samples/04.jpg",
    "/templates/classic-burgundy/samples/05.jpg",
    "/templates/classic-burgundy/samples/06.jpg",
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FAF9F5] border-b border-stone-200 overflow-hidden relative">
      <div className="max-w-5xl mx-auto text-center">
        {badge && (
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400 block mb-2">
            {"//"} {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-12 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Carousel Coverflow Stage */}
        <div className="relative flex items-center justify-center min-h-[420px] sm:min-h-[520px] my-6">
          {displayImages.map((src, idx) => {
            const diff = (idx - activeIndex + displayImages.length) % displayImages.length;
            const isCenter = diff === 0;
            const isLeft = diff === displayImages.length - 1;
            const isRight = diff === 1;

            if (!isCenter && !isLeft && !isRight) return null;

            let transformClass = "";
            let zIndex = 10;
            let opacityClass = "opacity-40 scale-85";

            if (isCenter) {
              transformClass = "translate-x-0 scale-100";
              zIndex = 30;
              opacityClass = "opacity-100 shadow-2xl";
            } else if (isLeft) {
              transformClass = "-translate-x-40 sm:-translate-x-64 scale-90 -rotate-3";
              zIndex = 20;
              opacityClass = "opacity-50 hover:opacity-80";
            } else if (isRight) {
              transformClass = "translate-x-40 sm:translate-x-64 scale-90 rotate-3";
              zIndex = 20;
              opacityClass = "opacity-50 hover:opacity-80";
            }

            return (
              <div
                key={idx}
                onClick={() => {
                  if (isCenter) setLightboxOpen(true);
                  else setActiveIndex(idx);
                }}
                className={`absolute top-0 w-64 sm:w-80 cursor-pointer transition-all duration-500 ease-out ${transformClass} ${opacityClass}`}
                style={{ zIndex }}
              >
                <div className="bg-white p-3.5 border border-stone-200 shadow-xl group">
                  <div className="w-full aspect-[3/4] overflow-hidden bg-stone-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Portrait ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {isCenter && (
                      <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-7 h-7 drop-shadow-md" />
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-stone-500 pt-1.5 border-t border-stone-100">
                    <span className="font-bold text-stone-900">
                      FRAME #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-stone-400">SEOUL STUDIO</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white transition-colors shadow-xs"
            aria-label="Khung ảnh trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {displayImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === i ? "w-8 bg-stone-900" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Đi tới ảnh ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white transition-colors shadow-xs"
            aria-label="Khung ảnh kế tiếp"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails strip */}
        <div className="flex items-center justify-center gap-3 mt-8 overflow-x-auto py-2">
          {displayImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-14 h-18 shrink-0 overflow-hidden border-2 rounded-xs transition-all ${
                activeIndex === i
                  ? "border-stone-900 scale-105 shadow-md"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] bg-white p-4 pb-8 rounded-sm shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImages[activeIndex]}
              alt={`Xem chi tiết ${activeIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
            <div className="mt-3 font-mono text-xs text-stone-500 uppercase">
              LOOKBOOK PROOF #{String(activeIndex + 1).padStart(2, "0")} • SEOUL STUDIO
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
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
