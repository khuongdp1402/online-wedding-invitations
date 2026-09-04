"use client";

import React from "react";
import { PortraitCoverflowGallery } from "@/components/templates/shared/galleries/PortraitCoverflowGallery";

type GalleryProps = {
  gallery?: string[];
};

export function Gallery({ gallery }: GalleryProps) {
  return (
    <PortraitCoverflowGallery
      images={gallery}
      title="Seoul Studio Lookbook"
      subtitle="Tuyển tập những khung hình chân dung thanh lịch theo phong cách tối giản chuẩn Hàn Quốc."
      badge="MINIMAL LOOKBOOK"
    />
  );
}
