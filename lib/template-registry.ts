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
  AUTUMN_WATERCOLOR_STRUCTURE_SLOTS,
  AUTUMN_WATERCOLOR_ALBUM_START_INDEX
} from "@/lib/wedding-image-slots";
import { WeddingTextSlot, CLASSIC_TEXT_SLOTS } from "@/lib/wedding-slots";
import { MODERN_CINEMATIC_TEXT_SLOTS } from "@/lib/wedding-slots-modern-cinematic";

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
  imageSlots: WeddingImageSlot[];
  textSlots: WeddingTextSlot[];
  albumStartIndex: number;
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

const ClassicBurgundyTemplate = dynamic(
  () => import("@/components/templates/classic-burgundy"),
  { ssr: false }
);

const AutumnWatercolorTemplate = dynamic(
  () => import("@/components/templates/autumn-watercolor"),
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
  "classic-burgundy": {
    id: "classic-burgundy",
    name: "Classic Burgundy",
    slug: "classic-burgundy",
    description:
      "Thiệp cưới cổ điển tông burgundy sang trọng, bố cục ảnh nghiêng tinh tế.",
    thumbnail: "/templates/classic-burgundy-preview.png",
    category: "classic",
    isPremium: true,
    minPlan: "BASIC",
    component: ClassicBurgundyTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#800020",
      accent: "#d4a853",
      background: "#FDFBF7",
    },
    sections: [
      "header",
      "wedding-info",
      "countdown",
      "quote",
      "gallery",
      "location",
      "wishes",
      "footer",
    ],
    imageSlots: CLASSIC_BURGUNDY_STRUCTURE_SLOTS,
    textSlots: CLASSIC_TEXT_SLOTS,
    albumStartIndex: CLASSIC_BURGUNDY_ALBUM_START_INDEX,
  },
  "autumn-watercolor": {
    id: "autumn-watercolor",
    name: "Autumn Watercolor",
    slug: "autumn-watercolor",
    description:
      "Thiệp cưới phong cách màu nước mùa thu, ấm áp và lãng mạn với khung ảnh polaroid.",
    thumbnail: "/templates/autumn-watercolor-preview.png",
    category: "vintage",
    isPremium: true,
    minPlan: "BASIC",
    component: AutumnWatercolorTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#b9856f",
      accent: "#422114",
      background: "#f7f1eb",
    },
    sections: [
      "header",
      "info",
      "gallery",
      "timeline",
      "wishes",
      "gifting",
      "footer",
    ],
    imageSlots: AUTUMN_WATERCOLOR_STRUCTURE_SLOTS,
    textSlots: [],
    albumStartIndex: AUTUMN_WATERCOLOR_ALBUM_START_INDEX,
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
