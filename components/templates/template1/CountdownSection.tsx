"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { InvitationData } from "./lib/invitation";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type CountdownSectionProps = {
  data: InvitationData;
};

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function clampNonNegative(n: number) {
  return Math.max(0, n);
}

function getParts(targetMs: number): Parts {
  const now = Date.now();
  const diff = clampNonNegative(targetMs - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function NumberFlip({ value }: { value: string }) {
  return (
    <div className="relative h-[3.5rem] sm:h-[4.5rem] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="tabular-nums text-4xl sm:text-5xl lg:text-6xl font-serif text-burgundy font-medium tracking-tight">
            {value}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function CountdownSection({ data }: CountdownSectionProps) {
  const targetMs = useMemo(() => new Date(data.ceremony.startsAtISO).getTime(), [data.ceremony.startsAtISO]);
  const [parts, setParts] = useState<Parts>(() => getParts(targetMs));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const items = [
    { label: "Ngày", value: String(parts.days).padStart(2, "0") },
    { label: "Giờ", value: String(parts.hours).padStart(2, "0") },
    { label: "Phút", value: String(parts.minutes).padStart(2, "0") },
    { label: "Giây", value: String(parts.seconds).padStart(2, "0") }
  ];

  return (
    <Section id="countdown" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          {/* Left side: Arched Image - Larger */}
          <div className="lg:col-span-6">
            <Reveal x={-30}>
              <div className="relative aspect-[4/5] sm:aspect-square rounded-t-full overflow-hidden border-[8px] border-white shadow-2xl transition-transform hover:scale-[1.01] duration-700">
                <img
                  src="/images/z7481583509453_9b098e98c846243154f64e1e5eb8e430.jpg?auto=format&fit=crop&q=80&w=1600"
                  alt="Together"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-burgundy/5" />
              </div>
            </Reveal>
          </div>

          {/* Right side: Countdown Timer */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="text-center lg:text-left mb-12">
                <h2 className="title-primary text-lg sm:text-xl font-bold mb-6 tracking-[0.25em]">
                  Đếm ngược ngày trọng đại
                </h2>
                <div className="gold-divider w-24 lg:mx-0 opacity-60" />
                <p className="mt-8 text-4xl sm:text-5xl font-serif text-burgundy font-bold tracking-tight">
                  {data.ceremony.solarDateLabel}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={20}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {items.map((item) => (
                  <div key={item.label} className="bg-white/40 backdrop-blur-md border border-gold/10 p-6 rounded-2xl shadow-sm text-center group hover:bg-white/60 transition-colors duration-500">
                    <NumberFlip value={item.value} />
                    <p className="mt-4 text-sm sm:text-base tracking-[0.3em] uppercase text-ink font-bold">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3} y={20}>
              <div className="mt-16 text-center lg:text-left italic text-ink/70 text-lg font-serif">
                “Dù đi đâu, làm gì, chỉ cần chúng ta bên nhau.”
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
