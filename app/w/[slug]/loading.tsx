/**
 * Khách mời thường mở thiệp trên 3G/4G, nên cần trạng thái chờ thay vì màn
 * hình trắng trong lúc tải template và ảnh.
 */
export default function WeddingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-400 tracking-widest uppercase">
          Đang mở thiệp...
        </p>
      </div>
    </div>
  );
}
