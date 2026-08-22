"use client";

import { WeddingTemplateProps } from "@/lib/template-registry";
import { WeddingCardOpening } from "./Opening";
import { InvitationHeader } from "./Header";
import { WeddingInfo } from "./Info";
import { Gallery } from "./Gallery";
import { Timeline } from "./Timeline";
import { Gifting } from "./Gifting";
import { WishesSlider } from "./Wishes";
import { Footer } from "./Footer";
import { BackgroundMusic } from "./BackgroundMusic";
import { Section } from "./Section";
import { visibleSectionKeys } from "@/lib/section-config";
import { useMemo } from "react";
import "./autumn-watercolor.css";

const DEFAULT_SECTIONS = [
  "header",
  "info",
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

  // Default music if none provided
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
        editOverlay={editOverlay}
      />
    ),
    info: (
      <Section id="info" key="info">
        <WeddingInfo wedding={wedding} isBrideMode={isBrideMode} />
      </Section>
    ),
    gallery: (
      <Section id="gallery" key="gallery">
        <Gallery
          images={wedding.gallery}
          weddingId={wedding.id}
          editOverlay={editOverlay}
        />
      </Section>
    ),
    timeline: (
      <Section id="timeline" key="timeline">
        <Timeline wedding={wedding} isBrideMode={isBrideMode} />
      </Section>
    ),
    wishes: (
      <Section id="wishes" key="wishes">
        <WishesSlider weddingId={wedding.id} />
      </Section>
    ),
    gifting: (
      <Section id="gifting" key="gifting">
        <Gifting wedding={wedding} isBrideMode={isBrideMode} />
      </Section>
    ),
    footer: <Footer wedding={wedding} key="footer" />,
  };

  // Áp combo màu người dùng chọn vào biến CSS của template.
  // Lưu ý: mẫu này dùng `accentColor` làm màu chữ chính (--primary) và
  // `primaryColor` làm màu điểm nhấn (--secondary), khớp defaultColors trong
  // registry: primary #b9856f (nâu hồng), accent #422114 (nâu đậm).
  const themeVars = {
    "--primary": wedding.accentColor ?? "#422114",
    "--secondary": wedding.primaryColor ?? "#b9856f",
    "--bg-cream": wedding.backgroundColor ?? "#f7f1eb",
  } as React.CSSProperties;

  return (
    <div className="autumn-watercolor-root min-h-screen relative" style={themeVars}>
      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />
      
      <BackgroundMusic url={musicUrl} />

      <main
        className="max-w-[500px] mx-auto shadow-xl overflow-hidden relative"
        style={{ backgroundColor: "var(--bg-cream)" }}
      >
        {/* Decorative Watercolor Header */}
        <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none watercolor-decor opacity-40 overflow-hidden">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-10 -left-10 w-48 h-48" style={{ fill: "var(--secondary)" }}>
             <path d="M44.7,-76.4C58.2,-69.2,69.5,-57.4,77.4,-44.1C85.3,-30.8,89.7,-15.8,90.3,0.3C90.9,16.4,87.6,33.3,79.5,47.9C71.4,62.5,58.6,74.7,43.9,81.4C29.2,88.1,12.6,89.2,-2.9,94.2C-18.4,99.2,-36.8,108.1,-52,104.2C-67.2,100.3,-79.1,83.5,-87,66.6C-94.9,49.7,-98.7,32.7,-98.8,16.2C-98.9,-0.3,-95.2,-16.2,-88,-31C-80.8,-45.8,-70.1,-59.5,-57,-66.9C-43.9,-74.3,-28.4,-75.4,-14.2,-79.3C0,-83.1,14.2,-89.6,29.9,-85C45.6,-80.4,62.8,-64.8,44.7,-76.4Z" transform="translate(100 100)" />
           </svg>
        </div>

        {ordered.map((id) => sectionMap[id]).filter(Boolean)}
      </main>
    </div>
  );
}
