import { describe, it, expect } from "vitest";
import { resolveSections, visibleSectionKeys } from "@/lib/section-config";

const BURGUNDY = [
  "header",
  "wedding-info",
  "countdown",
  "quote",
  "gallery",
  "location",
  "wishes",
  "footer",
];

describe("resolveSections — tương thích ngược", () => {
  it("string[] cũ: mọi khối đều hiện", () => {
    const out = resolveSections(["header", "countdown", "footer"], BURGUNDY);
    expect(out.every((s) => s.visible)).toBe(true);
  });

  it("string[] cũ thiếu khối: bổ sung vào cuối, vẫn hiện", () => {
    const out = resolveSections(["countdown", "header"], BURGUNDY);
    expect(out.map((s) => s.key).slice(0, 2)).toEqual(["countdown", "header"]);
    expect(out).toHaveLength(BURGUNDY.length);
    expect(out.every((s) => s.visible)).toBe(true);
  });

  it("null/rỗng: lấy toàn bộ khối mặc định của mẫu", () => {
    expect(resolveSections(null, BURGUNDY).map((s) => s.key)).toEqual(BURGUNDY);
    expect(resolveSections([], BURGUNDY).map((s) => s.key)).toEqual(BURGUNDY);
    expect(resolveSections(undefined, BURGUNDY)).toHaveLength(BURGUNDY.length);
  });

  it("định dạng mới: giữ nguyên trạng thái tắt", () => {
    const out = resolveSections(
      [
        { key: "header", visible: true },
        { key: "countdown", visible: false },
      ],
      BURGUNDY
    );
    expect(out.find((s) => s.key === "countdown")?.visible).toBe(false);
  });

  it("bỏ khối mẫu hiện tại không hỗ trợ", () => {
    const out = resolveSections(
      [{ key: "timeline", visible: true }, { key: "header", visible: true }],
      BURGUNDY
    );
    expect(out.map((s) => s.key)).not.toContain("timeline");
  });

  it("bỏ khối trùng lặp", () => {
    const out = resolveSections(["header", "header", "footer"], BURGUNDY);
    expect(out.filter((s) => s.key === "header")).toHaveLength(1);
  });

  it("khối bắt buộc luôn hiện dù dữ liệu cũ có tắt", () => {
    const out = resolveSections(
      [{ key: "header", visible: false }],
      BURGUNDY
    );
    expect(out.find((s) => s.key === "header")?.visible).toBe(true);
  });

  it("bỏ qua phần tử rác", () => {
    const out = resolveSections([null, 42, { noKey: 1 }, "header"], BURGUNDY);
    expect(out.map((s) => s.key)).toEqual(BURGUNDY);
  });
});

describe("visibleSectionKeys — lọc theo bật/tắt của người dùng", () => {
  it("khối đã tắt không được render", () => {
    const keys = visibleSectionKeys(
      [
        { key: "header", visible: true },
        { key: "countdown", visible: false },
      ],
      BURGUNDY
    );
    expect(keys).toContain("header");
    expect(keys).not.toContain("countdown");
  });

  it("không còn khoá theo gói — mọi khối bật đều hiện, kể cả không truyền plan", () => {
    expect(visibleSectionKeys(null, BURGUNDY)).toEqual(BURGUNDY);
  });

  it("giữ đúng thứ tự người dùng đã kéo-thả", () => {
    const keys = visibleSectionKeys(["footer", "header", "wishes"], BURGUNDY);
    expect(keys.slice(0, 3)).toEqual(["footer", "header", "wishes"]);
  });
});
