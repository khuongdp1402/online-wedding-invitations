"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE_LUXURY } from "../config/motionConstants";

export default function FullscreenQuoteSection({ chapter }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Vol.2 (30%-45%): Pin ảnh chính giữa màn hình
    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=150%",
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        // Background mờ đi, quote hiện lên
        gsap.to(imageRef.current, { scale: 1.05, duration: 3, ease: "power1.out" });
        gsap.to(quoteRef.current, { opacity: 1, y: 0, duration: 2, ease: EASE_LUXURY, delay: 0.5 });
      },
    });

    return () => {
      if (triggerRef.current) triggerRef.current.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Ảnh Proposal — pinned fullscreen */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${chapter.images[0]})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Quote handwriting — Vol.2: "Text handwriting chạy ngang viền khung hình" */}
      <div
        ref={quoteRef}
        className="relative z-10 opacity-0 translate-y-8 text-center px-8"
      >
        <p className="text-[40px] md:text-[70px] font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] leading-tight">
          {chapter.quote}
        </p>
        <p className="mt-8 text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-sans text-white/70">
          {chapter.title}
        </p>
      </div>
    </div>
  );
}
