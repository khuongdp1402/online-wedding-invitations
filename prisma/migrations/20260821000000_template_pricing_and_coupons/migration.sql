-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('PUBLISH', 'RENEW', 'TEMPLATE_CHANGE');

-- CreateEnum
CREATE TYPE "CouponDiscountType" AS ENUM ('FIXED', 'PERCENT');

-- AlterTable: Template — thêm giá theo template + khuyến mãi (nullable trước, backfill, rồi NOT NULL)
ALTER TABLE "Template"
  ADD COLUMN "price" INTEGER,
  ADD COLUMN "salePrice" INTEGER,
  ADD COLUMN "saleStartsAt" TIMESTAMP(3),
  ADD COLUMN "saleEndsAt" TIMESTAMP(3);

-- Backfill: quy đổi giá cũ theo minPlan (khớp PLAN_PRICES cũ) để không mất
-- doanh thu đang có ở thời điểm chuyển đổi. FREE quy về mức BASIC cũ (giá
-- sàn xuất bản trước đây luôn tối thiểu là BASIC).
UPDATE "Template" SET "price" = CASE "minPlan"
  WHEN 'PREMIUM' THEN 1000000
  WHEN 'STANDARD' THEN 500000
  ELSE 200000
END;

ALTER TABLE "Template" ALTER COLUMN "price" SET NOT NULL;

-- AlterTable: Wedding — số tiền thực trả của lần thanh toán gần nhất
ALTER TABLE "Wedding" ADD COLUMN "purchasePrice" INTEGER;

-- CreateTable: Coupon
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountType" "CouponDiscountType" NOT NULL,
    "discountValue" INTEGER NOT NULL,
    "templateId" TEXT,
    "maxRedemptions" INTEGER,
    "redemptionCount" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "Coupon_templateId_idx" ON "Coupon"("templateId");

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable: Payment — loại giao dịch, giá gốc, coupon áp dụng, template đích khi đổi mẫu
ALTER TABLE "Payment"
  ADD COLUMN "type" "PaymentType" NOT NULL DEFAULT 'PUBLISH',
  ADD COLUMN "basePrice" INTEGER,
  ADD COLUMN "couponId" TEXT,
  ADD COLUMN "couponDiscount" INTEGER,
  ADD COLUMN "targetTemplateId" TEXT,
  ALTER COLUMN "plan" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Payment_couponId_idx" ON "Payment"("couponId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
