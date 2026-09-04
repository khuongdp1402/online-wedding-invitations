"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingData } from "@/types/template";

type HeaderProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

function BotanicalLeaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M100 280 C80 200 20 160 10 80 C50 100 90 140 100 200 C110 140 150 100 190 80 C180 160 120 200 100 280Z" fill="#3A5C3A" opacity="0.5" className="vb-leaf" />
      <path d="M30 260 C40 200 10 150 5 100 C40 120 55 180 50 240" stroke="#8BA888" strokeWidth="1.5" strokeLinecap="round" fill="none" className="vb-vine" />
      <circle cx="45" cy="200" r="4" fill="#C4A96A" opacity="0.6" />
      <circle cx="100" cy="60" r="5" fill="#8BA888" opacity="0.4" />
    </svg>
  );
}

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
    const items = el.querySelectorAll(".vb-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("vb-in-view");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header ref={sectionRef} className="lg:hidden relative min-h-[100dvh] overflow-hidden flex flex-col"
        style={{ background: "linear-gradient(170deg, #1C1F14 0%, #2A3020 40%, #1C2010 100%)" }}>
        <div className="absolute top-0 left-0 w-40 h-56 opacity-50 pointer-events-none">
          <BotanicalLeaves className="w-full h-full" />
        </div>
        <div className="absolute top-0 right-0 w-32 h-48 opacity-40 pointer-events-none" style={{ transform: "scaleX(-1)" }}>
          <BotanicalLeaves className="w-full h-full" />
        </div>
        <div className="relative flex-1 min-h-[50vh] overflow-hidden vb-photo mt-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo1} alt="Anh cuoi" className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, #1C2010 100%)" }} />
        </div>
        <div className="relative z-10 px-6 pb-12 pt-4 text-center">
          <div className={`mx-auto h-px w-20 mb-4 ${inView ? "vb-vine" : "opacity-0"}`} style={{ background: "linear-gradient(to right, transparent, #8BA888, transparent)" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8BA888] font-semibold mb-3">Garden Wedding</p>
          <h1 className="vb-title font-serif text-5xl font-bold text-[#F5F0E8] leading-tight mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {firstName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-8 bg-[#C4A96A]/40" />
            <span className="vb-petal text-[#C4A96A]">&#10022;</span>
            <span className="h-px w-8 bg-[#C4A96A]/40" />
          </div>
          <h1 className="vb-title-2 font-serif text-5xl font-bold text-[#F5F0E8] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {secondName}
          </h1>
          <div className="mt-5 vb-reveal" style={{ animationDelay: "0.8s" }}>
            <p className="text-[#C4A96A] text-sm font-serif">{ceremony?.date || "22 Thang 11, 2026"}</p>
            {ceremony?.venue && <p className="text-[#8BA888]/70 text-xs mt-1">{ceremony.venue}</p>}
          </div>
          <div className="mt-8 vb-scroll-cue flex flex-col items-center">
            <div className="w-5 h-8 rounded-full border border-[#8BA888]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#8BA888] animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      <header className="hidden lg:flex min-h-screen"
        style={{ background: "linear-gradient(135deg, #1C1F14 0%, #2A3020 50%, #181D10 100%)" }}>
        <div className="relative flex flex-col justify-center items-center w-1/2 p-14 xl:p-20 text-center overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-40 opacity-30 pointer-events-none flex items-center">
            <BotanicalLeaves className="w-full h-full" />
          </div>
          <div className="relative z-10 max-w-sm">
            <p className="text-[#8BA888] text-[11px] uppercase tracking-[0.35em] font-semibold mb-2">Garden Wedding</p>
            <div className={`mx-auto h-px w-24 mb-8 ${inView ? "vb-vine" : "opacity-0"}`} style={{ background: "linear-gradient(to right, transparent, #8BA888, transparent)" }} />
            <h1 className="vb-title font-serif text-7xl xl:text-8xl font-bold text-[#F5F0E8] leading-[0.85] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {firstName}
            </h1>
            <div className="flex items-center gap-5 my-6">
              <span className="h-px flex-1 bg-[#C4A96A]/30" />
              <span className="vb-petal text-[#C4A96A] text-2xl">&#10022;</span>
              <span className="h-px flex-1 bg-[#C4A96A]/30" />
            </div>
            <h1 className="vb-title-2 font-serif text-7xl xl:text-8xl font-bold text-[#F5F0E8] leading-[0.85] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {secondName}
            </h1>
            <div className="vb-reveal vb-in-view space-y-2">
              <p className="text-[#C4A96A] font-serif text-lg">{ceremony?.date || "22 Thang 11, 2026"}</p>
              {ceremony?.lunarDate && <p className="text-[#8BA888]/60 text-sm">{ceremony.lunarDate}</p>}
              {ceremony?.venue && <p className="text-[#F5F0E8]/40 text-sm">{ceremony.venue}</p>}
            </div>
          </div>
        </div>
        <div className="w-1/2 grid grid-rows-2 gap-2 p-4">
          <div className="vb-photo rounded-xl overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo1} alt="Portrait 1" className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(28,31,20,0.3), transparent)" }} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="vb-photo rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo2} alt="Portrait 2" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#3A5C3A]/30 rounded-xl flex flex-col items-center justify-center p-6 border border-[#8BA888]/20">
              <div className="text-5xl mb-2 vb-petal">&#127807;</div>
              <p className="text-[#8BA888] text-xs text-center font-serif italic">
                &ldquo;Where flowers bloom, so does hope&rdquo;
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}