/**
 * Manifest của mọi khối (section) có thể xuất hiện trong thiệp.
 *
 * Đây là nguồn sự thật duy nhất cho nhãn tiếng Việt, mô tả và icon của từng
 * khối — thuần presentational, dùng để hiển thị sidebar editor. Trước đây
 * nhãn nằm rải rác trong `EditWeddingForm` và thiếu một số key (`info`,
 * `timeline`) khiến sidebar hiện slug thô.
 *
 * Không còn khoá section theo gói: mọi section của một template đều dùng
 * được một khi thiệp đã xuất bản — giá được tính theo template
 * (`lib/template-pricing.ts`), không theo section nào đang bật.
 */
export type SectionDef = {
  key: string;
  /** Nhãn hiển thị ở sidebar editor. */
  label: string;
  /** Mô tả ngắn hiện dưới nhãn, giúp người dùng biết khối đó là gì. */
  description: string;
  /** Tên icon lucide-react. */
  icon: string;
  /** Khối bắt buộc — không cho tắt (thiệp luôn cần đầu trang & chân trang). */
  required?: boolean;
};

export const SECTIONS: Record<string, SectionDef> = {
  // ---------- Khối cơ bản ----------
  header: {
    key: "header",
    label: "Đầu trang",
    description: "Ảnh bìa và tên cô dâu chú rể",
    icon: "Image",
    required: true,
  },
  "card-opening": {
    key: "card-opening",
    label: "Mở thiệp",
    description: "Hiệu ứng mở thiệp khi khách vào trang",
    icon: "Sparkles",
  },
  "wedding-info": {
    key: "wedding-info",
    label: "Thông tin cặp đôi",
    description: "Họ tên, cha mẹ hai bên, ngày giờ tổ chức",
    icon: "Users",
    required: true,
  },
  // Autumn Watercolor dùng key `info` thay cho `wedding-info`
  info: {
    key: "info",
    label: "Thông tin cặp đôi",
    description: "Họ tên, cha mẹ hai bên, ngày giờ tổ chức",
    icon: "Users",
    required: true,
  },
  footer: {
    key: "footer",
    label: "Chân trang",
    description: "Lời cảm ơn và thông tin cuối thiệp",
    icon: "AlignEndHorizontal",
    required: true,
  },
  wishes: {
    key: "wishes",
    label: "Lời chúc",
    description: "Khách để lại lời chúc mừng cho cặp đôi",
    icon: "MessageCircleHeart",
  },

  // ---------- Khối nâng cao ----------
  countdown: {
    key: "countdown",
    label: "Đếm ngược",
    description: "Đồng hồ đếm ngược tới ngày cưới",
    icon: "Timer",
  },
  quote: {
    key: "quote",
    label: "Lời mời",
    description: "Câu trích dẫn hoặc lời mời trân trọng",
    icon: "Quote",
  },
  location: {
    key: "location",
    label: "Địa điểm",
    description: "Địa chỉ tiệc cưới kèm bản đồ chỉ đường",
    icon: "MapPin",
  },
  rsvp: {
    key: "rsvp",
    label: "Xác nhận tham dự",
    description: "Khách xác nhận có tới dự hay không (RSVP)",
    icon: "ClipboardCheck",
  },

  // ---------- Khối cao cấp ----------
  gallery: {
    key: "gallery",
    label: "Bộ ảnh",
    description: "Album ảnh cưới dạng lưới hoặc trình chiếu",
    icon: "Images",
  },
  gifting: {
    key: "gifting",
    label: "Mừng cưới",
    description: "Thông tin tài khoản và mã QR nhận mừng cưới",
    icon: "Gift",
  },
  timeline: {
    key: "timeline",
    label: "Lịch trình ngày cưới",
    description: "Các mốc thời gian trong ngày trọng đại",
    icon: "CalendarClock",
  },

  // ---------- Khối riêng của Modern Cinematic ----------
  hero: {
    key: "hero",
    label: "Màn hình mở đầu",
    description: "Ảnh toàn màn hình mở đầu theo phong cách điện ảnh",
    icon: "Clapperboard",
    required: true,
  },
  story: {
    key: "story",
    label: "Câu chuyện tình yêu",
    description: "Kể lại hành trình yêu nhau của hai bạn",
    icon: "BookHeart",
  },
  journey: {
    key: "journey",
    label: "Hành trình",
    description: "Các cột mốc đáng nhớ của cặp đôi",
    icon: "Route",
  },
  invitation: {
    key: "invitation",
    label: "Lời mời trân trọng",
    description: "Trang mời chính thức tới dự lễ cưới",
    icon: "Mail",
  },
  mousetrail: {
    key: "mousetrail",
    label: "Lễ Hằng Thuận",
    description: "Khối ảnh có hiệu ứng vệt chuột nghệ thuật",
    icon: "Wand2",
  },
  carousel: {
    key: "carousel",
    label: "Khoảnh khắc cưới",
    description: "Trình chiếu ảnh dạng băng chuyền",
    icon: "GalleryHorizontal",
  },
  calendar: {
    key: "calendar",
    label: "Lịch cưới tương tác",
    description: "Khối lịch tháng khoanh tròn ngày trọng đại",
    icon: "Calendar",
  },
  proclamation: {
    key: "proclamation",
    label: "Chiếu báo hỷ",
    description: "Thông cáo hôn ước trang trọng",
    icon: "Scroll",
  },
  dresscode: {
    key: "dresscode",
    label: "Gợi ý trang phục",
    description: "Bảng mã màu trang phục (Dress Code) dành cho khách mời",
    icon: "Palette",
  },
  programme: {
    key: "programme",
    label: "Chương trình dạ tiệc",
    description: "Lịch trình dạ hội và tiệc mừng chi tiết",
    icon: "Clock",
  },
  letter: {
    key: "letter",
    label: "Bức thư tình",
    description: "Lời nhắn gửi trang trọng tới khách mời",
    icon: "Mail",
  },
  journal: {
    key: "journal",
    label: "Nhật ký tình yêu",
    description: "Trang nhật ký kể lại câu chuyện của cặp đôi",
    icon: "BookHeart",
  },
  vippass: {
    key: "vippass",
    label: "Vé mời VIP",
    description: "Vé mời dạ tiệc phong cách vé VIP",
    icon: "Ticket",
  },
};

/** Fallback cho key lạ để UI không bao giờ hiện slug thô. */
export function getSectionDef(key: string): SectionDef {
  return (
    SECTIONS[key] ?? {
      key,
      label: key,
      description: "",
      icon: "Square",
    }
  );
}

export function isSectionRequired(key: string): boolean {
  return getSectionDef(key).required === true;
}
