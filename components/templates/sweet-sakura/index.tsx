"use client";

import { useMemo } from "react";
import type { WeddingTemplateProps } from "@/types/template";
import { WeddingCardOpening } from "./Opening";
import { Header } from "./Header";
import { LoveStory } from "./LoveStory";
import { Info } from "./Info";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { Wishes } from "./Wishes";
import { Gifting } from "./Gifting";
import { Footer } from "./Footer";
import { SakuraPetalsOverlay } from "@/components/templates/shared/AnimationOverlays";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import "./sweet-sakura.css";

const DEFAULT_SECTIONS = [
  "header",
  "story",
  "info",
  "countdown",
  "gallery",
  "wishes",
  "gifting",
  "footer",
];

export default function SweetSakuraTemplate({
  wedding,
  mode = "groom",
  isDemo = false,
  guestName,
  guestSalutation,
  editOverlay,
}: WeddingTemplateProps) {
  const isBrideMode = mode === "bride";

  const ordered = useMemo(
    () => visibleSectionKeys(wedding.sectionOrder, DEFAULT_SECTIONS),
    [wedding.sectionOrder]
  );

  const themeVars = useMemo(
    () =>
      ({
        "--ss-primary": wedding.primaryColor ?? "#E05A7A",
        "--ss-accent": wedding.accentColor ?? "#F8B4C4",
        "--ss-bg": wedding.backgroundColor ?? "#FFF7F9",
      }) as React.CSSProperties,
    [wedding.primaryColor, wedding.accentColor, wedding.backgroundColor]
  );

  const sectionMap: Record<string, React.ReactNode> = {
    header: <Header wedding={wedding} isBrideMode={isBrideMode} key="header" />,
    story: <LoveStory key="story" />,
    info: <Info wedding={wedding} isBrideMode={isBrideMode} key="info" />,
    countdown: <Countdown wedding={wedding} isBrideMode={isBrideMode} key="countdown" />,
    gallery: <Gallery gallery={wedding.gallery} key="gallery" />,
    wishes: <Wishes weddingId={wedding.id} key="wishes" />,
    gifting: <Gifting wedding={wedding} isBrideMode={isBrideMode} key="gifting" />,
    footer: <Footer wedding={wedding} isDemo={isDemo} key="footer" />,
  };

  const inner = (
    <div className="sweet-sakura-root min-h-screen relative" style={themeVars}>
      <SakuraPetalsOverlay />

      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />

      <main className="max-w-[480px] md:max-w-xl mx-auto bg-[#FFF7F9] shadow-2xl overflow-hidden relative border-x border-[#F6D6DF] transition-all">
        {ordered.map((sectionId) => {
          const content = sectionMap[sectionId];
          if (!content) return null;
          return (
            <div key={sectionId} data-section={sectionId}>
              {content}
            </div>
          );
        })}
      </main>
    </div>
  );

  if (editOverlay?.onSlotClick) {
    return (
      <EditOverlayContext.Provider value={editOverlay}>
        {inner}
      </EditOverlayContext.Provider>
    );
  }

  return inner;
}
