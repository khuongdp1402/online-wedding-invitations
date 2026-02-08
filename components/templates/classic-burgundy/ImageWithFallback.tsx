"use client";

import { useState } from "react";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ImageWithFallback({ src, alt, className = "" }: ImageWithFallbackProps) {
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
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
