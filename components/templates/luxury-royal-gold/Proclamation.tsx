"use client";

import type { WeddingData } from "@/types/template";
import { Crown } from "lucide-react";

type ProclamationProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Proclamation({ wedding, isBrideMode }: ProclamationProps) {
  const ceremonyTitle = isBrideMode ? "HOÀNG GIA CHIẾU BÁO — LỄ VU QUY" : "HOÀNG GIA CHIẾU BÁO — LỄ TÂN HÔN";

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#0D0D18] border-b border-[#C9A84C]/30 relative overflow-hidden">
      {/* Golden Radiance Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Royal Illuminated Manuscript Scroll Card */}
        <div className="bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFFDF8] border-4 border-[#C9A84C] p-8 sm:p-14 shadow-2xl relative text-center rounded-2xl">
          {/* Baroque Four Corners */}
          <div className="absolute top-3 left-3 text-xl text-[#C9A84C] select-none">⚜</div>
          <div className="absolute top-3 right-3 text-xl text-[#C9A84C] select-none">⚜</div>
          <div className="absolute bottom-3 left-3 text-xl text-[#C9A84C] select-none">⚜</div>
          <div className="absolute bottom-3 right-3 text-xl text-[#C9A84C] select-none">⚜</div>

          {/* Golden Crown Medallion */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-b from-[#7A0020] to-[#4A0012] border-2 border-[#C9A84C] flex items-center justify-center mb-6 shadow-md text-[#FFE29F]">
            <Crown className="w-8 h-8" />
          </div>

          <span className="text-[12px] uppercase font-serif tracking-[0.35em] text-[#C9A84C] font-bold block mb-2">
            IMPERIAL PROCLAMATION
          </span>

          <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#7A0020] tracking-wider mb-4">
            {ceremonyTitle}
          </h3>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6" />

          <p className="text-sm sm:text-base font-serif italic text-stone-700 leading-relaxed max-w-2xl mx-auto mb-8">
            &ldquo;Duyên khởi tự trời cao kết tạo, ý hợp tâm đầu cùng dệt nên thiên sử tình son sắt trăm năm. Trân trọng phụng chiếu tuyên bố ngày đại hỷ thành hôn, thành tâm kính mời quý hoàng thân, quốc thích cùng toàn thể quan khách thân hữu chứng giám lời ước thề.&rdquo;
          </p>

          <div className="inline-flex items-center gap-4 bg-[#7A0020]/5 border border-[#C9A84C]/50 px-8 py-3 rounded-full">
            <span className="text-base sm:text-xl font-serif font-bold text-[#7A0020] tracking-wide">
              {wedding.groomName}
            </span>
            <span className="text-lg text-[#C9A84C]">✦</span>
            <span className="text-base sm:text-xl font-serif font-bold text-[#7A0020] tracking-wide">
              {wedding.brideName}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
