import { describe, expect, it } from "vitest";
import { escapeHtml, getClientIp, safeCompareSecret } from "./security-utils";

describe("escapeHtml", () => {
  it("escape các ký tự đặc biệt HTML", () => {
    expect(escapeHtml(`<b>"Tom" & 'Jerry'</b>`)).toBe(
      "&lt;b&gt;&quot;Tom&quot; &amp; &#39;Jerry&#39;&lt;/b&gt;"
    );
  });

  it("không double-escape sai thứ tự (& xử lý trước)", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("giữ nguyên chuỗi thường và tiếng Việt", () => {
    expect(escapeHtml("TCABCD1234 PUBLISH Nguyễn Văn A")).toBe(
      "TCABCD1234 PUBLISH Nguyễn Văn A"
    );
  });

  it("null/undefined → chuỗi rỗng, số → chuỗi", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
    expect(escapeHtml(42)).toBe("42");
  });
});

describe("safeCompareSecret", () => {
  it("true khi khớp", () => {
    expect(safeCompareSecret("secret-123", "secret-123")).toBe(true);
  });

  it("false khi khác nội dung cùng độ dài", () => {
    expect(safeCompareSecret("secret-124", "secret-123")).toBe(false);
  });

  it("false (không throw) khi lệch độ dài", () => {
    expect(safeCompareSecret("short", "a-much-longer-secret")).toBe(false);
    expect(safeCompareSecret("a-much-longer-secret", "short")).toBe(false);
  });

  it("false khi thiếu hoặc rỗng", () => {
    expect(safeCompareSecret(null, "x")).toBe(false);
    expect(safeCompareSecret("x", undefined)).toBe(false);
    expect(safeCompareSecret("", "")).toBe(false);
    expect(safeCompareSecret(undefined, undefined)).toBe(false);
  });
});

describe("getClientIp", () => {
  it("ưu tiên x-real-ip", () => {
    const h = new Headers({
      "x-real-ip": "1.1.1.1",
      "x-forwarded-for": "2.2.2.2, 3.3.3.3",
    });
    expect(getClientIp(h)).toBe("1.1.1.1");
  });

  it("lấy phần tử đầu của x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": " 2.2.2.2 , 3.3.3.3" });
    expect(getClientIp(h)).toBe("2.2.2.2");
  });

  it("không có header → unknown", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
