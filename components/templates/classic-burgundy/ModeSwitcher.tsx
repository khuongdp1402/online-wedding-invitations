"use client";

import { Flower } from "lucide-react";

type ModeSwitcherProps = {
  mode: "bride" | "groom";
};

export function ModeSwitcher({ mode }: ModeSwitcherProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 rounded-full shadow-lg pointer-events-none cb-border-primary" style={{ borderColor: 'color-mix(in srgb, var(--cb-primary) 20%, transparent)' }}>
        <Flower className="w-4 h-4 cb-text-primary" />
        <span className="text-sm font-heading font-semibold cb-text-primary">
          {mode === "bride" ? "Nhà Gái" : "Nhà Trai"}
        </span>
      </div>
    </div>
  );
}
