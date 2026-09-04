"use client";

import type { WeddingData } from "@/types/template";
import { Clock, Crown, Sparkles, HeartHandshake, Wine } from "lucide-react";

type TimelineProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Timeline({ wedding, isBrideMode }: TimelineProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;

  const events = [
    {
      time: ceremony?.ceremonyTime || "09:00",
      title: "NGHI LỄ THÀNH HÔN HOÀNG GIA",
      subtitle: "THE ROYAL UNION CEREMONY",
      desc: "Nghi thức trao lời nguyện thề và trao nhẫn cưới dưới sự chứng giám của hai họ và trời cao.",
      icon: Crown,
    },
    {
      time: ceremony?.receptionTime || "11:30",
      title: "KHAI MẠC ĐẠI YẾN TIỆC",
      subtitle: "IMPERIAL BANQUET & WALTZ",
      desc: "Giai điệu hoàng gia mở màn vũ khúc tân hôn, cùng nâng ly sâm panh chúc phúc cho lứa đôi.",
      icon: Wine,
    },
    {
      time: "13:00",
      title: "CHÚC PHÚC & GIAO LƯU THÂN MẬT",
      subtitle: "ROYAL TOAST & COMMEMORATION",
      desc: "Chụp ảnh kỷ niệm tại đại sảnh và nhận lời chúc tốt đẹp từ toàn thể quan khách tôn quý.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#0B0B14] border-b border-[#C9A84C]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#FFE29F] text-xs font-serif uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            TIẾN TRÌNH HOÀNG ĐẠO
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FFE29F] font-bold tracking-tight">
            Lịch Trình Hôn Lễ Hoàng Gia
          </h2>
          <div className="w-24 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
        </div>

        {/* 3-Column Stepped Procession Cards on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((e, idx) => {
            const Icon = e.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#141424] to-[#0E0E18] border-2 border-[#C9A84C]/40 rounded-2xl p-8 text-center relative group hover:border-[#C9A84C] hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#7A0020] border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-5 text-[#FFE29F] shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/50 text-[#FFE29F] text-xs font-serif font-bold mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>{e.time}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#FFE29F] mb-1">
                    {e.title}
                  </h3>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#C9A84C] block mb-3">
                    {e.subtitle}
                  </span>

                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    {e.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-xs">
                  <span>⚜ TIẾN ĐỘ CHÍNH XÁC ⚜</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
