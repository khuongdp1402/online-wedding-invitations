"use client";

import type { WeddingData } from "@/lib/template-registry";
import { Clock, Sparkles, Utensils, Camera, Heart } from "lucide-react";

type TimelineProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Timeline({ wedding, isBrideMode }: TimelineProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;

  const events = [
    {
      step: "01",
      time: ceremony?.ceremonyTime || "09:00",
      title: "LỄ THÀNH HÔN GIA TIÊN",
      desc: "Nghi lễ gia tiên truyền thống ấm cúng tại tư gia hai họ.",
      icon: Heart,
    },
    {
      step: "02",
      time: ceremony?.receptionTime || "11:30",
      title: "TIỆC CƯỚI BÊN HỒ",
      desc: "Khai tiệc mừng rộn rã trong không gian ngập tràn sắc thu lãng mạn.",
      icon: Utensils,
    },
    {
      step: "03",
      time: "13:00",
      title: "CHỤP ẢNH & LƯU BÚT TÌNH YÊU",
      desc: "Ghi lại những khoảnh khắc đẹp và lời chúc ngọt ngào từ người thương.",
      icon: Camera,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FAF5F0] border-b border-[#E3D4C5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EFE3D8] border border-[#D9C4B3] text-[#8C4A32] text-xs font-serif uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8C4A32]" />
            DÒNG THỜI GIAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#422114] font-medium tracking-tight">
            Lịch Trình Hôn Lễ Mùa Thu
          </h2>
          <div className="w-16 h-0.5 bg-[#B9856F] mx-auto mt-4 rounded-full" />
        </div>

        {/* 3-Column Milestone Cards on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((e, idx) => {
            const Icon = e.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFDF9] border-2 border-[#E3D4C5] rounded-3xl p-8 text-center relative group hover:border-[#B9856F] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#F5EDE4] border-2 border-[#B9856F] flex items-center justify-center mx-auto mb-5 text-[#8C4A32] group-hover:bg-[#8C4A32] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C4A32] font-bold block mb-1">
                    GIAI ĐOẠN // {e.step}
                  </span>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5F0] border border-[#E3D4C5] text-[#422114] text-xs font-mono font-bold mb-3">
                    <Clock className="w-3 h-3 text-[#8C4A32]" />
                    <span>{e.time}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#422114] mb-2">
                    {e.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {e.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E3D4C5] text-xs text-[#8C4A32] font-serif">
                  🍂 Mùa Thu Ngọt Ngào 🍂
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
