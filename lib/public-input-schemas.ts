import { z } from "zod";

/**
 * Schema validate payload cho các endpoint công khai (không cần đăng nhập):
 * POST /api/wishes, POST /api/rsvp, POST /api/guests.
 *
 * Giá trị chấp nhận được lấy từ đúng những gì frontend đang gửi (các
 * template trong components/templates/* và ThiepOnlineClient) để không làm
 * vỡ luồng hiện tại — xem ghi chú ở từng field.
 */

export const NAME_MAX = 100;
export const MESSAGE_MAX = 1000;
export const GUESTS_MIN = 1;
export const GUESTS_MAX = 20;

// Ký tự điều khiển C0/C1 (trừ \t \n) + ký tự định hướng bidi (U+202A–202E,
// U+2066–2069) hay bị dùng để giả mạo hiển thị.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_KEEP_NEWLINE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F‪-‮⁦-⁩]/g;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_ALL = /[\u0000-\u001F\u007F-\u009F‪-‮⁦-⁩]/g;

/**
 * Loại bỏ ký tự điều khiển. `multiline` = giữ xuống dòng (chuẩn hoá \r\n → \n,
 * gộp quá 2 dòng trống liên tiếp); ngược lại xuống dòng/tab đổi thành dấu
 * cách (giữ nguyên khoảng trắng thường để tên vẫn khớp với tên khách đã lưu).
 * Luôn trim hai đầu.
 */
export function stripControlChars(input: string, multiline = false): string {
  if (multiline) {
    return input
      .replace(/\r\n?/g, "\n")
      .replace(CONTROL_CHARS_KEEP_NEWLINE, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
  return input
    .replace(/[\r\n\t]+/g, " ")
    .replace(CONTROL_CHARS_ALL, "")
    .trim();
}

function cleanText(max: number, multiline = false) {
  return z
    .string()
    .transform((s) => stripControlChars(s, multiline))
    .pipe(
      z
        .string()
        .min(1, "Không được để trống")
        .max(max, `Tối đa ${max} ký tự`)
    );
}

const idString = z.string().trim().min(1).max(64);

/** Chuỗi rỗng / null → undefined để field optional xử lý đồng nhất. */
function emptyToUndefined(v: unknown): unknown {
  if (v === null || v === undefined) return undefined;
  if (typeof v === "string" && v.trim() === "") return undefined;
  return typeof v === "string" ? v.trim() : v;
}

// ==================== Wishes ====================

/**
 * Giá trị `attendance` frontend đang gửi lên /api/wishes:
 * - "Tham dự" / "Rất tiếc không thể" (template1, classic-burgundy, boho...)
 * - "accept" / "decline" (ThiepOnlineClient khi gửi kèm RSVP)
 * Lưu DB thống nhất theo nhãn tiếng Việt (dashboard WishesTab đếm theo nhãn).
 */
export const WISH_ATTENDANCE_VALUES = [
  "Tham dự",
  "Rất tiếc không thể",
  "accept",
  "decline",
] as const;

const WISH_ATTENDANCE_LABEL: Record<
  (typeof WISH_ATTENDANCE_VALUES)[number],
  string
> = {
  "Tham dự": "Tham dự",
  "Rất tiếc không thể": "Rất tiếc không thể",
  accept: "Tham dự",
  decline: "Rất tiếc không thể",
};

export const wishInputSchema = z.preprocess(
  (raw) => {
    // song-hy-red & minimalism-do-dam gửi `guestName` thay vì `name`.
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const o = raw as Record<string, unknown>;
      if (o.name === undefined && o.guestName !== undefined) {
        return { ...o, name: o.guestName };
      }
    }
    return raw;
  },
  z.object({
    weddingId: idString,
    name: cleanText(NAME_MAX),
    message: cleanText(MESSAGE_MAX, true),
    attendance: z.preprocess(
      emptyToUndefined,
      z
        .enum(WISH_ATTENDANCE_VALUES)
        .optional()
        .transform((v) => (v ? WISH_ATTENDANCE_LABEL[v] : null))
    ),
  })
);

export type WishInput = z.infer<typeof wishInputSchema>;

// ==================== RSVP ====================

/**
 * Giá trị frontend gửi lên /api/rsvp:
 * - `attendance`: "accept" / "decline" (template1 RSVPSection, ThiepOnlineClient);
 *   chấp nhận thêm nhãn tiếng Việt "Tham dự" / "Rất tiếc không thể".
 * - song-hy-red & minimalism-do-dam gửi `status`: "ATTENDING" / "DECLINED"
 *   thay vì `attendance` — nhận như alias.
 */
const RSVP_ACCEPT = new Set(["accept", "Tham dự", "ATTENDING"]);
const RSVP_DECLINE = new Set(["decline", "Rất tiếc không thể", "DECLINED"]);

export const rsvpInputSchema = z.preprocess(
  (raw) => {
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const o = raw as Record<string, unknown>;
      if (o.attendance === undefined && o.status !== undefined) {
        return { ...o, attendance: o.status };
      }
    }
    return raw;
  },
  z.object({
    weddingId: idString,
    guestName: cleanText(NAME_MAX),
    attendance: z
      .string()
      .trim()
      .refine((v) => RSVP_ACCEPT.has(v) || RSVP_DECLINE.has(v), {
        message: "Giá trị attendance không hợp lệ",
      })
      .transform((v): "ACCEPTED" | "DECLINED" =>
        RSVP_ACCEPT.has(v) ? "ACCEPTED" : "DECLINED"
      ),
    // Thiếu / null / <= 0 (vd. khách từ chối nên không chọn số người) → coi như
    // không gửi; chuỗi số được ép kiểu. > 20 → cắt về 20 (một số mẫu không
    // giới hạn số khách và bỏ qua lỗi fetch, trả 400 sẽ làm mất RSVP âm thầm).
    numberOfGuests: z.preprocess((v) => {
      const e = emptyToUndefined(v);
      if (e === undefined) return undefined;
      const n = typeof e === "string" ? Number(e) : e;
      if (typeof n === "number" && Number.isFinite(n)) {
        if (n <= 0) return undefined;
        if (n > GUESTS_MAX) return GUESTS_MAX;
      }
      return n;
    }, z.int().min(GUESTS_MIN).max(GUESTS_MAX).optional()),
  })
);

export type RsvpInput = z.infer<typeof rsvpInputSchema>;

// ==================== Guests (track mở link) ====================

export const guestTrackInputSchema = z.object({
  weddingSlug: z.string().trim().min(1).max(200),
  guestName: cleanText(NAME_MAX),
});

export type GuestTrackInput = z.infer<typeof guestTrackInputSchema>;
