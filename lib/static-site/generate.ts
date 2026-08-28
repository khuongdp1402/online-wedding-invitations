import { execFile } from "child_process";
import { promisify } from "util";
import { mkdir, writeFile, rm, readFile, rename, readdir, copyFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { toWeddingData } from "@/lib/wedding-data";
import { resolveTemplateFonts } from "@/lib/template-fonts";
import { isAstroEligibleTemplate } from "./eligibility";
import { getStaticSiteHtmlPath, getStaticSiteSlugDir } from "./paths";
import type { StaticSiteInput } from "./types";

const execFileAsync = promisify(execFile);

const ASTRO_PROJECT_DIR = path.join(process.cwd(), "astro-templates");
const BUILD_TMP_DIR = path.join(ASTRO_PROJECT_DIR, ".build-tmp");
// Đích cố định, dùng chung cho MỌI wedding — Next tự phục vụ static files
// trong public/ nên không cần route riêng. An toàn để gộp qua nhiều lần
// build: tên file là content-hash do Astro sinh (vd CountdownIsland.Db_h...js)
// và island component có cùng source code giữa mọi wedding, nên cùng nội
// dung luôn ra cùng tên — ghi đè là vô hại, không tích luỹ rác.
const PUBLIC_ASSETS_DIR = path.join(
  process.cwd(),
  "public",
  "static-wedding-assets"
);

// Nhiều publish đồng thời (giờ cao điểm) không nên cạnh tranh CPU không giới
// hạn với server chính — giới hạn số lần `astro build` chạy song song.
const MAX_CONCURRENT_BUILDS = 2;
let activeBuilds = 0;
const buildQueue: (() => void)[] = [];

async function withBuildSlot<T>(fn: () => Promise<T>): Promise<T> {
  if (activeBuilds >= MAX_CONCURRENT_BUILDS) {
    await new Promise<void>((resolve) => buildQueue.push(resolve));
  }
  activeBuilds++;
  try {
    return await fn();
  } finally {
    activeBuilds--;
    const next = buildQueue.shift();
    if (next) next();
  }
}

/**
 * Build 1 trang qua `astro build` thật (không phải Container API — nó cần
 * 1 Vite server đầy đủ để compile .astro, không chạy được từ 1 script Node
 * đơn thuần). Input được ghi ra file JSON tạm, `src/pages/index.astro` tự
 * đọc lại lúc build qua biến môi trường ASTRO_STATIC_INPUT_PATH.
 * `--outDir` riêng theo mỗi lần gọi để build song song (groom/bride, hoặc
 * nhiều wedding cùng lúc) không đụng độ nhau trên cùng thư mục output.
 */
async function buildOneMode(slug: string, input: StaticSiteInput): Promise<void> {
  const buildId = `${slug}-${input.mode}-${process.pid}-${Date.now()}`;
  const inputPath = path.join(BUILD_TMP_DIR, `${buildId}.json`);
  const outDir = path.join(BUILD_TMP_DIR, `${buildId}-dist`);
  const outPath = getStaticSiteHtmlPath(slug, input.mode);

  await mkdir(BUILD_TMP_DIR, { recursive: true });
  await writeFile(inputPath, JSON.stringify(input), "utf-8");

  try {
    await withBuildSlot(() =>
      execFileAsync(
        process.execPath,
        [
          // Gọi thẳng entry point .js của package `astro`, không qua
          // node_modules/.bin/astro — trên Windows đó là 1 script bash
          // (shebang #!/usr/bin/env node) mà `node <file>` không parse được.
          path.join(ASTRO_PROJECT_DIR, "node_modules", "astro", "astro.js"),
          "build",
          "--outDir",
          outDir,
        ],
        {
          cwd: ASTRO_PROJECT_DIR,
          env: { ...process.env, ASTRO_STATIC_INPUT_PATH: inputPath },
          maxBuffer: 1024 * 1024 * 20,
        }
      )
    );

    const html = await readFile(path.join(outDir, "index.html"), "utf-8");
    await mkdir(path.dirname(outPath), { recursive: true });
    const tmpOutPath = `${outPath}.${buildId}.tmp`;
    await writeFile(tmpOutPath, html, "utf-8");
    await rename(tmpOutPath, outPath);

    // Copy JS island (build.assets = "static-wedding-assets" trong
    // astro.config.mjs) sang public/ để Next tự serve — Astro không cho
    // inline JS của <astro-island>, chỉ CSS inline được (đã bật ở config).
    const assetsSrcDir = path.join(outDir, "static-wedding-assets");
    await mkdir(PUBLIC_ASSETS_DIR, { recursive: true });
    const assetFiles = await readdir(assetsSrcDir).catch(() => [] as string[]);
    await Promise.all(
      assetFiles.map((file) =>
        copyFile(path.join(assetsSrcDir, file), path.join(PUBLIC_ASSETS_DIR, file))
      )
    );
  } finally {
    await rm(inputPath, { force: true });
    await rm(outDir, { recursive: true, force: true });
  }
}

/**
 * Build lại HTML tĩnh (groom + bride) cho 1 wedding, nếu template của nó đã
 * được port sang Astro (`isAstroEligibleTemplate`). Tự query DB mới nhất —
 * không nhận data truyền tay — nên idempotent: gọi lại nhiều lần an toàn.
 *
 * Gọi hàm này SAU KHI transaction Prisma đã commit (không await bên trong
 * `tx`), luôn fire-and-forget (`.catch(console.error)`) ở nơi gọi — lỗi build
 * không được rollback DB hay chặn response về client.
 */
export async function generateStaticWeddingSite(weddingId: string): Promise<void> {
  const wedding = await prisma.wedding.findUnique({
    where: { id: weddingId },
    include: { template: true },
  });
  if (!wedding) return;
  if (!isAstroEligibleTemplate(wedding.template.slug)) return;

  const weddingData = toWeddingData(wedding);
  const fonts = resolveTemplateFonts(weddingData);

  const modes: Array<"groom" | "bride"> = ["groom", "bride"];
  await Promise.all(
    modes.map((mode) =>
      buildOneMode(wedding.slug, {
        wedding: weddingData,
        templateSlug: wedding.template.slug,
        mode,
        googleFontsUrl: fonts.googleFontsUrl,
        headingFont: fonts.headingFont,
        bodyFont: fonts.bodyFont,
        scriptFont: fonts.scriptFont,
      })
    )
  );
}

/** Xoá HTML tĩnh của 1 wedding — gọi khi wedding bị xoá (Giai đoạn 3). */
export async function deleteStaticWeddingSite(slug: string): Promise<void> {
  await rm(getStaticSiteSlugDir(slug), { recursive: true, force: true });
}
