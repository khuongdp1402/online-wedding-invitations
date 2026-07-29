import { Wedding, Template } from "@prisma/client";

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
  backgroundColor?: string;
  sectionOrder?: string[];
  backgroundMusic?: string;
  status: "DRAFT" | "DEMO" | "PUBLISHED" | "EXPIRED";
  plan: "FREE" | "BASIC" | "STANDARD" | "PREMIUM";
};

/**
 * Interface chuẩn cho props của mọi Wedding Template component.
 */
export interface WeddingTemplateProps {
  wedding: WeddingData;
  template?: Template;
  mode?: "groom" | "bride";
  isDemo?: boolean;
  
  // Thông tin cá nhân hóa (Personalization)
  guestName?: string;         // Lấy từ URL ?name=...
  guestSalutation?: string;    // Lấy từ URL ?salutation=...
  
  // Edit overlay for dashboard
  editOverlay?: {
    highlightSlot: string | null;
    onSlotClick?: (slotKey: string) => void;
  };
  
  // Các hàm tiện ích dùng chung
  onRSVPSubmit?: (data: any) => Promise<void>;
  onWishSubmit?: (data: any) => Promise<void>;
  
  // Preview mode flag
  isPreview?: boolean;
}
