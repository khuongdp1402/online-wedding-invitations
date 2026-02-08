"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Zap, Crown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const plans = [
  {
    name: "Miễn Phí",
    price: "0đ",
    period: "7 ngày",
    description: "Xem demo thiệp cưới, trải nghiệm trước khi quyết định.",
    icon: Sparkles,
    color: "gray",
    features: [
      { text: "Xem demo thiệp", included: true },
      { text: "1 mẫu thiệp cơ bản", included: true },
      { text: "Upload 3 ảnh", included: true },
      { text: "10 khách mời (demo)", included: true },
      { text: "Có watermark", included: true, note: "⚠️" },
      { text: "Publish online", included: false },
      { text: "Quản lý lời chúc", included: false },
      { text: "RSVP tracking", included: false },
    ],
    cta: "Dùng Thử Miễn Phí",
    popular: false,
  },
  {
    name: "Cơ Bản",
    price: "500.000đ",
    period: "6 tháng",
    description: "Hoàn hảo cho các cặp đôi muốn thiệp đơn giản, đẹp mắt.",
    icon: Zap,
    color: "blue",
    features: [
      { text: "Publish online", included: true },
      { text: "3 mẫu thiệp", included: true },
      { text: "Upload 10 ảnh", included: true },
      { text: "50 khách mời", included: true },
      { text: "Không watermark", included: true },
      { text: "Custom slug URL", included: true },
      { text: "Quản lý lời chúc", included: true },
      { text: "RSVP tracking", included: true },
    ],
    cta: "Chọn Gói Cơ Bản",
    popular: false,
  },
  {
    name: "Tiêu Chuẩn",
    price: "1.000.000đ",
    period: "1 năm",
    description: "Đầy đủ tính năng cho đám cưới quy mô lớn.",
    icon: Star,
    color: "rose",
    features: [
      { text: "Tất cả mẫu thiệp", included: true },
      { text: "Upload 20 ảnh", included: true },
      { text: "200 khách mời", included: true },
      { text: "Thiệp in tên khách", included: true },
      { text: "Export Excel danh sách", included: true },
      { text: "Custom domain", included: true },
      { text: "Analytics (lượt xem)", included: true },
      { text: "Tất cả tính năng Cơ Bản", included: true },
    ],
    cta: "Chọn Gói Tiêu Chuẩn",
    popular: true,
  },
  {
    name: "Cao Cấp",
    price: "2.000.000đ",
    period: "Vĩnh viễn",
    description: "Trọn gói cao cấp, không giới hạn, hỗ trợ ưu tiên.",
    icon: Crown,
    color: "amber",
    features: [
      { text: "Unlimited tất cả", included: true },
      { text: "Upload ảnh không giới hạn", included: true },
      { text: "Khách mời không giới hạn", included: true },
      { text: "Nhạc nền tùy chỉnh", included: true },
      { text: "Hỗ trợ ưu tiên 24/7", included: true },
      { text: "Sử dụng vĩnh viễn", included: true },
      { text: "Tất cả tính năng Tiêu Chuẩn", included: true },
      { text: "Templates mới miễn phí", included: true },
    ],
    cta: "Chọn Gói Cao Cấp",
    popular: false,
  },
];

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={cn(
            "relative flex flex-col rounded-2xl border p-6",
            plan.popular
              ? "border-rose-200 bg-rose-50/30 shadow-xl shadow-rose-100 scale-[1.02]"
              : "border-gray-200 bg-white hover:shadow-lg"
          )}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 hover:bg-rose-600 text-white px-4">
              Phổ Biến Nhất
            </Badge>
          )}

          {/* Header */}
          <div className="text-center mb-6">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                plan.color === "gray" && "bg-gray-100",
                plan.color === "blue" && "bg-blue-100",
                plan.color === "rose" && "bg-rose-100",
                plan.color === "amber" && "bg-amber-100"
              )}
            >
              <plan.icon
                className={cn(
                  "w-6 h-6",
                  plan.color === "gray" && "text-gray-600",
                  plan.color === "blue" && "text-blue-600",
                  plan.color === "rose" && "text-rose-600",
                  plan.color === "amber" && "text-amber-600"
                )}
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-gray-900">
                {plan.price}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                / {plan.period}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
          </div>

          {/* Features */}
          <ul className="space-y-3 flex-1 mb-6">
            {plan.features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-2">
                {feature.included ? (
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    feature.included ? "text-gray-700" : "text-gray-400"
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link href="/login">
            <Button
              className={cn(
                "w-full",
                plan.popular
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              )}
            >
              {plan.cta}
            </Button>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
