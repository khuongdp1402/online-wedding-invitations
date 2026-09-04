"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingData } from "@/types/template";

type HeaderProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Header({ wedding, isBrideMode }: HeaderProps) {
  const photo1 = wedding.gallery?.[0] || "/templates/classic-burgundy/samples/01.jpg";
  const photo2 = wedding.gallery?.[1] || "/templates/classic-burgundy/samples/02.jpg";
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".bt-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("bt-in-view");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* MOBILE */}
      <header ref={sectionRef} className="lg:hidden relative min-h-[100dvh] overflow-hidden flex flex-col"
        style={{ background: "linear-gradient(180deg, #1A0E08 0%, #2D1508 30%, #4A2010 70%, #1A0E08 100%)" }}>
        {/* Sunset gradient overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(196,98,42,0.4) 0%, transparent 70%)" }} />

        {/* Main photo with terracotta tint */}
        <div className="relative flex-1 min-h-[55vh] overflow-hidden bt-photo mt-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo1} alt="Anh cuoi" className="w-full h-full object-cover" style={{ objectPosition: "center 20%", opacity: 0.7 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,14,8,0.2) 0%, rgba(26,14,8,0.8) 70%, #1A0E08 100%)" }} />
          {/* Sun circle */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bt-sun"
            style={{ background: "radial-gradient(circle, #E8996A 0%, #C4622A 50%, transparent 80%)", opacity: 0.7 }} />
        </div>

        <div className="relative z-10 px-6 pb-12 pt-4 text-center">
          <div className={`mx-auto h-0.5 w-20 mb-4 ${inView ? "bt-sunrise-line" : "opacity-0"}`} style={{ background: "linear-gradient(to right, transparent, #C4622A, transparent)" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#E8996A] font-semibold mb-3">Desert Wedding</p>

          <h1 className="bt-name font-serif text-5xl font-bold text-[#F8F0E8] leading-tight mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {firstName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-8 bg-[#C4622A]/50" />
            <span className="bt-flicker text-[#C4622A] text-xl">&#10022;</span>
            <span className="h-px w-8 bg-[#C4622A]/50" />
          </div>
          <h1 className="bt-name-2 font-serif text-5xl font-bold text-[#F8F0E8] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {secondName}
          </h1>
          <div className="mt-5 bt-reveal" style={{ animationDelay: "0.8s" }}>
            <p className="text-[#E8996A] text-sm font-serif">{ceremony?.date || "22 Thang 11, 2026"}</p>
            {ceremony?.venue && <p className="text-[#D4B896]/70 text-xs mt-1">{ceremony.venue}</p>}
          </div>
          <div className="mt-8 bt-scroll-cue flex flex-col items-center">
            <div className="w-5 h-8 rounded-full border border-[#C4622A]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#E8996A] animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      {/* DESKTOP */}
      <header className="hidden lg:grid min-h-screen" style={{ gridTemplateColumns: "50% 50%" }}>
        {/* Left: dark terracotta info */}
        <div className="relative flex flex-col justify-center items-center p-14 xl:p-20 text-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #1A0E08 0%, #2D1508 60%, #1A0E08 100%)" }}>
          {/* Background sun glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(196,98,42,0.2) 0%, transparent 70%)" }} />

          <div className="relative z-10 max-w-sm">
            <div className="text-4xl mb-4 bt-flicker">&#9728;</div>
            <p className="text-[#E8996A] text-[11px] uppercase tracking-[0.35em] font-semibold mb-2">Desert Sunset Wedding</p>
            <div className={`mx-auto h-0.5 w-24 mb-8 ${inView ? "bt-sunrise-line" : "opacity-0"}`} style={{ background: "linear-gradient(to right, transparent, #C4622A, transparent)" }} />

            <h1 className="bt-name font-serif text-7xl xl:text-8xl font-bold leading-[0.85] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F8F0E8" }}>
              {firstName}
            </h1>
            <div className="flex items-center gap-5 my-6">
              <span className="h-px flex-1 bg-[#C4622A]/40" />
              <span className="bt-flicker text-[#C4622A] text-2xl">&#10022;</span>
              <span className="h-px flex-1 bg-[#C4622A]/40" />
            </div>
            <h1 className="bt-name-2 font-serif text-7xl xl:text-8xl font-bold leading-[0.85] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F8F0E8" }}>
              {secondName}
            </h1>

            <div className="bt-reveal bt-in-view space-y-2">
              <p className="text-[#E8996A] font-serif text-lg">{ceremony?.date || "22 Thang 11, 2026"}</p>
              {ceremony?.lunarDate && <p className="text-[#D4B896]/60 text-sm">{ceremony.lunarDate}</p>}
              {ceremony?.venue && <p className="text-[#F8F0E8]/40 text-sm">{ceremony.venue}</p>}
            </div>
          </div>
        </div>

        {/* Right: sunset photo composition */}
        <div className="relative overflow-hidden" style={{ background: "#1A0E08" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo1} alt="Portrait" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.75, objectPosition: "center 20%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent 30%, rgba(26,14,8,0.7) 100%)" }} />
          {/* Inset second photo */}
          <div className="absolute bottom-8 right-8 w-32 h-40 overflow-hidden bt-photo" style={{ border: "2px solid #C4622A", boxShadow: "0 0 20px rgba(196,98,42,0.4)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo2} alt="Portrait 2" className="w-full h-full object-cover" />
          </div>
          {/* Quote overlay */}
          {wedding.quote && (
            <div className="absolute bottom-8 left-8 right-48 bt-reveal bt-in-view" style={{ animationDelay: "1.2s" }}>
              <p className="text-xs italic text-[#F8F0E8]/70 leading-relaxed font-serif">
                &ldquo;{wedding.quote}&rdquo;
              </p>
            </div>
          )}
        </div>
      </header>
    </>
  );
}