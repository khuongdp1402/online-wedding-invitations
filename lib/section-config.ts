import { isSectionRequired } from "@/lib/section-registry";

/**
 * Cấu hình một khối trong thiệp: hiện hay ẩn, và thứ tự (theo vị trí trong mảng).
 *
 * Lưu vào cột `Wedding.sectionOrder Json?` sẵn có nên không cần migration.
 * Định dạng cũ là `string[]` — `resolveSections` đọc được cả hai.
 */
export type SectionConfig = { key: string; visible: boolean };

function isSectionConfig(value: unknown): value is SectionConfig {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as SectionConfig).key === "string"
  );
}

/**
 * Chuẩn hoá dữ liệu thô từ DB thành danh sách khối của template hiện tại.
 *
 * - `string[]` (định dạng cũ): mọi khối đều `visible: true`, giữ nguyên hành vi
 *   trước đây cho thiệp đã tạo từ trước.
 * - `SectionConfig[]` (định dạng mới): dùng trực tiếp.
 * - `null`/rỗng/không hợp lệ: lấy toàn bộ khối mặc định của template.
 *
 * Luôn lọc bỏ khối template không hỗ trợ, và bổ sung khối template có mà cấu
 * hình còn thiếu (ví dụ sau khi đổi mẫu) vào cuối danh sách với `visible: true`.
 */
export function resolveSections(
  raw: unknown,
  templateSections: string[]
): SectionConfig[] {
  const supported = new Set(templateSections);
  let parsed: SectionConfig[] = [];

  if (Array.isArray(raw)) {
    parsed = raw
      .map((item): SectionConfig | null => {
        if (typeof item === "string") return { key: item, visible: true };
        if (isSectionConfig(item)) {
          return { key: item.key, visible: item.visible !== false };
        }
        return null;
      })
      .filter((item): item is SectionConfig => item !== null);
  }

  // Chỉ giữ khối template hỗ trợ, bỏ trùng lặp
  const seen = new Set<string>();
  const result = parsed.filter((item) => {
    if (!supported.has(item.key) || seen.has(item.key)) return false;
    seen.add(item.key);
    return true;
  });

  // Bổ sung khối template có mà cấu hình chưa nhắc tới
  for (const key of templateSections) {
    if (!seen.has(key)) {
      result.push({ key, visible: true });
      seen.add(key);
    }
  }

  // Khối bắt buộc luôn hiện, kể cả dữ liệu cũ có tắt
  return result.map((item) =>
    isSectionRequired(item.key) ? { ...item, visible: true } : item
  );
}

/**
 * Danh sách key cần render, đã lọc theo trạng thái bật/tắt của người dùng.
 *
 * Không còn khoá theo gói — thiệp đã xuất bản dùng được toàn bộ section của
 * template, giá được tính theo template (`lib/template-pricing.ts`).
 */
export function visibleSectionKeys(
  raw: unknown,
  templateSections: string[]
): string[] {
  return resolveSections(raw, templateSections)
    .filter((item) => item.visible)
    .map((item) => item.key);
}
