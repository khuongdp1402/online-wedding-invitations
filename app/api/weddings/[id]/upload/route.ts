import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  uploadWeddingImage,
  validateFileSize,
  validateImageMime,
} from "@/lib/file-storage";
import { galleryIndexForSlotKey } from "@/lib/wedding-image-slots";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wedding = await prisma.wedding.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!wedding) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const form = await request.formData();
    const file = form.get("file");
    const slotKey = String(form.get("slotKey") || "").trim();
    if (!slotKey || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Thiếu file hoặc slotKey" },
        { status: 400 }
      );
    }

    const idx = galleryIndexForSlotKey(slotKey);
    if (idx === null) {
      return NextResponse.json({ error: "slotKey không hợp lệ" }, { status: 400 });
    }

    const mimeType = file.type || "application/octet-stream";
    if (!validateImageMime(mimeType)) {
      return NextResponse.json(
        { error: "Chỉ chấp nhận JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    if (!validateFileSize(buf.length)) {
      return NextResponse.json(
        { error: "File quá lớn (tối đa 12MB)" },
        { status: 400 }
      );
    }

    const { publicUrl, storageKey } = await uploadWeddingImage({
      weddingId: wedding.id,
      slotKey,
      buffer: buf,
      mimeType,
      originalName: file.name,
    });

    const rawGallery = wedding.gallery as unknown;
    const prev: string[] = Array.isArray(rawGallery)
      ? rawGallery.map((x) => String(x || ""))
      : [];
    while (prev.length <= idx) prev.push("");
    prev[idx] = publicUrl;

    await prisma.$transaction([
      prisma.fileManagement.upsert({
        where: {
          weddingId_slotKey: { weddingId: wedding.id, slotKey },
        },
        create: {
          weddingId: wedding.id,
          userId: session.user.id,
          slotKey,
          publicUrl,
          storageKey,
          originalName: file.name || null,
          mimeType,
          sizeBytes: buf.length,
        },
        update: {
          publicUrl,
          storageKey,
          originalName: file.name || null,
          mimeType,
          sizeBytes: buf.length,
        },
      }),
      prisma.wedding.update({
        where: { id: wedding.id },
        data: { gallery: prev },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      slotKey,
      galleryIndex: idx,
      gallery: prev,
    });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json(
      { error: "Upload thất bại" },
      { status: 500 }
    );
  }
}
