"use client";

import React from "react";
import { FilmStripHorizontalGallery } from "@/components/templates/shared/galleries/FilmStripHorizontalGallery";

type GalleryProps = {
  gallery?: string[];
};

export function Gallery({ gallery }: GalleryProps) {
  return (
    <FilmStripHorizontalGallery
      images={gallery}
      title="Cuộn Phim Dạ Tiệc Gatsby"
      subtitle="Từng khung hình lưu lại khoảnh khắc rực rỡ xa hoa như những thước phim điện ảnh kinh điển."
      badge="GATSBY CINEMA REEL"
    />
  );
}
