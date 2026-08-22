import type { WeddingTextSlot } from "@/lib/wedding-slots";

/**
 * Slot text riêng cho template Modern Cinematic (template2) — layout
 * StoryEngine hoàn toàn khác classic-burgundy/template1 nên không dùng
 * chung `CLASSIC_TEXT_SLOTS`. Danh sách này chỉ gồm những gì THỰC SỰ render
 * trong 3 chương mặc định có text từ wedding data (HeroSection,
 * EditorialInvitation, AsymmetricMasonryGallery's quote) — không thêm slot
 * cho ceremonyTime/venue vì `EditorialInvitation.jsx` không render venue
 * riêng và `ceremonyTime` không phải `WeddingTextField` hợp lệ (khoảng
 * trống có sẵn, giống classic-burgundy — không mở rộng phạm vi ở đây).
 */
export const MODERN_CINEMATIC_TEXT_SLOTS: WeddingTextSlot[] = [
  { kind: "text", key: "mc-groom-name", label: "Tên chú rể", hint: "Chữ ký lớn trên ảnh bìa & thiệp mời", field: "groomName", section: "hero", inputType: "text" },
  { kind: "text", key: "mc-bride-name", label: "Tên cô dâu", hint: "Chữ ký lớn trên ảnh bìa & thiệp mời", field: "brideName", section: "hero", inputType: "text" },
  { kind: "text", key: "mc-groom-father", label: "Tên cha chú rể", hint: "Cột Nhà Trai trong phần lời mời", field: "groomParents.father", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-groom-mother", label: "Tên mẹ chú rể", hint: "Cột Nhà Trai trong phần lời mời", field: "groomParents.mother", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-bride-father", label: "Tên cha cô dâu", hint: "Cột Nhà Gái trong phần lời mời", field: "brideParents.father", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-bride-mother", label: "Tên mẹ cô dâu", hint: "Cột Nhà Gái trong phần lời mời", field: "brideParents.mother", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-groom-date", label: "Ngày cưới (nhà trai)", hint: "Ngày giờ lễ Tân Hôn", field: "groomCeremony.date", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-groom-lunar-date", label: "Ngày âm lịch (nhà trai)", hint: "Ngày âm lịch lễ Tân Hôn", field: "groomCeremony.lunarDate", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-groom-address", label: "Địa chỉ (nhà trai)", hint: "Địa chỉ tổ chức lễ Tân Hôn", field: "groomCeremony.address", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-bride-date", label: "Ngày cưới (nhà gái)", hint: "Ngày giờ lễ Vu Quy", field: "brideCeremony.date", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-bride-lunar-date", label: "Ngày âm lịch (nhà gái)", hint: "Ngày âm lịch lễ Vu Quy", field: "brideCeremony.lunarDate", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-bride-address", label: "Địa chỉ (nhà gái)", hint: "Địa chỉ tổ chức lễ Vu Quy", field: "brideCeremony.address", section: "invitation", inputType: "text" },
  { kind: "text", key: "mc-quote", label: "Lời trích dẫn", hint: "Câu quote xuất hiện ở chương The First Glance", field: "quote", section: "story", inputType: "textarea" },
];
