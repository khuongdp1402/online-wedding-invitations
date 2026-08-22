"use client";

import { Heart, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./ImageWithFallback";
import { useEditOverlay, editSlotClass } from "@/components/templates/shared/EditOverlayContext";
import type { WeddingTemplateProps } from "@/lib/template-registry";

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
};

export function InvitationHeader({ wedding, mode }: Props) {
  const edit = useEditOverlay();
  const isBrideMode = mode === "bride";
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const heroImage = wedding.gallery[0] ?? "";

  return (
    <Section id="top" fullBleed className="relative min-h-screen min-h-[100dvh] overflow-hidden p-0">
      {/* MOBILE */}
      <div className="lg:hidden relative w-full h-full min-h-screen min-h-[100dvh]">
        <div
          className={editSlotClass(edit, "cb-hero", "absolute inset-0")}
          data-wedding-slot="cb-hero"
          onClick={(e) => edit?.onSlotClick?.("cb-hero", e.currentTarget)}
          role={edit?.onSlotClick ? "button" : undefined}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Ảnh nền thiệp cưới"
            className="w-full h-full object-cover object-[60%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" aria-hidden />
        </div>
        <div
          className={`absolute inset-0 z-10 flex flex-col justify-end pt-[max(env(safe-area-inset-top),0.75rem)] pb-[max(env(safe-area-inset-bottom),2rem)] pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),1rem)] ${
            edit?.onSlotClick ? "pointer-events-none" : ""
          }`}
        >
          <div className="max-w-xl mx-auto w-full">
            <Reveal y={20}>
              <div className="mb-2 sm:mb-3 text-center">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 cb-text-accent fill-[var(--cb-accent)]/20 mx-auto" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="cb-text-accent text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-2 sm:mb-4 text-center">
                {isBrideMode ? "Tân Nương & Tân Lang" : "Tân Lang & Tân Nương"}
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between gap-4 w-full pointer-events-auto">
                <h1
                  className={editSlotClass(edit, isBrideMode ? "cb-bride-name" : "cb-groom-name", "text-2xl sm:text-4xl lg:text-5xl font-script cb-text-accent font-bold leading-tight drop-shadow-sm shrink-0")}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(isBrideMode ? "cb-bride-name" : "cb-groom-name", e.currentTarget); }}
                >
                  {firstName}
                </h1>
                <h1
                  className={editSlotClass(edit, isBrideMode ? "cb-groom-name" : "cb-bride-name", "text-2xl sm:text-4xl lg:text-5xl font-script cb-text-accent font-bold leading-tight drop-shadow-sm shrink-0")}
                  onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(isBrideMode ? "cb-groom-name" : "cb-bride-name", e.currentTarget); }}
                >
                  {secondName}
                </h1>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="flex flex-col items-center gap-2 sm:gap-4 w-full">
                <p className="cb-text-accent text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">Save the date</p>
                <div className="h-px w-16 sm:w-24 mx-auto" style={{ backgroundColor: 'var(--cb-accent)' }} aria-hidden />
                <div className="px-4 sm:px-6 py-2.5 sm:py-4 w-full max-w-sm text-center">
                  <p className="cb-text-accent text-base sm:text-xl lg:text-2xl font-heading font-bold tracking-wide">{ceremony.date}</p>
                  {ceremony.lunarDate && <p className="cb-text-accent text-xs sm:text-sm font-heading mt-1">{ceremony.lunarDate}</p>}
                </div>
              </div>
            </Reveal>
            <div className="absolute bottom-6 right-4 opacity-40">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 cb-text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex min-h-screen items-center justify-center px-8 py-14 cb-bg-primary">
        <div className="w-full max-w-5xl overflow-hidden rounded-[40px] border cb-border-accent/25 shadow-2xl relative" style={{ borderColor: 'color-mix(in srgb, var(--cb-accent) 25%, transparent)' }}>
          <div className="flex min-h-[68vh] relative">
            <div
              className={editSlotClass(
                edit,
                "cb-hero",
                "w-[52%] min-w-0 relative shrink-0"
              )}
              data-wedding-slot="cb-hero"
              onClick={(e) => edit?.onSlotClick?.("cb-hero", e.currentTarget)}
              role={edit?.onSlotClick ? "button" : undefined}
            >
              <ImageWithFallback
                src={heroImage}
                alt="Ảnh nền thiệp cưới"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative flex-1 min-w-[380px] flex flex-col justify-center px-10 xl:px-16 py-12 cb-bg-primary-dark cb-text-accent overflow-visible">
              <Reveal y={20}>
                <div className="mb-4 text-center">
                  <Heart className="w-10 h-10 cb-text-accent fill-[var(--cb-accent)]/20 mx-auto" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="cb-text-accent/90 text-xs tracking-[0.4em] uppercase font-bold mb-6 text-center" style={{ color: 'color-mix(in srgb, var(--cb-accent) 90%, transparent)' }}>
                  {isBrideMode ? "Tân Nương & Tân Lang" : "Tân Lang & Tân Nương"}
                </h2>
              </Reveal>
              <Reveal delay={0.2} className="mb-8">
                <div className="flex items-center justify-between gap-6 w-full min-w-0">
                  <h1
                    className={editSlotClass(edit, isBrideMode ? "cb-bride-name" : "cb-groom-name", "text-3xl xl:text-4xl font-script cb-text-accent font-bold leading-tight shrink-0 text-left")}
                    onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(isBrideMode ? "cb-bride-name" : "cb-groom-name", e.currentTarget); }}
                  >
                    {firstName}
                  </h1>
                  <h1
                    className={editSlotClass(edit, isBrideMode ? "cb-groom-name" : "cb-bride-name", "text-3xl xl:text-4xl font-script cb-text-accent font-bold leading-tight shrink-0 text-right")}
                    onClick={(e) => { e.stopPropagation(); edit?.onSlotClick?.(isBrideMode ? "cb-groom-name" : "cb-bride-name", e.currentTarget); }}
                  >
                    {secondName}
                  </h1>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col items-center gap-3 w-full">
                  <p className="cb-text-accent text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'color-mix(in srgb, var(--cb-accent) 90%, transparent)' }}>Save the date</p>
                  <div className="h-px w-20 mx-auto" style={{ backgroundColor: 'color-mix(in srgb, var(--cb-accent) 60%, transparent)' }} aria-hidden />
                  <div className="py-4 w-full max-w-sm text-center">
                    <p className="cb-text-accent text-xl xl:text-2xl font-heading font-bold tracking-wide">{ceremony.date}</p>
                    {ceremony.lunarDate && <p className="cb-text-accent text-sm font-heading mt-1 opacity-80">{ceremony.lunarDate}</p>}
                  </div>
                </div>
              </Reveal>
              <div className="absolute bottom-8 right-8 opacity-30">
                <Sparkles className="w-10 h-10 cb-text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
