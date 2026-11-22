"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Heart, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { useAuthModal } from "@/components/auth/AuthModalContext";

/** Popup đăng nhập / đăng ký dùng chung toàn site — thay cho việc chuyển
 * hẳn sang trang /login, /register. Mở qua `useAuthModal().openAuth(...)`. */
export function AuthModal() {
  const router = useRouter();
  const { isOpen, mode, callbackUrl, closeAuth, setMode } = useAuthModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function resetFormState() {
    setError("");
    setLoading(false);
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeAuth();
      resetFormState();
      setPassword("");
      setConfirmPassword("");
    }
  }

  function switchMode(next: "login" | "register") {
    setMode(next);
    resetFormState();
  }

  async function finishWithRedirect() {
    closeAuth();
    router.push(callbackUrl);
    router.refresh();
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(typeof res.error === "string" ? res.error : "Email hoặc mật khẩu không đúng");
        setLoading(false);
        return;
      }
      await finishWithRedirect();
    } catch (err) {
      console.error("Login error:", err);
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu cần ít nhất 6 ký tự");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          name: name.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại");
        setLoading(false);
        return;
      }
      // Đăng ký xong thì đăng nhập luôn, khỏi bắt gõ lại — mượt hơn cho popup.
      const loginRes = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (loginRes?.error) {
        // Tài khoản đã tạo thành công nhưng auto-login lỗi — chuyển sang tab
        // đăng nhập để khách tự đăng nhập bằng mật khẩu vừa tạo.
        setMode("login");
        setError("Tạo tài khoản thành công — hãy đăng nhập lại.");
        setLoading(false);
        return;
      }
      await finishWithRedirect();
    } catch {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 shadow-sm">
            <Heart className="h-7 w-7 text-rose-600" />
          </div>
          <DialogTitle className="text-xl font-bold">
            {mode === "login" ? "Chào mừng bạn quay lại!" : "Tạo tài khoản Winglove"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Đăng nhập để tạo và quản lý thiệp cưới online của bạn"
              : "Miễn phí — bắt đầu thiết kế thiệp cưới của hai bạn ngay"}
          </DialogDescription>
        </DialogHeader>

        {/* Tab chuyển đăng nhập / đăng ký */}
        <div className="grid grid-cols-2 rounded-full bg-stone-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={cn(
              "rounded-full py-1.5 transition-colors",
              mode === "login" ? "bg-white text-winglove-red shadow-sm" : "text-stone-500"
            )}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={cn(
              "rounded-full py-1.5 transition-colors",
              mode === "register" ? "bg-white text-winglove-red shadow-sm" : "text-stone-500"
            )}
          >
            Đăng ký
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <Mail className="h-4 w-4 text-stone-500" /> Email
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-stone-200 focus:border-amber-700/50"
                autoComplete="email"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <Lock className="h-4 w-4 text-stone-500" /> Mật khẩu
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-stone-200 focus:border-amber-700/50"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="h-11 w-full bg-winglove-red font-medium text-white shadow-sm transition-all hover:bg-winglove-red-deep"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập bằng tài khoản"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <User className="h-4 w-4" /> Họ tên (tùy chọn)
              </label>
              <Input
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
                autoComplete="name"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <Mail className="h-4 w-4" /> Email *
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                autoComplete="email"
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <Lock className="h-4 w-4" /> Mật khẩu * (tối thiểu 6 ký tự)
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                autoComplete="new-password"
                disabled={loading}
                minLength={6}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <Lock className="h-4 w-4" /> Xác nhận mật khẩu *
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
                autoComplete="new-password"
                disabled={loading}
                required
              />
            </div>
            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="h-11 w-full bg-winglove-red font-medium text-white shadow-sm transition-all hover:bg-winglove-red-deep"
              disabled={loading}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký tài khoản"}
            </Button>
          </form>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-stone-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 font-medium text-stone-500">
              {mode === "login" ? "Hoặc đăng nhập với" : "Hoặc đăng ký nhanh với"}
            </span>
          </div>
        </div>

        <GoogleAuthButton callbackUrl={callbackUrl} mode={mode} />
      </DialogContent>
    </Dialog>
  );
}
