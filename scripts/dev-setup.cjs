/**
 * Chuẩn bị dữ liệu để test luồng TẠO / SỬA thiệp cưới ở môi trường dev.
 *
 * Chỉ đụng vào DỮ LIỆU, không đổi code — mọi logic chặn theo gói vẫn nguyên vẹn,
 * nên sau này vẫn test đúng được hành vi của gói FREE.
 *
 * Chạy:  node scripts/dev-setup.cjs
 * Hoàn tác: node scripts/dev-setup.cjs --reset   (đưa mọi thiệp về FREE/DRAFT)
 *
 * TỪ CHỐI chạy khi NODE_ENV=production để không lỡ tay nâng gói cho khách thật.
 */
const { PrismaClient } = require("@prisma/client");
const { TEMPLATE_DEFS } = require("../prisma/template-defs.cjs");

const prisma = new PrismaClient();
const OWNER_EMAIL = process.env.DEV_OWNER_EMAIL || "admin@example.com";
const RESET = process.argv.includes("--reset");

/** Dữ liệu mẫu để không phải gõ tay khi test. */
const SAMPLE = {
  groomName: "Thanh Tùng",
  brideName: "Hương Giang",
  groomParents: { father: "Ông Nguyễn Văn Minh", mother: "Bà Trần Thị Lan" },
  brideParents: { father: "Ông Lê Văn Hòa", mother: "Bà Phạm Thị Hạnh" },
  groomCeremony: {
    date: "Chủ nhật, 22/11/2026",
    lunarDate: "13 tháng 10 năm Bính Ngọ",
    ceremonyTime: "10:30",
    receptionTime: "11:30",
    venue: "Trung Tâm Hội Nghị Ánh Dương",
    address: "120 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    googleMapsUrl: "https://maps.google.com/?q=10.7308,106.7218",
  },
  brideCeremony: {
    date: "Thứ bảy, 21/11/2026",
    lunarDate: "12 tháng 10 năm Bính Ngọ",
    ceremonyTime: "08:00",
    receptionTime: "10:30",
    venue: "Tư Gia Nhà Gái",
    address: "25 Lê Lợi, TP. Biên Hòa, Đồng Nai",
    googleMapsUrl: "https://maps.google.com/?q=10.9509,106.8241",
  },
  quote:
    "Cảm ơn bạn đã đến và chứng kiến khoảnh khắc hạnh phúc của chúng mình.",
  gifting: {
    groom: {
      bankName: "Vietcombank",
      accountNumber: "0011001234567",
      accountHolder: "NGUYEN THANH TUNG",
    },
    bride: {
      bankName: "Techcombank",
      accountNumber: "19001234567",
      accountHolder: "LE HUONG GIANG",
    },
  },
};

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.error("[dev-setup] Từ chối chạy khi NODE_ENV=production.");
    process.exit(1);
  }

  const owner = await prisma.user.findUnique({ where: { email: OWNER_EMAIL } });
  if (!owner) {
    console.error(
      `[dev-setup] Không tìm thấy tài khoản ${OWNER_EMAIL}. Chạy 'npm run db:seed' trước.`
    );
    process.exit(1);
  }

  if (RESET) {
    // Chỉ đụng thiệp của tài khoản test, không động vào dữ liệu người khác.
    const r = await prisma.wedding.updateMany({
      where: { userId: owner.id },
      data: { plan: "FREE", status: "DRAFT", paidAt: null, expiresAt: null },
    });
    console.log(
      `[dev-setup] Đã đưa ${r.count} thiệp của ${OWNER_EMAIL} về FREE/DRAFT.`
    );
    return;
  }

  // 1) Nâng mọi thiệp của tài khoản test lên PREMIUM để mở hết các khối.
  const upgraded = await prisma.wedding.updateMany({
    where: { userId: owner.id },
    data: { plan: "PREMIUM" },
  });
  console.log(
    `[dev-setup] Đã nâng ${upgraded.count} thiệp sẵn có của ${OWNER_EMAIL} lên PREMIUM.`
  );

  // 2) Đảm bảo mỗi template đều có sẵn một thiệp PREMIUM để test.
  const templates = await prisma.template.findMany({
    where: { slug: { in: TEMPLATE_DEFS.map((t) => t.slug) } },
  });

  for (const tpl of templates) {
    const slug = `dev-${tpl.slug}`;
    await prisma.wedding.upsert({
      where: { slug },
      update: { plan: "PREMIUM", templateId: tpl.id, userId: owner.id },
      create: {
        slug,
        userId: owner.id,
        templateId: tpl.id,
        plan: "PREMIUM",
        status: "DRAFT",
        gallery: [],
        ...SAMPLE,
      },
    });
    console.log(`  ✓ /w/${slug}  (mẫu ${tpl.slug})`);
  }

  const all = await prisma.wedding.findMany({
    where: { userId: owner.id },
    select: { id: true, slug: true, plan: true, template: { select: { slug: true } } },
    orderBy: { slug: "asc" },
  });

  console.log(`\n[dev-setup] Đăng nhập: ${OWNER_EMAIL}`);
  console.log("[dev-setup] Trang chỉnh sửa:");
  for (const w of all) {
    console.log(
      `  http://localhost:3000/dashboard/weddings/${w.id}/edit   ${w.plan.padEnd(8)} ${w.template.slug}`
    );
  }
  console.log("\n[dev-setup] Tạo thiệp mới: http://localhost:3000/dashboard/weddings/new");
}

main()
  .catch((e) => {
    console.error("[dev-setup] Lỗi:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
