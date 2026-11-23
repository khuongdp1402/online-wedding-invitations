/**
 * Tai asset template tu bucket MinIO ve public/ (chieu nguoc voi upload-assets-to-minio.cjs).
 *
 * Dung khi: may moi clone repo (asset bi .gitignore nen khong co trong git) can co
 * file local de upload sang MinIO khac, chay dev khong can mang, hoac sao luu.
 *
 *   node scripts/download-assets-from-minio.cjs --dry-run   # chi liet ke
 *   node scripts/download-assets-from-minio.cjs             # tai ve public/
 *
 * Tham so:
 *   --dry-run          Liet ke so file / dung luong se tai, khong ghi gi.
 *   --concurrency=N    So file tai song song (mac dinh 8).
 *   --force            Tai lai ca file local da co cung kich thuoc.
 *
 * Bien moi truong (doc tu .env neu co) — giong script upload:
 *   ASSETS_S3_ENDPOINT, ASSETS_S3_REGION (mac dinh us-east-1),
 *   ASSETS_S3_ACCESS_KEY_ID, ASSETS_S3_SECRET_ACCESS_KEY,
 *   ASSETS_S3_BUCKET (mac dinh wedding-assets)
 * Can quyen s3:ListBucket + s3:GetObject (bucket public chi cho GetObject, nen
 * phai dung access key).
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream/promises");
const { ASSET_DIRS } = require("./asset-dirs.cjs");

try {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env"), quiet: true });
} catch {
  /* dotenv khong bat buoc */
}

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const MAX_RETRIES = 4;

function parseArgs(argv) {
  const args = { dryRun: false, concurrency: 8, force: false };
  for (const a of argv) {
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--force") args.force = true;
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

function readConfig() {
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
    console.error(`Thieu bien moi truong: ${missing.join(", ")} (dat trong .env)`);
    process.exit(1);
  }
  return cfg;
}

/** Chan key dang ../ hoac duong dan tuyet doi ghi ra ngoai public/. */
function safeLocalPath(key) {
  const target = path.resolve(PUBLIC_DIR, ...key.split("/"));
  if (!target.startsWith(PUBLIC_DIR + path.sep)) return null;
  return target;
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function listAll(client, ListObjectsV2Command, bucket) {
  const objects = [];
  for (const dir of ASSET_DIRS) {
    let token;
    do {
      const res = await client.send(
        new ListObjectsV2Command({ Bucket: bucket, Prefix: `${dir}/`, ContinuationToken: token })
      );
      for (const o of res.Contents || []) {
        if (o.Key && !o.Key.endsWith("/")) objects.push({ key: o.Key, size: o.Size || 0 });
      }
      token = res.IsTruncated ? res.NextContinuationToken : undefined;
    } while (token);
  }
  return objects;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cfg = readConfig();
  const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
  const client = new S3Client({
    endpoint: cfg.endpoint,
    region: cfg.region,
    forcePathStyle: true,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  });

  console.log(`Nguon: ${cfg.endpoint}/${cfg.bucket} -> ${PUBLIC_DIR}`);
  const objects = await listAll(client, ListObjectsV2Command, cfg.bucket);

  const todo = [];
  let skipped = 0;
  for (const o of objects) {
    const local = safeLocalPath(o.key);
    if (!local) {
      console.warn(`Bo qua key khong an toan: ${o.key}`);
      continue;
    }
    if (!args.force && fs.existsSync(local) && fs.statSync(local).size === o.size) {
      skipped++;
      continue;
    }
    todo.push({ ...o, local });
  }
  const totalBytes = todo.reduce((s, o) => s + o.size, 0);
  console.log(
    `Tren bucket: ${objects.length} file. Da co san local: ${skipped}. Can tai: ${todo.length} (${formatMB(totalBytes)}).`
  );
  if (args.dryRun) {
    console.log("--dry-run: khong tai gi.");
    return;
  }

  let done = 0;
  const failed = [];
  let next = 0;
  async function worker() {
    while (next < todo.length) {
      const item = todo[next++];
      for (let attempt = 1; ; attempt++) {
        try {
          const res = await client.send(new GetObjectCommand({ Bucket: cfg.bucket, Key: item.key }));
          fs.mkdirSync(path.dirname(item.local), { recursive: true });
          const tmp = `${item.local}.part`;
          await pipeline(res.Body, fs.createWriteStream(tmp));
          fs.renameSync(tmp, item.local);
          break;
        } catch (err) {
          const status = err?.$metadata?.httpStatusCode;
          if (attempt >= MAX_RETRIES || (status >= 400 && status < 500)) {
            failed.push(`${item.key}: ${err.message || err}`);
            break;
          }
          await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
        }
      }
      done++;
      if (done % 100 === 0 || done === todo.length) {
        console.log(`  ${done}/${todo.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(args.concurrency, todo.length) }, worker));

  console.log(`\nXong: tai ${todo.length - failed.length}/${todo.length} file.`);
  if (failed.length) {
    console.error(`Loi ${failed.length} file:`);
    for (const f of failed.slice(0, 20)) console.error(`  ${f}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
