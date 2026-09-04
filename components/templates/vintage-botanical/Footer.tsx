"use client";

import type { WeddingData } from "@/types/template";
import { Heart } from "lucide-react";

type FooterProps = {
  wedding: WeddingData;
  isDemo?: boolean;
};

export function Footer({ wedding, isDemo }: FooterProps) {
  return (
    <footer className="py-14 px-6 bg-[#263628] text-center text-[#EAF0E7]">
      <div className="max-w-md mx-auto">
        <p className="text-2xl font-serif mb-2 tracking-wide text-white">
          {wedding.groomName} &amp; {wedding.brideName}
        </p>
        <p className="text-xs text-[#EAF0E7]/80 mb-6 font-light">
          Cảm ơn bạn đã luôn đồng hành và chia sẻ niềm hạnh phúc trong ngày trọng đại này!
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#EAF0E7]/60">
          <span>Created with love by</span>
          <Heart className="w-3.5 h-3.5 text-[#8A9A5B] fill-current" />
          <span className="font-serif">Online Wedding</span>
        </div>

        {isDemo && (
          <div className="mt-4 inline-block px-3.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-medium border border-white/20">
            Bản xem trước dùng thử (Demo)
          </div>
        )}
      </div>
    </footer>
  );
}
