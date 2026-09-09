import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Icon nền trang trí, đặt trong vùng trống của section thay vì để trống
 * trơn — `absolute`, `aria-hidden`, không chiếm layout nên không cần thêm
 * khoảng đệm cho nó. Dùng màu viền mảnh (`strokeWidth` nhỏ) + độ mờ thấp để
 * không cạnh tranh với nội dung chính.
 */
export function BgIcon({
  icon: Icon,
  className,
  size = 140,
  strokeWidth = 1,
}: {
  icon: LucideIcon;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <Icon
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      size={size}
      strokeWidth={strokeWidth}
    />
  );
}
