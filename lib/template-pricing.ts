/**
 * Nguồn sự thật cho giá xuất bản: giá cố định theo `Template`, khuyến mãi
 * theo khung thời gian trên chính template đó, và mã giảm giá (coupon) độc
 * lập nhập lúc thanh toán. Thay thế hoàn toàn hệ giá theo gói (Plan) cũ.
 */

export type TemplatePriceInfo = {
  /** `Template.price` — giá gốc, chưa áp khuyến mãi/coupon. */
  basePrice: number;
  /** Giá sau khi áp khuyến mãi (nếu đang trong khung hiệu lực), trước coupon. */
  effectivePrice: number;
  isOnSale: boolean;
  /** Mốc kết thúc khuyến mãi, chỉ có giá trị khi `isOnSale`. */
  saleEndsAt: Date | null;
};

/** Áp dụng cửa sổ khuyến mãi `salePrice`/`saleStartsAt`/`saleEndsAt` nếu đang trong hạn. */
export function resolveTemplatePrice(
  template: {
    price: number;
    salePrice: number | null;
    saleStartsAt: Date | null;
    saleEndsAt: Date | null;
  },
  now: Date = new Date()
): TemplatePriceInfo {
  const { price, salePrice, saleStartsAt, saleEndsAt } = template;

  const hasSalePrice = salePrice !== null && salePrice > 0 && salePrice < price;
  const startedOk = !saleStartsAt || saleStartsAt <= now;
  const notEndedYet = !saleEndsAt || saleEndsAt > now;
  const isOnSale = hasSalePrice && startedOk && notEndedYet;

  return {
    basePrice: price,
    effectivePrice: isOnSale ? (salePrice as number) : price,
    isOnSale,
    saleEndsAt: isOnSale ? saleEndsAt : null,
  };
}

export type CouponInput = {
  discountType: "FIXED" | "PERCENT";
  discountValue: number;
  templateId: string | null;
  maxRedemptions: number | null;
  redemptionCount: number;
  startsAt: Date | null;
  endsAt: Date | null;
  isActive: boolean;
};

export type CouponApplication =
  | { ok: true; discount: number; finalAmount: number }
  | {
      ok: false;
      reason:
        | "not_found"
        | "inactive"
        | "not_started"
        | "expired"
        | "exhausted"
        | "wrong_template";
    };

/**
 * Áp mã giảm giá lên một số tiền đã tính (thường là `effectivePrice`, tức đã
 * qua khuyến mãi template). Hàm thuần — không tự query DB, nhận `coupon` đã
 * fetch sẵn để dễ test và tái sử dụng ở cả API preview lẫn API tạo thanh toán.
 *
 * `templateId`: template của wedding đang thanh toán — dùng để chặn coupon
 * bị giới hạn cho một template khác.
 */
export function applyCoupon(
  amount: number,
  coupon: CouponInput | null,
  templateId: string,
  now: Date = new Date()
): CouponApplication {
  if (!coupon) return { ok: false, reason: "not_found" };
  if (!coupon.isActive) return { ok: false, reason: "inactive" };
  if (coupon.startsAt && coupon.startsAt > now) {
    return { ok: false, reason: "not_started" };
  }
  if (coupon.endsAt && coupon.endsAt <= now) {
    return { ok: false, reason: "expired" };
  }
  if (
    coupon.maxRedemptions !== null &&
    coupon.redemptionCount >= coupon.maxRedemptions
  ) {
    return { ok: false, reason: "exhausted" };
  }
  if (coupon.templateId !== null && coupon.templateId !== templateId) {
    return { ok: false, reason: "wrong_template" };
  }

  const discount =
    coupon.discountType === "FIXED"
      ? Math.min(amount, Math.max(0, coupon.discountValue))
      : Math.round(amount * (Math.min(100, Math.max(0, coupon.discountValue)) / 100));

  return { ok: true, discount, finalAmount: Math.max(0, amount - discount) };
}
