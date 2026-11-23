import { describe, expect, it } from "vitest";
import { safeJsonLd } from "./json-ld";

describe("safeJsonLd", () => {
  it("escape các ký tự có thể thoát khỏi thẻ script", () => {
    const out = safeJsonLd({ name: "</script><script>alert(1)</script>&" });
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    expect(out).not.toContain("&");
    expect(out).toContain("\\u003c/script\\u003e");
    expect(out).toContain("\\u0026");
  });

  it("escape U+2028 / U+2029", () => {
    const out = safeJsonLd({ s: "a\u2028b\u2029c" });
    expect(out).toBe('{"s":"a\\u2028b\\u2029c"}');
  });

  it("vẫn là JSON hợp lệ và giữ nguyên giá trị gốc", () => {
    const obj = { a: "<b>Tú & Lan</b>", n: 1, arr: ["x>y"], nested: { k: "\u2028" } };
    expect(JSON.parse(safeJsonLd(obj))).toEqual(obj);
  });
});
