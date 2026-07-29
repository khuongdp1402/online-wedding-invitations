import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import {
  WeddingTemplateProps,
  CeremonyEvent,
  ParentInfo,
  GiftingInfo,
  WeddingData,
} from "@/types/template";

// ==================== Types ====================
// Re-exported from @/types/template for backward compatibility

export type {
  WeddingTemplateProps,
  CeremonyEvent,
  ParentInfo,
  GiftingInfo,
  WeddingData,
};

export type TemplateConfig = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: "classic" | "modern" | "minimal" | "luxury" | "vintage";
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

// ==================== Dynamic Template Imports ====================

const Template1 = dynamic(
  () => import("@/components/templates/template1"),
  { ssr: false }
);

const Template2 = dynamic(
  () => import("@/components/templates/template2"),
  { ssr: false }
);

// ==================== Template Registry ====================

export const templates: Record<string, TemplateConfig> = {
  "classic-elegance": {
    id: "classic-elegance",
    name: "Classic Elegance",
    slug: "classic-elegance",
    description:
      "Thiệp cưới mang phong cách truyền thống Việt Nam, tông màu đỏ burgundy & vàng gold thanh lịch.",
    thumbnail: "/templates/template1-preview.png",
    category: "classic",
    isPremium: false,
    minPlan: "FREE",
    component: Template1 as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#800020",
      accent: "#d4a853",
      background: "#faf8f5",
    },
    sections: [
      "header",
      "wedding-info",
      "countdown",
      "quote",
      "gallery",
      "location",
      "rsvp",
      "wishes",
      "gifting",
      "footer",
    ],
  },
  "modern-cinematic": {
    id: "modern-cinematic",
    name: "Modern Cinematic",
    slug: "modern-cinematic",
    description:
      "Thiệp cưới cuộn 3D hiện đại, hiệu ứng điện ảnh và kể chuyện tinh tế.",
    thumbnail: "/templates/template2-preview.png",
    category: "modern",
    isPremium: true,
    minPlan: "STANDARD",
    component: Template2 as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#111111",
      accent: "#f5f1ea",
      background: "#000000",
    },
    sections: [
      "hero",
      "story",
      "journey",
      "invitation",
      "gallery",
      "rsvp",
    ],
  },
};

// ==================== Registry Helpers ====================

export function getTemplate(slug: string): TemplateConfig | undefined {
  return templates[slug];
}

export function getAllTemplates(): TemplateConfig[] {
  return Object.values(templates);
}

export function getTemplatesByCategory(category: string): TemplateConfig[] {
  return Object.values(templates).filter((t) => t.category === category);
}

export function getFreeTemplates(): TemplateConfig[] {
  return Object.values(templates).filter((t) => !t.isPremium);
}

export function getPremiumTemplates(): TemplateConfig[] {
  return Object.values(templates).filter((t) => t.isPremium);
}
