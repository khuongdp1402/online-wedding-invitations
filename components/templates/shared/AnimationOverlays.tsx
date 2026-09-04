"use client";

import { useMemo } from "react";
import "./template-animations.css";

export function SakuraPetalsOverlay() {
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + (i % 3) * 4) % 95}%`,
      delay: `${(i * 0.8) % 6}s`,
      duration: `${7 + (i % 5) * 1.5}s`,
      size: `${14 + (i % 3) * 6}px`,
      opacity: 0.6 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {petals.map((p) => (
        <span
          key={p.id}
          className="animate-sakura-petal block"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
            opacity: p.opacity,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}

export function BotanicalLeavesOverlay() {
  const leaves = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${(i * 10 + (i % 2) * 5) % 92}%`,
      delay: `${(i * 1.1) % 7}s`,
      duration: `${8 + (i % 4) * 2}s`,
      size: `${14 + (i % 3) * 4}px`,
      emoji: i % 2 === 0 ? "🌿" : "🍃",
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {leaves.map((l) => (
        <span
          key={l.id}
          className="animate-botanical-leaf block"
          style={{
            left: l.left,
            animationDelay: l.delay,
            animationDuration: l.duration,
            fontSize: l.size,
          }}
        >
          {l.emoji}
        </span>
      ))}
    </div>
  );
}

export function GoldenSparklesOverlay() {
  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${(i * 8.5 + (i % 4) * 3) % 94}%`,
      top: `${(i * 9 + (i % 5) * 7) % 90}%`,
      delay: `${(i * 0.5) % 4}s`,
      size: `${10 + (i % 3) * 5}px`,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="animate-gold-sparkle absolute block text-amber-300/80"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            fontSize: s.size,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
