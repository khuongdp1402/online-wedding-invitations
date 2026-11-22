import { Wedding, Template } from "@prisma/client";
import type { SectionConfig } from "@/lib/section-config";

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
  fontFamily?: string; // (Legacy)
  typography?: {
    heading?: string;
    body?: string;
    script?: string;
    thiepOnlineContent?: Record<string, any>;
  };
  backgroundColor?: string;
  textColor?: string;
  /**
   * Thứ tự + trạng thái bật/tắt các khối.
   * `string[]` là định dạng cũ (mọi khối đều hiện) — đọc qua
   * `resolveSections`/`visibleSectionKeys` trong `@/lib/section-config`.
   */
  sectionOrder?: string[] | SectionConfig[];
  backgroundMusic?: string;
  status: "DRAFT" | "DEMO" | "PUBLISHED" | "EXPIRED";
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
    /** `el`: phần tử DOM vừa bấm, dùng để định vị popover sửa nhanh tại chỗ. */
    onSlotClick?: (slotKey: string, el?: HTMLElement) => void;
  };
  
  // Các hàm tiện ích dùng chung
  onRSVPSubmit?: (data: any) => Promise<void>;
  onWishSubmit?: (data: any) => Promise<void>;
  
  // Preview mode flag
  isPreview?: boolean;
}
