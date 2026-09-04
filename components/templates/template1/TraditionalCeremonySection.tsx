"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export function TraditionalCeremonySection() {
  const rituals = [
    {
      step: "01",
      name: "Lễ Dạm Ngõ",
      desc: "Nghi lễ mở đầu tao nhã, hai gia đình chính thức gặp gỡ, trò chuyện và trao nhau cơi trầu nên duyên.",
      icon: "🪷",
    },
    {
      step: "02",
      name: "Lễ Ăn Hỏi",
      desc: "Đoàn nhà trai mang sính lễ tráp son trầu cau sang dâng gia tiên nhà gái, kết giao lời hứa sắt son.",
      icon: "🧧",
    },
    {
      step: "03",
      name: "Lễ Rước Dâu (Vu Quy)",
      desc: "Nghi thức đón tân nương về dinh, bái tạ công ơn dưỡng dục sinh thành của cha mẹ đôi bên.",
      icon: "🏮",
    },
    {
      step: "04",
      name: "Lễ Thành Hôn (Tân Hôn)",
      desc: "Trang trọng tuyên thệ trước toàn thể quan viên hai họ, bạn bè thân hữu cùng chung vui chén rượu mừng.",
      icon: "囍",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#800020] text-[#FFF9E6] border-b-4 border-[#D4A853] relative overflow-hidden text-center">
      {/* Traditional bronze drum / lotus subtle watermark pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4A853_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4A853]/20 border border-[#D4A853] text-[#D4A853] text-xs font-serif uppercase tracking-[0.3em] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          NGHI LỄ TRUYỀN THỐNG VIỆT NAM
        </span>

        <h2 className="text-3xl sm:text-4xl font-serif text-[#FFDF79] font-bold mb-3">
          Tứ Lễ Giao Duyên
        </h2>

        <p className="text-xs sm:text-sm text-[#FFDF79]/80 max-w-lg mx-auto mb-14 font-serif leading-relaxed">
          Gìn giữ nét đẹp văn hoá ngàn đời của người Việt, từng nghi thức được thực hiện trọn vẹn và trang nghiêm.
        </p>

        {/* 4 Rituals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {rituals.map((r, idx) => (
            <div
              key={idx}
              className="bg-[#5C0017] p-5 sm:p-6 rounded-xl border border-[#D4A853]/40 shadow-lg relative group hover:border-[#D4A853] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#D4A853]/20 pb-3">
                <span className="text-2xl">{r.icon}</span>
                <span className="font-mono text-xs text-[#D4A853] font-bold tracking-widest">
                  BƯỚC {r.step}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#FFDF79] mb-2">
                {r.name}
              </h3>
              <p className="font-serif text-xs text-[#FFF9E6]/80 leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
