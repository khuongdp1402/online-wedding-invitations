# Storage Logic (MinIO Self-Hosted)

## Stack & Lý do
- **MinIO** đã có sẵn trong `docker-compose.yml` (profile `storage`), S3-compatible API.
- Dùng chính `@aws-sdk/client-s3` — **không cần đổi code SDK** vì MinIO tương thích hoàn toàn.
- Không tốn phí AWS. Chạy local dev + production tự host trên VPS.

## Khởi động MinIO
```bash
# Bật MinIO kèm app + db
docker compose --profile storage up -d

# MinIO Console: http://localhost:9001
# User: minio | Pass: minio_secret_change_me
# → Tạo bucket tên "wedding-uploads" (Public hoặc gán Policy)
```

## Rule (Quy tắc bắt buộc)

1. **S3 Client Init**: Luôn dùng factory function `createS3Client()` tập trung để tránh lặp config. Set `forcePathStyle: true` — MinIO bắt buộc.
2. **Flow Upload 3 bước** (tránh binary đi qua server):
   - `POST /presign` → Server trả `presignedUrl` + `storageKey`
   - Client `PUT` trực tiếp lên MinIO endpoint
   - `POST /confirm` → Server verify + ghi DB
3. **MIME whitelist**: Ảnh: `image/jpeg`, `image/png`, `image/webp`. Audio: `audio/mpeg`.
4. **Size limit**: Ảnh ≤ 10MB, Audio ≤ 20MB.
5. **CORS MinIO Bucket Policy**: Phải cấu hình CORS cho bucket để browser `PUT` được (xem snippet bên dưới).
6. **Public URL**: Format là `{S3_PUBLIC_URL}/{S3_BUCKET}/{storageKey}` (path-style).

## .env cho MinIO (local dev)
```env
S3_ENDPOINT="http://localhost:9000"
S3_REGION="us-east-1"
S3_BUCKET="wedding-uploads"
S3_ACCESS_KEY_ID="minio"
S3_SECRET_ACCESS_KEY="minio_secret_change_me"
S3_PUBLIC_URL="http://localhost:9000"
S3_FORCE_PATH_STYLE="true"
```

## Code Snippet Chuẩn

### 1. Factory S3 Client (`lib/s3-client.ts`)
```typescript
import { S3Client } from "@aws-sdk/client-s3";

/** Singleton-style factory — dùng cho cả MinIO và AWS tuỳ env */
export function createS3Client() {
  return new S3Client({
    region: process.env.S3_REGION ?? "us-east-1",
    endpoint: process.env.S3_ENDPOINT,           // MinIO: "http://localhost:9000"
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false", // MinIO bắt buộc true
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
}

export function getPublicUrl(storageKey: string) {
  const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");
  const bucket = process.env.S3_BUCKET;
  return `${base}/${bucket}/${storageKey}`;
}
```

### 2. API Presign (`app/api/weddings/[id]/upload/presign/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/lib/auth";
import { createS3Client } from "@/lib/s3-client";
import { randomBytes } from "crypto";
import { z } from "zod";

const ALLOWED_MIME = {
  image: ["image/jpeg", "image/png", "image/webp"],
  audio: ["audio/mpeg"],
};
const MAX_SIZE = { image: 10 * 1024 * 1024, audio: 20 * 1024 * 1024 };

const PresignSchema = z.object({
  slotKey:     z.string().regex(/^[a-zA-Z0-9_-]+$/),
  contentType: z.string(),
  sizeBytes:   z.number().positive(),
  fileType:    z.enum(["image", "audio"]),
});

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = PresignSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const { slotKey, contentType, sizeBytes, fileType } = parsed.data;

  if (!ALLOWED_MIME[fileType].includes(contentType))
    return NextResponse.json({ error: "Loại file không hỗ trợ" }, { status: 400 });
  if (sizeBytes > MAX_SIZE[fileType])
    return NextResponse.json({ error: "File quá lớn" }, { status: 400 });

  const ext = contentType.split("/")[1];
  const storageKey = `weddings/${params.id}/${fileType}/${slotKey}-${randomBytes(6).toString("hex")}.${ext}`;

  const url = await getSignedUrl(
    createS3Client(),
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: storageKey,
      ContentType: contentType,
      ContentLength: sizeBytes,
    }),
    { expiresIn: 300 } // 5 phút
  );

  return NextResponse.json({ presignedUrl: url, storageKey });
}
```

### 3. Client Upload Flow (`lib/upload-client.ts`)
```typescript
import type { WeddingUploadSlot } from "@/lib/template-slot-types";

type FileType = "image" | "audio";

export async function uploadFilePresigned(
  weddingId: string,
  slotKey: string,
  file: File,
  fileType: FileType
): Promise<{ storageKey: string; publicUrl: string }> {

  // Bước 1: Xin Presigned URL
  const presignRes = await fetch(`/api/weddings/${weddingId}/upload/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slotKey, contentType: file.type, sizeBytes: file.size, fileType }),
  });
  if (!presignRes.ok) throw new Error((await presignRes.json()).error);
  const { presignedUrl, storageKey } = await presignRes.json();

  // Bước 2: PUT trực tiếp lên MinIO (không qua server)
  const s3Res = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!s3Res.ok) throw new Error(`MinIO upload thất bại: ${s3Res.status}`);

  // Bước 3: Confirm và ghi DB
  const confirmRes = await fetch(`/api/weddings/${weddingId}/upload/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ storageKey, slotKey, originalName: file.name,
      sizeBytes: file.size, mimeType: file.type, fileType }),
  });
  if (!confirmRes.ok) throw new Error((await confirmRes.json()).error);

  return await confirmRes.json();
}
```

### 4. CORS Policy cho MinIO Bucket
> Chạy trong MinIO Console (http://localhost:9001) → Bucket `wedding-uploads` → Access Rules.  
> Hoặc dùng MinIO Client CLI (`mc`):

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "http://localhost:3001", "https://yourdomain.com"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedHeaders": ["Content-Type", "Content-Length"],
    "ExposeHeaders":  ["ETag"],
    "MaxAgeSeconds":  3000
  }
]
```

```bash
# Cách nhanh apply bằng mc CLI:
mc alias set myminio http://localhost:9000 minio minio_secret_change_me
mc anonymous set-json cors-policy.json myminio/wedding-uploads
```
