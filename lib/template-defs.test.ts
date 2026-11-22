import { describe, it, expect } from "vitest";
import { TEMPLATE_DEFS } from "../prisma/template-defs.cjs";
import { SECTIONS } from "@/lib/section-registry";

type TemplateDef = {
  slug: string;
  name: string;
  price: number;
  config: { sections: string[]; defaultColors: Record<string, string> };
};

const defs = TEMPLATE_DEFS as TemplateDef[];

/**
 * Trước đây `prisma/seed.ts` và `scripts/seed-docker.cjs` khai template riêng
 * và đã lệch nhau: bản Docker seed 5 mẫu không tồn tại trong registry (chọn vào
 * là vỡ trang) và bỏ sót 3 mẫu đang chạy. Các test này chặn tình huống đó tái diễn.
 */
describe("Định nghĩa template dùng chung", () => {
  it("đầy đủ 125 mẫu (2 mẫu gốc trên banner + 123 mẫu thieponline.app), slug không trùng", () => {
    expect(defs).toHaveLength(125);
    expect(new Set(defs.map((t) => t.slug)).size).toBe(125);
  });

  it("mọi mẫu đều khớp slug trong lib/template-registry.ts", async () => {
    // import động: registry dùng next/dynamic nên chỉ nạp được trong môi trường test
    const { templates } = await import("@/lib/template-registry");
    for (const def of defs) {
      expect(
        templates[def.slug],
        `Mẫu "${def.slug}" được seed nhưng KHÔNG có trong registry — chọn vào sẽ vỡ trang`
      ).toBeDefined();
    }
  });

  it("registry không có mẫu nào bị bỏ quên khi seed", async () => {
    const { templates } = await import("@/lib/template-registry");
    const seeded = new Set(defs.map((t) => t.slug));
    for (const slug of Object.keys(templates)) {
      expect(
        seeded.has(slug),
        `Mẫu "${slug}" có trong registry nhưng không được seed — sẽ không hiện ở trang chọn mẫu`
      ).toBe(true);
    }
  });

  it("sections của mỗi mẫu đều có định nghĩa trong section-registry", () => {
    for (const def of defs) {
      for (const key of def.config.sections) {
        expect(
          SECTIONS[key],
          `Mẫu "${def.slug}" dùng section "${key}" chưa khai trong section-registry — sidebar sẽ hiện slug thô`
        ).toBeDefined();
      }
    }
  });

  it("mọi mẫu đều có price > 0", () => {
    for (const def of defs) {
      expect(def.price, `Mẫu "${def.slug}" thiếu giá xuất bản`).toBeGreaterThan(0);
    }
  });
});
