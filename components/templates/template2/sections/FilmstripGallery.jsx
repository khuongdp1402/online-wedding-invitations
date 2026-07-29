"use client";

import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/**
 * FilmstripGallery — Hiển thị collapse images dạng vertical filmstrip
 * Mỗi ảnh hiện full-width, KHÔNG dùng ScrollTrigger animation
 * để tránh scroll-lock khi trigger positions bị lệch.
 */
export default function FilmstripGallery({ chapter }) {
  const images = chapter.images || [];

  return (
    <div className="relative w-full py-[10vh]">
      {/* Title */}
      <div className="relative z-20 text-center mb-[8vh] pointer-events-none">
        <h2
          className="text-[60px] md:text-[100px] font-[family-name:var(--font-serif-display)] leading-none tracking-tighter text-[var(--color-text-primary)]"
          style={{ textShadow: '0 2px 30px rgba(255,255,255,0.8)' }}
        >
          {chapter.title}
        </h2>
        {chapter.quote && (
          <p className="mt-6 text-[10px] md:text-[12px] tracking-[0.2em] uppercase font-sans text-[var(--color-text-secondary)]">
            {chapter.quote}
          </p>
        )}
      </div>

      {/* Filmstrip — mỗi ảnh hiện độc lập, full-width, có shadow + rounded */}
      <div className="flex flex-col items-center gap-[6vh] px-4 md:px-8">
        {images.map((src, index) => (
          <div
            key={index}
            className="filmstrip-item w-full max-w-[900px]"
          >
            <div className="relative w-full overflow-hidden rounded-lg shadow-2xl">
              {/* Ảnh ghép — aspect ratio tự nhiên, không crop */}
              <img
                src={src}
                alt={`Khoảnh khắc ${index + 1}`}
                className="w-full h-auto block"
                loading="eager"
                onLoad={() => {
                  if (typeof window !== 'undefined' && ScrollTrigger) {
                    ScrollTrigger.refresh();
                  }
                }}
              />
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.08) 100%)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
