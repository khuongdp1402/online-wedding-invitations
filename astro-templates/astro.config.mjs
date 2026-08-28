import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// output "static": build ra file .html thuần, không server adapter — đúng
// với quyết định kiến trúc "build-time generation, không render-per-request".
export default defineConfig({
  output: "static",
  integrations: [react(), tailwind()],
  build: {
    // HTML phải gần như tự chứa: CSS inline (không cần asset riêng), nhưng
    // JS của mỗi <astro-island> (client:*) BẮT BUỘC là file riêng (Astro
    // không cho inline component JS) — Next.js phải serve chúng qua
    // public/static-wedding-assets/ (xem generate.ts, copy sau mỗi build).
    // Đặt tên thư mục riêng biệt, không dùng mặc định "_astro", để rõ ràng
    // đây là asset của hệ thống static-site, tách khỏi asset Next tự quản.
    assets: "static-wedding-assets",
    inlineStylesheets: "always",
  },
  vite: {
    resolve: {
      alias: {
        // Dùng chung type/hàm thuần (lib/section-config, lib/wedding-image-slots,
        // lib/classic-burgundy-sample-gallery, types/template...) với project
        // Next.js gốc — không duplicate.
        "@": projectRoot,
      },
    },
  },
});
