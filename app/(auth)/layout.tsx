import { Heart } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
          <span className="text-lg font-bold text-gray-900">Thiệp Cưới Online</span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center pb-16">
        {children}
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Thiệp Cưới Online. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}
