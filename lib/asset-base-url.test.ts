import { describe, expect, it } from "vitest";
import { assetRedirectUrl, isAssetPath } from "./asset-base-url";

const BASE = "https://minio.example/wedding-assets";

describe("assetRedirectUrl", () => {
  it("returns null when ASSETS_BASE_URL is unset/empty", () => {
    expect(assetRedirectUrl("/images/themes/a/b.webp", "", undefined)).toBeNull();
    expect(assetRedirectUrl("/images/themes/a/b.webp", "", "  ")).toBeNull();
  });

  it("redirects asset prefixes, keeping encoded path and query", () => {
    expect(assetRedirectUrl("/images/themes/vuon%20xuan%20blue/x.webp", "?v=1", BASE + "/")).toBe(
      `${BASE}/images/themes/vuon%20xuan%20blue/x.webp?v=1`
    );
    expect(assetRedirectUrl("/music/birthday/a.mp3", "", BASE)).toBe(`${BASE}/music/birthday/a.mp3`);
    expect(assetRedirectUrl("/font/gf/x.woff2", "", BASE)).toBe(`${BASE}/font/gf/x.woff2`);
  });

  it("ignores non-asset paths and look-alike prefixes", () => {
    expect(assetRedirectUrl("/fonts/x.woff2", "", BASE)).toBeNull();
    expect(assetRedirectUrl("/images/logo.png", "", BASE)).toBeNull();
    expect(assetRedirectUrl("/thieponline-bundles/brand.js", "", BASE)).toBeNull();
    expect(assetRedirectUrl("/dashboard", "", BASE)).toBeNull();
    expect(isAssetPath("/music")).toBe(false);
  });

  it("rejects non-http bases and traversal", () => {
    expect(assetRedirectUrl("/music/a.mp3", "", "javascript:alert(1)")).toBeNull();
    expect(assetRedirectUrl("/music/../x", "", BASE)).toBeNull();
  });
});
