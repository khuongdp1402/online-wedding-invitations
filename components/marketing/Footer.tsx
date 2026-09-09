"use client";

import Link from "next/link";
import { WingloveLogo } from "@/components/marketing/WingloveLogo";
import { useAuthModal } from "@/components/auth/AuthModalContext";

export function Footer() {
  const { openAuth } = useAuthModal();
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <WingloveLogo size={26} variant="dark" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Nền tảng tạo thiệp cưới online đẹp và chuyên nghiệp. Giúp bạn
              chia sẻ niềm vui ngày cưới đến mọi người thân yêu.
            </p>
            <p className="mt-3 text-sm leading-relaxed max-w-sm">
              Một sản phẩm trong hệ sinh thái{" "}
              <span className="font-semibold text-white">KWings</span>.
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
                <button
                  type="button"
                  onClick={() => openAuth({ mode: "register", callbackUrl: "/dashboard/weddings/new" })}
                  className="hover:text-white transition-colors"
                >
                  Tạo Thiệp
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-2 text-sm">
              <li>Phụ trách: Kai</li>
              <li>
                Email:{" "}
                <a href="mailto:khuongdp1402@gmail.com" className="hover:text-white transition-colors">
                  khuongdp1402@gmail.com
                </a>
              </li>
              <li>
                Điện thoại:{" "}
                <a href="tel:0372803085" className="hover:text-white transition-colors">
                  0372 803 085
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 Winglove. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/" className="hover:text-white transition-colors">
              Điều Khoản
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Bảo Mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
