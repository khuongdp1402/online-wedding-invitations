import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { TEMPLATE_DEFS } from "./template-defs.cjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin@123";

async function main() {
  console.log("🌱 Seeding database...");

  // Tạo user admin toàn quyền (để test)
  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });
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
    console.log("✅ Admin user created:", ADMIN_EMAIL, "| Password:", ADMIN_PASSWORD);
  } else {
    // Đảm bảo user có role ADMIN
    await prisma.user.update({
      where: { email: ADMIN_EMAIL },
      data: { role: "ADMIN" },
    });
    console.log("✅ Admin user already exists, role set to ADMIN:", ADMIN_EMAIL);
  }

  // Upsert templates theo slug (an toàn với Wedding đang tham chiếu templateId)
  console.log("📝 Upserting templates...");

  // Định nghĩa dùng chung với scripts/seed-docker.cjs.
  // File .cjs không mang theo kiểu enum Plan nên ép kiểu tại đây;
  // lib/template-defs.test.ts kiểm tra mọi mẫu đều có price > 0.
  const templateDefs =
    TEMPLATE_DEFS as (Prisma.TemplateCreateInput & { slug: string })[];

  const results: Record<string, string> = {};
  for (const def of templateDefs) {
    const { slug, ...data } = def;
    const template = await prisma.template.upsert({
      where: { slug },
      create: { slug, ...data },
      update: data,
    });
    results[slug] = template.id;
  }

  console.log("✅ Templates seeded:", results);

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
