import { PrismaClient, Plan } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default templates
  const classicBurgundy = await prisma.template.upsert({
    where: { slug: "classic-burgundy" },
    update: {},
    create: {
      name: "Classic Burgundy",
      slug: "classic-burgundy",
      description:
        "Thiệp cưới cổ điển tông đỏ burgundy & vàng gold, phong cách Việt Nam truyền thống.",
      thumbnail: "/templates/classic-burgundy-preview.jpg",
      category: "classic",
      isPremium: false,
      minPlan: Plan.FREE,
      config: {
        sections: [
          "card-opening",
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
          background: "#faf8f5",
        },
      },
    },
  });

  const modernMinimal = await prisma.template.upsert({
    where: { slug: "modern-minimal" },
    update: {},
    create: {
      name: "Modern Minimal",
      slug: "modern-minimal",
      description:
        "Phong cách tối giản hiện đại, tông trắng đen thanh lịch.",
      thumbnail: "/templates/modern-minimal-preview.jpg",
      category: "modern",
      isPremium: true,
      minPlan: Plan.STANDARD,
      config: {
        sections: [
          "header",
          "wedding-info",
          "countdown",
          "gallery",
          "wishes",
          "footer",
        ],
        defaultColors: {
          primary: "#1a1a1a",
          accent: "#f5f5f5",
          background: "#ffffff",
        },
      },
    },
  });

  const gardenRomance = await prisma.template.upsert({
    where: { slug: "garden-romance" },
    update: {},
    create: {
      name: "Garden Romance",
      slug: "garden-romance",
      description:
        "Hoa lá thiên nhiên, tông xanh lá nhẹ nhàng và hồng pastel.",
      thumbnail: "/templates/garden-romance-preview.jpg",
      category: "classic",
      isPremium: true,
      minPlan: Plan.BASIC,
      config: {
        sections: [
          "card-opening",
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
          primary: "#2d6a4f",
          accent: "#f4a7b9",
          background: "#fef9ef",
        },
      },
    },
  });

  const royalGold = await prisma.template.upsert({
    where: { slug: "royal-gold" },
    update: {},
    create: {
      name: "Royal Gold",
      slug: "royal-gold",
      description:
        "Sang trọng với tông vàng gold và đen, phong cách hoàng gia.",
      thumbnail: "/templates/royal-gold-preview.jpg",
      category: "luxury",
      isPremium: true,
      minPlan: Plan.STANDARD,
      config: {
        sections: [
          "card-opening",
          "header",
          "wedding-info",
          "countdown",
          "quote",
          "gallery",
          "location",
          "wishes",
          "gifting",
          "footer",
        ],
        defaultColors: {
          primary: "#c9a84c",
          accent: "#1a1a2e",
          background: "#f8f4e8",
        },
      },
    },
  });

  console.log("✅ Templates seeded:", {
    classicBurgundy: classicBurgundy.id,
    modernMinimal: modernMinimal.id,
    gardenRomance: gardenRomance.id,
    royalGold: royalGold.id,
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
