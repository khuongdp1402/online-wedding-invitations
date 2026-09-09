"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type AuthMode = "login" | "register";

type OpenAuthOptions = {
  mode?: AuthMode;
  /** Sau khi đăng nhập/đăng ký thành công, điều hướng tới đây (mặc định /dashboard). */
  callbackUrl?: string;
};

type AuthModalContextValue = {
  isOpen: boolean;
  mode: AuthMode;
  callbackUrl: string;
  openAuth: (options?: OpenAuthOptions) => void;
  closeAuth: () => void;
  setMode: (mode: AuthMode) => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

/** Provider toàn site — cho phép bất kỳ component nào mở popup đăng nhập/đăng ký
 * thay vì điều hướng sang trang /login, /register riêng. */
export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");

  const openAuth = useCallback((options?: OpenAuthOptions) => {
    setMode(options?.mode ?? "login");
    setCallbackUrl(options?.callbackUrl ?? "/dashboard");
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, mode, callbackUrl, openAuth, closeAuth, setMode }),
    [isOpen, mode, callbackUrl, openAuth, closeAuth]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal phải dùng bên trong <AuthModalProvider>");
  return ctx;
}
