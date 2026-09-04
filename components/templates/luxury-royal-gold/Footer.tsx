"use client";

import type { WeddingData } from "@/types/template";
import { Heart } from "lucide-react";

type FooterProps = {
  wedding: WeddingData;
  isDemo?: boolean;
};

export function Footer({ wedding, isDemo }: FooterProps) {
  return (
    <footer className="py-14 px-6 bg-[#2B1810] text-center text-[#FFE29F] border-t-2 border-[#E5A93C]">
      <div className="max-w-md mx-auto">
        <p className="text-2xl font-serif mb-2 tracking-wide text-white">
          {wedding.groomName} & {wedding.brideName}
        </p>
        <p className="text-xs text-[#FFE29F]/80 mb-6 font-light">
          Chân thành cảm ơn bạn đã đến chung vui và chúc phúc cùng chúng tôi!
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-[#FFE29F]/60">
          <span>Created with love by</span>
          <Heart className="w-3.5 h-3.5 text-[#E5A93C] fill-current" />
          <span className="font-serif">Online Wedding</span>
        </div>

        {isDemo && (
          <div className="mt-4 inline-block px-3.5 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#FFE29F] text-[11px] font-medium">
            Bản xem trước dùng thử (Demo)
          </div>
        )}
      </div>
    </footer>
  );
}
