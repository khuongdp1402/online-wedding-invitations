"use client";

import type { WeddingData } from "@/types/template";
import { Clock, Wine, Music, Camera, Sparkles } from "lucide-react";

type ProgrammeProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Programme({ wedding, isBrideMode }: ProgrammeProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;

  const events = [
    {
      step: "ACT I",
      time: ceremony?.ceremonyTime || "09:00",
      title: "LỄ GIA TIÊN TRANG TRỌNG",
      sub: "THE GOLDEN VOWS",
      desc: "Nghi lễ gia tiên truyền thống đón nhận phúc lành từ hai họ.",
      icon: Sparkles,
    },
    {
      step: "ACT II",
      time: ceremony?.receptionTime || "11:30",
      title: "KHAI TIỆC & THÁP SÂM PANH",
      sub: "CHAMPAGNE TOWER & JAZZ",
      desc: "Khai tiệc mừng với tháp rượu vang, giai điệu nhạc Jazz 1920s du dương.",
      icon: Wine,
    },
    {
      step: "ACT III",
      time: "13:00",
      title: "VŨ ĐIỆU CHARLESTON & ẢNH KỶ NIỆM",
      sub: "DANCE & PHOTO LOUNGE",
      desc: "Giao lưu thân mật cùng bạn bè, lưu lại những bức hình Gatsby lộng lẫy.",
      icon: Camera,
    },
    {
      step: "ACT IV",
      time: "14:30",
      title: "AFTER-HOURS SPEAKEASY",
      sub: "ACOUSTIC & COCKTAIL",
      desc: "Không gian tiệc trà chiều và cocktail thân mật.",
      icon: Music,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#04120D] border-b border-[#D4AF37]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em] mb-2">
            <Clock className="w-3.5 h-3.5" /> PROGRAMME DU SOIR
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-wider">
            Lịch Trình Dạ Tiệc Gatsby
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* 4-Column Stepped Chevron Cards on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0A261D] border-2 border-[#D4AF37]/40 p-6 text-center relative group hover:border-[#D4AF37] hover:scale-105 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] block mb-2">
                    // {item.step}
                  </span>

                  <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#04120D] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="inline-block bg-[#04120D] border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1 text-xs font-mono font-bold mb-3">
                    {item.time}
                  </div>

                  <h3 className="text-base font-serif font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-stone-400 block mb-3">
                    {item.sub}
                  </span>

                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#D4AF37]/20 font-mono text-[10px] text-[#D4AF37]">
                  ◆ GATSBY SOIRÉE ◆
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
