"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/template";
import { Sparkles } from "lucide-react";

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
    <section className="py-20 px-4 sm:px-8 bg-[#04120D] text-center border-b border-[#D4AF37]/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em] mb-2">
          <Sparkles className="w-3.5 h-3.5" /> COUNTDOWN TO SOIRÉE
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-3">
          Đếm Ngược Thời Khắc Khai Mạc
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mb-12 font-serif leading-relaxed">
          Từng phút giây đang dần trôi về đêm tiệc hoa lệ và rực rỡ nhất trong cuộc đời.
        </p>

        {/* 4 Art Deco Countdown Units */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {[
            { label: "NGÀY", val: timeLeft.days },
            { label: "GIỜ", val: timeLeft.hours },
            { label: "PHÚT", val: timeLeft.minutes },
            { label: "GIÂY", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0A261D] border-2 border-[#D4AF37] p-6 shadow-2xl relative group hover:scale-105 transition-transform"
            >
              <span className="block text-3xl sm:text-5xl font-mono font-extrabold text-[#D4AF37] mb-2 tracking-wider">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest block border-t border-[#D4AF37]/30 pt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
