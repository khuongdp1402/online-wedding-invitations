"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingData } from "@/types/template";

type HeaderProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

// Gold dust particle canvas
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{ x: number; y: number; size: number; speed: number; opacity: number; drift: number; driftOffset: number }> = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.8 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        drift: Math.random() * 0.5,
        driftOffset: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    let animId: number;
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      frame++;
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(frame * 0.008 + p.driftOffset) * p.drift;
        if (p.y > canvas!.height) { p.y = -5; p.x = Math.random() * canvas!.width; }
        ctx!.save();
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = "#C9A84C";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[2]" aria-hidden />;
}

// Letter-by-letter animated name
function AnimatedName({ name, baseDelay = 0 }: { name: string; baseDelay?: number }) {
  return (
    <span aria-label={name}>
      {name.split("").map((char, i) => (
        <span
          key={i}
          className="lrg-letter inline-block"
          style={{ animationDelay: `${baseDelay + i * 0.06}s` }}
          aria-hidden
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

// Baroque corner ornament (CSS drawn)
function BaroqueCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotate = { tl: "0", tr: "90", bl: "270", br: "180" }[position];
  const cls = `lrg-corner-${position}`;
  return (
    <div
      className={`absolute w-16 h-16 ${cls} pointer-events-none`}
      style={{
        top: position.startsWith("t") ? "12px" : undefined,
        bottom: position.startsWith("b") ? "12px" : undefined,
        left: position.endsWith("l") ? "12px" : undefined,
        right: position.endsWith("r") ? "12px" : undefined,
      }}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
        <path d="M4 4 L28 4 L28 8 L8 8 L8 28 L4 28 Z" fill="#C9A84C" opacity="0.9" />
        <path d="M4 4 L16 4 L16 6 L6 6 L6 16 L4 16 Z" fill="#F0D080" opacity="0.7" />
        <circle cx="18" cy="18" r="3" fill="#C9A84C" opacity="0.6" />
        <circle cx="12" cy="12" r="1.5" fill="#F0D080" opacity="0.8" />
      </svg>
    </div>
  );
}

export function Header({ wedding, isBrideMode }: HeaderProps) {
  const heroImage = wedding.gallery?.[0] || "/templates/classic-burgundy/samples/01.jpg";
  const photo2 = wedding.gallery?.[1] || "/templates/classic-burgundy/samples/02.jpg";
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && <GoldParticles />}

      {/* ── MOBILE ── */}
      <header className="lg:hidden relative min-h-[100dvh] overflow-hidden flex flex-col"
        style={{ background: "linear-gradient(180deg, #0A0A12 0%, #1A0820 30%, #3D0015 70%, #0A0A12 100%)" }}>

        {/* Full-bleed hero image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt="Ảnh cưới hoàng gia" className="w-full h-full object-cover" style={{ opacity: 0.35, objectPosition: "center 20%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,18,0.3) 0%, rgba(10,10,18,0.15) 35%, rgba(10,10,18,0.95) 80%, #0A0A12 100%)" }} />
        </div>

        {/* Baroque corners */}
        <BaroqueCorner position="tl" />
        <BaroqueCorner position="tr" />
        <BaroqueCorner position="bl" />
        <BaroqueCorner position="br" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-end flex-1 px-8 pb-14 pt-20 text-center">
          {/* Crown */}
          <div className="lrg-crown-float text-4xl mb-4">👑</div>

          {/* Save the Date badge */}
          <div className="mb-4 lrg-seal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/50 bg-[#C9A84C]/10 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#F0D080] font-semibold">Thiệp Cưới Hoàng Gia</span>
          </div>

          {/* Names */}
          <h1 className="lrg-gold-glow font-serif text-5xl font-bold leading-none mb-3" style={{ fontFamily: "'Cinzel', serif", color: "#F0D080" }}>
            <AnimatedName name={firstName} baseDelay={0.4} />
          </h1>
          <div className="flex items-center gap-3 my-3">
            <span className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span className="text-[#C9A84C] text-lg font-serif">✦</span>
            <span className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>
          <h1 className="lrg-gold-glow font-serif text-5xl font-bold leading-none" style={{ fontFamily: "'Cinzel', serif", color: "#F0D080" }}>
            <AnimatedName name={secondName} baseDelay={0.8} />
          </h1>

          {/* Date */}
          <div className="mt-6 space-y-1.5 text-center lrg-divider-line">
            <p className="text-[#C9A84C] font-serif text-sm uppercase tracking-[0.2em]">{ceremony?.date || "22 Tháng 11, 2026"}</p>
            {ceremony?.lunarDate && <p className="text-[#C9A84C]/60 text-xs">{ceremony.lunarDate}</p>}
          </div>

          {/* Scroll cue */}
          <div className="mt-10 flex flex-col items-center gap-1.5 opacity-50 lrg-scroll-cue">
            <div className="w-5 h-8 rounded-full border border-[#C9A84C]/50 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#C9A84C] animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      {/* ── DESKTOP ── */}
      <header className="hidden lg:grid min-h-screen" style={{ gridTemplateColumns: "50% 50%" }}>
        {/* Left: dark info panel */}
        <div className="relative flex flex-col justify-center items-center px-14 xl:px-20 py-16 text-center"
          style={{ background: "linear-gradient(150deg, #0A0A12 0%, #1A0820 50%, #0D0810 100%)" }}>

          {/* Baroque corners */}
          <BaroqueCorner position="tl" />
          <BaroqueCorner position="bl" />

          {/* Crown */}
          <div className="lrg-crown-float text-5xl mb-6">👑</div>

          {/* Save date badge */}
          <div className="lrg-seal mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#F0D080] font-semibold">Hoàng Gia Thiệp Cưới</span>
          </div>

          <h1 className="lrg-gold-glow font-serif text-6xl xl:text-7xl font-bold leading-none mb-4" style={{ fontFamily: "'Cinzel', serif", color: "#F0D080" }}>
            <AnimatedName name={firstName} baseDelay={0.5} />
          </h1>

          <div className="flex items-center gap-5 my-5">
            <div className="lrg-divider-line h-px flex-1 max-w-20" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span className="text-[#C9A84C] text-2xl font-serif">✦</span>
            <div className="lrg-divider-line h-px flex-1 max-w-20" style={{ background: "linear-gradient(to left, transparent, #C9A84C)", animationDelay: "0.2s" }} />
          </div>

          <h1 className="lrg-gold-glow font-serif text-6xl xl:text-7xl font-bold leading-none mb-8" style={{ fontFamily: "'Cinzel', serif", color: "#F0D080" }}>
            <AnimatedName name={secondName} baseDelay={0.9} />
          </h1>

          {/* Date & venue */}
          <div className="space-y-2 lrg-reveal lrg-in-view" style={{ animationDelay: "1.5s" }}>
            <div className="h-px w-32 mx-auto" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />
            <p className="text-[#C9A84C] font-serif text-lg uppercase tracking-wider mt-3">{ceremony?.date || "22 Tháng 11, 2026"}</p>
            {ceremony?.lunarDate && <p className="text-[#C9A84C]/60 text-sm">{ceremony.lunarDate}</p>}
            {ceremony?.venue && <p className="text-[#F5E6C8]/50 text-sm mt-1">{ceremony.venue}</p>}
            <div className="h-px w-32 mx-auto mt-3" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />
          </div>

          {/* Wax seal decoration */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl opacity-30 select-none">⚜</div>
        </div>

        {/* Right: fullbleed image */}
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt="Ảnh cưới hoàng gia" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent 40%, rgba(10,10,18,0.6) 100%)" }} />

          {/* Gold frame overlay */}
          <div className="absolute inset-4 pointer-events-none" style={{ border: "1px solid rgba(201,168,76,0.3)" }} />

          {/* Baroque corners on image side */}
          <BaroqueCorner position="tr" />
          <BaroqueCorner position="br" />

          {/* Second photo — positioned as an inset */}
          <div className="absolute bottom-8 right-8 w-28 h-36 pointer-events-none" style={{ border: "3px solid #C9A84C", boxShadow: "0 0 20px rgba(201,168,76,0.4)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo2} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Decorative quote overlaid on image */}
          {wedding.quote && (
            <div className="absolute bottom-8 left-8 right-44 lrg-reveal lrg-in-view" style={{ animationDelay: "1.8s" }}>
              <p className="text-xs italic text-[#F0D080]/80 leading-relaxed font-serif">
                &ldquo;{wedding.quote}&rdquo;
              </p>
            </div>
          )}
        </div>
      </header>
    </>
  );
}


