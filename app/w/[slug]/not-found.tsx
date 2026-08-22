import Link from "next/link";

/**
 * Hiện khi slug thiệp không tồn tại (notFound() trong page.tsx).
 */
export default function WeddingNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Không tìm thấy thiệp cưới
        </h1>
        <p className="text-gray-500 mb-8">
          Đường dẫn này không tồn tại hoặc đã bị thay đổi. Bạn vui lòng kiểm tra
          lại link được gửi, hoặc liên hệ cô dâu chú rể.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
