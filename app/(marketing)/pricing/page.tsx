"use client";

import Link from "next/link";
import { PricingCards } from "@/components/marketing/PricingCards";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, CalendarClock, CheckCircle2, Sparkles } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bảng Giá Dịch Vụ &amp; Các Gói Mẫu Thiệp
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mỗi mẫu thiệp một giá cố định, đã bao gồm chi phí hạ tầng.
              Chỉnh sửa thoải mái miễn phí, chỉ thanh toán khi bạn xuất bản công khai.
            </p>
            <div className="mt-4">
              <Link href="/huong-dan">
                <Button variant="outline" size="sm" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  Xem Hướng Dẫn Sử Dụng &amp; Vận Hành Chi Tiết
                </Button>
              </Link>
            </div>
          </div>

          {/* Tóm tắt 3 nhóm gói giá & Thời hạn tồn tại của web */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Gói Trải Nghiệm
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">Bản Nháp (Draft)</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">0đ (Miễn phí)</p>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Tạo thiệp, chỉnh sửa nội dung, đổi thử qua lại giữa 125+ mẫu thiệp không giới hạn thời gian lưu nháp trong tài khoản.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-rose-500 bg-rose-50/30 p-6 relative shadow-sm">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-rose-600">
                <Sparkles className="w-3.5 h-3.5" /> Phổ Biến Nhất (123 Mẫu)
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">Mẫu Hiện Đại &amp; Sang Trọng</h3>
              <p className="text-2xl font-bold text-rose-600 mt-2">239.000đ / 30 ngày</p>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                Mở khóa 100% tính năng, không giới hạn ảnh album &amp; khách mời, đầy đủ nhạc nền, VietQR mừng cưới, Sổ lưu bút &amp; thống kê RSVP.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-300 bg-amber-50/30 p-6">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                <CalendarClock className="w-3.5 h-3.5" /> Thời Hạn &amp; Gia Hạn
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1">Hiệu Lực 30 Ngày / Lần</h3>
              <p className="text-sm font-semibold text-amber-900 mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Cộng dồn ngày khi gia hạn sớm
              </p>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Web thiệp hoạt động công khai 30 ngày kể từ lúc xuất bản. Sau khi hết hạn, toàn bộ lời chúc &amp; danh sách RSVP vẫn lưu vĩnh viễn trong Dashboard.
              </p>
            </div>
          </div>

          <PricingCards />
        </div>
      </div>
      <Footer />
    </div>
  );
}
