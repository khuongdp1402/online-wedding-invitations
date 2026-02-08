"use client";

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
