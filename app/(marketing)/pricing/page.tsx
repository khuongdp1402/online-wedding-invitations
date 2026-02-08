"use client";

import { PricingCards } from "@/components/marketing/PricingCards";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bảng Giá Dịch Vụ
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chọn gói phù hợp với nhu cầu của bạn. Bắt đầu miễn phí và nâng
              cấp khi cần.
            </p>
          </div>
          <PricingCards />
        </div>
      </div>
      <Footer />
    </div>
  );
}
