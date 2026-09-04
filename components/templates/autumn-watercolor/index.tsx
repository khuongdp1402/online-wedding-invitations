"use client";

import { WeddingTemplateProps } from "@/lib/template-registry";
import { WeddingCardOpening } from "./Opening";
import { Header as InvitationHeader } from "./Header";
import { LoveLetter } from "./LoveLetter";
import { WeddingInfo } from "./Info";
import { Gallery } from "./Gallery";
import { Timeline } from "./Timeline";
import { LoveStoryTimelineSection } from "@/components/templates/shared/sections/LoveStoryTimelineSection";
import { Gifting } from "./Gifting";
import { WishesSlider } from "./Wishes";
import { Footer } from "./Footer";
import { BackgroundMusic } from "./BackgroundMusic";
import { visibleSectionKeys } from "@/lib/section-config";
import { useMemo } from "react";
import "./autumn-watercolor.css";

const DEFAULT_SECTIONS = [
  "header",
  "letter",
  "info",
  "story",
  "gallery",
  "timeline",
  "wishes",
  "gifting",
  "footer",
];

export default function AutumnWatercolorTemplate({
  wedding,
  mode,
  isDemo: _isDemo,
  guestName,
  guestSalutation,
  editOverlay,
}: WeddingTemplateProps) {
  const isBrideMode = mode === "bride";

  const musicUrl = wedding.backgroundMusic || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3";

  const ordered = useMemo(
    () => visibleSectionKeys(wedding.sectionOrder, DEFAULT_SECTIONS),
    [wedding.sectionOrder]
  );

  const sectionMap: Record<string, React.ReactNode> = {
    header: (
      <InvitationHeader
        key="header"
        wedding={wedding}
        isBrideMode={isBrideMode}
      />
    ),
    letter: (
      <LoveLetter
        key="letter"
        wedding={wedding}
        isBrideMode={isBrideMode}
      />
    ),
    info: (
      <WeddingInfo
        key="info"
        wedding={wedding}
        isBrideMode={isBrideMode}
      />
    ),
    story: (
      <LoveStoryTimelineSection
        key="story"
        title="Chuyện Tình Mùa Thu"
        subtitle="Hành trình từ cái nhìn đầu tiên đến ngày đôi ta trao nhau lời hẹn ước trọn đời."
        badge="AUTUMN LOVE STORY"
      />
    ),
    gallery: (
      <Gallery
        key="gallery"
        images={wedding.gallery}
        weddingId={wedding.id}
        editOverlay={editOverlay}
      />
    ),
    timeline: (
      <Timeline
        key="timeline"
        wedding={wedding}
        isBrideMode={isBrideMode}
      />
    ),
    wishes: (
      <WishesSlider
        key="wishes"
        weddingId={wedding.id}
      />
    ),
    gifting: (
      <Gifting
        key="gifting"
        wedding={wedding}
        isBrideMode={isBrideMode}
      />
    ),
    footer: <Footer wedding={wedding} key="footer" />,
  };

  const themeVars = {
    "--primary": wedding.accentColor ?? "#422114",
    "--secondary": wedding.primaryColor ?? "#b9856f",
    "--bg-cream": wedding.backgroundColor ?? "#f7f1eb",
  } as React.CSSProperties;

  return (
    <div className="autumn-watercolor-root min-h-screen relative bg-[#F0E6DC]" style={themeVars}>
      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />
      
      <BackgroundMusic url={musicUrl} />

      {/* Expansive Canvas on Desktop with Soft Autumn Shadows */}
      <main
        className="w-full max-w-5xl mx-auto shadow-2xl relative border-x border-[#E3D4C5] transition-all"
        style={{ backgroundColor: "var(--bg-cream)" }}
      >
        {ordered.map((id) => {
          const el = sectionMap[id];
          if (!el) return null;
          return (
            <div key={id} data-section={id}>
              {el}
            </div>
          );
        })}
      </main>
    </div>
  );
}
