import { PrismaClient, Plan } from "@prisma/client";
import bcrypt from "bcryptjs";

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

  // Xóa các template cũ
  console.log("🧹 Clearing old templates...");
  await prisma.template.deleteMany({});
  
  // Tạo 2 template chuẩn mới
  console.log("📝 Creating standard templates...");
  
  const classicElegance = await prisma.template.create({
    data: {
      name: "Classic Elegance",
      slug: "classic-elegance",
      description: "Thiệp cưới mang phong cách truyền thống Việt Nam, tông màu đỏ burgundy & vàng gold thanh lịch.",
      thumbnail: "/templates/template1-preview.png",
      category: "classic",
      isPremium: false,
      minPlan: Plan.FREE,
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
  });

  const modernCinematic = await prisma.template.create({
    data: {
      name: "Modern Cinematic",
      slug: "modern-cinematic",
      description: "Thiệp cưới cuộn 3D hiện đại, hiệu ứng điện ảnh và kể chuyện tinh tế.",
      thumbnail: "/templates/template2-preview.png",
      category: "modern",
      isPremium: true,
      minPlan: Plan.STANDARD,
      config: {
        sections: [
          "hero",
          "story",
          "journey",
          "invitation",
          "gallery",
          "rsvp",
        ],
        defaultColors: {
          primary: "#111111",
          accent: "#f5f1ea",
          background: "#000000",
        },
      },
    },
  });

  console.log("✅ Templates seeded:", {
    classicElegance: classicElegance.id,
    modernCinematic: modernCinematic.id,
  });

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
