/**
 * Ánh xạ vị trí ảnh trên template classic-burgundy ↔ chỉ số trong wedding.gallery.
 * gallery[0..5]: ảnh cấu trúc (hero, countdown, thông tin x2, quote x2).
 * gallery[6..]: chỉ dùng cho khối "Bộ ảnh kỷ niệm".
 */
export type WeddingImageSlot = {
  key: string;
  galleryIndex: number;
  label: string;
  hint: string;
};

export const CLASSIC_BURGUNDY_STRUCTURE_SLOTS: WeddingImageSlot[] = [
  {
    key: "cb-hero",
    galleryIndex: 0,
    label: "Ảnh nền đầu trang",
    hint: "Toàn màn hình phía sau tên cô dâu & chú rể",
  },
  {
    key: "cb-countdown",
    galleryIndex: 1,
    label: "Ảnh khối đếm ngược",
    hint: "Khung bên cạnh đồng hồ đếm ngược",
  },
  {
    key: "cb-wedding-a",
    galleryIndex: 2,
    label: "Ảnh cặp đôi (trái)",
    hint: "Khung nghiêng trái trong phần thông tin lễ",
  },
  {
    key: "cb-wedding-b",
    galleryIndex: 3,
    label: "Ảnh cặp đôi (phải)",
    hint: "Khung nghiêng phải trong phần thông tin lễ",
  },
  {
    key: "cb-quote-a",
    galleryIndex: 4,
    label: "Ảnh lời mời (trái)",
    hint: "Cạnh đoạn “Trân trọng kính mời”",
  },
  {
    key: "cb-quote-b",
    galleryIndex: 5,
    label: "Ảnh lời mời (phải)",
    hint: "Cạnh đoạn “Trân trọng kính mời”",
  },
];

export const CLASSIC_BURGUNDY_ALBUM_START_INDEX = 6;

export function albumSlotKey(albumIndex: number): string {
  return `cb-album-${albumIndex}`;
}

export function parseAlbumSlotKey(key: string): number | null {
  const m = /^cb-album-(\d+)$/.exec(key);
  return m ? parseInt(m[1], 10) : null;
}

export function galleryIndexForSlotKey(slotKey: string): number | null {
  const struct = CLASSIC_BURGUNDY_STRUCTURE_SLOTS.find((s) => s.key === slotKey);
  if (struct) return struct.galleryIndex;
  const album = parseAlbumSlotKey(slotKey);
  if (album !== null) return CLASSIC_BURGUNDY_ALBUM_START_INDEX + album;
  return null;
}

/** Đảm bảo mảng gallery đủ dài cho các slot album đã có */
export function ensureGalleryLength(gallery: string[], minLength: number): string[] {
  const g = [...gallery];
  while (g.length < minLength) g.push("");
  return g;
}
