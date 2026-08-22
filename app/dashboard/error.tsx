"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi dashboard:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Không tải được nội dung
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Đã có lỗi xảy ra khi tải trang này. Bạn thử lại xem sao nhé.
      </p>
      <Button onClick={reset} className="bg-rose-600 hover:bg-rose-700">
        Thử lại
      </Button>
    </div>
  );
}
