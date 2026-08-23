import { S3Client } from "@aws-sdk/client-s3";

/**
 * Factory tạo S3Client — tương thích cả MinIO (self-host) và AWS S3.
 * MinIO yêu cầu: endpoint + forcePathStyle: true.
 */
export function createS3Client(): S3Client {
  return new S3Client({
    region: process.env.S3_REGION ?? "us-east-1",
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
}

/**
 * Factory tạo S3Client phục vụ việc ký tên presigned URL.
 * Khi chạy Docker, server gọi MinIO qua mạng nội bộ (minio:9000) nhưng browser gọi qua host (localhost:9010).
 * Ký bằng S3_SIGNING_ENDPOINT (localhost:9010) để browser gửi đúng Host header khớp signature.
 */
export function createS3ClientForSigning(): S3Client {
  const endpoint = process.env.S3_SIGNING_ENDPOINT || process.env.S3_ENDPOINT || undefined;
  return new S3Client({
    region: process.env.S3_REGION ?? "us-east-1",
    endpoint,
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
}

/**
 * Build public URL cho object đã upload.
 * MinIO path-style: {S3_PUBLIC_URL}/{bucket}/{key}
 */
export function getPublicUrl(storageKey: string): string {
  const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");
  const bucket = process.env.S3_BUCKET;
  return `${base}/${bucket}/${storageKey}`;
}
