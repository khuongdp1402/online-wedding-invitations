"use client";

import { useMemo } from "react";
import type { WeddingTemplateProps } from "@/types/template";
import { WeddingCardOpening } from "./Opening";
import { Header } from "./Header";
import { JournalEntry } from "./JournalEntry";
import { Info } from "./Info";
import { Timeline } from "./Timeline";
import { DressCode } from "./DressCode";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { Wishes } from "./Wishes";
import { Gifting } from "./Gifting";
import { Footer } from "./Footer";
import { BotanicalLeavesOverlay } from "@/components/templates/shared/AnimationOverlays";
import { LoveLetterEnvelopeSection } from "@/components/templates/shared/sections/LoveLetterEnvelopeSection";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import "./vintage-botanical.css";

const DEFAULT_SECTIONS = [
  "header",
  "journal",
  "info",
  "timeline",
  "dresscode",
  "countdown",
  "gallery",
  "letter",
  "wishes",
  "gifting",
  "footer",
];

export default function VintageBotanicalTemplate({
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
        "--vb-primary": wedding.primaryColor ?? "#3D5A45",
        "--vb-accent": wedding.accentColor ?? "#8A9A5B",
        "--vb-bg": wedding.backgroundColor ?? "#FAF8F2",
      }) as React.CSSProperties,
    [wedding.primaryColor, wedding.accentColor, wedding.backgroundColor]
  );

  const sectionMap: Record<string, React.ReactNode> = {
    header: <Header wedding={wedding} isBrideMode={isBrideMode} key="header" />,
    journal: <JournalEntry wedding={wedding} isBrideMode={isBrideMode} key="journal" />,
    info: <Info wedding={wedding} isBrideMode={isBrideMode} key="info" />,
    timeline: <Timeline wedding={wedding} isBrideMode={isBrideMode} key="timeline" />,
    dresscode: <DressCode key="dresscode" />,
    countdown: <Countdown wedding={wedding} isBrideMode={isBrideMode} key="countdown" />,
    gallery: <Gallery gallery={wedding.gallery} key="gallery" />,
    letter: (
      <LoveLetterEnvelopeSection
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        letterTitle="Tâm Thư Gửi Quý Khách"
        badge="HERBARIUM NOTE"
        key="letter"
      />
    ),
    wishes: <Wishes weddingId={wedding.id} key="wishes" />,
    gifting: <Gifting wedding={wedding} isBrideMode={isBrideMode} key="gifting" />,
    footer: <Footer wedding={wedding} isDemo={isDemo} key="footer" />,
  };

  const inner = (
    <div className="vintage-botanical-root min-h-screen relative bg-[#F0EFE9]" style={themeVars}>
      <BotanicalLeavesOverlay />

      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />

      {/* Victorian Botanical Journal: Expansive Layout on Desktop */}
      <main className="w-full max-w-5xl mx-auto bg-[#FAF8F2] shadow-2xl relative border-x border-[#D8E2D5] transition-all">
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
