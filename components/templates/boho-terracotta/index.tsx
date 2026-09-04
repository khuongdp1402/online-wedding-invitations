"use client";

import { useMemo } from "react";
import type { WeddingTemplateProps } from "@/types/template";
import { WeddingCardOpening } from "./Opening";
import { Header } from "./Header";
import { LoveJourney } from "./LoveJourney";
import { Info } from "./Info";
import { DressCode } from "./DressCode";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { Wishes } from "./Wishes";
import { Gifting } from "./Gifting";
import { Footer } from "./Footer";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import "./boho-terracotta.css";

const DEFAULT_SECTIONS = [
  "header",
  "info",
  "journey",
  "dresscode",
  "countdown",
  "gallery",
  "wishes",
  "gifting",
  "footer",
];

export default function BohoTerracottaTemplate({
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
        "--bt-primary": wedding.primaryColor ?? "#C25E42",
        "--bt-accent": wedding.accentColor ?? "#DDA15E",
        "--bt-bg": wedding.backgroundColor ?? "#FDF8F5",
      }) as React.CSSProperties,
    [wedding.primaryColor, wedding.accentColor, wedding.backgroundColor]
  );

  const sectionMap: Record<string, React.ReactNode> = {
    header: <Header wedding={wedding} isBrideMode={isBrideMode} key="header" />,
    info: <Info wedding={wedding} isBrideMode={isBrideMode} key="info" />,
    journey: <LoveJourney key="journey" />,
    dresscode: <DressCode key="dresscode" />,
    countdown: <Countdown wedding={wedding} isBrideMode={isBrideMode} key="countdown" />,
    gallery: <Gallery gallery={wedding.gallery} key="gallery" />,
    wishes: <Wishes weddingId={wedding.id} key="wishes" />,
    gifting: <Gifting wedding={wedding} isBrideMode={isBrideMode} key="gifting" />,
    footer: <Footer wedding={wedding} isDemo={isDemo} key="footer" />,
  };

  const inner = (
    <div className="boho-terracotta-root min-h-screen relative bg-[#F7ECE4]" style={themeVars}>
      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />

      {/* Expansive Canvas on Desktop with Subtle Terracotta Borders */}
      <main className="w-full max-w-5xl mx-auto bg-[#FDF8F5] shadow-2xl relative border-x border-[#EEDFD5] transition-all">
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
