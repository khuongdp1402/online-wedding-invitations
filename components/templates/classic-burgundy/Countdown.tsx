"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { WeddingTemplateProps } from "@/lib/template-registry";
import { useEditOverlay, editSlotClass } from "./EditOverlayContext";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function getParts(targetMs: number): Parts {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
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
          <span className="tabular-nums text-4xl sm:text-5xl lg:text-6xl font-serif cb-text-primary font-medium tracking-tight">{value}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type Props = {
  wedding: WeddingTemplateProps["wedding"];
  mode: WeddingTemplateProps["mode"];
};

export function Countdown({ wedding, mode }: Props) {
  const edit = useEditOverlay();
  const ceremony = mode === "bride" ? wedding.brideCeremony : wedding.groomCeremony;
  // Parse ISO date from ceremony.date field; fallback to Date.now + 30 days
  const targetMs = useMemo(() => {
    try {
      const d = new Date(ceremony.date);
      return isNaN(d.getTime()) ? Date.now() + 30 * 86400000 : d.getTime();
    } catch {
      return Date.now() + 30 * 86400000;
    }
  }, [ceremony.date]);

  const [parts, setParts] = useState<Parts>(() => getParts(targetMs));
  const countdownImage = wedding.gallery[1] || "";

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const items = [
    { label: "Ngày", value: String(parts.days).padStart(2, "0") },
    { label: "Giờ", value: String(parts.hours).padStart(2, "0") },
    { label: "Phút", value: String(parts.minutes).padStart(2, "0") },
    { label: "Giây", value: String(parts.seconds).padStart(2, "0") },
  ];

  return (
    <Section id="countdown" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6">
            <Reveal x={-30}>
              {countdownImage && (
                <div
                  className={editSlotClass(
                    edit,
                    "cb-countdown",
                    "relative aspect-[4/5] sm:aspect-square rounded-t-full overflow-hidden border-[8px] border-white shadow-2xl transition-transform hover:scale-[1.01] duration-700"
                  )}
                  data-wedding-slot="cb-countdown"
                  onClick={() => edit?.onSlotClick?.("cb-countdown")}
                  role={edit?.onSlotClick ? "button" : undefined}
                >
                  <Image src={countdownImage} alt="Together" className="w-full h-full object-cover scale-105" fill unoptimized />
                  <div className="absolute inset-0 opacity-5" style={{ backgroundColor: 'var(--cb-primary)' }} />
                </div>
              )}
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <div className="text-center lg:text-left mb-12">
                <h2 className="cb-text-primary uppercase tracking-[0.25em] text-lg sm:text-xl font-bold mb-6">Đếm ngược ngày trọng đại</h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--cb-accent)] to-transparent mx-auto lg:mx-0 my-8 opacity-60" />
                <p className="mt-8 text-4xl sm:text-5xl font-serif cb-text-primary font-bold tracking-tight">{ceremony.date}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={20}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {items.map((item) => (
                  <div key={item.label} className="bg-white/40 backdrop-blur-md border p-6 rounded-2xl shadow-sm text-center group hover:bg-white/60 transition-colors duration-500" style={{ borderColor: 'color-mix(in srgb, var(--cb-accent) 10%, transparent)' }}>
                    <NumberFlip value={item.value} />
                    <p className="mt-4 text-sm sm:text-base tracking-[0.3em] uppercase cb-text-body font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3} y={20}>
              <div className="mt-16 text-center lg:text-left italic cb-text-body text-lg font-serif opacity-70">
                &ldquo;Dù đi đâu, làm gì, chỉ cần chúng ta bên nhau.&rdquo;
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
