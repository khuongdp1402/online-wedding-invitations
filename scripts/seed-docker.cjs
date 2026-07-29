/**
 * Seed chạy trong Docker khi start: tạo admin + templates.
 * Chạy: node scripts/seed-docker.cjs (cần DATABASE_URL)
 */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin@123";

const Plan = { FREE: "FREE", BASIC: "BASIC", STANDARD: "STANDARD", PREMIUM: "PREMIUM" };

async function main() {
  console.log("[Docker] Seeding database...");

  const existingAdmin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        name: "Admin",
        password: hashed,
        role: "ADMIN",
      },
    });
    console.log("[Docker] Admin created:", ADMIN_EMAIL, "| Password:", ADMIN_PASSWORD);
  } else {
    await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: { role: "ADMIN" },
    });
    console.log("[Docker] Admin exists:", ADMIN_EMAIL);
  }

  const templates = [
    {
      slug: "classic-burgundy",
      name: "Classic Burgundy",
      description: "Thiệp cưới cổ điển tông đỏ burgundy & vàng gold.",
      thumbnail: "/templates/classic-burgundy-preview.jpg",
      category: "classic",
      isPremium: false,
      minPlan: Plan.FREE,
      config: {
        sections: ["card-opening", "header", "wedding-info", "countdown", "quote", "gallery", "location", "wishes", "footer"],
        defaultColors: { primary: "#800020", accent: "#d4a853", background: "#faf8f5" },
      },
    },
    {
      slug: "modern-minimal",
      name: "Modern Minimal",
      description: "Phong cách tối giản hiện đại.",
      thumbnail: "/templates/modern-minimal-preview.jpg",
      category: "modern",
      isPremium: false,
      minPlan: Plan.FREE,
      config: {
        sections: ["header", "wedding-info", "countdown", "gallery", "wishes", "footer"],
        defaultColors: { primary: "#1a1a1a", accent: "#737373", background: "#ffffff" },
      },
    },
    {
      slug: "ivory-crane",
      name: "Ivory Crane",
      description: "Thiệp cưới nền kem tinh tế, card trắng trung tâm và nút Mở thiệp theo phong cách Á Đông hiện đại.",
      thumbnail: "/templates/ivory-crane-preview.svg",
      category: "classic",
      isPremium: false,
      minPlan: Plan.FREE,
      config: {
        sections: ["header", "wedding-info", "quote", "footer"],
        defaultColors: { primary: "#8c2f2f", accent: "#c99b5e", background: "#efe4d5" },
      },
    },
    {
      slug: "vintage-rose",
      name: "Vintage Rose",
      description: "Phong cách vintage ấm áp, màu nâu hồng cổ điển, lãng mạn và đầy đủ section tương tác.",
      thumbnail: "/templates/vintage-rose-preview.svg",
      category: "vintage",
      isPremium: false,
      minPlan: Plan.FREE,
      config: {
        sections: ["header", "wedding-info", "countdown", "quote", "gallery", "location", "rsvp", "wishes", "footer"],
        defaultColors: { primary: "#5e3a2f", accent: "#b9856f", background: "#f7efe5" },
      },
    },
    {
      slug: "garden-romance",
      name: "Garden Romance",
      description: "Hoa lá thiên nhiên, tông xanh lá và hồng pastel.",
      thumbnail: "/templates/garden-romance-preview.jpg",
      category: "classic",
      isPremium: true,
      minPlan: Plan.BASIC,
      config: {
        sections: ["card-opening", "header", "wedding-info", "countdown", "quote", "gallery", "location", "wishes", "footer"],
        defaultColors: { primary: "#2d6a4f", accent: "#f4a7b9", background: "#fef9ef" },
      },
    },
    {
      slug: "royal-gold",
      name: "Royal Gold",
      description: "Sang trọng tông vàng gold và đen.",
      thumbnail: "/templates/royal-gold-preview.jpg",
      category: "luxury",
      isPremium: true,
      minPlan: Plan.STANDARD,
      config: {
        sections: ["card-opening", "header", "wedding-info", "countdown", "quote", "gallery", "location", "wishes", "gifting", "footer"],
        defaultColors: { primary: "#c9a84c", accent: "#1a1a2e", background: "#f8f4e8" },
      },
    },
  ];

  for (const t of templates) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: {
        name: t.name,
        description: t.description,
        thumbnail: t.thumbnail,
        category: t.category,
        isPremium: t.isPremium,
        minPlan: t.minPlan,
        config: t.config,
      },
      create: t,
    });
  }
  console.log("[Docker] Templates seeded. Done.");
}

main()
  .catch((e) => {
    console.error("[Docker] Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
