"use client";

import { Sparkles, Shirt } from "lucide-react";

export function DressCode() {
  const colors = [
    { name: "Terracotta", hex: "#C25E42", note: "Đỏ gạch đất nung" },
    { name: "Sunset Gold", hex: "#DDA15E", note: "Vàng hoàng hôn" },
    { name: "Pampas Sand", hex: "#E6D7C3", note: "Cát sa mạc ấm" },
    { name: "Olive Sage", hex: "#8A9A5B", note: "Xanh xô thơm dịu" },
    { name: "Warm Rust", hex: "#9C4128", note: "Nâu đất cổ điển" },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-white border-b border-[#EEDFD5]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF8F5] border border-[#EEDFD5] text-[#C25E42] text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> DRESS CODE & PALETTE
        </div>
        <h2 className="text-3xl font-serif text-[#3A231B] mb-3 font-medium">Sắc Màu Trang Phục</h2>
        <p className="text-xs sm:text-sm text-stone-500 mb-10 max-w-lg mx-auto leading-relaxed">
          Chúng mình khuyến khích quý khách ưu tiên trang phục mang sắc màu đất ấm áp để cùng hòa mình vào không gian tiệc cưới Bohemian lãng mạn.
        </p>

        {/* Ceramic Arch Color Swatches */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mb-12">
          {colors.map((c, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-16 sm:w-14 sm:h-20 rounded-t-full rounded-b-lg shadow-sm border-2 border-white ring-1 ring-[#EEDFD5] transition-all group-hover:-translate-y-2 group-hover:shadow-md"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-xs text-stone-800 font-semibold">{c.name}</span>
              <span className="text-[10px] text-stone-400">{c.note}</span>
            </div>
          ))}
        </div>

        {/* Outfit Suggestions: Dual Arch Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          <div className="bg-[#FDF8F5] border border-[#EEDFD5] rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5E6DD] text-[#C25E42] flex items-center justify-center shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#3A231B] mb-1">Dành Cho Quý Ông</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Âu phục hoặc sơ mi linen, blazer tông màu cát (beige), nâu đất, hoặc olive lịch lãm thoải mái.
              </p>
            </div>
          </div>

          <div className="bg-[#FDF8F5] border border-[#EEDFD5] rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F5E6DD] text-[#C25E42] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#3A231B] mb-1">Dành Cho Quý Cô</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Váy maxi xòe nhẹ, đầm lụa, voan xếp ly mang sắc cam đất, vàng mù tạt hoặc họa tiết hoa nhí phong cách Boho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
