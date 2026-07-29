"use client";

// Chú ý: file này chỉ dùng ở Client Component ("use client")

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
