#!/usr/bin/env node
/**
 * Upload asset template tu public/ len MinIO/S3 (bucket rieng cho asset cuoi).
 *
 *   node scripts/upload-assets-to-minio.cjs --dry-run    # chi liet ke, khong goi mang
 *   node scripts/upload-assets-to-minio.cjs              # tao bucket + policy + CORS + upload
 *
 * Tuy chon:
 *   --dry-run          In ke hoach (so file, dung luong theo thu muc), khong can credentials.
 *   --concurrency=N    So upload song song (mac dinh 8).
 *   --force            Upload lai ca object da ton tai cung kich thuoc.
 *   --skip-setup       Bo qua buoc tao bucket / policy / CORS.
 *   --no-dockerignore  Khong tu them thu muc asset vao .dockerignore khi upload xong.
 *
 * Khi upload thanh cong 100% (khong file loi), script tu them cac thu muc asset
 * vao .dockerignore (idempotent) de image Docker khong con chua ~550 MB asset.
 * Sau do server BAT BUOC dat ASSETS_BASE_URL (hoac proxy nginx) — xem docs/MINIO_ASSETS.md.
 *
 * Env (doc tu .env neu co):
 *   ASSETS_S3_ENDPOINT          vd. https://winglove.phukhuong.io.vn
 *   ASSETS_S3_REGION            mac dinh us-east-1
 *   ASSETS_S3_ACCESS_KEY_ID
 *   ASSETS_S3_SECRET_ACCESS_KEY
 *   ASSETS_S3_BUCKET            mac dinh wedding-assets
 *
 * Object key = duong dan tuong doi voi public/ (dau "/"), vd. images/themes/x/hero.webp
 * => URL cong khai: <endpoint>/<bucket>/images/themes/x/hero.webp
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { ASSET_DIRS } = require("./asset-dirs.cjs");

try {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env"), quiet: true });
} catch {
  /* dotenv khong bat buoc */
}

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const CACHE_CONTROL = "public, max-age=31536000, immutable";
const MAX_RETRIES = 4;
const IGNORED_FILES = new Set([".DS_Store", "Thumbs.db", "desktop.ini", ".gitkeep"]);

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function contentTypeFor(file) {
  return CONTENT_TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
}

function parseArgs(argv) {
  const args = { dryRun: false, concurrency: 8, force: false, skipSetup: false, dockerignore: true };
  for (const a of argv) {
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--no-dockerignore") args.dockerignore = false;
    else if (a === "--force") args.force = true;
    else if (a === "--skip-setup") args.skipSetup = true;
    else if (a.startsWith("--concurrency=")) {
      const n = parseInt(a.split("=")[1], 10);
      if (n > 0) args.concurrency = n;
    } else if (a === "--help" || a === "-h") {
      console.log(fs.readFileSync(__filename, "utf8").split("*/")[0]);
      process.exit(0);
    } else {
      console.error(`Tham so khong hop le: ${a}`);
      process.exit(1);
    }
  }
  return args;
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  const units = ["KB", "MB", "GB"];
  let v = n;
  let i = -1;
  do {
    v /= 1024;
    i++;
  } while (v >= 1024 && i < units.length - 1);
  return `${v.toFixed(1)} ${units[i]}`;
}

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_FILES.has(ent.name)) continue;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(abs, out);
    else if (ent.isFile()) out.push(abs);
  }
  return out;
}

/** Danh sach file can upload: [{ dir, abs, key, size, contentType }] */
function collectFiles() {
  const files = [];
  const missing = [];
  for (const dir of ASSET_DIRS) {
    const absDir = path.join(PUBLIC_DIR, dir);
    if (!fs.existsSync(absDir)) {
      missing.push(dir);
      continue;
    }
    for (const abs of walk(absDir, [])) {
      const key = path.relative(PUBLIC_DIR, abs).split(path.sep).join("/");
      files.push({ dir, abs, key, size: fs.statSync(abs).size, contentType: contentTypeFor(abs) });
    }
  }
  return { files, missing };
}

function printPlan(files, missing) {
  const byDir = new Map(ASSET_DIRS.map((d) => [d, { count: 0, bytes: 0 }]));
  const byType = new Map();
  for (const f of files) {
    const d = byDir.get(f.dir);
    d.count++;
    d.bytes += f.size;
    const t = byType.get(f.contentType) || { count: 0, bytes: 0 };
    t.count++;
    t.bytes += f.size;
    byType.set(f.contentType, t);
  }
  console.log("\nThu muc (tuong doi public/):");
  for (const [dir, s] of byDir) {
    const note = missing.includes(dir) ? "  (KHONG TON TAI - bo qua)" : "";
    console.log(`  ${dir.padEnd(28)} ${String(s.count).padStart(6)} file  ${formatBytes(s.bytes).padStart(10)}${note}`);
  }
  console.log("\nContent-Type:");
  for (const [t, s] of [...byType].sort((a, b) => b[1].bytes - a[1].bytes)) {
    console.log(`  ${t.padEnd(32)} ${String(s.count).padStart(6)} file  ${formatBytes(s.bytes).padStart(10)}`);
  }
  const total = files.reduce((n, f) => n + f.size, 0);
  console.log(`\nTong: ${files.length} file, ${formatBytes(total)}`);
  const unknown = files.filter((f) => f.contentType === "application/octet-stream");
  if (unknown.length) {
    console.log(`\nCanh bao: ${unknown.length} file khong ro Content-Type (se dung application/octet-stream), vd:`);
    unknown.slice(0, 5).forEach((f) => console.log(`  ${f.key}`));
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetry(label, fn) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const status = err && err.$metadata && err.$metadata.httpStatusCode;
      // Loi 4xx (tru 408/429) khong retry: sai quyen, sai bucket...
      if (status && status >= 400 && status < 500 && status !== 408 && status !== 429) break;
      if (attempt < MAX_RETRIES) await sleep(500 * 2 ** (attempt - 1));
    }
  }
  throw new Error(`${label}: ${(lastErr && (lastErr.name || lastErr.message)) || lastErr}`);
}

function isNotFound(err) {
  const status = err && err.$metadata && err.$metadata.httpStatusCode;
  return status === 404 || (err && (err.name === "NotFound" || err.name === "NoSuchKey" || err.name === "NoSuchBucket"));
}

function requireEnv() {
  const cfg = {
    endpoint: (process.env.ASSETS_S3_ENDPOINT || "").trim().replace(/\/+$/, ""),
    region: (process.env.ASSETS_S3_REGION || "us-east-1").trim(),
    accessKeyId: (process.env.ASSETS_S3_ACCESS_KEY_ID || "").trim(),
    secretAccessKey: (process.env.ASSETS_S3_SECRET_ACCESS_KEY || "").trim(),
    bucket: (process.env.ASSETS_S3_BUCKET || "wedding-assets").trim(),
  };
  const missing = [];
  if (!cfg.endpoint) missing.push("ASSETS_S3_ENDPOINT");
  if (!cfg.accessKeyId) missing.push("ASSETS_S3_ACCESS_KEY_ID");
  if (!cfg.secretAccessKey) missing.push("ASSETS_S3_SECRET_ACCESS_KEY");
  if (missing.length) {
    console.error(`\nThieu bien moi truong: ${missing.join(", ")} (dat trong .env hoac env shell).`);
    process.exit(1);
  }
  return cfg;
}

async function setupBucket(s3, cmds, cfg) {
  const { bucket } = cfg;
  try {
    await s3.send(new cmds.HeadBucketCommand({ Bucket: bucket }));
    console.log(`Bucket "${bucket}" da ton tai.`);
  } catch (err) {
    if (!isNotFound(err)) throw new Error(`HeadBucket that bai: ${err.name || err.message}`);
    await s3.send(new cmds.CreateBucketCommand({ Bucket: bucket }));
    console.log(`Da tao bucket "${bucket}".`);
  }

  // Anonymous chi duoc GET object theo URL; KHONG cho ListBucket (khong liet ke duoc).
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PublicReadObjects",
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucket}/*`],
      },
    ],
  };
  await s3.send(new cmds.PutBucketPolicyCommand({ Bucket: bucket, Policy: JSON.stringify(policy) }));
  console.log("Da dat bucket policy: anonymous s3:GetObject (khong ListBucket).");

  try {
    await s3.send(
      new cmds.PutBucketCorsCommand({
        Bucket: bucket,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedOrigins: ["*"],
              AllowedMethods: ["GET", "HEAD"],
              AllowedHeaders: ["*"],
              ExposeHeaders: ["ETag", "Content-Length", "Content-Type"],
              MaxAgeSeconds: 86400,
            },
          ],
        },
      })
    );
    console.log("Da dat CORS: GET/HEAD tu moi origin.");
  } catch (err) {
    console.warn(`\nPutBucketCors khong duoc ho tro / bi tu choi (${err.name || err.message}).`);
    console.warn("MinIO cau hinh CORS o muc server (mac dinh cho phep moi origin). Neu font bi chan CORS, chay:");
    console.warn('  mc alias set winglove <ASSETS_S3_ENDPOINT> <ACCESS_KEY> <SECRET_KEY>');
    console.warn('  mc admin config set winglove api cors_allow_origin="*"');
    console.warn("  mc admin service restart winglove");
    console.warn("(hoac dat env MINIO_API_CORS_ALLOW_ORIGIN=* cho container MinIO roi restart)\n");
  }
}

async function runPool(items, concurrency, worker) {
  let next = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      await worker(items[i], i);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { files, missing } = collectFiles();
  const bucketName = (process.env.ASSETS_S3_BUCKET || "wedding-assets").trim();

  console.log(`Nguon: ${PUBLIC_DIR}`);
  console.log(`Bucket dich: ${bucketName}${process.env.ASSETS_S3_ENDPOINT ? ` @ ${process.env.ASSETS_S3_ENDPOINT}` : ""}`);
  printPlan(files, missing);

  if (args.dryRun) {
    console.log("\n--dry-run: khong ket noi mang, khong upload gi.");
    return;
  }
  if (!files.length) {
    console.log("Khong co file nao de upload.");
    return;
  }

  const cfg = requireEnv();
  const cmds = require("@aws-sdk/client-s3");
  const s3 = new cmds.S3Client({
    endpoint: cfg.endpoint,
    region: cfg.region,
    forcePathStyle: true,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  });

  if (!args.skipSetup) await setupBucket(s3, cmds, cfg);

  const stats = { uploaded: 0, uploadedBytes: 0, skipped: 0, failed: [] };
  let done = 0;
  const started = Date.now();

  await runPool(files, args.concurrency, async (f) => {
    try {
      if (!args.force) {
        const head = await withRetry(`HEAD ${f.key}`, async () => {
          try {
            return await s3.send(new cmds.HeadObjectCommand({ Bucket: cfg.bucket, Key: f.key }));
          } catch (err) {
            if (isNotFound(err)) return null;
            throw err;
          }
        });
        if (head && Number(head.ContentLength) === f.size) {
          stats.skipped++;
          return;
        }
      }
      const body = await fs.promises.readFile(f.abs);
      await withRetry(`PUT ${f.key}`, () =>
        s3.send(
          new cmds.PutObjectCommand({
            Bucket: cfg.bucket,
            Key: f.key,
            Body: body,
            ContentType: f.contentType,
            ContentLength: f.size,
            CacheControl: CACHE_CONTROL,
          })
        )
      );
      stats.uploaded++;
      stats.uploadedBytes += f.size;
    } catch (err) {
      stats.failed.push({ key: f.key, error: err.message || String(err) });
    } finally {
      done++;
      if (done % 100 === 0 || done === files.length) {
        console.log(`  ... ${done}/${files.length}`);
      }
    }
  });

  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log("\n=== Tong ket ===");
  console.log(`Da upload : ${stats.uploaded} file (${formatBytes(stats.uploadedBytes)})`);
  console.log(`Bo qua    : ${stats.skipped} file (da ton tai, cung kich thuoc)`);
  console.log(`Loi       : ${stats.failed.length} file`);
  console.log(`Thoi gian : ${secs}s`);
  if (stats.failed.length) {
    stats.failed.slice(0, 20).forEach((f) => console.log(`  - ${f.key}: ${f.error}`));
    if (stats.failed.length > 20) console.log(`  ... va ${stats.failed.length - 20} loi khac`);
    console.log("Chay lai lenh de thu lai cac file loi (file da upload se duoc bo qua).");
    process.exitCode = 1;
  } else {
    console.log(`\nXong. Dat ASSETS_BASE_URL=${cfg.endpoint}/${cfg.bucket} roi restart app.`);
    if (args.dockerignore) updateDockerignore();
  }
}

const DOCKERIGNORE_MARKER = "# Asset template da dua len MinIO (scripts/upload-assets-to-minio.cjs)";

/**
 * Upload thanh cong => bo asset khoi image Docker. Idempotent: chi them mot lan
 * (nhan dien bang dong marker). Server sau do phai dat ASSETS_BASE_URL hoac proxy.
 */
function updateDockerignore() {
  const file = path.join(__dirname, "..", ".dockerignore");
  const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (current.includes(DOCKERIGNORE_MARKER)) {
    console.log(".dockerignore da co cac thu muc asset — bo qua.");
    return;
  }
  const eol = current.includes("\r\n") ? "\r\n" : "\n";
  const lines = [
    DOCKERIGNORE_MARKER,
    "# Server phai dat ASSETS_BASE_URL (hoac proxy nginx) — xem docs/MINIO_ASSETS.md",
    ...ASSET_DIRS.map((d) => `public/${d}`),
  ];
  const prefix = current.length && !current.endsWith("\n") ? eol : "";
  fs.writeFileSync(file, current + prefix + eol + lines.join(eol) + eol);
  console.log(".dockerignore: da them cac thu muc asset (image Docker nhe hon ~550 MB).");
  console.log("=> Commit .dockerignore, va dam bao server da dat ASSETS_BASE_URL truoc khi build lai image.");
}

main().catch((err) => {
  console.error(`\nLoi: ${err.message || err}`);
  process.exit(1);
});
