import { randomBytes } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { s3Adapter } from "./integrations/s3-adapter";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 12 * 1024 * 1024; // 12MB

export function validateImageMime(mime: string): boolean {
  return ALLOWED.has(mime);
}

export function validateFileSize(size: number): boolean {
  return size > 0 && size <= MAX_BYTES;
}

function extForMime(mime: string): string {
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  if (mime === "image/gif") return ".gif";
  return ".jpg";
}

/**
 * Upload ảnh: ưu tiên S3-compatible (MinIO) nếu đủ biến môi trường, không thì ghi local public/uploads.
 */
export async function uploadWeddingImage(params: {
  weddingId: string;
  slotKey: string;
  buffer: Buffer;
  mimeType: string;
  originalName?: string;
}): Promise<{ publicUrl: string; storageKey: string }> {
  const { weddingId, slotKey, buffer, mimeType } = params;
  const safeSlot = slotKey.replace(/[^a-zA-Z0-9-_]/g, "_");
  const id = randomBytes(8).toString("hex");
  const ext = extForMime(mimeType);
  const objectName = `weddings/${weddingId}/${safeSlot}-${id}${ext}`;

  const bucket = process.env.S3_BUCKET;
  const publicBase = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");

  // Nếu cấu hình S3 đầy đủ thì dùng S3Adapter
  if (
    process.env.S3_ENDPOINT &&
    bucket &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY &&
    publicBase
  ) {
    await s3Adapter.upload({
      bucket,
      key: objectName,
      body: buffer,
      contentType: mimeType,
    });

    return {
      publicUrl: `${publicBase}/${bucket}/${objectName}`,
      storageKey: `s3:${bucket}/${objectName}`,
    };
  }

  // Fallback về local storage
  const relDir = path.join("uploads", "weddings", weddingId);
  const absDir = path.join(process.cwd(), "public", relDir);
  await mkdir(absDir, { recursive: true });
  const fileName = `${safeSlot}-${id}${ext}`;
  const absPath = path.join(absDir, fileName);
  await writeFile(absPath, buffer);
  return {
    publicUrl: `/${relDir.replace(/\\/g, "/")}/${fileName}`,
    storageKey: `local:${relDir}/${fileName}`,
  };
}

/**
 * Xóa object đã lưu (S3/MinIO hoặc file local). Lỗi từng file được nuốt để không chặn xóa wedding.
 */
export async function deleteStoredObject(storageKey: string): Promise<void> {
  if (storageKey.startsWith("s3:")) {
    const rest = storageKey.slice(3);
    const slash = rest.indexOf("/");
    if (slash <= 0) return;
    const bucket = rest.slice(0, slash);
    const key = rest.slice(slash + 1);
    if (!key) return;

    try {
      await s3Adapter.delete(bucket, key);
    } catch {
      // best-effort
    }
    return;
  }

  if (storageKey.startsWith("local:")) {
    const rel = storageKey.slice(6).replace(/\\/g, "/");
    const abs = path.join(process.cwd(), "public", rel);
    try {
      await unlink(abs);
    } catch {
      // best-effort
    }
  }
}
