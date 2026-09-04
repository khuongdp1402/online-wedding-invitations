"use client";

import React from "react";
import { DesertArchGallery } from "@/components/templates/shared/galleries/DesertArchGallery";

type GalleryProps = {
  gallery?: string[];
};

export function Gallery({ gallery }: GalleryProps) {
  return (
    <DesertArchGallery
      images={gallery}
      title="Mái Vòm Kỷ Niệm Sa Mạc"
      subtitle="Từng khoảnh khắc dịu dàng được lưu giữ trọn vẹn qua những khung vòm nhuốm màu nắng ấm hoàng hôn Bohemian."
      badge="BOHO ARCH PANORAMA"
    />
  );
}
