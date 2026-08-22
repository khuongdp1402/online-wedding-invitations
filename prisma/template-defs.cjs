/**
 * Định nghĩa template dùng chung cho cả hai seeder:
 *   - `prisma/seed.ts`      (npm run db:seed)
 *   - `scripts/seed-docker.cjs` (chạy khi start container)
 *
 * Trước đây hai file tự khai riêng và đã lệch nhau: bản Docker seed 5 mẫu
 * KHÔNG tồn tại trong `lib/template-registry.ts` (chọn vào là vỡ trang) và
 * thiếu 3 mẫu đang chạy tốt. Giữ một nguồn duy nhất ở đây để không tái diễn.
 *
 * Dùng CommonJS để `seed-docker.cjs` require được trực tiếp.
 * QUY TẮC: mọi slug ở đây PHẢI có trong `lib/template-registry.ts`.
 *
 * `price`: giá xuất bản cố định (VND), admin sửa trực tiếp trong dashboard
 * sau khi seed — giá trị ở đây chỉ là mức khởi tạo ban đầu. Các mức dưới
 * đây được quy đổi tương đương từ hệ gói cũ (BASIC 200k/STANDARD
 * 500k/PREMIUM 1M) theo đúng section nặng nhất mỗi mẫu từng yêu cầu, để giữ
 * giá trị cảm nhận không đổi tại thời điểm chuyển đổi mô hình.
 * `isPremium`/`minPlan`: không còn dùng để khoá section — giữ lại chỉ để
 * tương thích cột cũ trong DB.
 */
const TEMPLATE_DEFS = [
  {
    name: "Classic Elegance",
    slug: "classic-elegance",
    description:
      "Thiệp cưới mang phong cách truyền thống Việt Nam, tông màu đỏ burgundy & vàng gold thanh lịch.",
    thumbnail: "/templates/template1-preview.png",
    category: "classic",
    isPremium: false,
    minPlan: "FREE",
    price: 500000,
    config: {
      sections: [
        "header",
        "wedding-info",
        "countdown",
        "quote",
        "gallery",
        "location",
        "rsvp",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#800020",
        accent: "#d4a853",
        background: "#faf8f5",
      },
    },
  },
  {
    name: "Modern Cinematic",
    slug: "modern-cinematic",
    description:
      "Thiệp cưới cuộn 3D hiện đại, hiệu ứng điện ảnh và kể chuyện tinh tế.",
    thumbnail: "/templates/template2-preview.png",
    category: "modern",
    isPremium: true,
    minPlan: "BASIC",
    price: 1000000,
    config: {
      sections: [
        "hero",
        "story",
        "journey",
        "invitation",
        "mousetrail",
        "carousel",
        "rsvp",
      ],
      defaultColors: {
        primary: "#111111",
        accent: "#f5f1ea",
        background: "#000000",
      },
    },
  },
  {
    name: "Classic Burgundy",
    slug: "classic-burgundy",
    description:
      "Thiệp cưới cổ điển tông burgundy sang trọng, bố cục ảnh nghiêng tinh tế.",
    thumbnail: "/templates/classic-burgundy-preview.png",
    category: "classic",
    isPremium: true,
    minPlan: "BASIC",
    price: 500000,
    config: {
      sections: [
        "header",
        "wedding-info",
        "countdown",
        "quote",
        "gallery",
        "location",
        "wishes",
        "footer",
      ],
      defaultColors: {
        primary: "#800020",
        accent: "#d4a853",
        background: "#FDFBF7",
      },
    },
  },
  {
    name: "Autumn Watercolor",
    slug: "autumn-watercolor",
    description:
      "Thiệp cưới phong cách màu nước mùa thu, ấm áp và lãng mạn với khung ảnh polaroid.",
    thumbnail: "/templates/autumn-watercolor-preview.png",
    category: "vintage",
    isPremium: true,
    minPlan: "BASIC",
    price: 1000000,
    config: {
      sections: [
        "header",
        "info",
        "gallery",
        "timeline",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#b9856f",
        accent: "#422114",
        background: "#f7f1eb",
      },
    },
  },
];

module.exports = { TEMPLATE_DEFS };
