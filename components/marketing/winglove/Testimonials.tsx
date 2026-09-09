import { Quote } from "lucide-react";
import { BgIcon } from "@/components/marketing/winglove/BgIcon";
import { cn } from "@/lib/utils";

type QuoteItem = {
  msg: string;
  initials: string;
  name: string;
  tag: string;
};

const ROW_A: QuoteItem[] = [
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
  {
    msg: "Đổi giờ tiệc phút chót mà không phải gửi lại thiệp mới — sửa trên trang quản lý là khách xem thấy ngay trên link cũ.",
    initials: "VH",
    name: "Việt Hoàng & Thuý Hằng",
    tag: "Mẫu Luxury Royal Gold",
  },
  {
    msg: "Khách lớn tuổi bên nhà nội chỉ cần bấm vào link Zalo là mở được thiệp, không phải cài thêm app gì cả.",
    initials: "ĐT",
    name: "Đức Trí & Ngọc Trâm",
    tag: "Mẫu Vintage Botanical",
  },
  {
    msg: "Có thống kê ai đã xem, ai đã xác nhận ngay trên điện thoại — hai đứa ngồi soát danh sách khách mời trong 10 phút.",
    initials: "QA",
    name: "Quang Anh & Bảo Ngọc",
    tag: "Mẫu Minimal Korean",
  },
];

const ROW_B: QuoteItem[] = [
  {
    msg: "Chỉ đường Google Maps gắn sẵn trong thiệp, khách ở tỉnh khác không phải hỏi lại địa chỉ nhà hàng qua tin nhắn.",
    initials: "HL",
    name: "Hoàng Long & Thanh Thảo",
    tag: "Mẫu Emerald Glamour",
  },
  {
    msg: "10 mẫu đều xem thử miễn phí trước khi trả tiền, nên tụi mình chọn được đúng cái hợp gu chứ không mua đại.",
    initials: "NB",
    name: "Nam Bình & Yến Chi",
    tag: "Mẫu Boho Terracotta",
  },
  {
    msg: "Đếm ngược ngày cưới ngay trên thiệp làm khách hào hứng hẳn, nhiều người chụp lại màn hình gửi vào group gia đình.",
    initials: "TL",
    name: "Trung Lộc & Kim Anh",
    tag: "Mẫu Autumn Watercolor",
  },
  {
    msg: "Ảnh cưới tải lên hiển thị nét, không bị nén vỡ như gửi qua Zalo — khách xem gallery mà cứ tưởng đang xem web studio.",
    initials: "PT",
    name: "Phúc Thịnh & Mỹ Duyên",
    tag: "Mẫu Classic Burgundy",
  },
  {
    msg: "Làm xong thiệp trong lúc nghỉ trưa, tối hôm đó đã gửi link cho gần 200 khách — nhanh hơn nhiều so với đặt thiệp in.",
    initials: "AT",
    name: "Anh Tuấn & Diễm My",
    tag: "Mẫu Modern Cinematic",
  },
  {
    msg: "Phần lời chúc khách để lại được lưu hết trên trang quản lý, sau cưới đọc lại vẫn thấy ấm — không sợ thất lạc như sổ giấy.",
    initials: "GH",
    name: "Gia Huy & Cẩm Tú",
    tag: "Mẫu Sweet Sakura",
  },
];

function TestimonialCard({ q }: { q: QuoteItem }) {
  return (
    <div className="mx-3 flex h-full w-[320px] shrink-0 flex-col rounded-[20px] border-t-[3px] border-winglove-gold bg-winglove-surface-sunken p-7 sm:w-[360px]">
      <p className="mb-[18px] font-wg-display text-[1.1rem] italic leading-[1.55] text-winglove-ink">
        {q.msg}
      </p>
      <div className="mt-auto flex items-center gap-3">
        <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-winglove-red font-wg-body text-[0.8rem] font-extrabold text-white">
          {q.initials}
        </span>
        <div>
          <strong className="block text-[0.9rem] font-semibold text-winglove-ink">
            {q.name}
          </strong>
          <small className="text-[0.78rem] text-winglove-ink-soft">{q.tag}</small>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: QuoteItem[]; direction: "left" | "right" }) {
  // Nhân đôi danh sách để tạo vòng lặp liền mạch (track dịch đúng -50%).
  const doubled = [...items, ...items];
  return (
    <div className="wg-marquee-row overflow-hidden">
      <div
        className={cn(
          "wg-marquee-track py-2",
          direction === "left" ? "wg-marquee-track--left" : "wg-marquee-track--right"
        )}
      >
        {doubled.map((q, i) => (
          <TestimonialCard key={`${q.name}-${i}`} q={q} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-14 pb-8 md:py-16">
      <BgIcon
        icon={Quote}
        size={170}
        className="-right-6 top-0 hidden text-winglove-gold/[0.07] lg:block"
      />
      <div className="relative flex flex-col gap-5">
        <MarqueeRow items={ROW_A} direction="left" />
        <MarqueeRow items={ROW_B} direction="right" />
      </div>
    </section>
  );
}
