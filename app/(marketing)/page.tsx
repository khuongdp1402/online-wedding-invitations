"use client";

import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";
import { PricingCards } from "@/components/marketing/PricingCards";
import { CTA } from "@/components/marketing/CTA";
import { Footer } from "@/components/marketing/Footer";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <Features />

      {/* How it works */}
      <HowItWorks />

      {/* Template Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mẫu Thiệp <span className="text-rose-600">Đẹp & Đa Dạng</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Từ cổ điển đến hiện đại, từ đơn giản đến sang trọng — chọn phong
              cách phù hợp với bạn.
            </p>
          </motion.div>
          <TemplateShowcase />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bảng Giá{" "}
              <span className="text-rose-600">Minh Bạch & Hợp Lý</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng. Không phí ẩn, không
              cam kết.
            </p>
          </motion.div>
          <PricingCards />
        </div>
      </section>

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
