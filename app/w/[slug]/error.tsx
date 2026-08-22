"use client";

import { useEffect } from "react";

/**
 * Lưới an toàn cho trang thiệp công khai. Khách mời không nên thấy màn hình lỗi
 * mặc định của Next.js khi mở thiệp cưới từ link được chia sẻ.
 */
export default function WeddingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi hiển thị thiệp cưới:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Không mở được thiệp cưới
        </h1>
        <p className="text-gray-500 mb-8">
          Đã có lỗi xảy ra khi hiển thị thiệp. Bạn vui lòng thử tải lại trang,
          hoặc liên hệ cô dâu chú rể nếu vẫn không xem được.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
