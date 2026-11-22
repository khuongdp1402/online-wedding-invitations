import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import {
  WeddingTemplateProps,
  CeremonyEvent,
  ParentInfo,
  GiftingInfo,
  WeddingData,
} from "@/types/template";
import {
  WeddingImageSlot,
  CLASSIC_BURGUNDY_STRUCTURE_SLOTS,
  CLASSIC_BURGUNDY_ALBUM_START_INDEX,
  MODERN_CINEMATIC_STRUCTURE_SLOTS,
  MODERN_CINEMATIC_ALBUM_START_INDEX,
} from "@/lib/wedding-image-slots";
import { WeddingTextSlot, CLASSIC_TEXT_SLOTS } from "@/lib/wedding-slots";
import { MODERN_CINEMATIC_TEXT_SLOTS } from "@/lib/wedding-slots-modern-cinematic";
import { THIEPONLINE_CATALOG } from "@/lib/thieponline-catalog";
import { createThiepOnlineTemplate } from "@/components/templates/thieponline";

// ==================== Types ====================

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
  imageSlots: WeddingImageSlot[];
  textSlots: WeddingTextSlot[];
  albumStartIndex: number;
};

// ==================== Built-in Banner Templates ====================

const Template1 = dynamic(
  () => import("@/components/templates/template1"),
  { ssr: false }
);

const Template2 = dynamic(
  () => import("@/components/templates/template2"),
  { ssr: false }
);

const DEFAULT_THIEPONLINE_SECTIONS = [
  "header",
  "wedding-info",
  "gallery",
  "countdown",
  "calendar",
  "location",
  "dresscode",
  "timeline",
  "rsvp",
  "wishes",
  "gifting",
  "footer",
];

const builtInTemplates: Record<string, TemplateConfig> = {
  "classic-elegance": {
    id: "classic-elegance",
    name: "Classic Elegance",
    slug: "classic-elegance",
    description:
      "Thiệp cưới mang phong cách Á Đông truyền thống Việt Nam, sơn son thếp vàng với Tứ Lễ Giao Duyên và Chữ Hỷ hoàng gia.",
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
      "ceremony-rituals",
      "countdown",
      "quote",
      "gallery",
      "location",
      "rsvp",
      "wishes",
      "gifting",
      "footer",
    ],
    imageSlots: CLASSIC_BURGUNDY_STRUCTURE_SLOTS,
    textSlots: CLASSIC_TEXT_SLOTS,
    albumStartIndex: CLASSIC_BURGUNDY_ALBUM_START_INDEX,
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
    minPlan: "BASIC",
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
      "mousetrail",
      "carousel",
      "rsvp",
    ],
    imageSlots: MODERN_CINEMATIC_STRUCTURE_SLOTS,
    textSlots: MODERN_CINEMATIC_TEXT_SLOTS,
    albumStartIndex: MODERN_CINEMATIC_ALBUM_START_INDEX,
  },
};

const thiepOnlineTemplates: Record<string, TemplateConfig> = Object.fromEntries(
  THIEPONLINE_CATALOG.map((item) => [
    item.slug,
    {
      id: item.slug,
      name: item.name,
      slug: item.slug,
      description: item.description,
      thumbnail: item.thumbnail,
      category: item.category,
      isPremium: item.isPremium,
      minPlan: item.minPlan,
      component: createThiepOnlineTemplate(item),
      defaultColors: item.defaultColors,
      sections: DEFAULT_THIEPONLINE_SECTIONS,
      imageSlots: CLASSIC_BURGUNDY_STRUCTURE_SLOTS,
      textSlots: CLASSIC_TEXT_SLOTS,
      albumStartIndex: CLASSIC_BURGUNDY_ALBUM_START_INDEX,
    },
  ])
);

export const templates: Record<string, TemplateConfig> = {
  ...builtInTemplates,
  ...thiepOnlineTemplates,
};

const LEGACY_SLUG_MAP: Record<string, string> = {
  "song-hy-red": "song-hy-do",
};

// ==================== Registry Helpers ====================

export function getTemplate(slug: string): TemplateConfig | undefined {
  const mapped = LEGACY_SLUG_MAP[slug] || slug;
  return templates[mapped] || templates["classic-elegance"];
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
