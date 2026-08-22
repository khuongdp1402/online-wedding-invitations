/**
 * Seed chạy trong Docker khi start: tạo admin + templates.
 * Chạy: node scripts/seed-docker.cjs (cần DATABASE_URL)
 */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { TEMPLATE_DEFS } = require("../prisma/template-defs.cjs");

const prisma = new PrismaClient();

// Cho phép override qua env để không dùng tài khoản mặc định trên môi trường thật.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";

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

  const templates = TEMPLATE_DEFS;

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
        price: t.price,
        salePrice: t.salePrice ?? null,
        saleStartsAt: t.saleStartsAt ?? null,
        saleEndsAt: t.saleEndsAt ?? null,
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
