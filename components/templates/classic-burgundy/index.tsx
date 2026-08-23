"use client";

import { Suspense, useMemo } from "react";
import type { WeddingTemplateProps } from "@/lib/template-registry";
import { WeddingCardOpening } from "./WeddingCardOpening";
import { InvitationHeader } from "./InvitationHeader";
import { WeddingInfo } from "./WeddingInfo";
import { Countdown } from "./Countdown";
import { Quote } from "./Quote";
import { Gallery } from "./Gallery";
import { Location } from "./Location";
import { Wishes } from "./Wishes";
import { Footer } from "./Footer";
import { BackgroundMusic } from "./BackgroundMusic";
import { ModeSwitcher } from "./ModeSwitcher";
import { resolveClassicBurgundyStructureGallery } from "@/lib/classic-burgundy-sample-gallery";
import { CLASSIC_BURGUNDY_ALBUM_START_INDEX } from "@/lib/wedding-image-slots";
import { EditOverlayContext } from "@/components/templates/shared/EditOverlayContext";
import { visibleSectionKeys } from "@/lib/section-config";
import "./classic-burgundy.css";

const DEFAULT_SECTIONS = [
  "header",
  "wedding-info",
  "countdown",
  "quote",
  "gallery",
  "location",
  "wishes",
  "footer",
];

export default function ClassicBurgundyTemplate({
  wedding,
  mode,
  isDemo: _isDemo,
  guestName,
  guestSalutation,
  editOverlay,
}: WeddingTemplateProps) {
  const isBrideMode = mode === "bride";

  const { weddingWithSamples, albumUrls } = useMemo(() => {
    const raw = wedding.gallery ?? [];
    const structure = resolveClassicBurgundyStructureGallery(raw);
    const album = raw
      .slice(CLASSIC_BURGUNDY_ALBUM_START_INDEX)
      .map((u) => String(u || "").trim())
      .filter(Boolean);
    return {
      weddingWithSamples: {
        ...wedding,
        gallery: [...structure, ...album],
      },
      albumUrls: album,
    };
  }, [wedding]);

  const themeVars = useMemo(
    () =>
      ({
        "--cb-primary": wedding.primaryColor ?? "#800020",
        "--cb-accent": wedding.accentColor ?? "#d4a853",
        "--cb-bg": wedding.backgroundColor ?? "#FDFBF7",
        "--cb-text": wedding.textColor ?? "#4A4A4A",
      }) as React.CSSProperties,
    [
      wedding.primaryColor,
      wedding.accentColor,
      wedding.backgroundColor,
      wedding.textColor,
    ]
  );

  const ordered = useMemo(
    () => visibleSectionKeys(wedding.sectionOrder, DEFAULT_SECTIONS),
    [wedding.sectionOrder]
  );

  const sectionMap: Record<string, React.ReactNode> = useMemo(
    () => ({
      header: (
        <InvitationHeader wedding={weddingWithSamples} mode={mode} key="header" />
      ),
      "wedding-info": (
        <WeddingInfo
          wedding={weddingWithSamples}
          mode={mode}
          key="wedding-info"
        />
      ),
      countdown: (
        <Countdown wedding={weddingWithSamples} mode={mode} key="countdown" />
      ),
      quote: (
        <Quote
          wedding={weddingWithSamples}
          mode={mode}
          guestName={guestName}
          guestSalutation={guestSalutation}
          key="quote"
        />
      ),
      gallery:
        albumUrls.length > 0 ? (
          <Gallery gallery={albumUrls} key="gallery" />
        ) : null,
      location: (
        <Location wedding={weddingWithSamples} mode={mode} key="location" />
      ),
      wishes: <Wishes weddingId={wedding.id} key="wishes" />,
      footer: (
        <Footer wedding={weddingWithSamples} mode={mode} key="footer" />
      ),
    }),
    [
      weddingWithSamples,
      mode,
      guestName,
      guestSalutation,
      wedding.id,
      albumUrls,
    ]
  );

  const inner = (
    <div
      className="cb-template min-h-screen antialiased overflow-x-hidden"
      style={{
        ...themeVars,
        backgroundColor: "var(--cb-bg)",
        color: "var(--cb-text)",
        fontFamily: "var(--font-body)",
      }}
    >
      <Suspense fallback={null}>
        <WeddingCardOpening
          groomName={wedding.groomName}
          brideName={wedding.brideName}
          isBrideMode={isBrideMode}
          guestName={guestName}
          guestSalutation={guestSalutation}
        />
      </Suspense>

      <ModeSwitcher mode={mode || "groom"} />

      <main>
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

      {wedding.backgroundMusic && (
        <BackgroundMusic musicUrl={wedding.backgroundMusic} />
      )}
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
