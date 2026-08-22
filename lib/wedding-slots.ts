import type { WeddingData } from "@/types/template";

export type WeddingImageSlot = {
  kind: "image";
  key: string;
  galleryIndex: number;
  label: string;
  hint: string;
};

export type WeddingTextField =
  | "groomName"
  | "brideName"
  | "groomParents.father"
  | "groomParents.mother"
  | "brideParents.father"
  | "brideParents.mother"
  | "groomCeremony.date"
  | "groomCeremony.lunarDate"
  | "groomCeremony.venue"
  | "groomCeremony.address"
  | "brideCeremony.date"
  | "brideCeremony.lunarDate"
  | "brideCeremony.venue"
  | "brideCeremony.address"
  | "quote";

export type WeddingTextSlot = {
  kind: "text";
  key: string;
  label: string;
  hint: string;
  field: WeddingTextField;
  section: string;
  inputType: "text" | "textarea";
};

export type WeddingSlot = WeddingImageSlot | WeddingTextSlot;

export function getTextFieldValue(wedding: WeddingData, field: WeddingTextField): string {
  switch (field) {
    case "groomName":
      return wedding.groomName ?? "";
    case "brideName":
      return wedding.brideName ?? "";
    case "groomParents.father":
      return wedding.groomParents?.father ?? "";
    case "groomParents.mother":
      return wedding.groomParents?.mother ?? "";
    case "brideParents.father":
      return wedding.brideParents?.father ?? "";
    case "brideParents.mother":
      return wedding.brideParents?.mother ?? "";
    case "groomCeremony.date":
      return wedding.groomCeremony?.date ?? "";
    case "groomCeremony.lunarDate":
      return wedding.groomCeremony?.lunarDate ?? "";
    case "groomCeremony.venue":
      return wedding.groomCeremony?.venue ?? "";
    case "groomCeremony.address":
      return wedding.groomCeremony?.address ?? "";
    case "brideCeremony.date":
      return wedding.brideCeremony?.date ?? "";
    case "brideCeremony.lunarDate":
      return wedding.brideCeremony?.lunarDate ?? "";
    case "brideCeremony.venue":
      return wedding.brideCeremony?.venue ?? "";
    case "brideCeremony.address":
      return wedding.brideCeremony?.address ?? "";
    case "quote":
      return wedding.quote ?? "";
    default:
      return "";
  }
}

export function textFieldForSlotKey(
  slotKey: string,
  textSlots: WeddingTextSlot[]
): WeddingTextField | null {
  return textSlots.find((s) => s.key === slotKey)?.field ?? null;
}

/**
 * Slot key namespace dùng chung cho classic-elegance (template1) và classic-burgundy —
 * cả 2 template dùng cùng cấu trúc "cb-*" vì bố cục ảnh/text tương đương nhau.
 */
export const CLASSIC_TEXT_SLOTS: WeddingTextSlot[] = [
  { kind: "text", key: "cb-groom-name", label: "Tên chú rể", hint: "Tên chú rể ở đầu trang", field: "groomName", section: "wedding-info", inputType: "text" },
  { kind: "text", key: "cb-bride-name", label: "Tên cô dâu", hint: "Tên cô dâu ở đầu trang", field: "brideName", section: "wedding-info", inputType: "text" },
  { kind: "text", key: "cb-groom-father", label: "Tên cha chú rể", hint: "Phần thông tin gia đình", field: "groomParents.father", section: "wedding-info", inputType: "text" },
  { kind: "text", key: "cb-groom-mother", label: "Tên mẹ chú rể", hint: "Phần thông tin gia đình", field: "groomParents.mother", section: "wedding-info", inputType: "text" },
  { kind: "text", key: "cb-bride-father", label: "Tên cha cô dâu", hint: "Phần thông tin gia đình", field: "brideParents.father", section: "wedding-info", inputType: "text" },
  { kind: "text", key: "cb-bride-mother", label: "Tên mẹ cô dâu", hint: "Phần thông tin gia đình", field: "brideParents.mother", section: "wedding-info", inputType: "text" },
  { kind: "text", key: "cb-groom-date", label: "Ngày cưới (nhà trai)", hint: "Ngày giờ lễ nhà trai", field: "groomCeremony.date", section: "location", inputType: "text" },
  { kind: "text", key: "cb-groom-lunar-date", label: "Ngày âm lịch (nhà trai)", hint: "Ngày âm lịch lễ nhà trai", field: "groomCeremony.lunarDate", section: "location", inputType: "text" },
  { kind: "text", key: "cb-groom-venue", label: "Tên địa điểm (nhà trai)", hint: "Địa điểm tổ chức lễ nhà trai", field: "groomCeremony.venue", section: "location", inputType: "text" },
  { kind: "text", key: "cb-groom-address", label: "Địa chỉ (nhà trai)", hint: "Địa chỉ chi tiết lễ nhà trai", field: "groomCeremony.address", section: "location", inputType: "text" },
  { kind: "text", key: "cb-bride-date", label: "Ngày cưới (nhà gái)", hint: "Ngày giờ lễ nhà gái", field: "brideCeremony.date", section: "location", inputType: "text" },
  { kind: "text", key: "cb-bride-lunar-date", label: "Ngày âm lịch (nhà gái)", hint: "Ngày âm lịch lễ nhà gái", field: "brideCeremony.lunarDate", section: "location", inputType: "text" },
  { kind: "text", key: "cb-bride-venue", label: "Tên địa điểm (nhà gái)", hint: "Địa điểm tổ chức lễ nhà gái", field: "brideCeremony.venue", section: "location", inputType: "text" },
  { kind: "text", key: "cb-bride-address", label: "Địa chỉ (nhà gái)", hint: "Địa chỉ chi tiết lễ nhà gái", field: "brideCeremony.address", section: "location", inputType: "text" },
  { kind: "text", key: "cb-quote", label: "Lời mời / Câu trích dẫn", hint: "Đoạn văn lời mời trân trọng", field: "quote", section: "quote", inputType: "textarea" },
];
