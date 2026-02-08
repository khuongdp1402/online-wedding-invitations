"use client";

import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-pink-600 to-rose-800" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Heart className="w-12 h-12 text-rose-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sẵn Sàng Tạo Thiệp Cưới
            <br />
            Cho Ngày Trọng Đại?
          </h2>
          <p className="text-lg text-rose-100 mb-10 max-w-xl mx-auto">
            Hàng ngàn cặp đôi đã tin tưởng sử dụng. Bắt đầu miễn phí ngay hôm
            nay, không cần thẻ tín dụng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-rose-600 hover:bg-rose-50 h-14 px-8 text-lg rounded-full shadow-xl"
              >
                <Heart className="w-5 h-5 mr-2" />
                Tạo Thiệp Ngay
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg rounded-full"
              >
                Xem Mẫu Thiệp
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
