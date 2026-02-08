"use client";

import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Kho Mẫu Thiệp Cưới
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập mẫu thiệp cưới đa dạng. Chọn mẫu yêu thích
              và tùy chỉnh theo phong cách của bạn.
            </p>
          </div>
          <TemplateShowcase />
        </div>
      </div>
      <Footer />
    </div>
  );
}
