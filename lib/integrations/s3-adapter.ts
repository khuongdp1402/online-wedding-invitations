import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

/**
 * S3 Adapter - Cung cấp interface tương tác với Storage (MinIO/AWS S3).
 */
export class S3Adapter {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.S3_REGION ?? "us-east-1",
      endpoint: process.env.S3_ENDPOINT || undefined,
      forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });
  }

  getClient(): S3Client {
    return this.client;
  }

  /**
   * Upload một file lên S3.
   */
  async upload(params: {
    bucket: string;
    key: string;
    body: Buffer | Uint8Array | Blob | string;
    contentType: string;
  }) {
    return this.client.send(
      new PutObjectCommand({
        Bucket: params.bucket,
        Key: params.key,
        Body: params.body,
        ContentType: params.contentType,
      })
    );
  }

  /**
   * Xóa một file khỏi S3.
   */
  async delete(bucket: string, key: string) {
    return this.client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
  }

  /**
   * Build public URL cho object đã upload.
   * MinIO path-style: {S3_PUBLIC_URL}/{bucket}/{key}
   */
  getPublicUrl(storageKey: string): string {
    const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");
    const bucket = process.env.S3_BUCKET;
    return `${base}/${bucket}/${storageKey}`;
  }
}

// Singleton instance
export const s3Adapter = new S3Adapter();
