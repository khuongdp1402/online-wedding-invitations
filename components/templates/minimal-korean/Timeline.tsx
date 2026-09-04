"use client";

import type { WeddingData } from "@/types/template";
import { Clock, Heart, Utensils, Camera, Music } from "lucide-react";

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
      title: isBrideMode ? "LỄ VU QUY" : "LỄ TÂN HÔN",
      subtitle: "FORMAL CEREMONY",
      desc: "Nghi lễ gia tiên truyền thống trang nghiêm tại tư gia hai họ.",
      icon: Heart,
    },
    {
      step: "02",
      time: ceremony?.receptionTime || "11:30",
      title: "TIỆC CƯỚI CHÍNH THỨC",
      subtitle: "BANQUET & TOAST",
      desc: "Khai tiệc mừng, nâng ly chúc phúc cùng gia đình, người thân và bạn bè.",
      icon: Utensils,
    },
    {
      step: "03",
      time: "13:00",
      title: "CHỤP ẢNH & KỶ NIỆM",
      subtitle: "PHOTO SESSION",
      desc: "Ghi lại những khoảnh khắc đáng nhớ và gửi trao lời chúc thân thương.",
      icon: Camera,
    },
    {
      step: "04",
      time: "14:00",
      title: "AFTER PARTY",
      subtitle: "MUSIC & COCKTAIL",
      desc: "Giao lưu thân mật cùng bạn bè thân thiết trong giai điệu acoustic.",
      icon: Music,
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-12 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-stone-900 pb-4 mb-12">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400 block mb-1">
              // TIMETABLE & PROTOCOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Lịch Trình Hôn Lễ
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest mt-2 sm:mt-0">
            STANDARD TIME (GMT+7)
          </span>
        </div>

        {/* 4-Column Horizontal Timetable on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="border border-stone-200 p-6 bg-[#FAF9F6] relative group hover:border-stone-900 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-stone-400 font-mono text-xs mb-3">
                    <span className="font-bold text-stone-900">[{item.step}]</span>
                    <Icon className="w-4 h-4 text-stone-700" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold bg-stone-900 text-white px-2.5 py-1 mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-stone-900 mb-1">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block mb-3">
                    {item.subtitle}
                  </span>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-200 font-mono text-[10px] text-stone-400 flex items-center justify-between">
                  <span>CONFIRMED</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
