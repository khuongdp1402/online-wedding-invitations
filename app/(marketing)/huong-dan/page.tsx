import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { UserGuideContent } from "@/components/guide/UserGuideContent";

export const metadata: Metadata = {
  title: "Hướng Dẫn Sử Dụng & Bảng Giá | Winglove - Thiệp Cưới Online",
  description:
    "Hướng dẫn chi tiết từ bước chọn mẫu, tạo thiệp cưới online, chỉnh sửa ảnh, nhạc nền, tạo QR mừng cưới đến cách xem lời chúc, RSVP, thời hạn tồn tại của web và các gói giá.",
};

export default function PublicGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50/60">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <UserGuideContent isDashboard={false} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
