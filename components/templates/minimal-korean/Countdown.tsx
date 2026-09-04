"use client";

import { useEffect, useState } from "react";
import type { WeddingData } from "@/types/template";

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
    <section className="py-12 px-6 bg-[#FAF9F5] text-center">
      <div className="max-w-md mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-[#B39D82] font-semibold mb-2">
          COUNTDOWN
        </p>
        <h2 className="text-xl font-serif text-[#2C3E50] mb-6">Đếm Ngược Ngày Chung Đôi</h2>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
          {[
            { label: "Ngày", val: timeLeft.days },
            { label: "Giờ", val: timeLeft.hours },
            { label: "Phút", val: timeLeft.minutes },
            { label: "Giây", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E8E5DD] rounded-xl p-3 shadow-xs">
              <span className="block text-xl sm:text-2xl font-serif text-[#2C3E50] font-semibold">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase text-[#777777] font-medium tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
