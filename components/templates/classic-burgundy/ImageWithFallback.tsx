"use client";

import Image from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
};

function imgUnoptimized(src: string) {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.includes("localhost")
  );
}

export function ImageWithFallback({
  src,
  alt,
  className = "",
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-label={alt}
        className={`bg-[linear-gradient(180deg,rgba(58,13,26,0.04),rgba(58,13,26,0))] ${className}`}
      />
    );
  }

  return (
    <span className="relative block h-full w-full min-h-0 min-w-0">
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes="(max-width: 768px) 100vw, 900px"
        loading="lazy"
        unoptimized={imgUnoptimized(src)}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
