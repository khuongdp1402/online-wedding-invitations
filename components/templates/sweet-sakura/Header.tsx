"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingData } from "@/types/template";

type HeaderProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

// Lightweight sakura petal particle system
function SakuraPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const petals: Array<{
      x: number; y: number; size: number; speed: number;
      sway: number; swayOffset: number; rotation: number; rotSpeed: number; opacity: number;
    }> = [];

    const colors = ["#F8B4C4", "#FFD6E7", "#E05A7A", "#FFAFC4"];
    for (let i = 0; i < 30; i++) {
      petals.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 1.2 + 0.5,
        sway: Math.random() * 2 + 1,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.5 + 0.25,
      });
    }

    let frame = 0;
    let animId: number;

    function drawPetal(cx: number, cy: number, size: number, rotation: number, color: string, opacity: number) {
      ctx!.save();
      ctx!.globalAlpha = opacity;
      ctx!.translate(cx, cy);
      ctx!.rotate(rotation);
      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.ellipse(0, -size / 2, size / 2.5, size, 0, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      frame++;
      petals.forEach((p, i) => {
        p.y += p.speed;
        p.x += Math.sin(frame * 0.01 + p.swayOffset) * p.sway * 0.3;
        p.rotation += p.rotSpeed;
        if (p.y > canvas!.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas!.width;
        }
        drawPetal(p.x, p.y, p.size, p.rotation, colors[i % colors.length], p.opacity);
      });
      animId = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[2]" aria-hidden />;
}

// Bloom ripple rings
function BloomRipples() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div key={i} className="ss-bloom-ring absolute" style={{ width: 100, height: 100, animationDelay: `${i * 1.1}s` }} />
      ))}
    </div>
  );
}

export function Header({ wedding, isBrideMode }: HeaderProps) {
  const coverPhoto = wedding.gallery?.[0] || "/templates/classic-burgundy/samples/01.jpg";
  const photo2 = wedding.gallery?.[1] || "/templates/classic-burgundy/samples/02.jpg";
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && <SakuraPetals />}

      {/* ── MOBILE ── */}
      <header className="lg:hidden relative min-h-[100dvh] overflow-hidden flex flex-col"
        style={{ background: "linear-gradient(180deg,#2D0F1B 0%,#6B2A3A 45%,#B85070 70%,#FFF0F5 100%)" }}>
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverPhoto} alt="Ảnh cưới" className="w-full h-full object-cover" style={{ opacity: 0.5, objectPosition: "center 20%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(45,15,27,0.25) 0%,rgba(45,15,27,0.15) 35%,rgba(45,15,27,0.9) 78%,#FFF0F5 100%)" }} />
        </div>

        <BloomRipples />

        <div className="relative z-10 flex flex-col items-center justify-end flex-1 px-6 pb-14 pt-20 text-center">
          <div className="ss-hero-sub mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[10px] uppercase tracking-[0.35em] text-white font-semibold">
              Save The Date
            </span>
          </div>

          <h1 className="ss-hero-name font-serif text-5xl font-light text-white leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
            {firstName}
          </h1>
          <div className="my-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#F8B4C4]/60" />
            <span className="ss-heartbeat text-[#F8B4C4] text-2xl">♥</span>
            <span className="h-px w-12 bg-[#F8B4C4]/60" />
          </div>
          <h1 className="ss-hero-name-2 font-serif text-5xl font-light text-white leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
            {secondName}
          </h1>

          <div className="ss-hero-sub mt-5 space-y-1.5 text-center">
            <p className="text-white/90 font-serif text-lg tracking-wider">{ceremony?.date || "18 Tháng 10, 2026"}</p>
            {ceremony?.lunarDate && <p className="text-[#F8B4C4] text-sm">{ceremony.lunarDate}</p>}
            {ceremony?.venue && <p className="text-white/70 text-sm mt-1">{ceremony.venue}</p>}
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 flex flex-col items-center gap-1.5 opacity-50">
            <div className="w-5 h-8 rounded-full border border-white/50 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
            </div>
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/50">Cuộn Xuống</span>
          </div>
        </div>
      </header>

      {/* ── DESKTOP ── */}
      <header className="hidden lg:grid min-h-screen" style={{ gridTemplateColumns: "55% 45%" }}>
        {/* Left image pane */}
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverPhoto} alt="Ảnh cưới" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 25%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,transparent 50%,rgba(255,240,245,0.85) 100%)" }} />
          <BloomRipples />
          <div className="absolute top-8 left-8 text-5xl opacity-20 ss-branch-deco select-none">🌸</div>
          <div className="absolute bottom-12 left-16 text-4xl opacity-15 ss-branch-deco select-none" style={{ animationDelay: "3s" }}>🌸</div>
        </div>

        {/* Right info pane */}
        <div className="relative flex flex-col justify-center items-center px-14 xl:px-20 py-16 text-center" style={{ background: "linear-gradient(150deg,#FFF0F5 0%,#FFE4EF 50%,#FFF9FB 100%)" }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F8B4C4] to-transparent" />

          <div className="ss-hero-sub mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 border border-[#F6D6DF] shadow-sm">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#D4456B] font-semibold">Wedding Invitation</span>
          </div>

          <h1 className="ss-hero-name font-serif text-6xl xl:text-7xl font-light text-[#3D1A26] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {firstName}
          </h1>
          <div className="my-5 flex items-center justify-center gap-5">
            <span className="h-px w-16" style={{ background: "linear-gradient(to right,transparent,#F8B4C4)" }} />
            <span className="ss-heartbeat text-[#D4456B] text-3xl">♥</span>
            <span className="h-px w-16" style={{ background: "linear-gradient(to left,transparent,#F8B4C4)" }} />
          </div>
          <h1 className="ss-hero-name-2 font-serif text-6xl xl:text-7xl font-light text-[#3D1A26] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {secondName}
          </h1>

          <div className="ss-hero-sub mt-8 space-y-2 text-center">
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#F8B4C4] to-transparent" />
            <p className="font-serif text-xl text-[#3D1A26] tracking-wider mt-3">{ceremony?.date || "18 Tháng 10, 2026"}</p>
            {ceremony?.lunarDate && <p className="text-sm text-[#B85070]">{ceremony.lunarDate}</p>}
            {ceremony?.venue && <p className="text-sm text-stone-500 mt-1">{ceremony.venue}</p>}
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#F8B4C4] to-transparent mt-3" />
          </div>

          {/* Instax decoration */}
          <div className="absolute bottom-10 right-10 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo2} alt="" className="ss-instax-2 w-24 h-28 object-cover rounded-sm"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)", border: "4px solid white" }} />
          </div>

          <div className="absolute bottom-0 left-0 text-6xl opacity-10 select-none">🌸</div>
          <div className="absolute top-6 right-6 text-4xl opacity-20 select-none ss-branch-deco" style={{ animationDelay: "2s" }}>🌸</div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F8B4C4] to-transparent" />
        </div>
      </header>
    </>
  );
}

