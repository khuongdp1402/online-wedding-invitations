"use client";

import { useEffect, useRef } from "react";

type WatermarkProps = {
  text?: string;
  opacity?: number;
};

/**
 * Canvas-based watermark that cannot be easily removed via CSS/DevTools.
 * Renders repeating diagonal text on a transparent canvas overlay.
 */
export function Watermark({
  text = "BẢN XEM THỬ - thiepcuoi.online",
  opacity = 0.12,
}: WatermarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function createWatermarkCanvas() {
      // Create off-screen canvas for the pattern tile
      const tileCanvas = document.createElement("canvas");
      const tileCtx = tileCanvas.getContext("2d");
      if (!tileCtx) return;

      // Tile size for the repeating pattern
      const tileWidth = 500;
      const tileHeight = 300;
      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;

      // Configure text style
      tileCtx.font = "bold 18px sans-serif";
      tileCtx.fillStyle = `rgba(128, 0, 32, ${opacity})`;
      tileCtx.textAlign = "center";
      tileCtx.textBaseline = "middle";

      // Rotate and draw text pattern
      tileCtx.translate(tileWidth / 2, tileHeight / 2);
      tileCtx.rotate(-30 * (Math.PI / 180));

      // Draw multiple lines to cover the tile
      for (let y = -tileHeight; y < tileHeight * 2; y += 80) {
        for (let x = -tileWidth; x < tileWidth * 2; x += 400) {
          tileCtx.fillText(text, x, y);
        }
      }

      // Convert to data URL and set as background
      const dataUrl = tileCanvas.toDataURL("image/png");

      if (container) {
        container.style.backgroundImage = `url(${dataUrl})`;
        container.style.backgroundRepeat = "repeat";
        container.style.backgroundSize = `${tileWidth}px ${tileHeight}px`;
      }
    }

    createWatermarkCanvas();

    // Re-create if someone tries to clear the style
    const observer = new MutationObserver(() => {
      if (container && !container.style.backgroundImage) {
        createWatermarkCanvas();
      }
    });

    observer.observe(container, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, [text, opacity]);

  return (
    <div
      ref={containerRef}
      className="watermark-canvas-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      aria-hidden="true"
      data-watermark="true"
    />
  );
}
