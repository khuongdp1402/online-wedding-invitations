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
  const [, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".aw-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("aw-in-view");
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
      <header ref={sectionRef} className="lg:hidden relative min-h-[100dvh] overflow-hidden flex flex-col bg-[#FBF8F4]">
        {/* Watercolor wash top */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 10%, rgba(184,80,48,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(138,90,114,0.1) 0%, transparent 50%)" }} />

        {/* Hero photo — full bleed with watercolor tint overlay */}
        <div className="relative flex-1 min-h-[55vh] overflow-hidden aw-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo1} alt="Anh cuoi" className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
          {/* Watercolor wash effect */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(184,80,48,0.15) 0%, transparent 40%, rgba(251,248,244,0.8) 80%, #FBF8F4 100%)", mixBlendMode: "multiply" }} />
          {/* Autumn leaves emoji deco */}
          <div className="absolute top-6 right-6 flex gap-2 opacity-70">
            <span className="aw-leaf text-2xl">&#127809;</span>
            <span className="aw-leaf text-xl" style={{ animationDelay: "1s" }}>&#127810;</span>
          </div>
        </div>

        <div className="relative z-10 px-6 pb-12 pt-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px flex-1 max-w-[2rem]" style={{ background: "linear-gradient(to right, transparent, #B85030)" }} />
            <span className="aw-leaf text-[#B85030] text-sm">&#127809;</span>
            <span className="h-px flex-1 max-w-[2rem]" style={{ background: "linear-gradient(to left, transparent, #B85030)" }} />
          </div>

          <h1 className="aw-name font-serif text-5xl font-bold text-[#2A1A12] leading-tight mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {firstName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-8" style={{ background: "#D4892A", opacity: 0.4 }} />
            <span className="text-[#D4892A] font-serif italic text-sm">&amp;</span>
            <span className="h-px w-8" style={{ background: "#D4892A", opacity: 0.4 }} />
          </div>
          <h1 className="aw-name-2 font-serif text-5xl font-bold text-[#2A1A12] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {secondName}
          </h1>
          <div className="mt-5 aw-reveal" style={{ animationDelay: "0.8s" }}>
            <p className="text-[#B85030] text-sm font-serif">{ceremony?.date || "22 Thang 11, 2026"}</p>
            {ceremony?.venue && <p className="text-[#7A6555] text-xs mt-1">{ceremony.venue}</p>}
          </div>
          <div className="mt-8 aw-scroll-cue flex flex-col items-center">
            <div className="w-5 h-8 rounded-full border border-[#B85030]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#B85030] animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      {/* DESKTOP */}
      <header className="hidden lg:flex min-h-screen bg-[#FBF8F4]">
        {/* Left: info with watercolor texture */}
        <div className="relative flex flex-col justify-center items-center w-1/2 p-14 xl:p-20 text-center overflow-hidden">
          {/* Watercolor blobs */}
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(184,80,48,0.12) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(138,90,114,0.1) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

          {/* Autumn leaves decoration */}
          <div className="absolute top-12 right-8 text-4xl aw-leaf opacity-40">&#127809;</div>
          <div className="absolute bottom-16 left-10 text-3xl aw-leaf opacity-30" style={{ animationDelay: "1.5s" }}>&#127810;</div>

          <div className="relative z-10 max-w-sm">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px flex-1 max-w-[3rem]" style={{ background: "linear-gradient(to right, transparent, #B85030)" }} />
              <span className="aw-leaf text-[#B85030]">&#127809;</span>
              <span className="h-px flex-1 max-w-[3rem]" style={{ background: "linear-gradient(to left, transparent, #B85030)" }} />
            </div>

            <h1 className="aw-name font-serif text-7xl xl:text-8xl font-bold text-[#2A1A12] leading-[0.85] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {firstName}
            </h1>
            <div className="flex items-center gap-5 my-6">
              <span className="h-px flex-1" style={{ background: "rgba(212,137,42,0.3)" }} />
              <span className="text-[#D4892A] text-2xl font-serif italic">&amp;</span>
              <span className="h-px flex-1" style={{ background: "rgba(212,137,42,0.3)" }} />
            </div>
            <h1 className="aw-name-2 font-serif text-7xl xl:text-8xl font-bold text-[#2A1A12] leading-[0.85] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {secondName}
            </h1>

            <div className="aw-reveal aw-in-view space-y-2">
              <p className="text-[#B85030] font-serif text-lg">{ceremony?.date || "22 Thang 11, 2026"}</p>
              {ceremony?.lunarDate && <p className="text-[#8A5A72]/70 text-sm">{ceremony.lunarDate}</p>}
              {ceremony?.venue && <p className="text-[#7A6555] text-sm">{ceremony.venue}</p>}
            </div>

            {wedding.quote && (
              <div className="mt-8 aw-reveal aw-in-view" style={{ animationDelay: "0.5s" }}>
                <p className="text-xs italic text-[#7A6555] leading-relaxed font-serif">
                  &ldquo;{wedding.quote}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: overlapping photo composition */}
        <div className="w-1/2 relative p-8 flex flex-col gap-4">
          {/* Main photo */}
          <div className="flex-1 aw-photo overflow-hidden rounded-2xl relative" style={{ minHeight: "400px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo1} alt="Portrait 1" className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
            {/* Autumn warmth overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom right, rgba(184,80,48,0.1), transparent)" }} />
          </div>
          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aw-photo overflow-hidden rounded-2xl aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo2} alt="Portrait 2" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl flex flex-col items-center justify-center p-5" style={{ background: "linear-gradient(135deg, rgba(184,80,48,0.1), rgba(138,90,114,0.08))", border: "1px solid rgba(184,80,48,0.2)" }}>
              <div className="text-3xl mb-2 flex gap-1">
                <span className="aw-leaf">&#127809;</span>
                <span className="aw-leaf" style={{ animationDelay: "0.8s" }}>&#127810;</span>
              </div>
              <p className="text-[#7A6555] text-xs text-center font-serif italic leading-relaxed">
                Autumn love, forever warm
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}