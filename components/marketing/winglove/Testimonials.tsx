import { Reveal } from "@/components/marketing/winglove/Reveal";

const quotes = [
  {
    msg: "Gửi 1 link cho cả hai bên nội ngoại, ai xem cũng khen. Phần lời chúc còn vui hơn cả sổ lưu bút đám cưới ngày xưa.",
    initials: "TH",
    name: "Thanh Tùng & Hương Giang",
    tag: "Mẫu Classic Elegance",
  },
  {
    msg: "RSVP tự động đếm số khách tới dự, khỏi phải hỏi từng người qua Zalo nữa. Tiết kiệm cả tuần chạy deadline cưới.",
    initials: "PK",
    name: "Phú Khương & Cẩm Hiền",
    tag: "Mẫu Modern Cinematic",
  },
  {
    msg: "Mã QR mừng cưới gắn thẳng vào thiệp, khách ở xa vẫn gửi được — không cần đọc số tài khoản qua điện thoại nữa.",
    initials: "MA",
    name: "Minh Anh & Gia Bảo",
    tag: "Mẫu Sweet Sakura",
  },
];

export function Testimonials() {
  return (
    <section className="py-[88px] pb-10">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((quote, index) => (
            <Reveal key={quote.name} delayMs={index * 80}>
              <div className="h-full rounded-[20px] border-t-[3px] border-winglove-gold bg-winglove-surface-sunken p-7">
                <p className="mb-[18px] font-wg-display text-[1.18rem] italic leading-[1.55] text-winglove-ink">
                  {quote.msg}
                </p>
                <div className="flex items-center gap-3">
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-winglove-red font-wg-body text-[0.8rem] font-extrabold text-white">
                    {quote.initials}
                  </span>
                  <div>
                    <strong className="block text-[0.9rem] font-semibold text-winglove-ink">
                      {quote.name}
                    </strong>
                    <small className="text-[0.78rem] text-winglove-ink-soft">
                      {quote.tag}
                    </small>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
