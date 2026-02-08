"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Sparkles } from "lucide-react";
import Link from "next/link";

type Props = {
  wedding: {
    id: string;
    slug: string;
    status: string;
    plan: string;
    groomName: string;
    brideName: string;
  };
};

const plans = [
  {
    id: "BASIC",
    name: "Cơ Bản",
    price: "500.000₫",
    icon: Star,
    color: "border-blue-200 bg-blue-50",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    duration: "6 tháng",
    features: [
      "Publish online",
      "Bỏ watermark",
      "50 khách mời",
      "10 ảnh gallery",
      "Custom slug URL",
      "Quản lý lời chúc",
      "RSVP tracking",
    ],
  },
  {
    id: "STANDARD",
    name: "Tiêu Chuẩn",
    price: "1.000.000₫",
    icon: Crown,
    color: "border-rose-200 bg-rose-50 ring-2 ring-rose-500",
    buttonColor: "bg-rose-600 hover:bg-rose-700",
    duration: "1 năm",
    popular: true,
    features: [
      "Tất cả gói Cơ Bản",
      "200 khách mời",
      "20 ảnh gallery",
      "Thiệp in tên khách",
      "Export Excel",
      "Custom domain",
      "Analytics (lượt xem)",
    ],
  },
  {
    id: "PREMIUM",
    name: "Cao Cấp",
    price: "2.000.000₫",
    icon: Sparkles,
    color: "border-amber-200 bg-amber-50",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
    duration: "Vĩnh viễn",
    features: [
      "Tất cả gói Tiêu Chuẩn",
      "Unlimited khách mời",
      "Unlimited ảnh",
      "Nhạc nền tùy chỉnh",
      "Hỗ trợ ưu tiên",
      "Tất cả template",
      "Vĩnh viễn không hết hạn",
    ],
  },
];

export function PublishPage({ wedding }: Props) {
  const isPublished = wedding.status === "PUBLISHED";

  return (
    <div className="space-y-8">
      {isPublished && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Thiệp đã được xuất bản!</p>
                <p className="text-sm text-green-600">
                  Đường dẫn: {typeof window !== "undefined" ? window.location.origin : ""}/w/{wedding.slug}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Chọn gói để xuất bản</h2>
        <p className="text-gray-500">
          Nâng cấp để bỏ watermark, publish thiệp và mở khoá tính năng
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.color} transition-shadow hover:shadow-lg`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 hover:bg-rose-500 text-white">
                Phổ biến nhất
              </Badge>
            )}
            <CardHeader className="text-center pb-2">
              <plan.icon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-gray-900 mt-1">{plan.price}</div>
              <p className="text-sm text-gray-500">{plan.duration}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${plan.buttonColor} text-white`} disabled={wedding.plan === plan.id}>
                {wedding.plan === plan.id ? "Gói hiện tại" : "Chọn gói này"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-gray-500 mb-4">
          Thanh toán qua chuyển khoản ngân hàng hoặc VNPay. Liên hệ hỗ trợ nếu cần giúp đỡ.
        </p>
        <Link href={`/dashboard/weddings/${wedding.id}`}>
          <Button variant="outline">Quay lại</Button>
        </Link>
      </div>
    </div>
  );
}
