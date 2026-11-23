"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Palette,
  PenTool,
  Send,
  MessageSquareHeart,
  Users,
  CheckCircle2,
  Clock,
  CreditCard,
  QrCode,
  Music,
  Image as ImageIcon,
  MapPin,
  Share2,
  BarChart3,
  RefreshCw,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Layers,
  CalendarClock,
  FileSpreadsheet,
  Eye,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GuideSectionId =
  | "all"
  | "create"
  | "edit"
  | "operate"
  | "duration"
  | "pricing"
  | "faq";

const NAV_TABS: { id: GuideSectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "Tất cả hướng dẫn", icon: BookOpen },
  { id: "create", label: "1. Chọn & Tạo thiệp", icon: Palette },
  { id: "edit", label: "2. Chỉnh sửa & Tải ảnh", icon: PenTool },
  { id: "operate", label: "3. Vận hành, Lời chúc & RSVP", icon: MessageSquareHeart },
  { id: "duration", label: "4. Thời hạn tồn tại Web", icon: CalendarClock },
  { id: "pricing", label: "5. Các gói giá & Xuất bản", icon: CreditCard },
  { id: "faq", label: "6. Câu hỏi thường gặp", icon: HelpCircle },
];

export function UserGuideContent({ isDashboard = false }: { isDashboard?: boolean }) {
  const [activeTab, setActiveTab] = useState<GuideSectionId>("all");

  const showSection = (id: GuideSectionId) => activeTab === "all" || activeTab === id;

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-900 via-rose-800 to-amber-900 text-white p-8 md:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-medium backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Cẩm nang sử dụng toàn diện cho Cô Dâu &amp; Chú Rể</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Hướng Dẫn Sử Dụng &amp; Vận Hành Thiệp Cưới Online
          </h1>
          <p className="text-rose-100 text-sm md:text-base leading-relaxed">
            Từ bước chọn mẫu, tự tay thiết kế thiệp, tạo mã QR mừng cưới cho đến cách gửi link mời cá nhân hóa,
            xem lời chúc, theo dõi xác nhận tham dự (RSVP), thời hạn tồn tại của web và bảng giá chi tiết.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={isDashboard ? "/dashboard/weddings/new" : "/templates"}>
              <Button className="bg-white text-rose-900 hover:bg-rose-50 font-semibold">
                {isDashboard ? "Tạo Thiệp Mới Ngay" : "Khám Phá Kho Mẫu Thiệp"}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/dashboard/weddings">
              <Button
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                Quản Lý Thiệp Của Tôi
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="sticky top-16 z-20 -mx-2 px-2 py-3 bg-white/95 backdrop-blur border-b border-gray-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs md:text-sm font-medium transition-all ${
                  active
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          PHẦN 1: CHỌN MẪU & TẠO THIỆP CƯỚI MỚI (4 BƯỚC)
      ===================================================================== */}
      {showSection("create") && (
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
            <div>
              <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 mb-2">
                Bước Khởi Đầu
              </Badge>
              <h2 className="text-2xl font-bold text-gray-900">
                1. Hướng dẫn Chọn mẫu &amp; Tạo thiệp cưới mới (4 bước)
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Hoàn toàn miễn phí khởi tạo — bạn có thể tạo nhiều bản nháp để thử nghiệm các phong cách khác nhau.
              </p>
            </div>
            <Link href="/dashboard/weddings/new">
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
                Bắt đầu tạo thiệp <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "Bước 1",
                title: "Chọn mẫu thiệp ưng ý",
                desc: "Truy cập kho 125+ mẫu thiệp tại mục Mẫu Thiệp (/templates) hoặc trong trang Tạo Thiệp Mới. Bạn có thể lọc theo chủ đề (Hiện đại, Sang trọng, Lãng mạn, Truyền thống), lọc mẫu Hot và bấm Xem thử trên Điện thoại/Máy tính trước khi bấm 'Dùng mẫu này'.",
                where: "Menu Mẫu Thiệp hoặc /dashboard/weddings/new",
              },
              {
                step: "Bước 2",
                title: "Nhập thông tin lễ cưới",
                desc: "Điền Họ tên Chú Rể & Cô Dâu, ngày tổ chức, giờ làm lễ, giờ đón khách và tên địa điểm của Nhà Trai (Tân Hôn) và Nhà Gái (Vu Quy). Các thông tin chi tiết khác có thể bổ sung sau.",
                where: "Bước 2 trong màn hình Tạo Thiệp Mới",
              },
              {
                step: "Bước 3",
                title: "Xem trước thiệp thực tế",
                desc: "Hệ thống tự động ghép tên Cô Dâu & Chú Rể, ngày giờ cưới của bạn vào mẫu thiệp đã chọn. Bạn có thể cuộn trang xem toàn bộ hiệu ứng, chuyển đổi chế độ xem Nhà Trai / Nhà Gái và Điện thoại / Máy tính.",
                where: "Bước 3 trong màn hình Tạo Thiệp Mới",
              },
              {
                step: "Bước 4",
                title: "Đặt đường dẫn (Link) riêng",
                desc: "Hệ thống tự động gợi ý đường dẫn đẹp theo tên hai bạn (ví dụ: /w/thanh-tung-huong-giang). Bạn có thể tùy chỉnh lại đường dẫn theo ý thích và bấm 'Tạo Thiệp Cưới' để lưu vào tài khoản.",
                where: "Bước 4 trong màn hình Tạo Thiệp Mới",
              },
            ].map((item) => (
              <Card key={item.step} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="inline-flex items-center rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 border border-rose-200">
                      {item.step}
                    </span>
                  </div>
                  <CardTitle className="text-base text-gray-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  <div className="rounded-lg bg-gray-50 p-2.5 text-xs text-gray-500 border border-gray-100">
                    <strong className="text-gray-700">Vị trí thao tác:</strong> {item.where}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          PHẦN 2: CHỈNH SỬA THIỆP TRỰC QUAN, TẢI ẢNH, NHẠC NỀN, QR MỪNG CƯỚI
      ===================================================================== */}
      {showSection("edit") && (
        <section className="space-y-6">
          <div className="border-b pb-4">
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 mb-2">
              Thiết Kế &amp; Cá Nhân Hóa
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              2. Hướng dẫn Chỉnh sửa nội dung, Tải ảnh, Nhạc nền &amp; Đổi mẫu thiệp
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Mọi thay đổi của bạn đều được cập nhật tức thì sang khung Xem trước trực tiếp bên phải và tự động lưu lại.
            </p>
          </div>

          {/* Thanh công cụ thông minh */}
          <Card className="bg-gradient-to-r from-rose-50/70 via-white to-amber-50/70 border-rose-200">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-600" />
                Thanh công cụ thông minh trên đầu trang Chỉnh sửa (`/dashboard/weddings/[id]/edit`)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-2xs">
                  <p className="font-semibold text-gray-900 mb-1">3 Chế độ làm việc</p>
                  <p className="text-xs text-gray-600">
                    Chuyển linh hoạt giữa <strong>Chỉnh sửa</strong> (toàn màn hình), <strong>Song song</strong> (vừa sửa bên trái vừa xem thiệp bên phải) và <strong>Xem trước</strong>.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-2xs">
                  <p className="font-semibold text-gray-900 mb-1">Tự động lưu (Auto-save)</p>
                  <p className="text-xs text-gray-600">
                    Sau khi bạn gõ phím 1.2 giây, hệ thống tự động lưu dữ liệu. Bạn cũng có thể bấm nút <strong>Lưu ngay</strong> bất kỳ lúc nào.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-2xs">
                  <p className="font-semibold text-gray-900 mb-1">Đổi mẫu giữ nguyên dữ liệu</p>
                  <p className="text-xs text-gray-600">
                    Bấm <strong>Đổi mẫu</strong> ngay cạnh tên mẫu để chuyển sang bất kỳ mẫu nào khác mà <strong>không phải nhập lại thông tin hay tải lại ảnh</strong>.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-2xs">
                  <p className="font-semibold text-gray-900 mb-1">Nút Nạp dữ liệu mẫu</p>
                  <p className="text-xs text-gray-600">
                    Nếu chưa kịp chuẩn bị nội dung, bấm <strong>Nạp dữ liệu mẫu</strong> để điền sẵn lịch trình, câu chuyện tình yêu mẫu rồi sửa lại theo ý mình.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8 Khối chỉnh sửa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Users,
                title: "① Thông tin cơ bản & Nghi lễ hai bên",
                desc: "Chỉnh sửa tên đầy đủ, tên gọi thân mật của Chú Rể & Cô Dâu, họ tên Bố Mẹ hai bên, ngày dương lịch, ngày âm lịch, giờ làm lễ, giờ khai tiệc, địa chỉ và link Google Maps chỉ đường.",
              },
              {
                icon: ImageIcon,
                title: "② Tải ảnh từng vị trí & Album ảnh cưới",
                desc: "Bấm nút 'Tải ảnh' để chọn ảnh trực tiếp từ điện thoại/máy tính cho từng vị trí: Ảnh bìa đầu trang (Hero), Ảnh Chú Rể, Ảnh Cô Dâu, Ảnh nền Đếm ngược, Ảnh cuối trang và Album nhiều ảnh.",
              },
              {
                icon: HeartHandshake,
                title: "③ Câu chuyện tình yêu & Lịch trình lễ cưới",
                desc: "Thêm/xóa/sắp xếp các cột mốc kỷ niệm tình yêu (kèm ngày tháng, câu chuyện và ảnh kỷ niệm) cùng Timeline chương trình tiệc cưới (Đón khách, Làm lễ, Khai tiệc...).",
              },
              {
                icon: QrCode,
                title: "④ Hộp mừng cưới & Mã QR Ngân hàng (VietQR)",
                desc: "Chỉ cần chọn tên Ngân hàng, nhập Số tài khoản và Tên chủ tài khoản của Chú Rể / Cô Dâu — hệ thống tự động tạo mã VietQR chuẩn để khách mời quét chuyển khoản trực tiếp trên thiệp.",
              },
              {
                icon: Music,
                title: "⑤ Nhạc nền thiệp cưới (Background Music)",
                desc: "Chọn từ 10 bản nhạc cưới lãng mạn có sẵn (có nút Nghe thử ngay trong trình chỉnh sửa) hoặc dán đường dẫn file nhạc .mp3 yêu thích của riêng hai bạn.",
              },
              {
                icon: Sparkles,
                title: "⑥ Hiệu ứng mở phong bì & Bật/Tắt từng khối",
                desc: "Tùy chọn kiểu phong bì mở thiệp, chữ viết tắt trên con dấu sáp. Mỗi mục đều có nút Công tắc (Bật/Tắt) — nếu bạn không muốn hiện mục nào trên thiệp, chỉ cần gạt tắt mục đó.",
              },
            ].map((block) => {
              const Icon = block.icon;
              return (
                <div
                  key={block.title}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:border-rose-200 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{block.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">
                      {block.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          PHẦN 3: HƯỚNG DẪN VẬN HÀNH — XEM LỜI CHÚC, RSVP, KHÁCH MỜI Ở ĐÂU?
      ===================================================================== */}
      {showSection("operate") && (
        <section className="space-y-6">
          <div className="border-b pb-4">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-2">
              Quản Lý &amp; Vận Hành Thực Tế
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Xem Lời chúc, Xác nhận tham dự (RSVP) và Quản lý khách mời ở đâu?
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Toàn bộ dữ liệu phản hồi của khách mời được tập trung tại <strong>Trang Quản Lý Chi Tiết Thiệp</strong> của bạn.
            </p>
          </div>

          {/* Đường dẫn truy cập */}
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Cách truy cập trang quản lý vận hành thiệp:
              </p>
              <p className="text-sm md:text-base font-semibold text-gray-900">
                Đăng nhập &rarr; Menu trái chọn{" "}
                <span className="underline decoration-emerald-500">Thiệp Của Tôi</span>{" "}
                (`/dashboard/weddings`) &rarr; Bấm vào nút{" "}
                <span className="inline-flex items-center rounded bg-white px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-300">
                  Quản lý / Chi tiết
                </span>{" "}
                trên thiệp của bạn.
              </p>
            </div>
            <Link href="/dashboard/weddings">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">
                Mở Thiệp Của Tôi <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Giải thích chi tiết 6 Tab vận hành */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card className="border-2 border-amber-200 bg-amber-50/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white">
                    Tab: Lời chúc
                  </Badge>
                  <MessageSquareHeart className="w-5 h-5 text-amber-600" />
                </div>
                <CardTitle className="text-base mt-2">
                  Xem &amp; Quản lý Lời chúc (Sổ lưu bút)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 text-sm text-gray-600">
                <p>
                  Khi khách mời điền form <strong>Sổ lưu bút / Gửi lời chúc</strong> trên thiệp cưới của bạn, lời chúc sẽ xuất hiện ngay lập tức tại tab <strong>Lời chúc</strong>.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Xem tên người gửi, nội dung lời chúc và thời gian gửi.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <strong>Duyệt / Ẩn hoặc Xóa</strong> các lời chúc trùng lặp hoặc không phù hợp.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Bấm <strong>Xuất Excel</strong> để tải toàn bộ lời chúc về lưu giữ làm kỷ niệm.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-rose-200 bg-rose-50/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-rose-600 hover:bg-rose-600 text-white">
                    Tab: RSVP
                  </Badge>
                  <CheckCircle2 className="w-5 h-5 text-rose-600" />
                </div>
                <CardTitle className="text-base mt-2">
                  Xem Xác nhận tham dự (RSVP) ở đâu?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 text-sm text-gray-600">
                <p>
                  Mọi phản hồi từ mục <strong>Xác nhận tham dự</strong> trên thiệp đều được thống kê tự động tại tab <strong>RSVP</strong> trong trang chi tiết thiệp.
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Tổng hợp 3 con số quan trọng: <strong>Số khách Tham dự</strong>, <strong>Tổng số người đi cùng</strong> (để đặt số bàn tiệc chính xác) và <strong>Số khách Báo bận</strong>.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Lọc nhanh danh sách khách đồng ý tham dự hoặc khách từ chối.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600 hover:bg-blue-600 text-white">
                    Tab: Khách mời &amp; Chia sẻ
                  </Badge>
                  <Share2 className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-base mt-2">
                  Gửi thiệp cá nhân hóa tên từng Khách mời
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 text-sm text-gray-600">
                <p>
                  Tại tab <strong>Khách mời</strong> và <strong>Chia sẻ</strong>, bạn có thể tạo đường dẫn hiển thị riêng tên từng vị khách ngay trên phong bì mở thiệp:
                </p>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Thêm từng khách hoặc <strong>Nhập danh sách từ file Excel</strong>.
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Bấm biểu tượng <strong>Sao chép link mời</strong> cạnh tên khách (ví dụ: <code>/w/ten-thiep?guest=Anh+Minh&amp;salutation=Thân+mời</code>).
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Tải <strong>Mã QR của thiệp</strong> để in đính kèm lên thiệp giấy truyền thống.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* =====================================================================
          PHẦN 4: THỜI GIAN TỒN TẠI CỦA WEB THIỆP & CƠ CHẾ GIA HẠN
      ===================================================================== */}
      {showSection("duration") && (
        <section className="space-y-6">
          <div className="border-b pb-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mb-2">
              Vòng Đời &amp; Lưu Trữ
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Thời gian tồn tại của Web Thiệp cưới &amp; Chính sách lưu trữ dữ liệu
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Hiểu rõ các trạng thái hoạt động của thiệp để chủ động thời điểm xuất bản và gửi thiệp cho khách mời.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Giai đoạn 1: Bản Nháp (DRAFT)</Badge>
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <CardTitle className="text-lg mt-2 text-gray-900">
                  Không giới hạn thời gian chuẩn bị
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  Khi mới tạo thiệp và chưa thanh toán xuất bản, thiệp ở trạng thái <strong>Nháp (DRAFT)</strong>.
                </p>
                <p>
                  Bản nháp được lưu trữ <strong>miễn phí vô thời hạn</strong> trong tài khoản của bạn. Bạn có thể tạo thiệp trước ngày cưới nhiều tháng để thong thả chỉnh sửa thông tin và thay ảnh.
                </p>
                <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  Lưu ý: Ở chế độ Nháp, chỉ mình bạn (chủ tài khoản) mới xem được thiệp khi mở đường dẫn <code>/w/[slug]</code>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-500 shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">
                    Giai đoạn 2: Đã Xuất Bản (PUBLISHED)
                  </Badge>
                  <CalendarClock className="w-5 h-5 text-emerald-600" />
                </div>
                <CardTitle className="text-lg mt-2 text-gray-900">
                  30 Ngày hoạt động công khai / lần xuất bản
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  Ngay sau khi thanh toán xuất bản, thiệp cưới chuyển sang trạng thái <strong>Đã xuất bản (PUBLISHED)</strong> và mở công khai 24/7 tại đường dẫn <code>/w/[slug]</code> trong <strong>30 ngày liên tục</strong>.
                </p>
                <p>
                  Trong suốt thời gian này, bạn <strong>vẫn có thể chỉnh sửa mọi thông tin, thay ảnh, đổi nhạc</strong> — khách mời mở lại link cũ sẽ thấy ngay nội dung mới.
                </p>
                <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  Mở khóa 100% tính năng: Không giới hạn số lượng ảnh album, không giới hạn khách mời và xóa hoàn toàn nhãn dùng thử.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-rose-300 text-rose-700">
                    Giai đoạn 3: Gia Hạn &amp; Sau Ngày Cưới
                  </Badge>
                  <RefreshCw className="w-5 h-5 text-rose-600" />
                </div>
                <CardTitle className="text-lg mt-2 text-gray-900">
                  Cộng dồn ngày gia hạn &amp; Bảo toàn dữ liệu
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Cơ chế cộng dồn thông minh:</strong> Nếu thiệp còn 10 ngày sử dụng và bạn bấm <strong>Gia hạn</strong>, hệ thống sẽ cộng thêm 30 ngày thành <strong>40 ngày</strong> (không làm mất số ngày còn lại).
                </p>
                <p>
                  <strong>Bảo toàn dữ liệu 100%:</strong> Ngay cả khi thiệp đã hết hạn hiển thị công khai (sau 30 ngày), <strong>toàn bộ lời chúc, danh sách RSVP và ảnh cưới vẫn được giữ nguyên trong Dashboard</strong> để bạn xem lại hoặc xuất file Excel bất cứ lúc nào.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* =====================================================================
          PHẦN 5: CÁC GÓI GIÁ & QUY TRÌNH THANH TOÁN XUẤT BẢN
      ===================================================================== */}
      {showSection("pricing") && (
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
            <div>
              <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 mb-2">
                Bảng Giá Minh Bạch
              </Badge>
              <h2 className="text-2xl font-bold text-gray-900">
                5. Các gói giá mẫu thiệp &amp; Cách thanh toán xuất bản
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Không thu phí duy trì hàng tháng, không chia nhỏ tính năng — mỗi mẫu thiệp có một mức giá trọn gói duy nhất.
              </p>
            </div>
            <Link href="/pricing">
              <Button variant="outline" size="sm">
                Xem bảng giá từng mẫu <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Free Draft */}
            <Card className="border-gray-200 flex flex-col">
              <CardHeader>
                <Badge className="w-fit bg-gray-100 text-gray-700 hover:bg-gray-100 mb-1">
                  Trải nghiệm &amp; Thiết kế nháp
                </Badge>
                <CardTitle className="text-xl">Bản Nháp (Draft)</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">0đ</span>
                  <span className="text-xs text-gray-500 ml-1">/ không giới hạn thời gian nháp</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Tạo và chỉnh sửa thử toàn bộ 125+ mẫu thiệp
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Đổi mẫu thoải mái không mất dữ liệu đã nhập
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Tải thử tối đa 3 ảnh album &amp; 10 khách mời
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Chỉ thanh toán khi thực sự ưng ý và bấm Xuất bản
                  </li>
                </ul>
                <Link href="/dashboard/weddings/new" className="pt-4">
                  <Button variant="outline" className="w-full">
                    Tạo Bản Nháp Miễn Phí
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tier 2: Standard 199k */}
            <Card className="border-2 border-rose-500 shadow-lg relative flex flex-col">
              <div className="absolute -top-3 right-4 rounded-full bg-rose-600 px-3 py-0.5 text-[11px] font-bold text-white shadow">
                Phổ biến nhất (105 mẫu)
              </div>
              <CardHeader>
                <Badge className="w-fit bg-rose-100 text-rose-700 hover:bg-rose-100 mb-1">
                  Trọn gói đầy đủ tính năng
                </Badge>
                <CardTitle className="text-xl">Mẫu Hiện Đại &amp; Sang Trọng</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-rose-600">199.000đ</span>
                  <span className="text-xs text-gray-500 ml-1">/ 30 ngày xuất bản công khai</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Áp dụng cho <strong>105 mẫu thiệp</strong> (thêm 18 mẫu miễn phí 0đ) (Hiện đại, Hàn Quốc, Tối giản, Lãng mạn, Luxury, Phong bì sáp...)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <strong>Không giới hạn</strong> số lượng ảnh cưới &amp; danh sách khách mời
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Đầy đủ Nhạc nền, Bản đồ, Hộp mừng cưới VietQR, Sổ lưu bút &amp; RSVP
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    Link mời cá nhân hóa tên từng khách &amp; Xuất báo cáo Excel
                  </li>
                </ul>
                <Link href="/templates" className="pt-4">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                    Chọn Mẫu &amp; Thiết Kế Ngay
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tier 3: Flagship Traditional */}
            <Card className="border-amber-300 bg-gradient-to-b from-amber-50/40 to-white flex flex-col">
              <CardHeader>
                <Badge className="w-fit bg-amber-100 text-amber-800 hover:bg-amber-100 mb-1">
                  Thiết kế Truyền thống Độc bản
                </Badge>
                <CardTitle className="text-xl">Mẫu Truyền Thống Đặc Biệt</CardTitle>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-gray-900">399.000đ</span>
                  <span className="text-xs text-gray-500 block mt-0.5">/ 30 ngày xuất bản công khai</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    Mẫu <strong>Hồng Sắc Hỷ</strong> &amp; <strong>Trầu Cau Đỏ — Song Hỷ</strong> (đồng giá 399.000đ)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    Hiệu ứng mở thiệp Song Hỷ &amp; bố cục lễ nghi truyền thống Việt Nam
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    Bao gồm toàn bộ tính năng cao cấp, không giới hạn ảnh &amp; khách mời
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    Hỗ trợ áp dụng <strong>Mã giảm giá (Coupon)</strong> khi thanh toán
                  </li>
                </ul>
                <Link href="/templates" className="pt-4">
                  <Button variant="outline" className="w-full border-amber-400 text-amber-900 hover:bg-amber-50">
                    Xem Các Mẫu Truyền Thống
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quy trình thanh toán 3 bước */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Cách thức thanh toán &amp; Kích hoạt thiệp tự động (`/dashboard/weddings/[id]/publish`)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-gray-600">
              <div>
                <strong className="text-gray-900 block mb-1">1. Bấm nút Xuất bản:</strong>
                Từ trang Chỉnh sửa thiệp hoặc trang Chi tiết thiệp, bấm nút <strong>Xuất bản</strong>. Nếu có mã ưu đãi, nhập vào ô <strong>Mã giảm giá</strong> và bấm Áp dụng.
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">2. Quét mã VietQR:</strong>
                Hệ thống hiển thị mã QR chuyển khoản ngân hàng với số tiền và <strong>Nội dung chuyển khoản tự động</strong> (ví dụ: <code>TC1234ABCD PUBLISH</code>).
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">3. Kích hoạt tức thì:</strong>
                Sau khi chuyển khoản đúng nội dung, hệ thống tự động xác nhận và chuyển thiệp sang trạng thái <strong>Đã xuất bản (PUBLISHED)</strong> ngay lập tức.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          PHẦN 6: CÂU HỎI THƯỜNG GẶP (FAQ)
      ===================================================================== */}
      {showSection("faq") && (
        <section className="space-y-6">
          <div className="border-b pb-4">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 mb-2">
              Giải Đáp Nhanh
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Câu hỏi thường gặp trong quá trình sử dụng
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "Sau khi đã Xuất bản và gửi link cho khách, tôi có sửa lại thông tin hoặc thêm ảnh được không?",
                a: "Hoàn toàn được! Bạn có thể vào trang Chỉnh sửa bất cứ lúc nào để cập nhật giờ lễ, địa điểm, thay ảnh hoặc đổi nhạc. Đường dẫn /w/[slug] đã gửi cho khách giữ nguyên không đổi và sẽ hiển thị ngay nội dung mới.",
              },
              {
                q: "Tôi đã nhập hết thông tin ở mẫu A nhưng muốn đổi sang mẫu B thì có phải nhập lại không?",
                a: "Không cần nhập lại. Bạn chỉ cần bấm nút 'Đổi mẫu' trên thanh công cụ của trình chỉnh sửa, chọn mẫu B và bấm Áp dụng. Toàn bộ tên, ngày giờ, câu chuyện, album ảnh và số tài khoản ngân hàng đều được giữ nguyên.",
              },
              {
                q: "Làm sao để gửi thiệp cho bạn bè bên Nhà Gái hiển thị thông tin Lễ Vu Quy trước?",
                a: "Trong trang Quản lý chi tiết thiệp -> tab 'Chia sẻ', hệ thống cung cấp sẵn 2 đường link riêng biệt: Link Nhà Trai (/w/ten-thiep?mode=groom) và Link Nhà Gái (/w/ten-thiep?mode=bride), hoặc bạn có thể tạo link kèm tên từng khách mời.",
              },
              {
                q: "Tiền mừng cưới khách quét mã QR trên thiệp sẽ chuyển về đâu?",
                a: "100% tiền mừng cưới được chuyển thẳng từ ứng dụng ngân hàng của khách mời vào trực tiếp số tài khoản ngân hàng của Cô Dâu / Chú Rể mà bạn đã nhập trong mục Hộp mừng cưới (không qua trung gian).",
              },
            ].map((item) => (
              <Card key={item.q} className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm md:text-base text-gray-900 leading-snug">
                    {item.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
