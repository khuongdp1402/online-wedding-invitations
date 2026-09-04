"use client";

import { useMemo } from "react";
import type { WeddingTemplateProps } from "@/types/template";
import { WeddingCardOpening } from "./Opening";
import { Header } from "./Header";
import { Info } from "./Info";
import { Calendar } from "./Calendar";
import { Timeline } from "./Timeline";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { DressCodeSection } from "@/components/templates/shared/sections/DressCodeSection";
import { Wishes } from "./Wishes";
import { Gifting } from "./Gifting";
import { Footer } from "./Footer";
import { visibleSectionKeys } from "@/lib/section-config";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import "./minimal-korean.css";

const DEFAULT_SECTIONS = [
  "header",
  "info",
  "calendar",
  "timeline",
  "countdown",
  "gallery",
  "dresscode",
  "wishes",
  "gifting",
  "footer",
];

export default function MinimalKoreanTemplate({
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
        "--mk-primary": wedding.primaryColor ?? "#1C1917",
        "--mk-accent": wedding.accentColor ?? "#A8A29E",
        "--mk-bg": wedding.backgroundColor ?? "#FAF9F6",
      }) as React.CSSProperties,
    [wedding.primaryColor, wedding.accentColor, wedding.backgroundColor]
  );

  const sectionMap: Record<string, React.ReactNode> = {
    header: <Header wedding={wedding} isBrideMode={isBrideMode} key="header" />,
    info: <Info wedding={wedding} isBrideMode={isBrideMode} key="info" />,
    calendar: <Calendar wedding={wedding} isBrideMode={isBrideMode} key="calendar" />,
    timeline: <Timeline wedding={wedding} isBrideMode={isBrideMode} key="timeline" />,
    countdown: <Countdown wedding={wedding} isBrideMode={isBrideMode} key="countdown" />,
    gallery: <Gallery gallery={wedding.gallery} key="gallery" />,
    dresscode: (
      <DressCodeSection
        key="dresscode"
        badge="DRESS CODE GUIDE"
        title="Gợi Ý Trang Phục"
        subtitle="Sắc màu trang nhã, thanh lịch hòa cùng không gian tinh tế của buổi tiệc."
        swatches={[
          { name: "Cream Ivory", hex: "#FAF9F5", description: "Màu kem ngà thanh thoát" },
          { name: "Warm Taupe", hex: "#B39D82", description: "Màu taupe ấm áp chuẩn Hàn" },
          { name: "Soft Sage", hex: "#A8B5A0", description: "Xanh xô thơm nhẹ nhàng" },
          { name: "Slate Charcoal", hex: "#2C3E50", description: "Xám than sang trọng" },
        ]}
      />
    ),
    wishes: <Wishes weddingId={wedding.id} key="wishes" />,
    gifting: <Gifting wedding={wedding} isBrideMode={isBrideMode} key="gifting" />,
    footer: <Footer wedding={wedding} isDemo={isDemo} key="footer" />,
  };

  const inner = (
    <div className="mk-root min-h-screen relative bg-[#F5F4F0]" style={themeVars}>
      <WeddingCardOpening
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        isBrideMode={isBrideMode}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />

      {/* Editorial Lookbook Layout: Expansive on Desktop, Hairline Borders */}
      <main className="w-full max-w-6xl mx-auto bg-white shadow-2xl relative border-x border-stone-300">
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
