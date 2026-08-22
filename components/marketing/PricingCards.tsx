"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { resolveTemplatePrice } from "@/lib/template-pricing";

type TemplateForPricing = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  salePrice: number | null;
  saleStartsAt: string | null;
  saleEndsAt: string | null;
};

const CATEGORY_LABELS: Record<string, string> = {
  classic: "Cổ điển",
  modern: "Hiện đại",
  minimal: "Tối giản",
  luxury: "Sang trọng",
  vintage: "Vintage",
};

/**
 * Không còn bán theo gói — mỗi mẫu thiệp có 1 giá cố định (có thể đang
 * khuyến mãi). Xuất bản là dùng được toàn bộ khối của mẫu đó, hiệu lực 30
 * ngày, gia hạn khi cần. Dữ liệu lấy trực tiếp từ `/api/templates` để không
 * bao giờ lệch với giá thật admin đã đặt.
 */
export function PricingCards() {
  const { data: session } = useSession();
  const [templates, setTemplates] = useState<TemplateForPricing[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/templates")
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setTemplates(data.templates ?? []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const ctaHref = session ? "/dashboard/weddings/new" : "/login";

  if (error) {
    return (
      <p className="text-center text-gray-500 py-12">
        Không tải được bảng giá, vui lòng thử lại sau.
      </p>
    );
  }

  if (!templates) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-400 py-16">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Đang tải bảng giá...</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {templates.map((template, index) => {
          const priceInfo = resolveTemplatePrice({
            price: template.price,
            salePrice: template.salePrice,
            saleStartsAt: template.saleStartsAt ? new Date(template.saleStartsAt) : null,
            saleEndsAt: template.saleEndsAt ? new Date(template.saleEndsAt) : null,
          });

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(
                "relative flex flex-col rounded-2xl border overflow-hidden bg-white transition-shadow",
                priceInfo.isOnSale
                  ? "border-rose-200 shadow-lg shadow-rose-100"
                  : "border-gray-200 hover:shadow-lg"
              )}
            >
              {priceInfo.isOnSale && (
                <Badge className="absolute top-3 left-3 z-10 bg-rose-600 hover:bg-rose-600 text-white gap-1">
                  <Sparkles className="w-3 h-3" /> Đang khuyến mãi
                </Badge>
              )}

              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                {template.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-300 text-4xl">
                    ♥
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                  <Badge variant="outline" className="text-[10px]">
                    {CATEGORY_LABELS[template.category] ?? template.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-1">{template.description}</p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {priceInfo.effectivePrice.toLocaleString("vi-VN")}đ
                    </span>
                    {priceInfo.isOnSale && (
                      <span className="text-sm text-gray-400 line-through">
                        {template.price.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Hiệu lực 30 ngày, gia hạn khi cần</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    "Dùng đầy đủ mọi khối của mẫu",
                    "Xuất bản tại đường dẫn riêng của bạn",
                    "Quản lý khách mời & lời chúc",
                    "Xuất Excel danh sách lời chúc",
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>

                <Link href={ctaHref} className="mt-auto">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                    Chọn mẫu này
                  </Button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-500 mt-10 max-w-xl mx-auto">
        Giá đã bao gồm chi phí hạ tầng — không cần mua thêm gói, không phí ẩn.
        Tạo và chỉnh sửa thiệp miễn phí, chỉ thanh toán khi bạn xuất bản.
      </p>
    </>
  );
}
