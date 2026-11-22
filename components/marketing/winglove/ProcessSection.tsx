import Link from "next/link";
import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { Reveal } from "@/components/marketing/winglove/Reveal";
import { BookOpen, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Chọn mẫu thiệp ưng ý",
    body: "Kho 125+ mẫu thiệp đa dạng phong cách — từ Hiện đại, Tối giản, Lãng mạn Hàn Quốc đến Truyền thống Song Hỷ đỏ trang trọng.",
  },
  {
    num: "02",
    title: "Chỉnh sửa trực quan & Tải ảnh",
    body: "Điền thông tin lễ cưới hai bên, tải ảnh cưới, chọn nhạc nền, tạo mã QR mừng cưới VietQR và xem trước trực tiếp theo thời gian thực.",
  },
  {
    num: "03",
    title: "Xuất bản & Theo dõi RSVP, Lời chúc",
    body: "Xuất bản công khai 30 ngày (hỗ trợ gia hạn cộng dồn), gửi link mời cá nhân hóa tên từng khách, xem lời chúc và thống kê RSVP ngay trong Dashboard.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-[88px] pb-10">
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <Eyebrow>Từ ý tưởng đến lời mời</Eyebrow>
            <h2 className="font-wg-display text-[clamp(1.8rem,3.2vw,2.5rem)] font-semibold text-winglove-ink">
              Có thiệp cưới riêng chỉ trong{" "}
              <em className="font-wg-display italic text-winglove-red">
                5 phút
              </em>
            </h2>
          </div>
          <Link
            href="/huong-dan"
            className="inline-flex items-center gap-2 rounded-full border border-winglove-red/30 bg-white px-5 py-2.5 text-sm font-semibold text-winglove-red hover:bg-winglove-red hover:text-white transition-colors shadow-xs w-fit"
          >
            <BookOpen className="w-4 h-4" />
            Xem Hướng Dẫn Sử Dụng Chi Tiết
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.num} delayMs={index * 80}>
              <div className="h-full rounded-3xl border border-winglove-line bg-white p-7">
                <span
                  className="mb-3.5 block font-wg-display text-[2.6rem] font-semibold leading-none text-transparent"
                  style={{ WebkitTextStroke: "1.5px #C99A44" }}
                >
                  {step.num}
                </span>
                <h3 className="mb-2.5 font-wg-display text-[1.3rem] font-semibold text-winglove-ink">
                  {step.title}
                </h3>
                <p className="m-0 text-[0.93rem] text-winglove-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
