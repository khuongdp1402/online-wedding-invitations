"use client";

import React, { useEffect, useRef, useState } from "react";
import { Crown, Sparkles } from "lucide-react";

type GalleryProps = {
  gallery?: string[];
};

const FALLBACK_IMAGE = "/templates/classic-burgundy/samples/01.jpg";

/**
 * A single royal-portrait medallion: double gold ring, small crest flourish
 * at the top, and a scroll-triggered "unveiling" reveal (fade + gentle
 * scale-up — stately, not bouncy). Alternates left/right of the central
 * gold branch line to read as a symmetrical, formal procession.
 */
function GalleryMedallion({
  src,
  index,
  side,
}: {
  src: string;
  index: number;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      className={`relative flex items-center justify-center md:justify-start pl-20 md:pl-0 ${
        side === "right" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Ornamental branch node: gold diamond/crest marker on the trunk */}
      <span
        aria-hidden
        className="absolute top-1/2 left-6 md:left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
      >
        <span
          className="block w-4 h-4 rotate-45 border-2 border-[#F0D080] bg-[#7A0020]"
          style={{ boxShadow: "0 0 12px rgba(201,168,76,0.8)" }}
        />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-[#F0D080]" />
      </span>

      {/* Short horizontal branch connecting trunk to medallion (desktop only) */}
      <span
        aria-hidden
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-[8%] bg-gradient-to-r ${
          side === "right"
            ? "left-1/2 from-[#C9A84C] to-transparent"
            : "right-1/2 from-transparent to-[#C9A84C]"
        }`}
      />

      <div className="w-full md:w-1/2" />

      <div
        ref={ref}
        className={`w-full md:w-1/2 flex ${
          side === "right" ? "md:justify-start md:pl-12 lg:pl-16" : "md:justify-end md:pr-12 lg:pr-16"
        }`}
      >
        <div
          className="lrg-medallion-wrap"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1) translateY(0)" : "scale(0.82) translateY(24px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: `${(index % 6) * 60}ms`,
          }}
        >
          {/* Small crest flourish above the frame */}
          <div className="flex justify-center mb-2 text-[#C9A84C]">
            <Crown className="w-4 h-4" />
          </div>

          <div className="lrg-medallion-frame group">
            <div className="lrg-medallion-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Ảnh cưới hoàng gia ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.indexOf(FALLBACK_IMAGE) === -1) {
                    img.src = FALLBACK_IMAGE;
                  }
                }}
              />
            </div>
            <span className="lrg-medallion-ring" aria-hidden />
          </div>

          <div className="text-center mt-2 text-[10px] tracking-[0.3em] font-serif text-[#C9A84C]/80 uppercase">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </li>
  );
}

export function Gallery({ gallery }: GalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#0B0B14] border-b border-[#C9A84C]/30 relative overflow-hidden">
      {/* Corner gilded flourishes matching the template's formal language */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#C9A84C]/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#C9A84C]/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#C9A84C]/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#C9A84C]/40 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#FFE29F] text-xs font-serif uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            HÀNH LANG CHÂN DUNG HOÀNG GIA
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFE29F] font-bold tracking-tight">
            Bộ Sưu Tập Ảnh Cưới
          </h2>
          <div className="w-24 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
          <p className="mt-6 text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-serif leading-relaxed">
            Từng khoảnh khắc được lồng khung như chân dung hoàng tộc, nối liền bởi
            nhánh vàng son dọc theo hành lang ký ức.
          </p>
        </div>

        {/* Ornate gold vertical trunk + branching procession */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent opacity-70"
            style={{ boxShadow: "0 0 8px rgba(201,168,76,0.4)" }}
          />

          <ol className="relative flex flex-col gap-14 sm:gap-16 lg:gap-20">
            {gallery.map((src, index) => (
              <GalleryMedallion
                key={`${src}-${index}`}
                src={src}
                index={index}
                side={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
