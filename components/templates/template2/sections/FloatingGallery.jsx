"use client";

import { useEffect, useRef } from "react";

// Góc xoay xen kẽ để tạo hiệu ứng polaroid rải tự nhiên
const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];

// Offset dọc xen kẽ giữa 2 cột để tạo dáng so le tự nhiên
const COL_OFFSETS = [0, 60, 20, -30, 40, -10, 30, -40];

export default function FloatingGallery({ chapter }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".polaroid-item");
    if (!items || items.length === 0) return;

    // Fade-in nhẹ khi scroll vào viewport (IntersectionObserver — không gây scrub lock)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = entry.target.dataset.finalTransform;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const images = chapter.images || [];

  // Chia ảnh thành 2 cột
  const leftCol = images.filter((_, i) => i % 2 === 0);
  const rightCol = images.filter((_, i) => i % 2 === 1);

  const renderPolaroid = (src, globalIndex) => {
    const rotate = ROTATIONS[globalIndex % ROTATIONS.length];
    const offsetY = COL_OFFSETS[globalIndex % COL_OFFSETS.length];
    const finalTransform = `rotate(${rotate}deg) translateY(${offsetY}px)`;
    const initTransform = `rotate(${rotate}deg) translateY(${offsetY + 40}px)`;

    return (
      <div
        key={globalIndex}
        className="polaroid-item w-full"
        data-final-transform={finalTransform}
        style={{
          opacity: 0,
          transform: initTransform,
          transition: "opacity 0.7s ease, transform 0.7s ease",
          willChange: "transform, opacity",
        }}
      >
        <div className="w-full bg-white p-[8px] pb-[28px] md:pb-[40px] shadow-2xl rounded-sm border border-gray-100/50 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-transform duration-500">
          <img
            src={src}
            alt={`Kỷ niệm ${globalIndex + 1}`}
            className="w-full h-auto block rounded-[2px]"
            loading="lazy"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full py-[10vh] px-4 md:px-8"
    >
      {/* Title */}
      <div className="relative z-20 text-center mb-[8vh] pointer-events-none">
        <h2
          className="text-[70px] md:text-[110px] font-[family-name:var(--font-serif-display)] leading-none tracking-tighter text-[var(--color-text-primary)]"
          style={{ textShadow: "0 2px 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)" }}
        >
          {chapter.title}
        </h2>
        {chapter.quote && (
          <p
            className="mt-6 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-sans text-[var(--color-text-secondary)]"
            style={{ textShadow: "0 1px 10px rgba(255,255,255,0.8)" }}
          >
            {chapter.quote}
          </p>
        )}
      </div>

      {/* 2-column polaroid grid — natural flow, no absolute/overflow-hidden */}
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-10 max-w-[900px] mx-auto">
        {/* Cột trái */}
        <div className="flex flex-col gap-6 md:gap-10 pt-[60px]">
          {leftCol.map((src, i) => renderPolaroid(src, i * 2))}
        </div>
        {/* Cột phải — lệch xuống tạo dáng so le */}
        <div className="flex flex-col gap-6 md:gap-10 pt-0">
          {rightCol.map((src, i) => renderPolaroid(src, i * 2 + 1))}
        </div>
      </div>
    </div>
  );
}
