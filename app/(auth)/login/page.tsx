"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Shield, Sparkles, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent) {
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
        callbackUrl,
        redirect: false,
      });
      // NextAuth v5 có thể trả về URL string hoặc object { ok, error, url }
      if (typeof res === "string") {
        router.push(res || callbackUrl);
        router.refresh();
        return;
      }
      if (res?.error) {
        setError(typeof res.error === "string" ? res.error : "Email hoặc mật khẩu không đúng");
        setLoading(false);
        return;
      }
      const url = res?.url ?? callbackUrl;
      router.push(url);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-4">
      <Card className="shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-sm">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Chào mừng bạn!</CardTitle>
          <CardDescription className="text-base mt-1">
            Đăng nhập để tạo và quản lý thiệp cưới online của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {/* Đăng nhập bằng email/mật khẩu */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-500" /> Email
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
              <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-500" /> Mật khẩu
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
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full h-11 bg-winglove-red hover:bg-winglove-red-deep text-white font-medium shadow-sm transition-all"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập bằng tài khoản"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-stone-500 font-medium">Hoặc đăng nhập với</span>
            </div>
          </div>

          {/* Đăng nhập nhanh với Google (Gmail) */}
          <GoogleAuthButton callbackUrl={callbackUrl} mode="login" />

          <p className="text-center text-sm text-stone-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="font-semibold text-winglove-red hover:underline">
              Đăng ký ngay
            </Link>
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 text-sm text-gray-500">
              <Shield className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Thông tin của bạn được bảo mật hoàn toàn</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-500">
              <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Tạo thiệp cưới miễn phí, chỉ cần đăng nhập</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md mx-4">
          <Card className="shadow-xl border-0">
            <CardContent className="flex items-center justify-center py-20">
              <div className="animate-pulse text-gray-400">Đang tải...</div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}