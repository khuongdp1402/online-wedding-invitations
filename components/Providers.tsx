"use client";

import { SessionProvider } from "next-auth/react";
import { AuthModalProvider } from "@/components/auth/AuthModalContext";
import { AuthModal } from "@/components/auth/AuthModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthModalProvider>
        {children}
        <AuthModal />
      </AuthModalProvider>
    </SessionProvider>
  );
}
