"use client";

import { useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { Reveal } from "@/components/marketing/winglove/Reveal";
import { BgIcon } from "@/components/marketing/winglove/BgIcon";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Winglove có miễn phí không?",
    a: "Tạo, chỉnh sửa và xem trước hoàn toàn miễn phí — không cần thẻ, không giới hạn thời gian. Chỉ trả phí một lần khi bạn thật sự muốn xuất bản link để gửi cho khách.",
  },
  {
    q: "Chi phí xuất bản 1 thiệp là bao nhiêu?",
    a: "Từ 500.000đ đến 1.000.000đ tuỳ mẫu (mẫu càng nhiều hiệu ứng, giá càng cao) — trả một lần duy nhất, không thu phí hàng tháng, không giới hạn lượt khách xem thiệp.",
  },
  {
    q: "Gửi thiệp rồi vẫn sửa được thông tin chứ?",
    a: "Được. Bạn chỉnh trực tiếp trên trang quản lý, thay đổi hiển thị ngay trên link đã gửi — không cần tạo thiệp mới hay gửi lại link khác.",
  },
  {
    q: "Khách mời xác nhận tham dự (RSVP) như thế nào?",
    a: "Ngay trên thiệp có khối RSVP để khách chọn tham dự hay không, kèm số lượng người đi cùng — bạn theo dõi danh sách trong trang quản lý theo thời gian thực.",
  },
  {
    q: "Thiệp có hiển thị đẹp trên điện thoại không?",
    a: "Có — cả 10 mẫu đều thiết kế ưu tiên cho điện thoại trước, vì phần lớn khách mời sẽ mở link ngay trên Zalo hoặc Messenger.",
  },
  {
    q: "Mừng cưới online hoạt động ra sao?",
    a: "Nhập số tài khoản ngân hàng của hai gia đình, Winglove tự tạo mã QR VietQR để khách quét chuyển khoản trực tiếp trên thiệp.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <section id="faq" className="relative overflow-hidden py-12 pb-8 md:py-14">
      <BgIcon
        icon={HelpCircle}
        size={170}
        className="-left-8 top-4 hidden text-winglove-gold/[0.07] lg:block"
      />
      <div className="relative mx-auto max-w-[1180px] px-8">
        <Reveal className="mx-auto mb-9 max-w-[600px] text-center">
          <Eyebrow center>Câu hỏi thường gặp</Eyebrow>
          <h2 className="font-wg-display text-[clamp(1.8rem,3vw,2.3rem)] font-semibold text-winglove-ink">
            Thắc mắc hay gặp, giải đáp trong một nốt nhạc
          </h2>
        </Reveal>

        <Reveal className="mx-auto flex max-w-[760px] flex-col gap-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-winglove-line bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-[22px] py-[18px] text-left font-wg-body text-[0.98rem] font-bold text-winglove-ink"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 text-[1.3rem] text-winglove-gold transition-transform duration-300",
                      open && "rotate-45"
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  ref={(el) => {
                    bodyRefs.current[index] = el;
                  }}
                  className="overflow-hidden transition-[max-height] duration-[350ms] ease-in-out"
                  style={{
                    maxHeight: open
                      ? (bodyRefs.current[index]?.scrollHeight ?? 400)
                      : 0,
                  }}
                >
                  <p className="m-0 max-w-[64ch] px-[22px] pb-5 text-[0.92rem] text-winglove-ink-soft">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
