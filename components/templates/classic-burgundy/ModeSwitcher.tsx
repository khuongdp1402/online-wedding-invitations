"use client";

import { Flower } from "lucide-react";

type ModeSwitcherProps = {
  mode: "bride" | "groom";
};

export function ModeSwitcher({ mode }: ModeSwitcherProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-[#800020]/20 rounded-full shadow-lg pointer-events-none">
        <Flower className="w-4 h-4 text-[#800020]" />
        <span className="text-sm font-serif font-semibold text-[#800020]">
          {mode === "bride" ? "Nhà Gái" : "Nhà Trai"}
        </span>
      </div>
    </div>
  );
}
