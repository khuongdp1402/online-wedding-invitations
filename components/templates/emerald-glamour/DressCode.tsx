"use client";

import { Sparkles, Crown } from "lucide-react";

export function DressCode() {
  const colors = [
    { name: "Emerald", hex: "#0E3B2E", note: "Xanh ngọc lục bảo" },
    { name: "Champagne Gold", hex: "#D4AF37", note: "Ánh kim champagne" },
    { name: "Midnight Black", hex: "#111815", note: "Đen tuyền quý phái" },
    { name: "Velvet Cream", hex: "#FAF5E9", note: "Trắng kem nhung" },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#061811] border-b border-[#D4AF37]/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em] mb-2">
          <Crown className="w-3.5 h-3.5" /> DRESS CODE & ATTIRE
        </div>
        <h2 className="text-3xl font-serif text-white mb-3 font-bold">Quy Chuẩn Trang Phục (Black-Tie)</h2>
        <p className="text-xs sm:text-sm text-stone-300 mb-12 max-w-lg mx-auto leading-relaxed font-serif">
          Khuyến khích quý vị diện trang phục phong cách dạ tiệc cổ điển 1920s hoặc Black-Tie sang trọng để cùng tạo nên một đêm tiệc hoàn hảo.
        </p>

        {/* Diamond Swatches */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12">
          {colors.map((c, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rotate-45 border-2 border-[#D4AF37] shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-90 duration-500"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-xs text-white font-bold font-serif mt-2">{c.name}</span>
              <span className="text-[10px] text-stone-400">{c.note}</span>
            </div>
          ))}
        </div>

        {/* Dual Attire Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          <div className="bg-[#0A261D] border border-[#D4AF37]/50 p-6 rounded-none">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">
              ✦ QUÝ ÔNG (GENTLEMEN)
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Âu phục Tuxedo, Vest lịch lãm tông màu đen, xanh ngọc đậm hoặc xám than cùng nơ bướm hoặc cà vạt cổ điển.
            </p>
          </div>

          <div className="bg-[#0A261D] border border-[#D4AF37]/50 p-6 rounded-none">
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">
              ✦ QUÝ CÔ (LADIES)
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Đầm dạ hội dáng dài, váy lụa hoặc đầm ánh kim (sequin/flapper) phong cách Gatsby quyến rũ kết hợp phụ kiện ngọc trai.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
