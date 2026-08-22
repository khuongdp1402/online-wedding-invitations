"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { resolveTemplatePrice } from "@/lib/template-pricing";

type TemplatePreview = {
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
  classic: "Cổ Điển",
  modern: "Hiện Đại",
  minimal: "Tối Giản",
  luxury: "Sang Trọng",
  vintage: "Vintage",
};

export function TemplateShowcase() {
  const { data: session } = useSession();
  const ctaHref = session ? "/dashboard/weddings/new" : "/login";

  const [templates, setTemplates] = useState<TemplatePreview[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/templates")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) setTemplates(data.templates ?? []);
      })
      .catch(() => {
        if (!cancelled) setTemplates([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!templates) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-400 py-16">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Đang tải mẫu thiệp...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
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

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Link href={ctaHref}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Xem
                    </Button>
                  </Link>
                </div>

                {priceInfo.isOnSale && (
                  <Badge className="absolute top-3 right-3 bg-rose-600 hover:bg-rose-600 text-white gap-1">
                    <Sparkles className="w-3 h-3" /> Khuyến mãi
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {CATEGORY_LABELS[template.category] ?? template.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex items-baseline gap-1.5 mt-3">
                  <span className="font-bold text-gray-900">
                    {priceInfo.effectivePrice.toLocaleString("vi-VN")}đ
                  </span>
                  {priceInfo.isOnSale && (
                    <span className="text-xs text-gray-400 line-through">
                      {template.price.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">
          Nhiều mẫu thiệp đẹp hơn đang được cập nhật...
        </p>
        <Link href={ctaHref}>
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 rounded-full px-8"
          >
            <Heart className="w-5 h-5 mr-2" />
            Bắt Đầu Tạo Thiệp
          </Button>
        </Link>
      </div>
    </div>
  );
}
