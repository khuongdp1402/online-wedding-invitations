"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CoverflowJourneyGallery({ chapter }) {
  const images = chapter.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play interval
  useEffect(() => {
    if (images.length === 0 || isHovered) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [images.length, isHovered, nextSlide]);

  if (images.length === 0) return null;

  return (
    <section 
      className="relative w-full min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-between overflow-hidden py-16 md:py-24"
    >
      <div className="text-center z-20 pointer-events-none mb-8 md:mb-12">
        <h2 className="text-[40px] sm:text-[50px] md:text-[80px] font-[family-name:var(--font-serif-display)] text-[var(--color-text-primary)] leading-none drop-shadow-sm">
          {chapter.title}
        </h2>
        {chapter.quote && (
          <p className="mt-4 md:mt-6 text-[10px] sm:text-[12px] md:text-sm tracking-[0.2em] font-sans text-[color-mix(in_srgb,var(--color-text-primary)_70%,transparent)] uppercase">
            {chapter.quote}
          </p>
        )}
      </div>

      <div 
        className="relative w-full h-[420px] md:h-[600px] flex items-center justify-center overflow-visible my-8"
        style={{ perspective: "1500px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false}>
          {images.map((src, index) => {
            // Tính toán khoảng cách (offset) từ thẻ hiện tại đến activeIndex
            const length = images.length;
            let offset = (index - activeIndex) % length;
            if (offset > Math.floor(length / 2)) offset -= length;
            if (offset < -Math.floor(length / 2)) offset += length;

            const isCenter = offset === 0;
            const direction = Math.sign(offset);
            const absOffset = Math.abs(offset);

            // Hiển thị nhiều ảnh hơn ở hai bên (ví dụ 4 ảnh mỗi bên trên desktop)
            if (absOffset > 4) return null;

            return (
              <motion.div
                key={src}
                className="absolute w-[260px] h-[390px] md:w-[400px] md:h-[600px] origin-center cursor-pointer"
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.15,
                  scale: isCenter ? 1 : 0.85 - absOffset * 0.05,
                  rotateY: isCenter ? 0 : direction * -45,
                  // Tăng độ xòe rộng ra 2 bên bằng cách dùng % lớn hơn
                  x: `${direction * absOffset * 65}%`,
                  z: isCenter ? 100 : -absOffset * 200,
                  zIndex: 50 - absOffset,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1], // easeOutCubic
                }}
              >
                <div className="w-full h-full bg-white p-3 md:p-5 rounded-2xl shadow-2xl overflow-hidden border border-[color-mix(in_srgb,var(--color-gold)_20%,transparent)]">
                  <img 
                    src={src} 
                    alt={`Journey ${index + 1}`} 
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 rounded-xl" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (Optional, for manual override) */}
      <div className="flex gap-6 z-20 mt-8 relative">
        <button 
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-gold)] hover:text-white transition-colors shadow-md"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-gold)] hover:text-white transition-colors shadow-md"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
