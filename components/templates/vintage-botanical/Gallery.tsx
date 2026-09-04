"use client";

import React from "react";
import { ClothespinWireGallery } from "@/components/templates/shared/galleries/ClothespinWireGallery";

type GalleryProps = {
  gallery?: string[];
};

export function Gallery({ gallery }: GalleryProps) {
  return (
    <ClothespinWireGallery
      images={gallery}
      title="Tiêu Bản Kỷ Niệm Thảo Mộc"
      subtitle="Từng bức ảnh kẹp trên dây thừng mộc mạc như những tiêu bản tình yêu ngát hương lá xanh."
      badge="HERBARIUM HANGING WIRE"
    />
  );
}
