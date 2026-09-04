"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Loader2, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { resolveTemplatePrice } from "@/lib/template-pricing";
import { TemplatePreviewModal } from "@/components/marketing/TemplatePreviewModal";

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
  const ctaBaseHref = session ? "/dashboard/weddings/new" : "/login";

  const [templates, setTemplates] = useState<TemplatePreview[] | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplatePreview | null>(null);

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

          const createHref = session
            ? `/dashboard/weddings/new?template=${template.slug}`
            : `/login?callbackUrl=${encodeURIComponent(`/dashboard/weddings/new?template=${template.slug}`)}`;

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {template.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-300 text-4xl">
                    ♥
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full max-w-[160px] bg-white/95 hover:bg-white text-gray-900 shadow-md text-xs"
                    onClick={() => setPreviewTemplate(template)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    Xem Nhanh
                  </Button>
                  <Link
                    href={`/templates/preview/${template.slug}`}
                    target="_blank"
                    className="w-full max-w-[160px]"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-stone-900/80 hover:bg-stone-900 text-white border-stone-700 text-xs shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Mở Tab Mới
                    </Button>
                  </Link>
                  <Link href={createHref} className="w-full max-w-[160px]">
                    <Button
                      size="sm"
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-md text-xs"
                    >
                      <Heart className="w-3.5 h-3.5 mr-1.5 fill-current" />
                      Dùng Mẫu Này
                    </Button>
                  </Link>
                </div>

                {priceInfo.isOnSale && (
                  <Badge className="absolute top-3 right-3 bg-rose-600 hover:bg-rose-600 text-white gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> Khuyến mãi
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {template.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {CATEGORY_LABELS[template.category] ?? template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-gray-900 text-base">
                      {priceInfo.effectivePrice.toLocaleString("vi-VN")}đ
                    </span>
                    {priceInfo.isOnSale && (
                      <span className="text-xs text-gray-400 line-through">
                        {template.price.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/templates/preview/${template.slug}`}
                      target="_blank"
                      className="text-xs text-gray-500 hover:text-stone-900 font-medium inline-flex items-center gap-1 p-1 hover:bg-gray-100 rounded"
                      title="Mở tab mới toàn màn hình"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate(template)}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Xem trước
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">
          Nhiều mẫu thiệp đẹp hơn đang được cập nhật liên tục...
        </p>
        <Link href={ctaBaseHref}>
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 shadow-lg shadow-rose-200"
          >
            <Heart className="w-5 h-5 mr-2" />
            Bắt Đầu Tạo Thiệp Cưới
          </Button>
        </Link>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          templateSlug={previewTemplate.slug}
          templateName={previewTemplate.name}
          category={CATEGORY_LABELS[previewTemplate.category] ?? previewTemplate.category}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}
