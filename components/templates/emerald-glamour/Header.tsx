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
    const items = el.querySelectorAll(".eg-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("eg-in-view");
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
        style={{ background: "linear-gradient(180deg, #0A120A 0%, #0E1A0E 40%, #060E06 100%)" }}>
        {/* Art deco gold frame corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#C9A84C] pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C9A84C] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#C9A84C] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#C9A84C] pointer-events-none" />

        <div className="relative flex-1 min-h-[55vh] overflow-hidden eg-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo1} alt="Anh cuoi" className="w-full h-full object-cover" style={{ objectPosition: "center 20%", opacity: 0.75 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,18,10,0.3) 0%, rgba(10,18,10,0.85) 80%, #0A120A 100%)" }} />
          {/* Gold shimmer overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.15) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 px-6 pb-12 pt-4 text-center">
          {/* Art deco divider */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#C9A84C]/50" />
            <span className="eg-diamond text-[#C9A84C] text-xs">&#9830;</span>
            <span className="h-px w-8 bg-[#C9A84C]/50" />
          </div>

          <h1 className="eg-name font-serif text-5xl font-bold leading-tight mb-2 eg-shimmer-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {firstName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-6 bg-[#1A5C2A]/80" />
            <span className="text-[#C9A84C] text-sm font-serif italic">&amp;</span>
            <span className="h-px w-6 bg-[#1A5C2A]/80" />
          </div>
          <h1 className="eg-name-2 font-serif text-5xl font-bold leading-tight eg-shimmer-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {secondName}
          </h1>

          <div className="mt-5 eg-reveal" style={{ animationDelay: "0.8s" }}>
            <p className="text-[#C9A84C] text-sm font-serif">{ceremony?.date || "22 Thang 11, 2026"}</p>
            {ceremony?.venue && <p className="text-[#2E8B4A]/80 text-xs mt-1">{ceremony.venue}</p>}
          </div>
          <div className="mt-8 eg-scroll-cue flex flex-col items-center">
            <div className="w-5 h-8 rounded-full border border-[#C9A84C]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#C9A84C] animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      {/* DESKTOP */}
      <header className="hidden lg:flex min-h-screen"
        style={{ background: "linear-gradient(135deg, #0A120A 0%, #0F1A0F 50%, #060E06 100%)" }}>
        {/* Left: Gatsby info panel */}
        <div className="relative flex flex-col justify-center items-center w-1/2 p-14 xl:p-20 text-center overflow-hidden">
          {/* Corner art deco frames */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#C9A84C]/60 pointer-events-none" />
          <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#C9A84C]/60 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#C9A84C]/60 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#C9A84C]/60 pointer-events-none" />

          <div className="relative z-10 max-w-sm">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className={`h-px w-12 bg-[#C9A84C]/40 ${inView ? "eg-fan-line" : "opacity-0"}`} />
              <span className="eg-diamond text-[#C9A84C]">&#9830;</span>
              <span className={`h-px w-12 bg-[#C9A84C]/40 ${inView ? "eg-fan-line" : "opacity-0"}`} />
            </div>
            <p className="text-[#2E8B4A] text-[11px] uppercase tracking-[0.35em] font-semibold mb-6">The Gatsby Wedding</p>

            <h1 className="eg-name eg-shimmer-text font-serif text-7xl xl:text-8xl font-bold leading-[0.85] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {firstName}
            </h1>
            <div className="flex items-center gap-5 my-6">
              <span className="h-px flex-1 bg-[#1A5C2A]/50" />
              <span className="eg-gold-glow text-[#C9A84C] text-2xl font-serif italic">&amp;</span>
              <span className="h-px flex-1 bg-[#1A5C2A]/50" />
            </div>
            <h1 className="eg-name-2 eg-shimmer-text font-serif text-7xl xl:text-8xl font-bold leading-[0.85] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {secondName}
            </h1>

            <div className="eg-reveal eg-in-view space-y-2">
              <p className="text-[#C9A84C] font-serif text-lg">{ceremony?.date || "22 Thang 11, 2026"}</p>
              {ceremony?.lunarDate && <p className="text-[#2E8B4A]/60 text-sm">{ceremony.lunarDate}</p>}
              {ceremony?.venue && <p className="text-[#F5F0E0]/40 text-sm">{ceremony.venue}</p>}
            </div>
          </div>
        </div>

        {/* Right: dual photo with art deco frame */}
        <div className="w-1/2 relative grid grid-rows-2 gap-2 p-4">
          <div className="eg-photo eg-frame rounded-none overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo1} alt="Portrait 1" className="w-full h-full object-cover" style={{ objectPosition: "center 20%", opacity: 0.85 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent 40%, rgba(10,18,10,0.4) 100%)" }} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="eg-photo eg-frame rounded-none overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo2} alt="Portrait 2" className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
            </div>
            <div className="flex flex-col items-center justify-center p-6 border border-[#C9A84C]/30" style={{ background: "rgba(26,92,42,0.1)" }}>
              <div className="eg-diamond text-[#C9A84C] text-3xl mb-3">&#9830;</div>
              <p className="text-[#C9A84C]/70 text-xs text-center font-serif italic leading-relaxed">
                {wedding.quote || "&ldquo;Not all that glitters is gold, but this love is&rdquo;"}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}