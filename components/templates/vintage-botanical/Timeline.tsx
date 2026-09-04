"use client";

import type { WeddingData } from "@/types/template";
import { Clock, Flower2, Utensils, Camera, Leaf } from "lucide-react";

type TimelineProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Timeline({ wedding, isBrideMode }: TimelineProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;

  const events = [
    {
      stage: "CHỚM NỤ",
      time: ceremony?.ceremonyTime || "09:00",
      title: "NGHI LỄ GIA TIÊN",
      desc: "Nghi lễ gia tiên trong không gian hương hoa dịu mát tại tư gia.",
      icon: Leaf,
    },
    {
      stage: "ĐƠM HOA",
      time: ceremony?.receptionTime || "11:30",
      title: "TIỆC CƯỚI TRONG VƯỜN",
      desc: "Khai tiệc thân mật giữa thiên nhiên, giai điệu mộc mạc và rượu vang ấm cúng.",
      icon: Utensils,
    },
    {
      stage: "KẾT TRÁI",
      time: "13:00",
      title: "CHỤP ẢNH & LƯU BÚT KỶ NIỆM",
      desc: "Cùng lưu lại những khung hình rạng rỡ và ký tên lên cuốn sổ lưu bút thảo mộc.",
      icon: Camera,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FAF8F2] border-b border-[#D8E2D5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EBF2E8] border border-[#C5D5C1] text-[#2D4A3E] text-xs font-serif uppercase tracking-[0.25em] mb-2">
            <Flower2 className="w-3.5 h-3.5 text-[#556B2F]" />
            CON ĐƯỜNG ĐƠM HOA
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D4A3E] font-medium tracking-tight">
            Lịch Trình Đơm Hoa Kết Trái
          </h2>
          <div className="w-16 h-0.5 bg-[#8A9A5B] mx-auto mt-4 rounded-full" />
        </div>

        {/* 3-Column Milestone Cards with Leaf Badges on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((e, idx) => {
            const Icon = e.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#D8E2D5] rounded-3xl p-8 text-center relative group hover:border-[#8A9A5B] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#EEF4EC] border-2 border-[#8A9A5B] flex items-center justify-center mx-auto mb-5 text-[#2D4A3E] group-hover:bg-[#2D4A3E] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8A9A5B] font-bold block mb-1">
                    GIAI ĐOẠN: {e.stage}
                  </span>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F2] border border-[#D8E2D5] text-[#2D4A3E] text-xs font-mono font-bold mb-3">
                    <Clock className="w-3 h-3 text-[#8A9A5B]" />
                    <span>{e.time}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#2D4A3E] mb-2">
                    {e.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {e.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#D8E2D5] text-xs text-[#8A9A5B] font-serif">
                  🌿 Hạnh Phúc Đơm Chồi 🌿
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
