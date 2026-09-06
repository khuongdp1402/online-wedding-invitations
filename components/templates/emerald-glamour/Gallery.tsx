"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clapperboard, Sparkles } from "lucide-react";

type GalleryProps = {
  gallery?: string[];
};

/**
 * Deterministic scatter presets (percent-based so the stage scales cleanly
 * across breakpoints). Index-based, never Math.random() — keeps SSR/CSR
 * markup identical and avoids hydration mismatches.
 */
const SCATTER_PRESETS: Array<{ top: number; left: number; rotate: number }> = [
  { top: 22, left: 22, rotate: -9 },
  { top: 18, left: 62, rotate: 7 },
  { top: 46, left: 42, rotate: -4 },
  { top: 30, left: 80, rotate: 12 },
  { top: 60, left: 16, rotate: 10 },
  { top: 66, left: 68, rotate: -11 },
  { top: 14, left: 38, rotate: 5 },
  { top: 52, left: 88, rotate: -6 },
  { top: 78, left: 44, rotate: 8 },
  { top: 40, left: 8, rotate: -13 },
  { top: 74, left: 26, rotate: 4 },
  { top: 10, left: 84, rotate: -8 },
];

const MAX_DECK_SIZE = 12;

export function Gallery({ gallery }: GalleryProps) {
  const images = useMemo(() => (gallery ?? []).filter(Boolean), [gallery]);

  const stageRef = useRef<HTMLDivElement>(null);
  const [zOrder, setZOrder] = useState<number[]>(() =>
    Array.from({ length: Math.min(images.length, MAX_DECK_SIZE) }, (_, i) => i)
  );

  if (images.length === 0) {
    return null;
  }

  const deckImages = images.slice(0, MAX_DECK_SIZE);
  const overflowImages = images.slice(MAX_DECK_SIZE);

  const bringToFront = (index: number) => {
    setZOrder((prev) => {
      if (prev[prev.length - 1] === index) return prev;
      return [...prev.filter((i) => i !== index), index];
    });
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 bg-[#040D0A] text-white border-b border-[#D4AF37]/30 overflow-hidden">
      {/* Ambient emerald glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#0E3B2E]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono tracking-[0.25em] uppercase mb-3">
            <Clapperboard className="w-3.5 h-3.5" />
            GATSBY VELVET DECK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3 eg-shimmer-text">
            Bàn Ảnh Dạ Tiệc
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-serif leading-relaxed">
            Những khung hình lấp lánh như được rải trên bàn nhung của dạ tiệc Gatsby — hãy chạm và kéo để
            sắp xếp lại theo ý bạn.
          </p>
          <span className="hidden sm:inline-flex items-center gap-1.5 mt-4 text-[10px] font-mono text-[#D4AF37]/70 tracking-widest uppercase">
            <Sparkles className="w-3 h-3" /> Kéo thả từng tấm ảnh
          </span>
        </div>

        {/* Draggable velvet stage */}
        <div
          ref={stageRef}
          className="relative w-full h-[440px] sm:h-[560px] md:h-[640px] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-[inset_0_0_120px_rgba(0,0,0,0.65)]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(26,92,42,0.55) 0%, rgba(6,14,6,0.95) 72%), linear-gradient(160deg, #0A2418 0%, #05130D 60%, #030B07 100%)",
          }}
        >
          {/* Velvet sheen lines */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, rgba(212,175,55,0.6) 0px, rgba(212,175,55,0.6) 1px, transparent 1px, transparent 26px)",
            }}
          />
          {/* Corner art-deco frame accents */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />

          {deckImages.map((src, i) => {
            const preset = SCATTER_PRESETS[i % SCATTER_PRESETS.length];
            const z = zOrder.indexOf(i);
            return (
              <motion.div
                key={i}
                drag
                dragConstraints={stageRef}
                dragElastic={0.18}
                dragMomentum
                whileDrag={{ scale: 1.08, boxShadow: "0 30px 60px rgba(0,0,0,0.6)" }}
                whileHover={{ scale: 1.04 }}
                onPointerDown={() => bringToFront(i)}
                initial={{ opacity: 0, scale: 0.6, rotate: preset.rotate }}
                animate={{ opacity: 1, scale: 1, rotate: preset.rotate }}
                transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.05 }}
                className="absolute cursor-grab active:cursor-grabbing select-none touch-none"
                style={{
                  top: `${preset.top}%`,
                  left: `${preset.left}%`,
                  zIndex: 10 + z,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-32 sm:w-44 md:w-52 p-2.5 pb-6 bg-[#F5F0E0] rounded-sm shadow-[0_18px_45px_rgba(0,0,0,0.55)] border border-[#D4AF37]/70 ring-1 ring-black/10">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-stone-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Khoảnh khắc dạ tiệc ${i + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                      loading="lazy"
                      draggable={false}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.opacity = "0";
                      }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#D4AF37]/40 pointer-events-none" />
                  </div>
                  <div className="mt-2 flex items-center justify-between px-0.5">
                    <span className="text-[9px] font-mono tracking-widest text-[#0E3B2E]/70">
                      №{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#C9A84C] text-[10px]">&#9830;</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supplementary strip for the remaining photos, if any */}
        {overflowImages.length > 0 && (
          <div className="mt-8">
            <p className="text-center text-[10px] font-mono text-[#D4AF37]/60 tracking-widest uppercase mb-4">
              Thêm {overflowImages.length} khoảnh khắc khác
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
              {overflowImages.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 snap-center w-24 sm:w-32 aspect-[3/4] rounded-sm overflow-hidden border border-[#D4AF37]/40 shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Khoảnh khắc dạ tiệc ${MAX_DECK_SIZE + i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
