import Link from "next/link";
import { WingloveLogo } from "@/components/marketing/WingloveLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-winglove-red-tint/40 via-winglove-ivory to-winglove-gold-soft/40">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="flex items-center w-fit">
          <WingloveLogo size={26} />
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center pb-16">
        {children}
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Winglove. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}
