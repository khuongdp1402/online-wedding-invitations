# UI Standard (Tailwind CSS + shadcn/ui)

## Vấn đề 
Dự án dùng Tailwind CSS và shadcn/ui. Cần duy trì tính đồng nhất về CSS class, UI responsive và cấu trúc component (không sử dụng MudBlazor vì đây là stack Next.js/React).

## Rule (Quy tắc bắt buộc)
1. **Library**: Sử dụng Tailwind CSS cho việc styling. Dùng thư viện icon `lucide-react`. Dùng Framer Motion cho các animation.
2. **Components**: Ưu tiên tái sử dụng components có sẵn trong `components/ui/` (được gen từ shadcn/ui như Card, Button, Input, v.v.).
3. **Responsive**: Sử dụng các pre-fix chuẩn Tailwind: `sm:`, `md:`, `lg:` thay vì viết CSS custom media query. Mobile-first design (class không prefix là cho mobile).
4. **Class Merge**: Luôn sử dụng `cn()` từ `lib/utils.ts` (Tailwind Merge và CLSX) khi kết hợp các class có điều kiện để tránh xung đột css rules.
5. **Theme**: Tuân thủ hệ thống màu của dự án (màu chủ đạo: `rose-*`).

## Code Snippet Chuẩn

### 1. Responsive & cn() merging (`components/ButtonExample.tsx`)
```tsx
"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonExampleProps = {
  isLoading?: boolean;
  className?: string;
  onClick: () => void;
};

export function ButtonExample({ isLoading, className, onClick }: ButtonExampleProps) {
  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading}
      // Dùng cn() merge class custom và padding responsive (Mobile nhỏ, Desktop lớn)
      className={cn("w-full sm:w-auto px-4 md:px-6 transition-colors bg-rose-600 hover:bg-rose-700", className)}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Plus className="w-4 h-4 mr-2" />
      )}
      Bấm vào đây
    </Button>
  );
}
```
