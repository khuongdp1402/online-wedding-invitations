import { z } from "zod";

/**
 * Schema validate body của `PUT /api/weddings/[id]`.
 *
 * Mọi field đều optional (editor gửi từng phần). Các blob JSON có shape thay
 * đổi theo template (typography.thiepOnlineContent, ceremony, gifting...) dùng
 * object `passthrough` + giới hạn kích thước, để không làm hỏng editor khi
 * thêm field mới. Field lạ ở cấp cao nhất bị loại bỏ (zod strip mặc định) —
 * ví dụ `status` không bao giờ lọt vào DB.
 */

// Slug chỉ check khi đổi slug (slug cũ tạo từ trước có thể không theo định dạng này).
export const SLUG_RE = /^[a-z0-9-]{3,60}$/;

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const MAX_URL = 2048;

/** URL tài nguyên an toàn: đường dẫn tương đối bắt đầu bằng `/` hoặc http(s). */
export function isSafeResourceUrl(value: string): boolean {
  const v = value.trim();
  if (v.startsWith("/")) {
    // Chặn `//host` và `/\host` (protocol-relative, trình duyệt hiểu là host khác).
    return !v.startsWith("//") && !v.startsWith("/\\");
  }
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Link do người dùng nhập (vd Google Maps): chặn scheme nguy hiểm khi render vào href. */
function hasDangerousScheme(value: string): boolean {
  // Bỏ ký tự điều khiển/khoảng trắng mà trình duyệt bỏ qua khi parse scheme.
  const v = value.replace(/[\u0000- \u007f]/g, "").toLowerCase();
  return /^(javascript|data|vbscript|file):/.test(v);
}

const str = (max: number) => z.string().max(max);

/** URL ảnh/nhạc: cho phép chuỗi rỗng (slot trống) hoặc URL an toàn. */
const resourceUrl = z
  .string()
  .max(MAX_URL)
  .refine((v) => v === "" || isSafeResourceUrl(v), {
    message: "URL không hợp lệ (chỉ nhận http(s) hoặc đường dẫn bắt đầu bằng /)",
  });

const linkUrl = z
  .string()
  .max(MAX_URL)
  .refine((v) => !hasDangerousScheme(v), { message: "URL không hợp lệ" });

const hexColor = z.string().regex(HEX_COLOR_RE, "Màu phải ở dạng hex (#rgb, #rrggbb, #rrggbbaa)");

/** Giới hạn kích thước JSON serialize của blob (tính theo ký tự). */
function maxJsonSize<T extends z.ZodTypeAny>(schema: T, maxChars: number) {
  return schema.refine(
    (v) => {
      try {
        return JSON.stringify(v).length <= maxChars;
      } catch {
        return false;
      }
    },
    { message: `Dữ liệu quá lớn (tối đa ${maxChars} ký tự)` }
  );
}

const parentsSchema = maxJsonSize(
  z
    .object({
      father: str(200).optional(),
      mother: str(200).optional(),
    })
    .passthrough(),
  5_000
);

const ceremonySchema = maxJsonSize(
  z
    .object({
      date: str(100).optional(),
      lunarDate: str(100).optional(),
      ceremonyTime: str(100).optional(),
      receptionTime: str(100).optional(),
      venue: str(500).optional(),
      address: str(1000).optional(),
      googleMapsUrl: linkUrl.optional(),
    })
    .passthrough(),
  20_000
);

const bankSchema = z
  .object({
    bankName: str(200).optional(),
    accountNumber: str(100).optional(),
    accountHolder: str(200).optional(),
    qrCodeUrl: resourceUrl.optional(),
  })
  .passthrough();

const giftingSchema = maxJsonSize(
  z
    .object({
      groom: bankSchema.optional(),
      bride: bankSchema.optional(),
    })
    .passthrough(),
  20_000
);

export const WeddingUpdateSchema = z.object({
  slug: str(200).optional(),
  templateId: str(64).optional(),
  groomName: str(200).optional(),
  brideName: str(200).optional(),
  groomParents: parentsSchema.optional(),
  brideParents: parentsSchema.optional(),
  groomCeremony: ceremonySchema.optional(),
  brideCeremony: ceremonySchema.optional(),
  quote: str(5000).nullable().optional(),
  gallery: z.array(resourceUrl).max(100).optional(),
  gifting: giftingSchema.optional(),
  primaryColor: hexColor.nullable().optional(),
  accentColor: hexColor.nullable().optional(),
  backgroundColor: hexColor.nullable().optional(),
  textColor: hexColor.nullable().optional(),
  // fontFamily có thể được nhúng vào CSS — chặn ký tự cho phép thoát khỏi
  // khai báo (`;{}<>()\:` và xuống dòng).
  fontFamily: z
    .string()
    .max(200)
    .regex(/^[^;{}<>()\\:\r\n]*$/, "fontFamily không hợp lệ")
    .nullable()
    .optional(),
  // typography chứa cả thiepOnlineContent (toàn bộ nội dung editor) nên giới hạn rộng.
  typography: maxJsonSize(z.record(z.string(), z.unknown()), 500_000).optional(),
  // sectionOrder giữ nguyên logic validate riêng trong route (string[] | {key}[]).
  sectionOrder: z.unknown().optional(),
  backgroundMusic: resourceUrl.nullable().optional(),
  metaTitle: str(200).nullable().optional(),
  metaDescription: str(1000).nullable().optional(),
  ogImage: resourceUrl.nullable().optional(),
});

export type WeddingUpdateInput = z.infer<typeof WeddingUpdateSchema>;
