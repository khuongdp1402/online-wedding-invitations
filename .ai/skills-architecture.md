# Architecture Rules (Next.js & Prisma)

## Vấn đề 
Code hiện tại đang gộp chung Business Logic vào Route Handlers (`app/api/*/route.ts`), khó mock và test. Thiếu validation chặt chẽ 2 đầu.

## Rule (Quy tắc bắt buộc)
1. **App Router Conventions**: Sử dụng Next.js App Router (`app/`). Phân tách rõ ràng Server Component (mặc định) và Client Component (`"use client"`). Chỉ dùng `"use client"` khi cần hook hoặc tương tác UI.
2. **Layered Architecture**: `Route Handler` (nhận request, validate Zod) -> `Service Layer` (chứa business logic) -> `Prisma` (DB access). Tuyệt đối không gọi Prisma trực tiếp trong Component.
3. **Validation**: API luôn phải dùng `Zod` để validate Request Body trước khi xử lý. 
4. **Error Handling**: API phải trả về block JSON thống nhất `{ error: string, details?: any }` và status code phù hợp (400, 401, 403, 404, 500).

## Code Snippet Chuẩn

### 1. Zod Validation & Route Handler (`app/api/example/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { ExampleService } from "@/lib/services/example.service";
import { auth } from "@/lib/auth";

const CreateSchema = z.object({
  title: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = CreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = await ExampleService.create(session.user.id, parsed.data);
    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
```

### 2. Service Layer (`lib/services/example.service.ts`)
```typescript
import { prisma } from "@/lib/prisma";

export class ExampleService {
  static async create(userId: string, data: { title: string }) {
    // Business logic
    return await prisma.example.create({
      data: { ...data, userId }
    });
  }
}
```
