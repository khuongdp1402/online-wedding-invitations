"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/template";
import { Flower2 } from "lucide-react";

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
    <section className="py-20 px-4 sm:px-8 bg-[#FAF8F2] text-center border-b border-[#D8E2D5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EBF2E8] border border-[#C5D5C1] text-[#2D4A3E] text-xs font-serif uppercase tracking-[0.25em] mb-2">
          <Flower2 className="w-3.5 h-3.5 text-[#556B2F]" />
          ĐẾM NGƯỢC THỜI GIAN
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#2D4A3E] font-medium mb-3">
          Chờ Đón Ngày Hạnh Phúc
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-12 font-serif leading-relaxed">
          Từng thời khắc đếm ngược là những giọt sương mai nuôi dưỡng tình yêu thêm đong đầy.
        </p>

        {/* 4 Botanical Countdown Units */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xl mx-auto">
          {[
            { label: "NGÀY", val: timeLeft.days },
            { label: "GIỜ", val: timeLeft.hours },
            { label: "PHÚT", val: timeLeft.minutes },
            { label: "GIÂY", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#D8E2D5] rounded-3xl p-6 shadow-sm hover:border-[#8A9A5B] transition-colors"
            >
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-[#2D4A3E] mb-1">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[11px] uppercase text-[#8A9A5B] font-serif font-semibold tracking-wider block border-t border-[#D8E2D5] pt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
