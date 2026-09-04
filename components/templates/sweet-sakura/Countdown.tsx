"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingData } from "@/types/template";

type CountdownProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Countdown({ wedding, isBrideMode }: CountdownProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetDate = ceremony?.date
      ? new Date(ceremony.date)
      : new Date(Date.now() + 60 * 86400000);

    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
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
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [ceremony?.date]);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ss-in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    el.classList.add("ss-reveal-up");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const units = [
    { label: "Ngày", val: timeLeft.days, isSeconds: false },
    { label: "Giờ", val: timeLeft.hours, isSeconds: false },
    { label: "Phút", val: timeLeft.minutes, isSeconds: false },
    { label: "Giây", val: timeLeft.seconds, isSeconds: true },
  ];

  return (
    <section className="py-16 px-5 border-b border-[#F6D6DF] relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #3D1A26 0%, #6B2A3A 30%, #B85070 70%, #FFF0F5 100%)" }}>

      {/* Background sakura emoji decorations */}
      <div className="absolute top-4 left-6 text-5xl opacity-15 select-none pointer-events-none ss-branch-deco">🌸</div>
      <div className="absolute top-6 right-6 text-4xl opacity-15 select-none pointer-events-none ss-branch-deco" style={{ animationDelay: "3s" }}>🌸</div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl opacity-10 select-none pointer-events-none">🌸</div>

      <div ref={sectionRef} className="max-w-sm mx-auto text-center relative z-10">
        {/* Header */}
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#F8B4C4] font-semibold mb-2">
          Countdown
        </p>
        <h2 className="text-2xl font-serif text-white font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Ngày Hạnh Phúc Trọn Vẹn
        </h2>
        <p className="text-sm text-white/60 mb-10 font-light">
          {ceremony?.date || "18 Tháng 10, 2026"}
        </p>

        {/* Countdown digits */}
        <div className="grid grid-cols-4 gap-2.5">
          {units.map((unit, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className={`relative w-full aspect-square rounded-2xl flex items-center justify-center ${unit.isSeconds ? "ss-count-seconds" : ""}`}
                style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(248,180,196,0.3)" }}>
                {/* Decorative corner dots */}
                <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#F8B4C4]/40" />
                <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#F8B4C4]/40" />
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                  {String(unit.val).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#F8B4C4]/80 font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px flex-1 max-w-16 bg-[#F8B4C4]/30" />
          <span className="ss-heartbeat text-[#F8B4C4] text-xl inline-block">♥</span>
          <span className="h-px flex-1 max-w-16 bg-[#F8B4C4]/30" />
        </div>

        {/* Quote */}
        <p className="mt-4 text-xs text-white/50 italic font-light">
          &ldquo;Mỗi giây trôi qua là một bước gần hơn đến ngày hạnh phúc&rdquo;
        </p>
      </div>
    </section>
  );
}

