"use client";

// Chú ý: file này chỉ dùng ở Client Component ("use client")

import { validateUploadFile } from "@/lib/upload-limits";

type FileType = "image" | "audio";

export type UploadResult = {
  storageKey: string;
  publicUrl: string;
  gallery?: string[];
};

/**
 * Upload file lên MinIO theo luồng 3 bước (Presigned URL).
 * File binary KHÔNG đi qua Next.js server.
 */
export async function uploadFilePresigned(
  weddingId: string,
  slotKey: string,
  file: File,
  fileType: FileType
): Promise<UploadResult> {
  // Bước 0: Validate file ngay trên client (mirror giới hạn server) để
  // không tốn round-trip API cho file sai định dạng/quá lớn.
  const validation = validateUploadFile(file, fileType);
  if (!validation.ok) {
    throw new Error(validation.message);
  }

  // Bước 1: Xin Presigned URL từ API
  const presignRes = await fetch(`/api/weddings/${weddingId}/upload/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slotKey,
      contentType: file.type,
      sizeBytes: file.size,
      fileType,
    }),
  });

  if (!presignRes.ok) {
    const err = await presignRes.json().catch(() => ({}));
    throw new Error(err.error ?? "Không lấy được presigned URL");
  }

  const { presignedUrl, storageKey } = await presignRes.json();

  // Bước 2: PUT binary trực tiếp lên MinIO endpoint (không qua server)
  const s3Res = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  if (!s3Res.ok) {
    throw new Error(`MinIO upload thất bại (HTTP ${s3Res.status})`);
  }

  // Bước 3: Confirm để server verify + ghi DB
  const confirmRes = await fetch(`/api/weddings/${weddingId}/upload/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      storageKey,
      slotKey,
      originalName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      fileType,
    }),
  });

  if (!confirmRes.ok) {
    const err = await confirmRes.json().catch(() => ({}));
    throw new Error(err.error ?? "Xác nhận upload thất bại");
  }

  return confirmRes.json();
}

/**
 * Upload nhiều file liên tiếp (tuần tự, KHÔNG song song).
 * confirm/route.ts đọc wedding.gallery từ DB rồi ghi đè cả mảng — 2 confirm chạy
 * song song sẽ đọc cùng snapshot cũ và request xong sau sẽ xoá mất ảnh của request kia.
 */
export async function uploadFilesPresigned(
  weddingId: string,
  slotKeys: string[],
  files: File[],
  onProgress?: (done: number, total: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  for (let i = 0; i < files.length; i++) {
    results.push(await uploadFilePresigned(weddingId, slotKeys[i], files[i], "image"));
    onProgress?.(i + 1, files.length);
  }
  return results;
}

/** Lưu lại thứ tự gallery mới sau khi kéo thả sắp xếp album. */
export async function persistGalleryReorder(
  weddingId: string,
  gallery: string[]
): Promise<void> {
  const res = await fetch(`/api/weddings/${weddingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gallery }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Lưu thứ tự ảnh thất bại");
  }
}
