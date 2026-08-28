import type { WeddingData } from "@/types/template";

/**
 * Tính CSS variable font + URL Google Fonts từ `wedding.typography`.
 * Dùng chung giữa `TemplateRenderer.tsx` (React, dashboard/preview/fallback)
 * và `astro-templates` (build tĩnh) để không lệch font giữa 2 renderer.
 */
export function resolveTemplateFonts(wedding: Pick<WeddingData, "typography">) {
  const typography = wedding.typography ?? {};
  const headingFont = typography.heading || "inherit";
  const bodyFont = typography.body || "inherit";
  const scriptFont = typography.script || "inherit";

  const fontNamesToLoad = new Set<string>();
  [headingFont, bodyFont, scriptFont].forEach((f) => {
    const match = f.match(/'([^']+)'/);
    if (match) fontNamesToLoad.add(match[1].replace(/ /g, "+"));
  });

  const fontUrls = Array.from(fontNamesToLoad).map(
    (name) => `family=${name}:wght@400;500;600;700`
  );

  const googleFontsUrl =
    fontUrls.length > 0
      ? `https://fonts.googleapis.com/css2?${fontUrls.join("&")}&display=swap`
      : null;

  return { headingFont, bodyFont, scriptFont, googleFontsUrl };
}
