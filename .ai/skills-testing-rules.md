# Testing Rules (Vitest)

## Vấn đề 
Hệ sinh thái của dự án dùng `Vitest` (đã config `vitest.config.ts`), không phải xUnit/bUnit của .NET. Project này chạy React + Next.js App Router.

## Rule (Quy tắc bắt buộc)
1. **Framework**: Dùng `vitest` để Unit Test. Nếu cần test UI, kết hợp phương pháp `@testing-library/react`.
2. **File Naming**: `.test.ts` (cho logic) hoặc `.test.tsx` (cho UI). File đặt kế bên function/component tương ứng hoặc trong thư mục `tests/`.
3. **Mô hình AAA (Arrange - Act - Assert)**: Mọi unit test phải tuân thủ việc chuẩn bị dữ liệu, thực thi và đối chiếu kết quả.
4. **Mocking**: Khi test Next.js API hoặc logic Service, phải mock Prisma database (thông qua `vitest-mock-extended`) để chặn tương tác DB thật.

## Code Snippet Chuẩn

### 1. Test cho một logic Function thuần túy (`utils.test.ts`)
```typescript
import { expect, test, describe } from "vitest";
import { validateFileSize } from "../lib/file-storage";

describe("validateFileSize", () => {
  test("nên từ chối size nhỏ hơn 0 hoặc bằng 0", () => {
    // Arrange & Act & Assert
    expect(validateFileSize(0)).toBe(false);
    expect(validateFileSize(-10)).toBe(false);
  });

  test("nên cấp phép với định mức bình thường (1mb)", () => {
    const size = 1024 * 1024;
    expect(validateFileSize(size)).toBe(true);
  });
});
```

### 2. Test mock DB (Cơ bản)
```typescript
import { vi, expect, test, describe } from "vitest";

// mock singleton prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    wedding: {
      findUnique: vi.fn(),
    }
  }
}));

import { prisma } from "@/lib/prisma";

describe("Mock Prisma DB", () => {
  test("mocking data example", async () => {
    // Arrange
    const mockData = { id: "1", slug: "test-wedding" };
    (prisma.wedding.findUnique as any).mockResolvedValue(mockData);

    // Act
    const res = await prisma.wedding.findUnique({ where: { slug: "test" } });

    // Assert
    expect(res).toEqual(mockData);
    expect(prisma.wedding.findUnique).toHaveBeenCalledOnce();
  });
});
```
