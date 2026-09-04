"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/template";
import { Sun } from "lucide-react";

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
    <section className="py-16 px-4 sm:px-8 bg-[#FDF8F5] text-center border-b border-[#EEDFD5] relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EEDFD5] text-[#C25E42] text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
          <Sun className="w-3.5 h-3.5" /> SAVE THE DATE
        </div>
        <h2 className="text-3xl font-serif text-[#3A231B] mb-2 font-medium">Đếm Ngược Ngày Chung Đôi</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto mb-10">
          Chỉ còn ít ngày nữa, một hành trình mới rạng rỡ của chúng mình sẽ chính thức bắt đầu.
        </p>

        {/* Earthen Arch Countdown Unit Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xl mx-auto">
          {[
            { label: "Ngày", val: timeLeft.days },
            { label: "Giờ", val: timeLeft.hours },
            { label: "Phút", val: timeLeft.minutes },
            { label: "Giây", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#EEDFD5] rounded-t-full rounded-b-2xl p-5 shadow-sm hover:border-[#C25E42] transition-colors"
            >
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-[#C25E42] mb-1">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[11px] uppercase text-stone-500 font-semibold tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
