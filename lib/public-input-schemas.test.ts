import { describe, expect, it } from "vitest";
import {
  guestTrackInputSchema,
  rsvpInputSchema,
  stripControlChars,
  wishInputSchema,
} from "./public-input-schemas";

describe("stripControlChars", () => {
  it("loại ký tự điều khiển và bidi override, trim hai đầu", () => {
    expect(stripControlChars("  An\u0000h‮ \u0007")).toBe("Anh");
  });

  it("single-line: xuống dòng/tab → dấu cách", () => {
    expect(stripControlChars("Nguyễn\nVăn\tA")).toBe("Nguyễn Văn A");
  });

  it("multiline: giữ xuống dòng, chuẩn hoá \\r\\n, gộp dòng trống", () => {
    expect(stripControlChars("Chúc\r\nmừng\n\n\n\nhai bạn\u0001", true)).toBe(
      "Chúc\nmừng\n\nhai bạn"
    );
  });
});

describe("wishInputSchema", () => {
  const base = { weddingId: "w1", name: " An ", message: " Chúc mừng! " };

  it("hợp lệ: trim, attendance null khi không gửi", () => {
    const r = wishInputSchema.parse(base);
    expect(r).toEqual({
      weddingId: "w1",
      name: "An",
      message: "Chúc mừng!",
      attendance: null,
    });
  });

  it("chuẩn hoá attendance accept/decline sang nhãn tiếng Việt", () => {
    expect(wishInputSchema.parse({ ...base, attendance: "accept" }).attendance).toBe(
      "Tham dự"
    );
    expect(wishInputSchema.parse({ ...base, attendance: "decline" }).attendance).toBe(
      "Rất tiếc không thể"
    );
    expect(wishInputSchema.parse({ ...base, attendance: "Tham dự" }).attendance).toBe(
      "Tham dự"
    );
    expect(wishInputSchema.parse({ ...base, attendance: "" }).attendance).toBe(null);
  });

  it("nhận alias guestName (song-hy-red, minimalism-do-dam)", () => {
    const r = wishInputSchema.parse({
      weddingId: "w1",
      guestName: "Bình",
      message: "Hạnh phúc",
    });
    expect(r.name).toBe("Bình");
  });

  it("từ chối rỗng / chỉ khoảng trắng / ký tự điều khiển", () => {
    expect(wishInputSchema.safeParse({ ...base, name: "   " }).success).toBe(false);
    expect(wishInputSchema.safeParse({ ...base, message: "\u0000\u0001" }).success).toBe(
      false
    );
    expect(wishInputSchema.safeParse({ ...base, weddingId: "" }).success).toBe(false);
  });

  it("từ chối quá độ dài", () => {
    expect(wishInputSchema.safeParse({ ...base, name: "a".repeat(101) }).success).toBe(
      false
    );
    expect(wishInputSchema.safeParse({ ...base, name: "a".repeat(100) }).success).toBe(
      true
    );
    expect(
      wishInputSchema.safeParse({ ...base, message: "a".repeat(1001) }).success
    ).toBe(false);
  });

  it("từ chối attendance lạ và body không phải object", () => {
    expect(wishInputSchema.safeParse({ ...base, attendance: "maybe" }).success).toBe(
      false
    );
    expect(wishInputSchema.safeParse(null).success).toBe(false);
    expect(wishInputSchema.safeParse("x").success).toBe(false);
  });
});

describe("rsvpInputSchema", () => {
  const base = { weddingId: "w1", guestName: "An", attendance: "accept" };

  it("map accept/decline → ACCEPTED/DECLINED", () => {
    expect(rsvpInputSchema.parse(base).attendance).toBe("ACCEPTED");
    expect(rsvpInputSchema.parse({ ...base, attendance: "decline" }).attendance).toBe(
      "DECLINED"
    );
    expect(rsvpInputSchema.parse({ ...base, attendance: "Tham dự" }).attendance).toBe(
      "ACCEPTED"
    );
  });

  it("nhận alias status ATTENDING/DECLINED", () => {
    const { attendance: _a, ...rest } = base;
    void _a;
    expect(rsvpInputSchema.parse({ ...rest, status: "ATTENDING" }).attendance).toBe(
      "ACCEPTED"
    );
    expect(rsvpInputSchema.parse({ ...rest, status: "DECLINED" }).attendance).toBe(
      "DECLINED"
    );
  });

  it("từ chối attendance thiếu hoặc lạ", () => {
    const { attendance: _a, ...rest } = base;
    void _a;
    expect(rsvpInputSchema.safeParse(rest).success).toBe(false);
    expect(rsvpInputSchema.safeParse({ ...base, attendance: "yes" }).success).toBe(false);
  });

  it("numberOfGuests: nguyên 1–20, thiếu/0/null → undefined, chuỗi số được ép", () => {
    expect(rsvpInputSchema.parse(base).numberOfGuests).toBeUndefined();
    expect(rsvpInputSchema.parse({ ...base, numberOfGuests: null }).numberOfGuests).toBeUndefined();
    expect(rsvpInputSchema.parse({ ...base, numberOfGuests: 0 }).numberOfGuests).toBeUndefined();
    expect(rsvpInputSchema.parse({ ...base, numberOfGuests: "3" }).numberOfGuests).toBe(3);
    expect(rsvpInputSchema.parse({ ...base, numberOfGuests: 20 }).numberOfGuests).toBe(20);
    expect(rsvpInputSchema.parse({ ...base, numberOfGuests: 21 }).numberOfGuests).toBe(20);
    expect(rsvpInputSchema.parse({ ...base, numberOfGuests: 500 }).numberOfGuests).toBe(20);
    expect(rsvpInputSchema.safeParse({ ...base, numberOfGuests: 2.5 }).success).toBe(false);
    expect(rsvpInputSchema.safeParse({ ...base, numberOfGuests: "abc" }).success).toBe(false);
  });

  it("guestName bị trim và giới hạn 100 ký tự", () => {
    expect(rsvpInputSchema.parse({ ...base, guestName: "  An  " }).guestName).toBe("An");
    expect(
      rsvpInputSchema.safeParse({ ...base, guestName: "a".repeat(101) }).success
    ).toBe(false);
  });
});

describe("guestTrackInputSchema", () => {
  it("hợp lệ và trim", () => {
    expect(
      guestTrackInputSchema.parse({ weddingSlug: " slug ", guestName: " An " })
    ).toEqual({ weddingSlug: "slug", guestName: "An" });
  });

  it("từ chối thiếu field", () => {
    expect(guestTrackInputSchema.safeParse({ weddingSlug: "s" }).success).toBe(false);
  });
});
