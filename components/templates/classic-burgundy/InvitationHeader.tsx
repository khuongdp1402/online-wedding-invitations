"use client";

import { Heart, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
};

export function InvitationHeader({ wedding, mode }: Props) {
  const isBrideMode = mode === "bride";
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const heroImage = wedding.gallery[0] || "/images/placeholder-hero.jpg";

  return (
    <Section id="top" fullBleed className="relative min-h-screen min-h-[100dvh] overflow-hidden p-0">
      {/* MOBILE */}
      <div className="lg:hidden relative w-full h-full min-h-screen min-h-[100dvh]">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Wedding Background" className="w-full h-full object-cover object-[60%_50%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" aria-hidden />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col justify-end pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),2rem)] pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),1rem)]">
          <div className="max-w-xl mx-auto w-full">
            <Reveal y={20}>
              <div className="mb-2 sm:mb-3 text-center">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37] fill-[#D4AF37]/20 mx-auto" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-2 sm:mb-4 text-center">
                {isBrideMode ? "Tân Nương & Tân Lang" : "Tân Lang & Tân Nương"}
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between gap-4 w-full">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-script text-[#D4AF37] font-bold leading-tight drop-shadow-sm shrink-0">
                  {firstName}
                </h1>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-script text-[#D4AF37] font-bold leading-tight drop-shadow-sm shrink-0">
                  {secondName}
                </h1>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="flex flex-col items-center gap-2 sm:gap-4 w-full">
                <p className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">Save the date</p>
                <div className="h-px w-16 sm:w-24 bg-[#D4AF37] mx-auto" aria-hidden />
                <div className="px-4 sm:px-6 py-2.5 sm:py-4 w-full max-w-sm text-center">
                  <p className="text-[#D4AF37] text-base sm:text-xl lg:text-2xl font-serif font-bold tracking-wide">{ceremony.date}</p>
                  {ceremony.lunarDate && <p className="text-[#D4AF37] text-xs sm:text-sm font-serif mt-1">{ceremony.lunarDate}</p>}
                </div>
              </div>
            </Reveal>
            <div className="absolute bottom-6 right-4 opacity-40">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex min-h-screen items-center justify-center px-8 py-14 bg-[#800020]">
        <div className="w-full max-w-5xl overflow-hidden rounded-[40px] border border-[#D4AF37]/25 shadow-2xl relative">
          <div className="flex min-h-[68vh] relative">
            <div className="w-[52%] min-w-0 relative shrink-0">
              <img src={heroImage} alt="Wedding Background" className="w-full h-full object-cover object-center" />
            </div>
            <div className="relative flex-1 min-w-[380px] flex flex-col justify-center px-10 xl:px-16 py-12 bg-[#5A0016] text-[#D4AF37] overflow-visible">
              <Reveal y={20}>
                <div className="mb-4 text-center">
                  <Heart className="w-10 h-10 text-[#D4AF37] fill-[#D4AF37]/20 mx-auto" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-[#D4AF37]/90 text-xs tracking-[0.4em] uppercase font-bold mb-6 text-center">
                  {isBrideMode ? "Tân Nương & Tân Lang" : "Tân Lang & Tân Nương"}
                </h2>
              </Reveal>
              <Reveal delay={0.2} className="mb-8">
                <div className="flex items-center justify-between gap-6 w-full min-w-0">
                  <h1 className="text-3xl xl:text-4xl font-script text-[#D4AF37] font-bold leading-tight shrink-0 text-left">{firstName}</h1>
                  <h1 className="text-3xl xl:text-4xl font-script text-[#D4AF37] font-bold leading-tight shrink-0 text-right">{secondName}</h1>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col items-center gap-3 w-full">
                  <p className="text-[#D4AF37]/90 text-xs tracking-[0.3em] uppercase font-semibold">Save the date</p>
                  <div className="h-px w-20 bg-[#D4AF37]/60 mx-auto" aria-hidden />
                  <div className="py-4 w-full max-w-sm text-center">
                    <p className="text-[#D4AF37] text-xl xl:text-2xl font-serif font-bold tracking-wide">{ceremony.date}</p>
                    {ceremony.lunarDate && <p className="text-[#D4AF37]/80 text-sm font-serif mt-1">{ceremony.lunarDate}</p>}
                  </div>
                </div>
              </Reveal>
              <div className="absolute bottom-8 right-8 opacity-30">
                <Sparkles className="w-10 h-10 text-[#D4AF37]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
