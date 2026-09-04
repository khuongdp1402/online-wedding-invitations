"use client";

import React from "react";
import { PinboardWallGallery } from "@/components/templates/shared/galleries/PinboardWallGallery";

type GalleryProps = {
  images?: string[];
  weddingId?: string;
  editOverlay?: unknown;
};

export function Gallery({ images }: GalleryProps) {
  return (
    <PinboardWallGallery
      images={images}
      title="Bảng Ảnh Kỷ Niệm Nắng Thu"
      subtitle="Từng bức ảnh màu nước được đính ghim lưu giữ trên bức tường kỷ niệm vàng ấm mùa thu."
      badge="AUTUMN PINBOARD"
    />
  );
}
