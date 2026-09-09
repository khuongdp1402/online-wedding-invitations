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
  CreditCard,
  MessageSquareHeart,
  Users2,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { WingloveLogo } from "@/components/marketing/WingloveLogo";
import { Badge } from "@/components/ui/badge";

const userNavigation = [
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
    name: "Tài Khoản",
    href: "/dashboard/account",
    icon: User,
  },
];

const adminNavigation = [
  {
    name: "Dashboard Admin",
    href: "/admin",
    icon: LayoutDashboard,
    permission: "VIEW_DASHBOARD",
  },
  {
    name: "Giao Dịch & Tiền",
    href: "/admin/payments",
    icon: CreditCard,
    permission: "MANAGE_PAYMENTS",
  },
  {
    name: "Yêu Cầu Tư Vấn",
    href: "/admin/contacts",
    icon: MessageSquareHeart,
    permission: "MANAGE_CONTACTS",
  },
  {
    name: "Giá & Kho Mẫu",
    href: "/admin/templates",
    icon: Tag,
    permission: "MANAGE_TEMPLATES",
  },
  {
    name: "Mã Giảm Giá",
    href: "/admin/coupons",
    icon: Ticket,
    permission: "MANAGE_COUPONS",
  },
  {
    name: "User & Phân Quyền",
    href: "/admin/users",
    icon: Users2,
    permission: "MANAGE_USERS",
  },
];

interface SidebarProps {
  isAdmin?: boolean;
  role?: string | null;
  permissions?: string[] | null;
  userName?: string | null;
  userEmail?: string | null;
}

export function Sidebar({
  isAdmin = false,
  role,
  permissions = [],
  userName,
  userEmail,
}: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Cho phép truy cập admin nếu role là ADMIN hoặc STAFF
  const hasAdminAccess = isAdmin || role === "ADMIN" || role === "STAFF";

  // Lọc các menu admin theo quyền
  const allowedAdminItems = adminNavigation.filter((item) => {
    if (role === "ADMIN") return true;
    if (role === "STAFF") {
      return (
        item.permission === "VIEW_DASHBOARD" ||
        (Array.isArray(permissions) && permissions.includes(item.permission))
      );
    }
    return isAdmin;
  });

  const isInAdminSection = pathname.startsWith("/admin");

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#FCFBF9]">
      {/* Logo & Portal Badge */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-amber-900/10 bg-white">
        <Link href="/" className="flex items-center gap-2">
          <WingloveLogo size={24} />
        </Link>
        {hasAdminAccess && (
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 border",
              role === "ADMIN"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-teal-50 text-teal-800 border-teal-200"
            )}
          >
            {role === "ADMIN" ? "Admin" : "Staff"}
          </Badge>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Admin Navigation Section */}
        {hasAdminAccess && (
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
                Hệ Thống Quản Trị
              </span>
              <Shield className="w-3 h-3 text-amber-700/60" />
            </div>
            <nav className="space-y-1">
              {allowedAdminItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-[#F7DEDD] text-[#8C1C24] font-semibold shadow-xs"
                        : "text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
                        isActive ? "text-[#8C1C24]" : "text-stone-500"
                      )}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* User Navigation Section */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
              Khu Vực Thiệp Cưới
            </span>
            {hasAdminAccess && (
              <ArrowRightLeft className="w-3 h-3 text-stone-400" />
            )}
          </div>
          <nav className="space-y-1">
            {userNavigation.map((item) => {
              let isActive = false;
              if (!isInAdminSection) {
                if (item.href === "/dashboard") {
                  isActive = pathname === "/dashboard";
                } else if (item.href === "/dashboard/weddings") {
                  // Chỉ active khi ở đúng /dashboard/weddings hoặc xem chi tiết /dashboard/weddings/[id], KHÔNG active khi ở /dashboard/weddings/new
                  isActive =
                    pathname === "/dashboard/weddings" ||
                    (pathname.startsWith("/dashboard/weddings/") &&
                      pathname !== "/dashboard/weddings/new");
                } else if (item.href === "/dashboard/weddings/new") {
                  isActive = pathname === "/dashboard/weddings/new";
                } else {
                  isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                }
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#F7DEDD] text-[#8C1C24] font-semibold shadow-xs"
                      : "text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-[#8C1C24]" : "text-stone-500"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Info & Sign out */}
      <div className="p-3 border-t border-amber-900/10 bg-white">
        {(userName || userEmail) && (
          <div className="px-3 py-2 mb-2 rounded-md bg-[#FAF7F2] border border-amber-900/5">
            <p className="text-xs font-semibold text-stone-800 truncate">
              {userName || "Tài khoản"}
            </p>
            <p className="text-[11px] text-stone-500 truncate">{userEmail}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-red-50 hover:text-red-700 w-full transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Đăng Xuất</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm border-amber-900/10 shadow-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-amber-900/10 transform transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-amber-900/10">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
