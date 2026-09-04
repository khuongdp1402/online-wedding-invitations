"use client";

import React from "react";
import { StackedCardDeckGallery } from "@/components/templates/shared/galleries/StackedCardDeckGallery";

type GalleryProps = {
  gallery?: string[];
};

export function Gallery({ gallery }: GalleryProps) {
  return (
    <StackedCardDeckGallery
      images={gallery}
      title="Khoảnh Khắc Cánh Hoa"
      subtitle="Chạm hoặc quẹt từng tấm ảnh để lật xem từng trang kỷ niệm ngọt ngào như hoa anh đào trong gió."
      badge="SAKURA STACKED DECK"
    />
  );
}
