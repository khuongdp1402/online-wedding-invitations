"use client";

import type { WeddingData } from "@/types/template";
import { Heart } from "lucide-react";

type FooterProps = {
  wedding: WeddingData;
  isDemo?: boolean;
};

export function Footer({ wedding, isDemo }: FooterProps) {
  return (
    <footer className="py-12 px-6 bg-[#FAF9F5] text-center border-t border-[#E8E5DD]">
      <div className="max-w-md mx-auto">
        <p className="text-xl font-serif text-[#2C3E50] mb-2">
          {wedding.groomName} & {wedding.brideName}
        </p>
        <p className="text-xs text-gray-500 mb-6">
          Chân thành cảm ơn bạn đã đến chung vui cùng chúng tôi!
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span>Winglove</span>
        </div>

        {isDemo && (
          <div className="mt-4 inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-medium">
            Bản xem thử dùng thử (Demo)
          </div>
        )}
      </div>
    </footer>
  );
}
