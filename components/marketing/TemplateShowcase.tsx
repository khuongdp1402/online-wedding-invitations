"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart } from "lucide-react";
import Link from "next/link";

const templatePreviews = [
  {
    id: "classic-burgundy",
    name: "Classic Burgundy",
    description:
      "Thiệp cưới cổ điển tông đỏ burgundy & vàng gold, phong cách Việt Nam truyền thống.",
    category: "Cổ Điển",
    isPremium: false,
    thumbnail: "/templates/classic-burgundy-preview.jpg",
    colors: ["#800020", "#d4a853", "#faf8f5"],
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description:
      "Phong cách tối giản hiện đại, tông trắng đen thanh lịch.",
    category: "Hiện Đại",
    isPremium: true,
    thumbnail: "/templates/modern-minimal-preview.jpg",
    colors: ["#1a1a1a", "#f5f5f5", "#ffffff"],
  },
  {
    id: "garden-romance",
    name: "Garden Romance",
    description:
      "Hoa lá thiên nhiên, tông xanh lá nhẹ nhàng và hồng pastel.",
    category: "Lãng Mạn",
    isPremium: true,
    thumbnail: "/templates/garden-romance-preview.jpg",
    colors: ["#2d6a4f", "#f4a7b9", "#fef9ef"],
  },
  {
    id: "royal-gold",
    name: "Royal Gold",
    description:
      "Sang trọng với tông vàng gold và đen, phong cách hoàng gia.",
    category: "Sang Trọng",
    isPremium: true,
    thumbnail: "/templates/royal-gold-preview.jpg",
    colors: ["#c9a84c", "#1a1a2e", "#f8f4e8"],
  },
];

export function TemplateShowcase() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templatePreviews.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Thumbnail placeholder */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <div
                className="w-full h-full flex flex-col items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${template.colors[2]}, ${template.colors[0]}20)`,
                }}
              >
                {/* Decorative elements */}
                <div
                  className="w-20 h-20 rounded-full mb-4 opacity-20"
                  style={{ backgroundColor: template.colors[0] }}
                />
                <div
                  className="text-lg font-serif font-bold px-4 text-center"
                  style={{ color: template.colors[0] }}
                >
                  {template.name}
                </div>
                <div
                  className="w-16 h-0.5 mt-2"
                  style={{ backgroundColor: template.colors[1] }}
                />
                <div
                  className="text-xs mt-2 opacity-60"
                  style={{ color: template.colors[0] }}
                >
                  Mẫu xem trước
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Xem
                </Button>
              </div>

              {/* Badge */}
              {template.isPremium ? (
                <Badge className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-500 text-white">
                  Premium
                </Badge>
              ) : (
                <Badge className="absolute top-3 right-3 bg-emerald-500 hover:bg-emerald-500 text-white">
                  Miễn Phí
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
                  {template.category}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">
                {template.description}
              </p>
              {/* Color palette */}
              <div className="flex gap-1.5 mt-3">
                {template.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">
          Nhiều mẫu thiệp đẹp hơn đang được cập nhật...
        </p>
        <Link href="/login">
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
