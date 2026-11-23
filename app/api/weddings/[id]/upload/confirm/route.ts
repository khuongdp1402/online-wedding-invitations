import { NextResponse } from "next/server";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createS3Client, getPublicUrl } from "@/lib/s3-client";
import { galleryIndexForSlotKey } from "@/lib/wedding-image-slots";

// Cùng regex với presign — slotKey nằm trong storageKey nên phải khớp charset.
const SLOT_KEY_RE = /^[a-zA-Z0-9_-]+$/;

/**
 * storageKey phải đúng dạng presign sinh ra:
 *   weddings/{weddingId}/{fileType}/{slotKey}-{hex12}.{ext}
 * Nếu không kiểm tra, client có thể gửi key của object bất kỳ trong bucket
 * (file của khách hàng khác) và gắn vào thiệp của mình.
 */
function isValidStorageKey(
  storageKey: string,
  weddingId: string,
  fileType: string,
  slotKey: string
): boolean {
  if (storageKey.includes("..") || storageKey.includes("\\")) return false;
  const prefix = `weddings/${weddingId}/${fileType}/`;
  if (!storageKey.startsWith(prefix)) return false;
  const fileName = storageKey.slice(prefix.length);
  // slotKey đã qua SLOT_KEY_RE nên không chứa ký tự đặc biệt của regex.
  return new RegExp(`^${slotKey}-[0-9a-f]{12}\\.[a-z0-9]+$`).test(fileName);
}

const ConfirmSchema = z.object({
  storageKey: z.string().min(1).max(512),
  slotKey: z.string().regex(SLOT_KEY_RE, "slotKey không hợp lệ"),
  originalName: z.string().optional(),
  sizeBytes: z.number().optional(),
  mimeType: z.string().optional(),
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

    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
      include: { template: true },
    });
    if (!wedding)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const parsed = ConfirmSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: parsed.error.flatten() },
        { status: 400 }
      );

    const { storageKey, slotKey, originalName, sizeBytes, mimeType, fileType } = parsed.data;

    if (!isValidStorageKey(storageKey, params.id, fileType, slotKey))
      return NextResponse.json({ error: "storageKey không hợp lệ" }, { status: 400 });

    // Verify file đã thực sự tồn tại trên MinIO (tránh ghi DB khi upload thất bại)
    try {
      await createS3Client().send(
        new HeadObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: storageKey })
      );
    } catch {
      return NextResponse.json(
        { error: "File chưa được upload lên MinIO, vui lòng thử lại" },
        { status: 400 }
      );
    }

    const publicUrl = getPublicUrl(storageKey);

    // Xử lý audio — chỉ cập nhật backgroundMusic
    if (fileType === "audio") {
      await prisma.$transaction([
        prisma.fileManagement.upsert({
          where: { weddingId_slotKey: { weddingId: params.id, slotKey } },
          create: {
            weddingId: params.id, userId: session.user.id, slotKey,
            publicUrl, storageKey, originalName, mimeType, sizeBytes,
          },
          update: { publicUrl, storageKey, originalName, mimeType, sizeBytes },
        }),
        prisma.wedding.update({
          where: { id: params.id },
          data: { backgroundMusic: publicUrl },
        }),
      ]);
      return NextResponse.json({ ok: true, publicUrl });
    }

    // Xử lý ảnh — cập nhật gallery array
    const idx = galleryIndexForSlotKey(slotKey, wedding.template?.slug);
    if (idx === null)
      return NextResponse.json({ error: "slotKey không hợp lệ" }, { status: 400 });

    const rawGallery = (wedding.gallery as string[]) ?? [];
    const gallery = [...rawGallery];
    while (gallery.length <= idx) gallery.push("");

    // Thiệp đã xuất bản: không giới hạn số ảnh (đã trả đúng giá template).
    // Còn DRAFT: giới hạn nhẹ để tránh lạm dụng khi chưa trả phí.


    gallery[idx] = publicUrl;

    await prisma.$transaction([
      prisma.fileManagement.upsert({
        where: { weddingId_slotKey: { weddingId: params.id, slotKey } },
        create: {
          weddingId: params.id, userId: session.user.id, slotKey,
          publicUrl, storageKey, originalName, mimeType, sizeBytes,
        },
        update: { publicUrl, storageKey, originalName, mimeType, sizeBytes },
      }),
      prisma.wedding.update({
        where: { id: params.id },
        data: { gallery },
      }),
    ]);

    return NextResponse.json({ ok: true, publicUrl, gallery });
  } catch (e) {
    console.error("[confirm]", e);
    return NextResponse.json({ error: "Xác nhận upload thất bại" }, { status: 500 });
  }
}
