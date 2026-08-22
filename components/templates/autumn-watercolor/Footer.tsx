"use client";

import { WeddingData } from "@/lib/template-registry";
import { WatermarkBadge } from "@/components/templates/shared/WatermarkBadge";

export function Footer({ wedding }: { wedding: WeddingData }) {
  return (
    <footer className="py-20 px-6 text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[color-mix(in_srgb,var(--secondary)_30%,transparent)]" />
      
      <div className="space-y-2">
        <p className="font-script text-4xl text-[var(--primary)]">Thank You</p>
        <p className="text-sm opacity-60 tracking-widest uppercase">Trân trọng cảm ơn</p>
      </div>

      <p className="text-xs opacity-40 max-w-[200px] mx-auto italic">
        Sự diện hiện của quý vị là món quà ý nghĩa nhất đối với chúng tôi.
      </p>

      {/* Decorative leaf footer */}
      <div className="pt-10 opacity-30">
        <svg width="40" height="40" viewBox="0 0 100 100" className="mx-auto fill-[var(--secondary)]">
           <path d="M50,10 C60,40 80,40 50,90 C20,40 40,40 50,10" />
        </svg>
      </div>

      <div className="pt-10">
        <p className="text-[10px] opacity-30 uppercase tracking-[0.4em]">© 2026 {wedding.groomName} & {wedding.brideName}</p>
      </div>

      {wedding.status !== "PUBLISHED" && (
        <div className="pt-2">
          <WatermarkBadge />
        </div>
      )}
    </footer>
  );
}
