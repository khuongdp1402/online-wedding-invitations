import type { ComponentType } from "react";

export type WeddingTemplateProps = {
  wedding: WeddingData;
  mode: "bride" | "groom";
  isDemo: boolean;
  guestName?: string;
  guestSalutation?: string;
};

export type CeremonyEvent = {
  date: string;
  lunarDate?: string;
  ceremonyTime: string;
  receptionTime: string;
  venue: string;
  address: string;
  googleMapsUrl?: string;
};

export type ParentInfo = {
  father: string;
  mother: string;
};

export type GiftingInfo = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
};

export type WeddingData = {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  groomParents: ParentInfo;
  brideParents: ParentInfo;
  groomCeremony: CeremonyEvent;
  brideCeremony: CeremonyEvent;
  quote?: string;
  gallery: string[];
  gifting?: {
    groom?: GiftingInfo;
    bride?: GiftingInfo;
  };
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  backgroundMusic?: string;
  status: "DRAFT" | "DEMO" | "PUBLISHED" | "EXPIRED";
  plan: "FREE" | "BASIC" | "STANDARD" | "PREMIUM";
};

export type TemplateConfig = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: "classic" | "modern" | "minimal" | "luxury";
  isPremium: boolean;
  minPlan: "FREE" | "BASIC" | "STANDARD" | "PREMIUM";
  component: ComponentType<WeddingTemplateProps>;
  defaultColors: {
    primary: string;
    accent: string;
    background: string;
  };
  sections: string[];
};

// Template registry - templates will be registered here
// Classic Burgundy will be added in Phase 2 when migrating from existing project
export const templates: Record<string, TemplateConfig> = {};

export function getTemplate(slug: string): TemplateConfig | undefined {
  return templates[slug];
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(templates);
}

export function getTemplatesByCategory(
  category: string
): TemplateConfig[] {
  return Object.values(templates).filter((t) => t.category === category);
}

export function getFreeTemplates(): TemplateConfig[] {
  return Object.values(templates).filter((t) => !t.isPremium);
}

export function getPremiumTemplates(): TemplateConfig[] {
  return Object.values(templates).filter((t) => t.isPremium);
}
