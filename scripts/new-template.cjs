/**
 * Scaffold 1 template mới: copy cấu trúc từ baseline (autumn-watercolor —
 * template đơn giản nhất hiện có), đăng ký entry vào lib/template-registry.ts
 * và prisma/template-defs.cjs.
 *
 * Chạy: npm run new-template -- <slug> "<Ten hien thi>"
 *
 * CHỈ tự động hoá phần "tạo đúng cấu trúc + đăng ký đúng chỗ" — KHÔNG tự
 * động sửa nội dung/màu sắc/thiết kế thật bên trong từng section, và KHÔNG
 * tự động cấu hình image slots (lib/wedding-image-slots.ts) — xem hướng dẫn
 * in ra cuối script và docs/new-template-checklist.md.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BASELINE_SLUG = "autumn-watercolor";
const BASELINE_DIR = path.join(ROOT, "components", "templates", BASELINE_SLUG);
const REGISTRY_FILE = path.join(ROOT, "lib", "template-registry.ts");
const DEFS_FILE = path.join(ROOT, "prisma", "template-defs.cjs");

function fail(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function toPascalCase(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function main() {
  const [, , slugArg, displayNameArg] = process.argv;

  if (!slugArg || !displayNameArg) {
    console.log(
      '\nCách dùng: npm run new-template -- <slug> "<Tên hiển thị>"\n' +
        'Ví dụ:    npm run new-template -- luxury-rose "Luxury Rose"\n'
    );
    process.exit(1);
  }

  const slug = slugArg.trim();
  const displayName = displayNameArg.trim();

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(`Slug "${slug}" không hợp lệ — chỉ chấp nhận kebab-case (vd: luxury-rose).`);
  }

  // --- Bước b: kiểm tra trùng ---
  const registrySrc = fs.readFileSync(REGISTRY_FILE, "utf-8");
  if (registrySrc.includes(`"${slug}":`)) {
    fail(`Slug "${slug}" đã tồn tại trong lib/template-registry.ts.`);
  }

  const targetDir = path.join(ROOT, "components", "templates", slug);
  if (fs.existsSync(targetDir)) {
    fail(
      `Thư mục components/templates/${slug}/ đã tồn tại — huỷ để tránh ghi đè code đang dở. ` +
        `Xoá thư mục đó trước nếu chắc chắn muốn tạo lại.`
    );
  }

  // --- Bước c: copy cấu trúc từ baseline ---
  fs.cpSync(BASELINE_DIR, targetDir, { recursive: true });

  const oldCssPath = path.join(targetDir, `${BASELINE_SLUG}.css`);
  const newCssPath = path.join(targetDir, `${slug}.css`);
  if (fs.existsSync(oldCssPath)) {
    fs.renameSync(oldCssPath, newCssPath);
  }

  const componentName = toPascalCase(slug) + "Template";
  const indexPath = path.join(targetDir, "index.tsx");
  let indexSrc = fs.readFileSync(indexPath, "utf-8");
  indexSrc = indexSrc
    .replaceAll(`./${BASELINE_SLUG}.css`, `./${slug}.css`)
    .replace(/export default function \w+/, `export default function ${componentName}`);
  fs.writeFileSync(indexPath, indexSrc, "utf-8");

  // Thêm TODO nhắc ở đầu mỗi file .tsx vừa copy — KHÔNG tự sửa nội
  // dung/JSX bên trong, chỉ nhắc người viết code cần tuỳ chỉnh.
  const todoComment =
    `// TODO: đây là bản copy từ template "${BASELINE_SLUG}" — ` +
    `cần tuỳ chỉnh nội dung/màu sắc/text thật cho template "${slug}".\n`;
  for (const file of fs.readdirSync(targetDir)) {
    if (!file.endsWith(".tsx")) continue;
    const filePath = path.join(targetDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    fs.writeFileSync(filePath, todoComment + content, "utf-8");
  }

  // --- Bước d: đăng ký vào lib/template-registry.ts ---
  const dynamicAnchor =
    `const AutumnWatercolorTemplate = dynamic(\n` +
    `  () => import("@/components/templates/autumn-watercolor"),\n` +
    `  { ssr: false }\n` +
    `);`;
  if (!registrySrc.includes(dynamicAnchor)) {
    fail(
      "Không tìm thấy anchor để chèn dynamic import trong lib/template-registry.ts — " +
        "có thể file đã đổi cấu trúc. Cần sửa tay thay vì dùng script."
    );
  }
  const dynamicVarName = toPascalCase(slug) + "Template";
  const newDynamicBlock =
    `\n\nconst ${dynamicVarName} = dynamic(\n` +
    `  () => import("@/components/templates/${slug}"),\n` +
    `  { ssr: false }\n` +
    `);`;

  const templatesAnchor = `getTemplate(slug: string): TemplateConfig | undefined`;
  // Anchor để chèn object mới: ngay trước dấu đóng object `templates`,
  // xác định bằng chuỗi "};\n\n// ==================== Registry Helpers"
  const closeTemplatesAnchor = `};\n\n// ==================== Registry Helpers`;
  if (!registrySrc.includes(closeTemplatesAnchor)) {
    fail(
      "Không tìm thấy anchor để chèn entry template mới trong lib/template-registry.ts — " +
        "có thể file đã đổi cấu trúc. Cần sửa tay thay vì dùng script."
    );
  }

  const newTemplateEntry =
    `  "${slug}": {\n` +
    `    id: "${slug}",\n` +
    `    name: "${displayName}",\n` +
    `    slug: "${slug}",\n` +
    `    description: "TODO: mô tả template ${displayName}.",\n` +
    `    thumbnail: "/templates/${slug}-preview.png",\n` +
    `    category: "classic",\n` +
    `    isPremium: true,\n` +
    `    minPlan: "BASIC",\n` +
    `    component: ${dynamicVarName} as ComponentType<WeddingTemplateProps>,\n` +
    `    defaultColors: {\n` +
    `      primary: "#000000",\n` +
    `      accent: "#000000",\n` +
    `      background: "#ffffff",\n` +
    `    },\n` +
    `    sections: ["header", "info", "gallery", "wishes", "footer"], // TODO: khớp đúng section thật\n` +
    `    imageSlots: [], // TODO: cấu hình trong lib/wedding-image-slots.ts nếu template cần gallery\n` +
    `    textSlots: [],\n` +
    `    albumStartIndex: 0, // TODO: cấu hình cùng imageSlots nếu cần\n` +
    `  },\n`;

  let newRegistrySrc = registrySrc.replace(
    dynamicAnchor,
    dynamicAnchor + newDynamicBlock
  );
  newRegistrySrc = newRegistrySrc.replace(
    closeTemplatesAnchor,
    `${newTemplateEntry}};\n\n// ==================== Registry Helpers`
  );
  fs.writeFileSync(REGISTRY_FILE, newRegistrySrc, "utf-8");

  // --- Bước e: đăng ký vào prisma/template-defs.cjs ---
  const defsSrc = fs.readFileSync(DEFS_FILE, "utf-8");
  const defsCloseAnchor = "];\n\nmodule.exports = { TEMPLATE_DEFS };";
  if (!defsSrc.includes(defsCloseAnchor)) {
    fail(
      "Không tìm thấy anchor để chèn entry template mới trong prisma/template-defs.cjs — " +
        "có thể file đã đổi cấu trúc. Cần sửa tay thay vì dùng script."
    );
  }
  const newDefEntry =
    `  {\n` +
    `    name: "${displayName}",\n` +
    `    slug: "${slug}",\n` +
    `    description: "TODO: mô tả template ${displayName}.",\n` +
    `    thumbnail: "/templates/${slug}-preview.png",\n` +
    `    category: "classic",\n` +
    `    isPremium: true,\n` +
    `    minPlan: "BASIC",\n` +
    `    price: 500000, // TODO: đặt giá thật\n` +
    `    config: {\n` +
    `      sections: ["header", "info", "gallery", "wishes", "footer"], // TODO: khớp đúng section thật\n` +
    `      defaultColors: {\n` +
    `        primary: "#000000",\n` +
    `        accent: "#000000",\n` +
    `        background: "#ffffff",\n` +
    `      },\n` +
    `    },\n` +
    `  },\n`;
  const newDefsSrc = defsSrc.replace(
    defsCloseAnchor,
    `${newDefEntry}];\n\nmodule.exports = { TEMPLATE_DEFS };`
  );
  fs.writeFileSync(DEFS_FILE, newDefsSrc, "utf-8");

  // --- Bước f: hướng dẫn tiếp theo ---
  console.log(`\n✅ Đã tạo template "${slug}" (${displayName})\n`);
  console.log("Đã tự động làm:");
  console.log(`  - Tạo components/templates/${slug}/ (copy từ ${BASELINE_SLUG})`);
  console.log(`  - Đăng ký entry trong lib/template-registry.ts`);
  console.log(`  - Đăng ký entry trong prisma/template-defs.cjs`);
  console.log("\nCần làm tay tiếp theo:");
  console.log(`  1. Sửa nội dung/màu sắc/text thật trong từng file .tsx đã sinh (có TODO đánh dấu).`);
  console.log(`  2. Thêm ảnh preview vào public/templates/${slug}-preview.png`);
  console.log(
    `  3. ⚠️  QUAN TRỌNG — nếu template có gallery: PHẢI tự sửa lib/wedding-image-slots.ts ` +
      `(thêm hằng số slot mới + thêm nhánh mới trong hàm galleryIndexForSlotKey). ` +
      `Đây là bước KHÔNG được tự động hoá và là lỗi dễ quên nhất — xem lịch sử comment trong ` +
      `prisma/template-defs.cjs. Kiểm tra kỹ trước khi seed.`
  );
  console.log(`  4. Sửa lại sections/imageSlots/defaultColors trong 2 file vừa đăng ký cho khớp thiết kế thật.`);
  console.log(`  5. Chạy: npm run db:seed\n`);
}

main();
