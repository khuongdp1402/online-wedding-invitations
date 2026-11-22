"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ScrollText,
  Plus,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Tag,
  Ticket,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { WingloveLogo } from "@/components/marketing/WingloveLogo";

const navigation = [
  {
    name: "Tổng Quan",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Thiệp Của Tôi",
    href: "/dashboard/weddings",
    icon: ScrollText,
  },
  {
    name: "Tạo Thiệp Mới",
    href: "/dashboard/weddings/new",
    icon: Plus,
  },
  {
    name: "Hướng Dẫn Sử Dụng",
    href: "/dashboard/guide",
    icon: BookOpen,
  },
  {
    name: "Tài Khoản",
    href: "/dashboard/account",
    icon: User,
  },
];

const adminNavigation = [
  {
    name: "Quản trị",
    href: "/admin",
    icon: Shield,
  },
  {
    name: "Giá mẫu thiệp",
    href: "/admin/templates",
    icon: Tag,
  },
  {
    name: "Mã giảm giá",
    href: "/admin/coupons",
    icon: Ticket,
  },
];

export function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = isAdmin ? [...navigation, ...adminNavigation] : navigation;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center px-6 py-5 border-b">
        <WingloveLogo size={24} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-winglove-red-tint text-winglove-red-deep"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Đăng Xuất
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r transform transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
