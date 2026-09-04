"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/template";
import { Crown } from "lucide-react";

type CountdownProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Countdown({ wedding, isBrideMode }: CountdownProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = ceremony?.date ? new Date(ceremony.date) : new Date(Date.now() + 30 * 86400000);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [ceremony?.date]);

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#0D0D18] text-center border-b border-[#C9A84C]/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#FFE29F] text-xs font-serif uppercase tracking-[0.3em] mb-3">
          <Crown className="w-3.5 h-3.5 text-[#C9A84C]" />
          THỜI KHẮC HOÀNG KIM
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#FFE29F] font-bold mb-3">
          Đếm Ngược Giờ Hoàng Đạo
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mb-12 font-serif leading-relaxed">
          Từng tích tắc quý giá đều hướng về thời khắc ngập tràn ánh hào quang và khúc ca vĩnh cửu.
        </p>

        {/* 4 Imperial Clock Units */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {[
            { label: "NGÀY", val: timeLeft.days },
            { label: "GIỜ", val: timeLeft.hours },
            { label: "PHÚT", val: timeLeft.minutes },
            { label: "GIÂY", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-[#1A1A2A] to-[#10101C] border-2 border-[#C9A84C] rounded-2xl p-6 shadow-2xl relative group hover:scale-105 transition-transform"
            >
              <div className="absolute top-1.5 left-2 text-[10px] text-[#C9A84C]">⚜</div>
              <div className="absolute top-1.5 right-2 text-[10px] text-[#C9A84C]">⚜</div>

              <span className="block text-3xl sm:text-5xl font-serif font-extrabold text-[#FFE29F] mb-2 tracking-wider">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-serif font-bold text-[#C9A84C] uppercase tracking-widest block border-t border-[#C9A84C]/30 pt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
