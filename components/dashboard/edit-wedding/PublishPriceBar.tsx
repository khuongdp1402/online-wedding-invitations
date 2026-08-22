"use client";

import Link from "next/link";
import { Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveTemplatePrice } from "@/lib/template-pricing";

type Props = {
  weddingId: string;
  /** Trạng thái hiện tại của thiệp (DRAFT/PUBLISHED). */
  status: string;
  templatePrice: number;
  templateSalePrice: number | null;
  templateSaleEndsAt: string | Date | null;
  onContactClick: () => void;
};

/**
 * Trong lúc soạn thảo, mọi khối đều bật/sửa được tự do — thanh này chỉ cho
 * biết giá xuất bản/gia hạn của template đang dùng, không khoá gì cả. Giá
 * theo template (kèm khuyến mãi nếu có), không còn tính theo section nào
 * đang bật.
 */
export function PublishPriceBar({
  weddingId,
  status,
  templatePrice,
  templateSalePrice,
  templateSaleEndsAt,
  onContactClick,
}: Props) {
  const { effectivePrice, isOnSale } = resolveTemplatePrice({
    price: templatePrice,
    salePrice: templateSalePrice,
    saleStartsAt: null,
    saleEndsAt: templateSaleEndsAt ? new Date(templateSaleEndsAt) : null,
  });
  const isPublished = status === "PUBLISHED";

  return (
    <div className="border-t bg-white px-4 py-3 space-y-2 shrink-0">
      <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-sky-900 leading-relaxed">
              {isPublished ? (
                <>Gia hạn thêm 30 ngày với giá{" "}
                <strong>{effectivePrice.toLocaleString("vi-VN")}đ</strong>
                {isOnSale && (
                  <>
                    {" "}(giảm từ{" "}
                    <span className="line-through">{templatePrice.toLocaleString("vi-VN")}đ</span>)
                  </>
                )}.</>
              ) : (
                <>Bạn có thể sửa/thêm/xoá thoải mái. Khi xuất bản, giá của mẫu
                thiệp này là{" "}
                <strong>{effectivePrice.toLocaleString("vi-VN")}đ</strong>
                {isOnSale && (
                  <>
                    {" "}(giảm từ{" "}
                    <span className="line-through">{templatePrice.toLocaleString("vi-VN")}đ</span>)
                  </>
                )}
                , hiệu lực 30 ngày.</>
              )}
            </p>
            <Link href={`/dashboard/weddings/${weddingId}/publish`}>
              <Button
                size="sm"
                className="mt-2 w-full bg-rose-600 hover:bg-rose-700 text-white h-8"
              >
                {isPublished ? "Gia hạn" : "Xuất bản"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onContactClick}
        className="w-full h-8 text-xs"
      >
        <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
        Liên hệ với chúng tôi
      </Button>
    </div>
  );
}
