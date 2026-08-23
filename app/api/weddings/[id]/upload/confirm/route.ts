import { NextResponse } from "next/server";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createS3Client, getPublicUrl } from "@/lib/s3-client";
import { galleryIndexForSlotKey } from "@/lib/wedding-image-slots";

const ConfirmSchema = z.object({
  storageKey: z.string().min(1),
  slotKey: z.string().min(1),
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
