"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

/**
 * Badge nổi cố định hiển thị trên MỌI bản xem thử/demo (isDemo=true), bất kể
 * template nào — thay cho việc mỗi template tự cài 1 dòng chữ nhỏ ở Footer
 * (trước đây chỉ 6/11 template có, không nhất quán, dễ bị copy/paste bỏ sót).
 *
 * Mục đích: khi khách chia sẻ link xem thử (dữ liệu mẫu, không phải thiệp
 * thật của họ) cho người khác, người xem luôn biết đây là bản demo của hệ
 * thống — không phải thiệp cưới thật.
 */
export function DemoWatermark() {
  return (
    <Link
      href="/templates"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-3 right-3 z-[9999] flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-medium text-white/90 shadow-lg backdrop-blur-sm transition-colors hover:bg-black/85"
      style={{ pointerEvents: "auto" }}
    >
      <Heart className="h-3 w-3 fill-current text-winglove-red" />
      Bản xem thử &middot; Winglove
    </Link>
  );
}
