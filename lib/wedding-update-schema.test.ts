import { describe, expect, it } from "vitest";
import { SLUG_RE, WeddingUpdateSchema, isSafeResourceUrl } from "./wedding-update-schema";

describe("WeddingUpdateSchema", () => {
  it("chấp nhận payload editor ThiepOnline điển hình", () => {
    const r = WeddingUpdateSchema.safeParse({
      slug: "tung-lan",
      groomName: "Tùng",
      brideName: "Lan",
      groomParents: { father: "", mother: "" },
      brideParents: { father: "A", mother: "B" },
      groomCeremony: {
        date: "2026-11-22", lunarDate: "", ceremonyTime: "09:00", receptionTime: "18:00",
        venue: "Nhà hàng", address: "HN", googleMapsUrl: "https://maps.app.goo.gl/x",
      },
      brideCeremony: { date: "2026-11-21", googleMapsUrl: "" },
      quote: "",
      gallery: ["https://cdn.example.com/a.jpg", "http://localhost:9010/b/c.jpg", "", "/images/x.jpg"],
      gifting: { groom: { bankName: "VCB", accountNumber: "1", accountHolder: "T", qrCodeUrl: "" } },
      backgroundMusic: "/music/track.mp3",
      typography: { thiepOnlineContent: { basicInfo: { groomName: "Tùng" } } },
    });
    expect(r.success).toBe(true);
  });

  it("loại bỏ field lạ như status", () => {
    const r = WeddingUpdateSchema.parse({ status: "PUBLISHED", groomName: "A" });
    expect("status" in r).toBe(false);
  });

  it("từ chối URL javascript: / data: và màu không phải hex", () => {
    expect(WeddingUpdateSchema.safeParse({ backgroundMusic: "javascript:alert(1)" }).success).toBe(false);
    expect(WeddingUpdateSchema.safeParse({ gallery: ["data:image/png;base64,AA"] }).success).toBe(false);
    expect(WeddingUpdateSchema.safeParse({ groomCeremony: { googleMapsUrl: " javascript:x" } }).success).toBe(false);
    expect(WeddingUpdateSchema.safeParse({ primaryColor: "red;}" }).success).toBe(false);
    expect(WeddingUpdateSchema.safeParse({ primaryColor: "#80002080" }).success).toBe(true);
    expect(WeddingUpdateSchema.safeParse({ gallery: new Array(101).fill("") }).success).toBe(false);
  });

  it("isSafeResourceUrl / SLUG_RE", () => {
    expect(isSafeResourceUrl("//evil.com/x")).toBe(false);
    expect(isSafeResourceUrl("/ok.jpg")).toBe(true);
    expect(SLUG_RE.test("ab")).toBe(false);
    expect(SLUG_RE.test("Tung-Lan")).toBe(false);
    expect(SLUG_RE.test("tung-lan-2026")).toBe(true);
  });
});
