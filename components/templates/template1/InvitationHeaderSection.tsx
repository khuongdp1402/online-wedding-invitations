"use client";

import { Heart, Sparkles } from "lucide-react";
import type { InvitationData } from "./lib/invitation";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./ImageWithFallback";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";

type InvitationHeaderSectionProps = {
  data: InvitationData;
  heroImage?: string;
  isBrideMode?: boolean;
};

export function InvitationHeaderSection({ data, heroImage, isBrideMode }: InvitationHeaderSectionProps) {
  const edit = useEditOverlay();
  const firstNameSlot = isBrideMode ? "cb-bride-name" : "cb-groom-name";
  const secondNameSlot = isBrideMode ? "cb-groom-name" : "cb-bride-name";

  const namesRow = (
    <div className="flex items-center justify-between gap-3 sm:gap-6 w-full pointer-events-auto">
      <h1
        className={editSlotClass(edit, firstNameSlot, "text-2xl sm:text-4xl lg:text-5xl font-script text-gold font-bold leading-tight drop-shadow-md shrink-0 hover:scale-105 transition-transform duration-300")}
        onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(firstNameSlot, e.currentTarget); }}
      >
        {data.groom.name}
      </h1>

      {/* Royal Chữ Hỷ (Double Happiness) Emblem */}
      <div className="flex flex-col items-center justify-center shrink-0 px-2 py-1 bg-gold/15 rounded-full border border-gold/40 shadow-inner">
        <span className="text-xl sm:text-2xl lg:text-3xl text-gold font-serif select-none animate-pulse">
          囍
        </span>
      </div>

      <h1
        className={editSlotClass(edit, secondNameSlot, "text-2xl sm:text-4xl lg:text-5xl font-script text-gold font-bold leading-tight drop-shadow-md shrink-0 hover:scale-105 transition-transform duration-300")}
        onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(secondNameSlot, e.currentTarget); }}
      >
        {data.bride.name}
      </h1>
    </div>
  );

  const dateBlock = (
    <div className="flex flex-col items-center gap-2 sm:gap-4 w-full">
      <p className="text-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">
        Save the date
      </p>
      <div className="h-px w-16 sm:w-24 bg-gold mx-auto" aria-hidden />
      <div className="px-4 sm:px-6 py-2.5 sm:py-4 w-full max-w-sm text-center">
        <p className="text-gold text-base sm:text-xl lg:text-2xl font-heading font-bold tracking-wide">
          {data.ceremony.solarDateLabel}
        </p>
        <p className="text-gold text-xs sm:text-sm font-heading mt-1">{data.ceremony.lunarDateLabel}</p>
      </div>
    </div>
  );

  return (
    <Section id="top" fullBleed className="relative min-h-screen min-h-[100dvh] overflow-hidden p-0">
      {/* ========== MOBILE: full màn hình ảnh + overlay, tên 1 dòng căn đều 2 bên, ngày căn giữa ========== */}
      <div className="lg:hidden relative w-full h-full min-h-screen min-h-[100dvh]">
        <div
          className={editSlotClass(edit, "cb-hero", "absolute inset-0")}
          data-wedding-slot="cb-hero"
          onClick={(e) => edit?.onSlotClick?.("cb-hero", e.currentTarget)}
          role={edit?.onSlotClick ? "button" : undefined}
        >
          <ImageWithFallback
            src={heroImage || ""}
            alt="Wedding Background"
            className="w-full h-full object-cover object-[60%_50%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"
            aria-hidden
          />
        </div>

        <div
          className={`absolute inset-0 z-10 flex flex-col justify-end pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),2rem)] pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),1rem)] ${edit?.onSlotClick ? "pointer-events-none" : ""}`}
        >
          <div className="max-w-xl mx-auto w-full">
            <Reveal y={20}>
              <div className="mb-2 sm:mb-3 text-center">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-gold fill-gold/20 mx-auto" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-gold text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-2 sm:mb-4 text-center">
                Tân Lang & Tân Nương
              </h2>
            </Reveal>

            <Reveal delay={0.2} className="mb-4 sm:mb-6">
              {namesRow}
            </Reveal>

            <Reveal delay={0.5}>
              {dateBlock}
            </Reveal>

            <div className="absolute bottom-6 right-4 opacity-40">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP: ảnh trái chiếm trọn khung, panel phải nền tối + chữ vàng ========== */}
      <div className="hidden lg:flex min-h-screen items-center justify-center px-8 py-14 bg-burgundy">
        <div className="w-full max-w-5xl overflow-hidden rounded-[40px] border border-gold/25 shadow-2xl relative">
          <div className="flex min-h-[68vh] relative">
            {/* Ảnh bên trái */}
            <div
              className={editSlotClass(edit, "cb-hero", "w-[52%] min-w-0 relative shrink-0")}
              data-wedding-slot="cb-hero"
              onClick={(e) => edit?.onSlotClick?.("cb-hero", e.currentTarget)}
              role={edit?.onSlotClick ? "button" : undefined}
            >
              <ImageWithFallback
                src={heroImage || ""}
                alt="Wedding Background"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Panel phải nền tối – chữ vàng, đủ rộng để không mất chữ */}
            <div className="relative flex-1 min-w-[380px] flex flex-col justify-center px-10 xl:px-16 py-12 bg-burgundy-dark text-gold overflow-visible">
              <Reveal y={20}>
                <div className="mb-4 text-center">
                  <Heart className="w-10 h-10 text-gold fill-gold/20 mx-auto" />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-gold/90 text-xs tracking-[0.4em] uppercase font-bold mb-6 text-center">
                  Tân Lang & Tân Nương
                </h2>
              </Reveal>

              <Reveal delay={0.2} className="mb-8">
                <div className="flex items-center justify-between gap-6 w-full min-w-0">
                  <h1
                    className={editSlotClass(edit, firstNameSlot, "text-3xl xl:text-4xl font-script text-gold font-bold leading-tight shrink-0 text-left")}
                    onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(firstNameSlot, e.currentTarget); }}
                  >
                    {data.groom.name}
                  </h1>
                  <h1
                    className={editSlotClass(edit, secondNameSlot, "text-3xl xl:text-4xl font-script text-gold font-bold leading-tight shrink-0 text-right")}
                    onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(secondNameSlot, e.currentTarget); }}
                  >
                    {data.bride.name}
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex flex-col items-center gap-3 w-full">
                  <p className="text-gold/90 text-xs tracking-[0.3em] uppercase font-semibold">
                    Save the date
                  </p>
                  <div className="h-px w-20 bg-gold/60 mx-auto" aria-hidden />
                  <div className="py-4 w-full max-w-sm text-center">
                    <p className="text-gold text-xl xl:text-2xl font-heading font-bold tracking-wide">
                      {data.ceremony.solarDateLabel}
                    </p>
                    <p className="text-gold/80 text-sm font-heading mt-1">{data.ceremony.lunarDateLabel}</p>
                  </div>
                </div>
              </Reveal>

              <div className="absolute bottom-8 right-8 opacity-30">
                <Sparkles className="w-10 h-10 text-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
