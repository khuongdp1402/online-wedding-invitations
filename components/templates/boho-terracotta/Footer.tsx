"use client";

import type { WeddingData } from "@/types/template";
import { Heart } from "lucide-react";

type FooterProps = {
  wedding: WeddingData;
  isDemo?: boolean;
};

export function Footer({ wedding, isDemo }: FooterProps) {
  return (
    <footer className="py-14 px-6 bg-[#3A231B] text-center text-[#F5E6DD]">
      <div className="max-w-md mx-auto">
        <p className="text-2xl font-serif mb-2 tracking-wide text-white">
          {wedding.groomName} &amp; {wedding.brideName}
        </p>
        <p className="text-xs text-[#F5E6DD]/80 mb-6 font-light">
          Chân thành cảm ơn bạn đã gửi trọn yêu thương và chung vui cùng chúng tôi!
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#F5E6DD]/60">
          <span>Created with love by</span>
          <Heart className="w-3.5 h-3.5 text-[#C25E42] fill-current" />
          <span className="font-serif">Winglove</span>
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
