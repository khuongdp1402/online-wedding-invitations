import type { Wedding } from "@prisma/client";
import type { WeddingData } from "@/types/template";
import { getEffectiveWeddingStatus } from "@/lib/payment";

/**
 * Transform 1 record Prisma `Wedding` sang `WeddingData` (shape dùng bởi mọi
 * template component).
 */
export function toWeddingData(wedding: Wedding): WeddingData {
  const effectiveStatus = getEffectiveWeddingStatus(wedding);
  return {
    id: wedding.id,
    slug: wedding.slug,
    groomName: wedding.groomName,
    brideName: wedding.brideName,
    groomParents: wedding.groomParents as { father: string; mother: string },
    brideParents: wedding.brideParents as { father: string; mother: string },
    groomCeremony: wedding.groomCeremony as WeddingData["groomCeremony"],
    brideCeremony: wedding.brideCeremony as WeddingData["brideCeremony"],
    quote: wedding.quote || undefined,
    gallery: (wedding.gallery as string[]) || [],
    gifting: wedding.gifting as WeddingData["gifting"],
    primaryColor: wedding.primaryColor || undefined,
    accentColor: wedding.accentColor || undefined,
    fontFamily: wedding.fontFamily || undefined,
    backgroundColor: wedding.backgroundColor || undefined,
    textColor: wedding.textColor || undefined,
    typography: wedding.typography as WeddingData["typography"],
    sectionOrder: (wedding.sectionOrder ?? undefined) as WeddingData["sectionOrder"],
    backgroundMusic: wedding.backgroundMusic || undefined,
    status: effectiveStatus as WeddingData["status"],
  };
}
