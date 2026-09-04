/**
 * Định nghĩa template dùng chung cho cả hai seeder:
 *   - `prisma/seed.ts`      (npm run db:seed)
 *   - `scripts/seed-docker.cjs` (chạy khi start container)
 *
 * Đồng thời phục vụ cho endpoint 1-click sync template từ Registry vào DB trong Admin:
 *   - `app/api/admin/templates/sync/route.ts`
 *
 * Dùng CommonJS để `seed-docker.cjs` require được trực tiếp.
 * QUY TẮC: mọi slug ở đây PHẢI có trong `lib/template-registry.ts`.
 *
 * `price`: giá xuất bản cố định (VND), admin sửa trực tiếp trong dashboard sau khi seed.
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
  {
    name: "Minimal Korean",
    slug: "minimal-korean",
    description:
      "Phong cách tối giản Hàn Quốc, tinh tế, trang nhã với tone màu be và font chữ thanh lịch.",
    thumbnail: "/templates/minimal-korean-preview.png",
    category: "minimal",
    isPremium: true,
    minPlan: "BASIC",
    price: 500000,
    config: {
      sections: [
        "header",
        "info",
        "calendar",
        "timeline",
        "countdown",
        "gallery",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#2C3E50",
        accent: "#B39D82",
        background: "#FAF9F5",
      },
    },
  },
  {
    name: "Luxury Royal Gold",
    slug: "luxury-royal-gold",
    description:
      "Thiệp cưới phong cách hoàng gia quý phái với họa tiết nhũ vàng gold và sắc đỏ ruby thượng lưu.",
    thumbnail: "/templates/luxury-royal-gold-preview.png",
    category: "luxury",
    isPremium: true,
    minPlan: "BASIC",
    price: 1000000,
    config: {
      sections: [
        "header",
        "proclamation",
        "info",
        "timeline",
        "countdown",
        "gallery",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#8B0000",
        accent: "#E5A93C",
        background: "#FFFDF9",
      },
    },
  },
  {
    name: "Vintage Botanical",
    slug: "vintage-botanical",
    description:
      "Thiệp cưới phong cách thực vật thảo mộc cổ điển, sắc xanh sage thanh tao và hòa hợp với thiên nhiên.",
    thumbnail: "/templates/vintage-botanical-preview.png",
    category: "vintage",
    isPremium: true,
    minPlan: "BASIC",
    price: 500000,
    config: {
      sections: [
        "header",
        "info",
        "timeline",
        "dresscode",
        "countdown",
        "gallery",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#3D5A45",
        accent: "#8A9A5B",
        background: "#F8FAF6",
      },
    },
  },
  {
    name: "Boho Terracotta",
    slug: "boho-terracotta",
    description:
      "Phong cách Bohemian phóng khoáng với mái vòm terracotta ấm áp, cỏ lau và hoàng hôn lãng mạn.",
    thumbnail: "/templates/boho-terracotta-preview.png",
    category: "modern",
    isPremium: true,
    minPlan: "BASIC",
    price: 500000,
    config: {
      sections: [
        "header",
        "journey",
        "info",
        "dresscode",
        "countdown",
        "gallery",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#C25E42",
        accent: "#DDA15E",
        background: "#FDF8F5",
      },
    },
  },
  {
    name: "Sweet Sakura",
    slug: "sweet-sakura",
    description:
      "Thiệp cưới tone hồng phấn hoa anh đào ngọt ngào, bay bổng và đầy cảm xúc tình yêu đôi lứa.",
    thumbnail: "/templates/sweet-sakura-preview.png",
    category: "classic",
    isPremium: true,
    minPlan: "BASIC",
    price: 500000,
    config: {
      sections: [
        "header",
        "story",
        "info",
        "countdown",
        "gallery",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#E05A7A",
        accent: "#F8B4C4",
        background: "#FFF7F9",
      },
    },
  },
  {
    name: "Emerald Glamour",
    slug: "emerald-glamour",
    description:
      "Phong cách tiệc đêm lộng lẫy Art Deco với tone ngọc lục bảo sâu lắng và viền hoàng kim quyền quý.",
    thumbnail: "/templates/emerald-glamour-preview.png",
    category: "luxury",
    isPremium: true,
    minPlan: "BASIC",
    price: 1000000,
    config: {
      sections: [
        "header",
        "info",
        "programme",
        "dresscode",
        "countdown",
        "gallery",
        "wishes",
        "gifting",
        "footer",
      ],
      defaultColors: {
        primary: "#0E3B2E",
        accent: "#D4AF37",
        background: "#F7FAF8",
      },
    },
  },
];

module.exports = { TEMPLATE_DEFS };
