import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span className="text-lg font-bold text-white">
                Thiệp Cưới Online
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Nền tảng tạo thiệp cưới online đẹp và chuyên nghiệp. Giúp bạn
              chia sẻ niềm vui ngày cưới đến mọi người thân yêu.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Sản Phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Mẫu Thiệp
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Bảng Giá
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Tạo Thiệp
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@thiepcuoi.online</li>
              <li>Zalo: 0123 456 789</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 Thiệp Cưới Online. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Điều Khoản
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Bảo Mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
