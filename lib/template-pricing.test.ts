import { describe, it, expect } from "vitest";
import { resolveTemplatePrice, applyCoupon } from "@/lib/template-pricing";

const NOW = new Date("2026-08-21T00:00:00Z");
const YESTERDAY = new Date("2026-08-20T00:00:00Z");
const TOMORROW = new Date("2026-08-22T00:00:00Z");

describe("resolveTemplatePrice", () => {
  it("không có sale: dùng giá gốc", () => {
    const info = resolveTemplatePrice(
      { price: 500000, salePrice: null, saleStartsAt: null, saleEndsAt: null },
      NOW
    );
    expect(info).toEqual({
      basePrice: 500000,
      effectivePrice: 500000,
      isOnSale: false,
      saleEndsAt: null,
    });
  });

  it("đang trong khung khuyến mãi: dùng salePrice", () => {
    const info = resolveTemplatePrice(
      {
        price: 500000,
        salePrice: 350000,
        saleStartsAt: YESTERDAY,
        saleEndsAt: TOMORROW,
      },
      NOW
    );
    expect(info.effectivePrice).toBe(350000);
    expect(info.isOnSale).toBe(true);
    expect(info.saleEndsAt).toEqual(TOMORROW);
  });

  it("chưa tới ngày bắt đầu khuyến mãi: dùng giá gốc", () => {
    const info = resolveTemplatePrice(
      {
        price: 500000,
        salePrice: 350000,
        saleStartsAt: TOMORROW,
        saleEndsAt: null,
      },
      NOW
    );
    expect(info.isOnSale).toBe(false);
    expect(info.effectivePrice).toBe(500000);
  });

  it("đã qua ngày kết thúc khuyến mãi: dùng giá gốc", () => {
    const info = resolveTemplatePrice(
      {
        price: 500000,
        salePrice: 350000,
        saleStartsAt: null,
        saleEndsAt: YESTERDAY,
      },
      NOW
    );
    expect(info.isOnSale).toBe(false);
    expect(info.effectivePrice).toBe(500000);
  });

  it("salePrice >= price bị bỏ qua (không phải khuyến mãi thật)", () => {
    const info = resolveTemplatePrice(
      { price: 500000, salePrice: 500000, saleStartsAt: null, saleEndsAt: null },
      NOW
    );
    expect(info.isOnSale).toBe(false);
  });
});

const baseCoupon = {
  discountType: "FIXED" as const,
  discountValue: 50000,
  templateId: null,
  maxRedemptions: null,
  redemptionCount: 0,
  startsAt: null,
  endsAt: null,
  isActive: true,
};

describe("applyCoupon", () => {
  it("coupon null: not_found", () => {
    expect(applyCoupon(500000, null, "tpl-1", NOW)).toEqual({
      ok: false,
      reason: "not_found",
    });
  });

  it("FIXED: trừ thẳng VND", () => {
    const result = applyCoupon(500000, baseCoupon, "tpl-1", NOW);
    expect(result).toEqual({ ok: true, discount: 50000, finalAmount: 450000 });
  });

  it("FIXED không vượt quá amount", () => {
    const result = applyCoupon(30000, baseCoupon, "tpl-1", NOW);
    expect(result).toEqual({ ok: true, discount: 30000, finalAmount: 0 });
  });

  it("PERCENT: làm tròn VND", () => {
    const coupon = { ...baseCoupon, discountType: "PERCENT" as const, discountValue: 10 };
    const result = applyCoupon(199000, coupon, "tpl-1", NOW);
    expect(result).toEqual({ ok: true, discount: 19900, finalAmount: 179100 });
  });

  it("isActive = false: inactive", () => {
    const coupon = { ...baseCoupon, isActive: false };
    expect(applyCoupon(500000, coupon, "tpl-1", NOW)).toEqual({
      ok: false,
      reason: "inactive",
    });
  });

  it("chưa tới ngày bắt đầu: not_started", () => {
    const coupon = { ...baseCoupon, startsAt: TOMORROW };
    expect(applyCoupon(500000, coupon, "tpl-1", NOW)).toEqual({
      ok: false,
      reason: "not_started",
    });
  });

  it("đã hết hạn: expired", () => {
    const coupon = { ...baseCoupon, endsAt: YESTERDAY };
    expect(applyCoupon(500000, coupon, "tpl-1", NOW)).toEqual({
      ok: false,
      reason: "expired",
    });
  });

  it("hết lượt dùng: exhausted", () => {
    const coupon = { ...baseCoupon, maxRedemptions: 5, redemptionCount: 5 };
    expect(applyCoupon(500000, coupon, "tpl-1", NOW)).toEqual({
      ok: false,
      reason: "exhausted",
    });
  });

  it("còn lượt dùng: vẫn áp dụng được", () => {
    const coupon = { ...baseCoupon, maxRedemptions: 5, redemptionCount: 4 };
    const result = applyCoupon(500000, coupon, "tpl-1", NOW);
    expect(result.ok).toBe(true);
  });

  it("giới hạn theo template khác: wrong_template", () => {
    const coupon = { ...baseCoupon, templateId: "tpl-2" };
    expect(applyCoupon(500000, coupon, "tpl-1", NOW)).toEqual({
      ok: false,
      reason: "wrong_template",
    });
  });

  it("giới hạn đúng template: áp dụng được", () => {
    const coupon = { ...baseCoupon, templateId: "tpl-1" };
    const result = applyCoupon(500000, coupon, "tpl-1", NOW);
    expect(result.ok).toBe(true);
  });
});
