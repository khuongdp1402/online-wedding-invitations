"use client";

import { useMemo } from "react";
import type { WeddingTemplateProps } from "@/types/template";
import { WeddingCardOpening } from "./Opening";
import { Header } from "./Header";
import { Proclamation } from "./Proclamation";
import { Info } from "./Info";
import { Timeline } from "./Timeline";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { Wishes } from "./Wishes";
import { Gifting } from "./Gifting";
import { Footer } from "./Footer";
import { GoldenSparklesOverlay } from "@/components/templates/shared/AnimationOverlays";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import "./luxury-royal-gold.css";

const DEFAULT_SECTIONS = [
  "header",
  "proclamation",
  "info",
  "timeline",
  "countdown",
  "gallery",
  "wishes",
  "gifting",
  "footer",
];

export default function LuxuryRoyalGoldTemplate({
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
        "--lrg-gold": wedding.accentColor ?? "#C9A84C",
        "--lrg-ruby": wedding.primaryColor ?? "#7A0020",
        "--lrg-bg": wedding.backgroundColor ?? "#0A0A12",
      }) as React.CSSProperties,
    [wedding.primaryColor, wedding.accentColor, wedding.backgroundColor]
  );

  const sectionMap: Record<string, React.ReactNode> = {
    header: <Header wedding={wedding} isBrideMode={isBrideMode} key="header" />,
    proclamation: <Proclamation wedding={wedding} isBrideMode={isBrideMode} key="proclamation" />,
    info: <Info wedding={wedding} isBrideMode={isBrideMode} key="info" />,
    timeline: <Timeline wedding={wedding} isBrideMode={isBrideMode} key="timeline" />,
    countdown: <Countdown wedding={wedding} isBrideMode={isBrideMode} key="countdown" />,
    gallery: <Gallery gallery={wedding.gallery} key="gallery" />,
    wishes: <Wishes weddingId={wedding.id} key="wishes" />,
    gifting: <Gifting wedding={wedding} isBrideMode={isBrideMode} key="gifting" />,
    footer: <Footer wedding={wedding} isDemo={isDemo} key="footer" />,
  };

  const inner = (
    <div className="lrg-root min-h-screen relative bg-[#07070E]" style={themeVars}>
      <GoldenSparklesOverlay />

      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />

      {/* Grand Palace Layout: Expansive on Desktop, Rich Gold Filigree */}
      <main className="w-full max-w-6xl mx-auto bg-[#0B0B14] shadow-2xl relative border-x border-[#C9A84C]/30 transition-all">
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
