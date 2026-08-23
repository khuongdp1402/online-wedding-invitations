import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "crypto";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createS3ClientForSigning } from "@/lib/s3-client";

const ALLOWED_MIME: Record<string, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  audio: ["audio/mpeg"],
};
const MAX_SIZE: Record<string, number> = {
  image: 10 * 1024 * 1024, // 10MB
  audio: 20 * 1024 * 1024, // 20MB
};

const PresignSchema = z.object({
  slotKey: z.string().regex(/^[a-zA-Z0-9_-]+$/, "slotKey không hợp lệ"),
  contentType: z.string(),
  sizeBytes: z.number().positive(),
  fileType: z.enum(["image", "audio"]),
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify ownership
    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
      select: { id: true },
    });
    if (!wedding)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // File count guard
    const fileCount = await prisma.fileManagement.count({
      where: { weddingId: params.id },
    });
    if (fileCount >= 50)
      return NextResponse.json({ error: "Đã đạt giới hạn 50 file/thiệp" }, { status: 429 });

    // Validate body
    const parsed = PresignSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: parsed.error.flatten() },
        { status: 400 }
      );

    const { slotKey, contentType, sizeBytes, fileType } = parsed.data;

    if (!ALLOWED_MIME[fileType]?.includes(contentType))
      return NextResponse.json({ error: "Loại file không được hỗ trợ" }, { status: 400 });

    if (sizeBytes > MAX_SIZE[fileType])
      return NextResponse.json(
        { error: `File quá lớn (tối đa ${MAX_SIZE[fileType] / 1024 / 1024}MB)` },
        { status: 400 }
      );

    // Build storage key
    const ext = contentType.split("/")[1] ?? "bin";
    const uniqueId = randomBytes(6).toString("hex");
    const storageKey = `weddings/${params.id}/${fileType}/${slotKey}-${uniqueId}.${ext}`;

    // Generate presigned URL (5 phút TTL)
    const presignedUrl = await getSignedUrl(
      createS3ClientForSigning(),
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: storageKey,
        ContentType: contentType,
        ContentLength: sizeBytes,
      }),
      { expiresIn: 300 }
    );

    return NextResponse.json({ presignedUrl, storageKey });
  } catch (e) {
    console.error("[presign]", e);
    return NextResponse.json({ error: "Không thể tạo presigned URL" }, { status: 500 });
  }
}
