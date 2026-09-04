"use client";

import { useMemo } from "react";
import type { WeddingTemplateProps } from "@/types/template";
import { WeddingCardOpening } from "./Opening";
import { Header } from "./Header";
import { VipPass } from "./VipPass";
import { Info } from "./Info";
import { Programme } from "./Programme";
import { DressCode } from "./DressCode";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { Wishes } from "./Wishes";
import { Gifting } from "./Gifting";
import { Footer } from "./Footer";
import { GoldenSparklesOverlay } from "@/components/templates/shared/AnimationOverlays";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import "./emerald-glamour.css";

const DEFAULT_SECTIONS = [
  "header",
  "vippass",
  "info",
  "programme",
  "dresscode",
  "countdown",
  "gallery",
  "wishes",
  "gifting",
  "footer",
];

export default function EmeraldGlamourTemplate({
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
        "--eg-primary": wedding.primaryColor ?? "#0E3B2E",
        "--eg-accent": wedding.accentColor ?? "#D4AF37",
        "--eg-bg": wedding.backgroundColor ?? "#04120D",
      }) as React.CSSProperties,
    [wedding.primaryColor, wedding.accentColor, wedding.backgroundColor]
  );

  const sectionMap: Record<string, React.ReactNode> = {
    header: <Header wedding={wedding} isBrideMode={isBrideMode} key="header" />,
    vippass: <VipPass wedding={wedding} isBrideMode={isBrideMode} key="vippass" />,
    info: <Info wedding={wedding} isBrideMode={isBrideMode} key="info" />,
    programme: <Programme wedding={wedding} isBrideMode={isBrideMode} key="programme" />,
    dresscode: <DressCode key="dresscode" />,
    countdown: <Countdown wedding={wedding} isBrideMode={isBrideMode} key="countdown" />,
    gallery: <Gallery gallery={wedding.gallery} key="gallery" />,
    wishes: <Wishes weddingId={wedding.id} key="wishes" />,
    gifting: <Gifting wedding={wedding} isBrideMode={isBrideMode} key="gifting" />,
    footer: <Footer wedding={wedding} isDemo={isDemo} key="footer" />,
  };

  const inner = (
    <div className="emerald-glamour-root min-h-screen relative bg-[#020B07]" style={themeVars}>
      <GoldenSparklesOverlay />

      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />

      {/* Art Deco VIP Soirée: Wide layout on desktop, rich Gatsby gold trim */}
      <main className="w-full max-w-5xl mx-auto bg-[#04120D] shadow-2xl relative border-x-2 border-[#D4AF37]/50 transition-all">
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
