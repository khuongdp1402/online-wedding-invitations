"use client";

import { useEffect } from "react";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import type { WeddingData } from "@/lib/template-registry";

type WeddingPageClientProps = {
  templateSlug: string;
  wedding: WeddingData;
  mode: "bride" | "groom";
  isDemo: boolean;
  guestName?: string;
  guestSalutation?: string;
};

export function WeddingPageClient({
  templateSlug,
  wedding,
  mode,
  isDemo,
  guestName,
  guestSalutation,
}: WeddingPageClientProps) {
  // Track guest link open
  useEffect(() => {
    if (guestName && wedding.slug) {
      fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingSlug: wedding.slug,
          guestName,
        }),
      }).catch(() => {});
    }
  }, [guestName, wedding.slug]);

  return (
    <TemplateRenderer
      templateSlug={templateSlug}
      wedding={wedding}
      mode={mode}
      isDemo={isDemo}
      guestName={guestName}
      guestSalutation={guestSalutation}
    />
  );
}
