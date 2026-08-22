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
  /** Section chứa ảnh này (khớp key trong TemplateConfig.sections) — dùng để gộp form ảnh+text theo section trong dashboard editor. */
  section: string;
};

export const CLASSIC_BURGUNDY_STRUCTURE_SLOTS: WeddingImageSlot[] = [
  {
    key: "cb-hero",
    galleryIndex: 0,
    label: "Ảnh nền đầu trang",
    hint: "Toàn màn hình phía sau tên cô dâu & chú rể",
    section: "header",
  },
  {
    key: "cb-countdown",
    galleryIndex: 1,
    label: "Ảnh khối đếm ngược",
    hint: "Khung bên cạnh đồng hồ đếm ngược",
    section: "countdown",
  },
  {
    key: "cb-wedding-a",
    galleryIndex: 2,
    label: "Ảnh cặp đôi (trái)",
    hint: "Khung nghiêng trái trong phần thông tin lễ",
    section: "wedding-info",
  },
  {
    key: "cb-wedding-b",
    galleryIndex: 3,
    label: "Ảnh cặp đôi (phải)",
    hint: "Khung nghiêng phải trong phần thông tin lễ",
    section: "wedding-info",
  },
  {
    key: "cb-quote-a",
    galleryIndex: 4,
    label: "Ảnh lời mời (trái)",
    hint: "Cạnh đoạn “Trân trọng kính mời”",
    section: "quote",
  },
  {
    key: "cb-quote-b",
    galleryIndex: 5,
    label: "Ảnh lời mời (phải)",
    hint: "Cạnh đoạn “Trân trọng kính mời”",
    section: "quote",
  },
];

export const CLASSIC_BURGUNDY_ALBUM_START_INDEX = 6;

export const MODERN_CINEMATIC_STRUCTURE_SLOTS: WeddingImageSlot[] = [
  {
    key: "mc-hero",
    galleryIndex: 0,
    label: "Ảnh màn hình mở đầu",
    hint: "Ảnh toàn màn hình (Hero) xuất hiện đầu tiên",
    section: "hero",
  },
  {
    key: "mc-invitation",
    galleryIndex: 1,
    label: "Ảnh lời mời",
    hint: "Xuất hiện bên cạnh thiệp mời trân trọng",
    section: "invitation",
  },
  {
    key: "mc-rsvp",
    galleryIndex: 2,
    label: "Ảnh Hồi âm & Lời chúc",
    hint: "Xuất hiện ở phần cuối cùng",
    section: "rsvp",
  },
];

export const MODERN_CINEMATIC_ALBUM_START_INDEX = 3;

export const AUTUMN_WATERCOLOR_STRUCTURE_SLOTS: WeddingImageSlot[] = [
  {
    key: "intro-1",
    galleryIndex: 0,
    label: "Ảnh polaroid (trái)",
    hint: "Khung polaroid nghiêng trái ở đầu trang",
    section: "header",
  },
  {
    key: "intro-2",
    galleryIndex: 1,
    label: "Ảnh polaroid (phải)",
    hint: "Khung polaroid nghiêng phải ở đầu trang",
    section: "header",
  },
  {
    key: "gallery-2",
    galleryIndex: 2,
    label: "Ảnh album 1",
    hint: "Ô lưới đầu tiên trong khối Album ảnh cưới",
    section: "gallery",
  },
  {
    key: "gallery-3",
    galleryIndex: 3,
    label: "Ảnh album 2",
    hint: "Ô lưới trong khối Album ảnh cưới",
    section: "gallery",
  },
  {
    key: "gallery-4",
    galleryIndex: 4,
    label: "Ảnh album 3",
    hint: "Ô lưới trong khối Album ảnh cưới",
    section: "gallery",
  },
  {
    key: "gallery-5",
    galleryIndex: 5,
    label: "Ảnh album 4",
    hint: "Ô lưới trong khối Album ảnh cưới",
    section: "gallery",
  },
  {
    key: "gallery-6",
    galleryIndex: 6,
    label: "Ảnh album 5",
    hint: "Ô lưới trong khối Album ảnh cưới",
    section: "gallery",
  },
  {
    key: "gallery-7",
    galleryIndex: 7,
    label: "Ảnh album 6",
    hint: "Ô lưới cuối trong khối Album ảnh cưới",
    section: "gallery",
  },
];

export const AUTUMN_WATERCOLOR_ALBUM_START_INDEX = 8;

export function albumSlotKey(albumIndex: number): string {
  return `album-${albumIndex}`; // Generalised album prefix
}

export function parseAlbumSlotKey(key: string): number | null {
  const m = /^(?:cb-)?album-(\d+)$/.exec(key); // Support old cb-album and new album-
  return m ? parseInt(m[1], 10) : null;
}

export function galleryIndexForSlotKey(slotKey: string, templateSlug?: string): number | null {
  // Try classic
  const cbStruct = CLASSIC_BURGUNDY_STRUCTURE_SLOTS.find((s) => s.key === slotKey);
  if (cbStruct) return cbStruct.galleryIndex;

  // Try modern cinematic
  const mcStruct = MODERN_CINEMATIC_STRUCTURE_SLOTS.find((s) => s.key === slotKey);
  if (mcStruct) return mcStruct.galleryIndex;

  // Try autumn watercolor
  const awStruct = AUTUMN_WATERCOLOR_STRUCTURE_SLOTS.find((s) => s.key === slotKey);
  if (awStruct) return awStruct.galleryIndex;

  const album = parseAlbumSlotKey(slotKey);
  if (album !== null) {
    const startIndex =
      templateSlug === "modern-cinematic"
        ? MODERN_CINEMATIC_ALBUM_START_INDEX
        : templateSlug === "autumn-watercolor"
        ? AUTUMN_WATERCOLOR_ALBUM_START_INDEX
        : CLASSIC_BURGUNDY_ALBUM_START_INDEX;
    return startIndex + album;
  }
  return null;
}

/** Đảm bảo mảng gallery đủ dài cho các slot album đã có */
export function ensureGalleryLength(gallery: string[], minLength: number): string[] {
  const g = [...gallery];
  while (g.length < minLength) g.push("");
  return g;
}
