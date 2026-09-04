"use client";

import React from "react";
import { SymmetricTriptychGallery } from "@/components/templates/shared/galleries/SymmetricTriptychGallery";

type GalleryProps = {
  gallery?: string[];
};

export function Gallery({ gallery }: GalleryProps) {
  return (
    <SymmetricTriptychGallery
      images={gallery}
      title="Điện Trưng Bày Hoàng Gia"
      subtitle="Bố cục tam tấu đối xứng tráng lệ với kiệt tác trung tâm được bao bọc bởi hào quang vàng son rực rỡ."
      badge="IMPERIAL SYMMETRIC TRIPTYCH"
    />
  );
}
