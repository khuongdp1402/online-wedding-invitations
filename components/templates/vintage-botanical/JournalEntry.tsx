"use client";

import type { WeddingData } from "@/types/template";

type JournalEntryProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function JournalEntry({ wedding, isBrideMode }: JournalEntryProps) {
  const ceremonyTitle = isBrideMode ? "NHẬT KÝ VƯỜN YÊU — LỄ VU QUY" : "NHẬT KÝ VƯỜN YÊU — LỄ TÂN HÔN";

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#F4F1EA] border-b border-[#D8E2D5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Open Botanical Field Journal Page */}
        <div className="bg-[#FCFAF6] border-2 border-[#D8E2D5] p-8 sm:p-14 shadow-lg rounded-2xl relative">
          {/* Faux Washi Tape Accents */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#C5D5C1]/70 backdrop-blur-xs border-y border-[#B2C5AD] shadow-xs rotate-1 z-20" />

          {/* Botanical Corner Leaves */}
          <div className="absolute top-4 left-4 text-emerald-800/40 text-xl select-none">🌿</div>
          <div className="absolute top-4 right-4 text-emerald-800/40 text-xl select-none -scale-x-100">🌿</div>
          <div className="absolute bottom-4 left-4 text-emerald-800/40 text-xl select-none -scale-y-100">🌿</div>
          <div className="absolute bottom-4 right-4 text-emerald-800/40 text-xl select-none -scale-100">🌿</div>

          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#556B2F] font-bold block mb-2">
              HERBARIUM JOURNAL // VOL. 2026
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#2D4A3E] font-bold mb-4">
              {ceremonyTitle}
            </h3>

            <div className="w-16 h-0.5 bg-[#8A9A5B] mx-auto mb-6 rounded-full" />

            <p className="text-sm sm:text-base font-serif italic text-stone-700 leading-relaxed mb-6">
              &ldquo;Như một mầm cây nhỏ đơm hoa sau bao mùa mưa nắng, tình yêu của chúng mình đã trưởng thành và kết trái ngọt ngào. Kính mời quý vị cùng đến khu vườn hạnh phúc, chung vui và chúc phúc cho hành trình xanh ngát của đôi lứa.&rdquo;
            </p>

            <div className="inline-flex items-center gap-3 bg-[#EEF4EC] border border-[#C5D5C1] px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif text-[#2D4A3E] font-bold">
              <span>{wedding.groomName}</span>
              <span className="text-[#8A9A5B]">🌿</span>
              <span>{wedding.brideName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
