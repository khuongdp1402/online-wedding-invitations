import { describe, it, expect } from "vitest";
import { validateImageMime, validateFileSize } from "@/lib/file-storage";
import { parseVNPayIpnBody } from "@/lib/payment";
import { galleryIndexForSlotKey } from "@/lib/wedding-image-slots";
import { allowRateLimit } from "@/lib/auth-rate-limit";

describe("file-storage", () => {
  it("chấp nhận MIME ảnh hợp lệ", () => {
    expect(validateImageMime("image/jpeg")).toBe(true);
    expect(validateImageMime("image/png")).toBe(true);
    expect(validateImageMime("application/octet-stream")).toBe(false);
  });

  it("giới hạn kích thước file", () => {
    expect(validateFileSize(1024)).toBe(true);
    expect(validateFileSize(0)).toBe(false);
    expect(validateFileSize(20 * 1024 * 1024)).toBe(false);
  });
});

describe("wedding-image-slots", () => {
  it("ánh xạ slotKey → gallery index", () => {
    expect(galleryIndexForSlotKey("cb-hero")).toBe(0);
    expect(galleryIndexForSlotKey("cb-album-0")).toBe(6);
    expect(galleryIndexForSlotKey("unknown")).toBeNull();
  });
});

describe("parseVNPayIpnBody", () => {
  it("đọc form-urlencoded", async () => {
    const body = "vnp_Amount=100&vnp_ResponseCode=00";
    const req = new Request("http://localhost/ipn", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const q = await parseVNPayIpnBody(req);
    expect(q.vnp_Amount).toBe("100");
    expect(q.vnp_ResponseCode).toBe("00");
  });

  it("đọc JSON", async () => {
    const req = new Request("http://localhost/ipn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vnp_TxnRef: "abc" }),
    });
    const q = await parseVNPayIpnBody(req);
    expect(q.vnp_TxnRef).toBe("abc");
  });
});

describe("allowRateLimit", () => {
  it("chặn khi vượt max", () => {
    const key = `test-${Math.random()}`;
    expect(allowRateLimit(key, 3, 60_000).ok).toBe(true);
    expect(allowRateLimit(key, 3, 60_000).ok).toBe(true);
    expect(allowRateLimit(key, 3, 60_000).ok).toBe(true);
    expect(allowRateLimit(key, 3, 60_000).ok).toBe(false);
  });
});
