"use client";

import { Suspense } from "react";
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
import { Watermark } from "@/components/templates/Watermark";
import "./classic-burgundy.css";

export default function ClassicBurgundyTemplate({
  wedding,
  mode,
  isDemo,
  guestName,
  guestSalutation,
}: WeddingTemplateProps) {
  const isBrideMode = mode === "bride";

  return (
    <div className="cb-template min-h-screen bg-[#FDFBF7] text-[#4A4A4A] antialiased overflow-x-hidden">
      {/* Canvas-based Watermark (tamper-resistant) */}
      {isDemo && <Watermark />}

      {/* Card Opening */}
      <Suspense fallback={null}>
        <WeddingCardOpening
          groomName={wedding.groomName}
          brideName={wedding.brideName}
          isBrideMode={isBrideMode}
          guestName={guestName}
          guestSalutation={guestSalutation}
        />
      </Suspense>

      {/* Mode Badge */}
      <ModeSwitcher mode={mode} />

      {/* Main Content */}
      <main>
        <InvitationHeader wedding={wedding} mode={mode} />
        <WeddingInfo wedding={wedding} mode={mode} />
        <Countdown wedding={wedding} mode={mode} />
        <Quote
          wedding={wedding}
          mode={mode}
          guestName={guestName}
          guestSalutation={guestSalutation}
        />
        {wedding.gallery.length > 0 && (
          <Gallery gallery={wedding.gallery} />
        )}
        <Location wedding={wedding} mode={mode} />
        <Wishes weddingId={wedding.id} />
        <Footer wedding={wedding} mode={mode} />
      </main>

      {/* Background Music */}
      {wedding.backgroundMusic && (
        <BackgroundMusic musicUrl={wedding.backgroundMusic} />
      )}
    </div>
  );
}
