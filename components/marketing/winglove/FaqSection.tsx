"use client";

import { useRef, useState } from "react";
import { Eyebrow } from "@/components/marketing/winglove/Eyebrow";
import { Reveal } from "@/components/marketing/winglove/Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Các gói giá thiệp cưới và thời hạn tồn tại của web là bao lâu?",
    a: "Bạn được tạo bản nháp và chỉnh sửa thử miễn phí 0đ không giới hạn thời gian. Khi xuất bản công khai, 123 mẫu hiện đại/sang trọng có giá trọn gói 239.000đ/30 ngày và 2 mẫu truyền thống đặc biệt có giá 500.000đ – 1.000.000đ/30 ngày (hỗ trợ gia hạn cộng dồn thêm 30 ngày bất cứ lúc nào). Sau khi hết hạn, toàn bộ lời chúc và danh sách RSVP vẫn lưu vĩnh viễn trong Dashboard.",
  },
  {
    q: "Xem lời chúc và danh sách xác nhận tham dự (RSVP) ở đâu?",
    a: "Sau khi đăng nhập, bạn vào mục 'Thiệp Của Tôi' (/dashboard/weddings) -> bấm vào thiệp của bạn để mở trang Quản lý chi tiết. Tại đây có đủ 6 tab: Thông tin, Khách mời, Lời chúc (xem/duyệt/xuất Excel lời chúc), RSVP (xem số người tham dự & đi cùng), Chia sẻ và Thống kê.",
  },
  {
    q: "Gửi thiệp rồi vẫn sửa được thông tin hoặc đổi mẫu khác chứ?",
    a: "Hoàn toàn được! Bạn chỉnh trực tiếp trên trang Chỉnh sửa thiệp, mọi thay đổi hiển thị ngay trên đường dẫn /w/[slug] đã gửi. Bạn cũng có thể bấm 'Đổi mẫu' để chuyển sang mẫu khác mà vẫn giữ nguyên 100% thông tin và ảnh đã tải lên.",
  },
  {
    q: "Làm sao để gửi thiệp có hiện tên riêng của từng khách mời?",
    a: "Trong tab 'Khách mời' hoặc 'Chia sẻ' của trang Quản lý thiệp, bạn nhập tên khách mời và bấm Sao chép link mời. Đường dẫn sẽ có dạng /w/ten-thiep?guest=Anh+Minh&salutation=Thân+mời — khi khách mở thiệp sẽ thấy lời mời trang trọng kèm tên mình ngay trên phong bì.",
  },
  {
    q: "Mừng cưới online qua mã QR hoạt động ra sao?",
    a: "Bạn chỉ cần chọn Ngân hàng và nhập Số tài khoản của Chú Rể / Cô Dâu trong mục Hộp mừng cưới. Hệ thống tự tạo mã QR VietQR để khách quét chuyển khoản trực tiếp vào tài khoản của hai bạn (không qua trung gian).",
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
    <section id="faq" className="py-[70px] pb-10">
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal className="mx-auto mb-11 max-w-[600px] text-center">
          <Eyebrow center>Câu hỏi thường gặp</Eyebrow>
          <h2 className="font-wg-display text-[clamp(1.8rem,3vw,2.3rem)] font-semibold text-winglove-ink">
            Mọi thứ bạn cần biết trước khi bắt đầu
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
