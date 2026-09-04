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

const MinimalKoreanTemplate = dynamic(
  () => import("@/components/templates/minimal-korean"),
  { ssr: false }
);

const LuxuryRoyalGoldTemplate = dynamic(
  () => import("@/components/templates/luxury-royal-gold"),
  { ssr: false }
);

const VintageBotanicalTemplate = dynamic(
  () => import("@/components/templates/vintage-botanical"),
  { ssr: false }
);

const BohoTerracottaTemplate = dynamic(
  () => import("@/components/templates/boho-terracotta"),
  { ssr: false }
);

const SweetSakuraTemplate = dynamic(
  () => import("@/components/templates/sweet-sakura"),
  { ssr: false }
);

const EmeraldGlamourTemplate = dynamic(
  () => import("@/components/templates/emerald-glamour"),
  { ssr: false }
);

// ==================== Template Registry ====================

export const templates: Record<string, TemplateConfig> = {
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
      "story",
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
  "minimal-korean": {
    id: "minimal-korean",
    name: "Minimal Korean",
    slug: "minimal-korean",
    description:
      "Phong cách tối giản Hàn Quốc, tinh tế, trang nhã với tone màu be và font chữ thanh lịch.",
    thumbnail: "/templates/minimal-korean-preview.png",
    category: "minimal",
    isPremium: true,
    minPlan: "BASIC",
    component: MinimalKoreanTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#2C3E50",
      accent: "#B39D82",
      background: "#FAF9F5",
    },
    sections: [
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
    ],
    imageSlots: [],
    textSlots: [],
    albumStartIndex: 0,
  },
  "luxury-royal-gold": {
    id: "luxury-royal-gold",
    name: "Luxury Royal Gold",
    slug: "luxury-royal-gold",
    description:
      "Thiệp cưới phong cách hoàng gia quý phái với họa tiết nhũ vàng gold và sắc đỏ ruby thượng lưu.",
    thumbnail: "/templates/luxury-royal-gold-preview.png",
    category: "luxury",
    isPremium: true,
    minPlan: "BASIC",
    component: LuxuryRoyalGoldTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#8B0000",
      accent: "#E5A93C",
      background: "#FFFDF9",
    },
    sections: [
      "header",
      "proclamation",
      "info",
      "timeline",
      "countdown",
      "gallery",
      "wishes",
      "gifting",
      "footer",
    ],
    imageSlots: [],
    textSlots: [],
    albumStartIndex: 0,
  },
  "vintage-botanical": {
    id: "vintage-botanical",
    name: "Vintage Botanical",
    slug: "vintage-botanical",
    description:
      "Thiệp cưới phong cách thực vật thảo mộc cổ điển, sắc xanh sage thanh tao và hòa hợp với thiên nhiên.",
    thumbnail: "/templates/vintage-botanical-preview.png",
    category: "vintage",
    isPremium: true,
    minPlan: "BASIC",
    component: VintageBotanicalTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#3D5A45",
      accent: "#8A9A5B",
      background: "#F8FAF6",
    },
    sections: [
      "header",
      "info",
      "timeline",
      "dresscode",
      "countdown",
      "gallery",
      "letter",
      "wishes",
      "gifting",
      "footer",
    ],
    imageSlots: [],
    textSlots: [],
    albumStartIndex: 0,
  },
  "boho-terracotta": {
    id: "boho-terracotta",
    name: "Boho Terracotta",
    slug: "boho-terracotta",
    description:
      "Phong cách Bohemian phóng khoáng với mái vòm terracotta ấm áp, cỏ lau và hoàng hôn lãng mạn.",
    thumbnail: "/templates/boho-terracotta-preview.png",
    category: "modern",
    isPremium: true,
    minPlan: "BASIC",
    component: BohoTerracottaTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#C25E42",
      accent: "#DDA15E",
      background: "#FDF8F5",
    },
    sections: [
      "header",
      "journey",
      "info",
      "dresscode",
      "countdown",
      "gallery",
      "wishes",
      "gifting",
      "footer",
    ],
    imageSlots: [],
    textSlots: [],
    albumStartIndex: 0,
  },
  "sweet-sakura": {
    id: "sweet-sakura",
    name: "Sweet Sakura",
    slug: "sweet-sakura",
    description:
      "Thiệp cưới tone hồng phấn hoa anh đào ngọt ngào, bay bổng và đầy cảm xúc tình yêu đôi lứa.",
    thumbnail: "/templates/sweet-sakura-preview.png",
    category: "classic",
    isPremium: true,
    minPlan: "BASIC",
    component: SweetSakuraTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#E05A7A",
      accent: "#F8B4C4",
      background: "#FFF7F9",
    },
    sections: [
      "header",
      "story",
      "info",
      "countdown",
      "gallery",
      "wishes",
      "gifting",
      "footer",
    ],
    imageSlots: [],
    textSlots: [],
    albumStartIndex: 0,
  },
  "emerald-glamour": {
    id: "emerald-glamour",
    name: "Emerald Glamour",
    slug: "emerald-glamour",
    description:
      "Phong cách tiệc đêm lộng lẫy Art Deco với tone ngọc lục bảo sâu lắng và viền hoàng kim quyền quý.",
    thumbnail: "/templates/emerald-glamour-preview.png",
    category: "luxury",
    isPremium: true,
    minPlan: "BASIC",
    component: EmeraldGlamourTemplate as ComponentType<WeddingTemplateProps>,
    defaultColors: {
      primary: "#0E3B2E",
      accent: "#D4AF37",
      background: "#F7FAF8",
    },
    sections: [
      "header",
      "info",
      "programme",
      "dresscode",
      "countdown",
      "gallery",
      "wishes",
      "gifting",
      "footer",
    ],
    imageSlots: [],
    textSlots: [],
    albumStartIndex: 0,
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
