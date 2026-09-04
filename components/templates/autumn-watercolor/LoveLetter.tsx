"use client";

import type { WeddingData } from "@/lib/template-registry";
import { Heart } from "lucide-react";

type LoveLetterProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function LoveLetter({ wedding, isBrideMode }: LoveLetterProps) {
  const ceremonyTitle = isBrideMode ? "BỨC THƯ TÌNH MÙA THU — LỄ VU QUY" : "BỨC THƯ TÌNH MÙA THU — LỄ TÂN HÔN";

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#F5EDE4] border-b border-[#E3D4C5] relative overflow-hidden">
      {/* Decorative Autumn Leaves & Watercolor Bleed */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#B9856F]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Deckle Edge Torn Paper Letter */}
        <div className="bg-[#FFFDF9] border-2 border-[#E3D4C5] p-8 sm:p-14 shadow-lg rounded-2xl relative text-center">
          <div className="w-12 h-12 rounded-full bg-[#F5EDE4] border border-[#B9856F] flex items-center justify-center mx-auto mb-4 text-[#8C4A32] shadow-xs">
            <Heart className="w-5 h-5 fill-current" />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C4A32] font-bold block mb-2">
            AUTUMN ROMANCE // LOVE LETTER
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#422114] font-bold mb-4">
            {ceremonyTitle}
          </h3>

          <div className="w-16 h-0.5 bg-[#B9856F] mx-auto mb-6 rounded-full" />

          <p className="text-sm sm:text-base font-serif italic text-stone-700 leading-relaxed max-w-2xl mx-auto mb-6">
            &ldquo;Mùa thu mang theo ngọn gió lành và những chiếc lá vàng dệt nên khúc ca êm dịu. Giữa khoảnh khắc đẹp nhất của đất trời, chúng mình tìm thấy bến đỗ bình yên nơi nhau. Trân trọng kính mời quý người thương đến chia vui cùng chúng mình trong ngày thu nồng ấm.&rdquo;
          </p>

          <div className="inline-flex items-center gap-3 bg-[#F7F1EB] border border-[#E3D4C5] px-6 py-2 rounded-full text-sm font-serif text-[#422114] font-bold">
            <span>{wedding.groomName}</span>
            <span className="text-[#8C4A32]">🍂</span>
            <span>{wedding.brideName}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
