"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Trang Chủ" },
  { href: "/templates", label: "Mẫu Thiệp" },
  { href: "/pricing", label: "Bảng Giá" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSession(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              Thiệp Cưới Online
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-4">
                {session?.user?.role === "ADMIN" && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                      <Shield className="w-4 h-4 mr-1.5" />
                      Admin
                    </Button>
                  </Link>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 rounded-full pl-2 pr-4 flex items-center gap-2 hover:bg-gray-100 outline-none">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                        <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">
                          {(session?.user?.name || "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                        {session?.user?.name || session?.user?.email?.split('@')[0] || "Tài khoản"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-1">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {session?.user?.name && <p className="font-medium text-sm">{session.user.name}</p>}
                        {session?.user?.email && <p className="text-xs text-gray-500 truncate">{session.user.email}</p>}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard">Bảng Điều Khiển</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard/account">Đổi Mật Khẩu</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Đăng Xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Đăng Nhập
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="sm"
                    className="bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    Tạo Thiệp Miễn Phí
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t space-y-2">
                {session ? (
                  <>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg flex items-center gap-3 mb-2 mt-2">
                      <Avatar className="h-10 w-10 border shadow-sm">
                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                        <AvatarFallback className="bg-rose-100 text-rose-700">
                          {(session?.user?.name || "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 text-sm">
                          {session?.user?.name || session?.user?.email?.split('@')[0] || "Tài khoản"}
                        </span>
                        <span className="text-xs text-gray-500">{session?.user?.email}</span>
                      </div>
                    </div>

                    {session?.user?.role === "ADMIN" && (
                      <Link href="/admin" className="block" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full text-amber-600 justify-start" size="sm">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Link href="/dashboard" className="block" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full justify-start text-gray-700" size="sm">
                        Bảng Điều Khiển
                      </Button>
                    </Link>
                    <Link href="/dashboard/account" className="block" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full justify-start text-gray-700" size="sm">
                        Đổi Mật Khẩu
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 mt-2" 
                      size="sm"
                      onClick={() => {
                        setMobileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Đăng Xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full" size="sm">
                        Đăng Nhập
                      </Button>
                    </Link>
                    <Link href="/login" className="block">
                      <Button
                        className="w-full bg-rose-600 hover:bg-rose-700"
                        size="sm"
                      >
                        Tạo Thiệp Miễn Phí
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
