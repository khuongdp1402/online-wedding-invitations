/**
 * Seed chạy trong Docker khi start: tạo admin + templates.
 * Chạy: node scripts/seed-docker.cjs (cần DATABASE_URL)
 */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { randomBytes } = require("node:crypto");
const { TEMPLATE_DEFS } = require("../prisma/template-defs.cjs");

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";

// Không dùng mật khẩu mặc định cố định: lấy từ env ADMIN_PASSWORD,
// nếu không có thì sinh ngẫu nhiên (chỉ in ra 1 lần khi tạo admin mới).
function resolveAdminPassword() {
  const fromEnv = process.env.ADMIN_PASSWORD;
  if (fromEnv) return { password: fromEnv, generated: false };
  return { password: randomBytes(18).toString("base64url"), generated: true };
}

async function main() {
  console.log("[Docker] Seeding database...");

  const existingAdmin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  if (!existingAdmin) {
    const { password, generated } = resolveAdminPassword();
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        name: "Admin",
        password: hashed,
        role: "ADMIN",
      },
    });
    if (generated) {
      console.log("[Docker] Admin created:", ADMIN_EMAIL);
      console.log(
        "[Docker] Mật khẩu admin sinh ngẫu nhiên (chỉ hiển thị 1 lần, hãy lưu lại):",
        password
      );
    } else {
      console.log("[Docker] Admin created:", ADMIN_EMAIL, "| Password: (lấy từ ADMIN_PASSWORD)");
    }
  } else {
    // Không bao giờ ghi đè mật khẩu admin đã có, chỉ đảm bảo role ADMIN
    await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: { role: "ADMIN" },
    });
    console.log("[Docker] Admin exists:", ADMIN_EMAIL);
  }

  const templates = TEMPLATE_DEFS;
  const seededRecords = {};

  for (const t of templates) {
    const record = await prisma.template.upsert({
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
    seededRecords[t.slug] = record;
  }

  // Keep only the 2 active flagship templates in the DB; reassign any weddings using legacy templates
  const activeSlugs = templates.map((t) => t.slug);
  const legacyTemplates = await prisma.template.findMany({
    where: { slug: { notIn: activeSlugs } },
  });

  if (legacyTemplates.length > 0 && seededRecords["classic-elegance"]) {
    for (const oldTpl of legacyTemplates) {
      const targetId =
        oldTpl.slug === "song-hy-red" && seededRecords["song-hy-do"]
          ? seededRecords["song-hy-do"].id
          : seededRecords["classic-elegance"].id;
      await prisma.wedding.updateMany({
        where: { templateId: oldTpl.id },
        data: { templateId: targetId },
      });
      await prisma.template.delete({ where: { id: oldTpl.id } });
    }
  }

  console.log("[Docker] Templates seeded. Done.");
}

main()
  .catch((e) => {
    console.error("[Docker] Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
