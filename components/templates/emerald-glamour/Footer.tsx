"use client";

import type { WeddingData } from "@/types/template";
import { Heart } from "lucide-react";

type FooterProps = {
  wedding: WeddingData;
  isDemo?: boolean;
};

export function Footer({ wedding, isDemo }: FooterProps) {
  return (
    <footer className="py-14 px-6 bg-[#0E3B2E] text-center text-[#E5ECE8] border-t-2 border-[#D4AF37]">
      <div className="max-w-md mx-auto">
        <p className="text-2xl font-serif mb-2 tracking-wide text-white">
          {wedding.groomName} &amp; {wedding.brideName}
        </p>
        <p className="text-xs text-[#E5ECE8]/80 mb-6 font-light">
          Chân thành cảm ơn sự hiện diện quý báu và lời chúc phúc của bạn dành cho ngày vui của chúng tôi!
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#E5ECE8]/60">
          <span>Created with love by</span>
          <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
          <span className="font-serif">Online Wedding</span>
        </div>

        {isDemo && (
          <div className="mt-4 inline-block px-3.5 py-1 rounded-full bg-white/10 text-[#D4AF37] text-[11px] font-medium border border-[#D4AF37]/30">
            Bản xem trước dùng thử (Demo)
          </div>
        )}
      </div>
    </footer>
  );
}
