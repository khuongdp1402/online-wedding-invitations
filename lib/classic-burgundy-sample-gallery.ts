/**
 * Ảnh mẫu cho template classic-burgundy (file trong public/templates/classic-burgundy/samples/).
 * Chỉ áp dụng cho 6 vị trí cấu trúc (hero → quote). Album (từ index 6) không tự điền mẫu.
 */
export const CLASSIC_BURGUNDY_SAMPLE_GALLERY = [
  "/templates/classic-burgundy/samples/01.jpg",
  "/templates/classic-burgundy/samples/02.jpg",
  "/templates/classic-burgundy/samples/03.jpg",
  "/templates/classic-burgundy/samples/04.jpg",
] as const;

const SAMPLES = CLASSIC_BURGUNDY_SAMPLE_GALLERY;

const STRUCTURE_LEN = 6;

/** Điền ảnh mẫu cho 6 ô cấu trúc khi user chưa upload */
export function resolveClassicBurgundyStructureGallery(
  userGallery: string[]
): string[] {
  const cleaned = (userGallery || [])
    .slice(0, STRUCTURE_LEN)
    .map((u) => (typeof u === "string" ? u.trim() : ""));
  const out: string[] = [];
  for (let i = 0; i < STRUCTURE_LEN; i++) {
    out.push(cleaned[i] || SAMPLES[i % SAMPLES.length]);
  }
  return out;
}
