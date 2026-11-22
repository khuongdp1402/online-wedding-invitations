"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WaxSealEnvelopeProps = {
  groomName: string;
  brideName: string;
  weddingDate?: string;
  guestName?: string;
  guestSalutation?: string;
  onOpen?: () => void;
};

export function WaxSealEnvelope({
  groomName,
  brideName,
  weddingDate,
  guestName,
  guestSalutation,
  onOpen,
}: WaxSealEnvelopeProps) {
  const [status, setStatus] = useState<"idle" | "opening" | "away">("idle");
  const [opened, setOpened] = useState(false);

  const displayName =
    guestSalutation && guestName
      ? `${guestSalutation} ${guestName}`
      : guestName || null;

  const handleOpenClick = () => {
    if (status !== "idle") return;
    setStatus("opening");

    setTimeout(() => {
      setStatus("away");
    }, 450);

    setTimeout(() => {
      setOpened(true);
      onOpen?.();
    }, 1100);
  };

  if (opened) return null;

  return (
    <AnimatePresence>
      <div
        className={`mdd-intro-overlay fixed inset-0 z-[120] flex items-center justify-center overflow-hidden transition-all duration-700 ${
          status === "away" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(145deg, #6e1a20, #511419, #380a0e)",
        }}
      >
        {/* Subtle ambient particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {[
            { left: "15%", delay: "0s", duration: "8s" },
            { left: "35%", delay: "2s", duration: "10s" },
            { left: "65%", delay: "1s", duration: "9s" },
            { left: "85%", delay: "3s", duration: "11s" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#ece4d8]/20 animate-pulse"
              style={{
                left: p.left,
                top: `${(i * 22) % 80}%`,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        {/* Envelope container */}
        <div
          className={`relative w-[min(90vw,360px)] md:w-[420px] aspect-[4/5] cursor-pointer select-none transition-transform duration-700 ${
            status === "opening" ? "scale-105" : status === "away" ? "-translate-y-[120vh] rotate-[-2deg]" : "hover:scale-[1.02]"
          }`}
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleOpenClick()}
        >
          {/* Shadow beneath */}
          <div className="absolute inset-x-8 bottom-[-15px] h-8 bg-black/40 blur-xl rounded-full" />

          {/* Envelope Body Card */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[#d4a853]/30 bg-[#fdfaf5] flex flex-col items-center justify-between p-8 text-center">
            {/* Paper texture overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply bg-cover bg-center"
              style={{
                backgroundImage: `url(/images/themes/minimalism-dark-red/paper.webp)`,
              }}
            />

            {/* Corner Decorative Borders */}
            <div className="pointer-events-none absolute inset-4 border border-[#511419]/20 rounded-xl" />
            <div className="pointer-events-none absolute inset-5 border border-[#511419]/10 rounded-lg" />

            {/* Top Greeting */}
            <div className="relative z-10 pt-4">
              <span className="text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-[#511419]/70 font-serif">
                Wedding Invitation
              </span>
              {displayName && (
                <div className="mt-3">
                  <span className="text-xs text-[#511419]/60">Trân trọng kính mời</span>
                  <div className="text-lg md:text-xl font-bold text-[#511419] font-serif">
                    {displayName}
                  </div>
                </div>
              )}
            </div>

            {/* Middle: Couple Names */}
            <div className="relative z-10 my-auto py-4">
              <div className="text-3xl md:text-4xl font-serif text-[#511419] tracking-tight">
                {groomName}
              </div>
              <div className="my-2 flex items-center justify-center gap-3">
                <span className="h-[1px] w-12 bg-[#511419]/30" />
                <span className="text-base font-serif italic text-[#c9a24a]">&amp;</span>
                <span className="h-[1px] w-12 bg-[#511419]/30" />
              </div>
              <div className="text-3xl md:text-4xl font-serif text-[#511419] tracking-tight">
                {brideName}
              </div>

              {weddingDate && (
                <p className="mt-4 text-xs md:text-sm tracking-widest text-[#511419]/80 font-serif uppercase">
                  {weddingDate}
                </p>
              )}
            </div>

            {/* Bottom: Wax Seal Button with Pulsing Effect */}
            <div className="relative z-10 pb-2 flex flex-col items-center">
              <div
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
                  status === "opening"
                    ? "scale-125 rotate-12 brightness-150"
                    : "animate-pulse hover:scale-110"
                }`}
                style={{
                  background: "radial-gradient(circle at 35% 35%, #9b2832, #511419, #35080b)",
                  boxShadow: "0 6px 20px rgba(81, 20, 25, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
                }}
              >
                {/* Wax Seal Inner Ring */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#d4a853]/60 flex items-center justify-center">
                  <span className="text-xl md:text-2xl text-[#f5ebd7] font-serif font-bold drop-shadow-sm select-none">
                    囍
                  </span>
                </div>
              </div>
              <span className="mt-3 text-[11px] md:text-xs tracking-wider uppercase text-[#511419]/70 font-medium">
                Chạm để mở thiệp
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
