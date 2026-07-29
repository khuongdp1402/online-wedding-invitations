"use client";

import React from "react";

export default function TimelineVerticalSection({ chapter }) {
  const milestones = (chapter.milestones || []).map((m, i) => ({
    ...m,
    side: i % 2 === 0 ? "left" : "right",
  }));

  return (
    <div
      className="relative w-full flex flex-col items-center"
      style={{ minHeight: "max(100vh, 700px)", padding: "min(15vh, 100px) 5vw" }}
    >
      {/* Title */}
      <h2 className="text-[80px] md:text-[120px] font-[family-name:var(--font-serif-display)] text-center leading-none tracking-tighter text-[var(--color-text-primary)] mb-[min(10vh,80px)]" style={{ textShadow: '0 2px 20px rgba(255,255,255,0.6)' }}>
        {chapter.title}
      </h2>

      {/* Timeline — vertical axis */}
      <div className="relative w-full max-w-4xl">
        {/* Trục dọc — Vol.2: "Trục dọc Timeline xuất hiện" */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-gold)] opacity-40" />

        {/* Milestones */}
        <div className="flex flex-col gap-[min(12vh, 85px)]">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`timeline-item relative flex items-center gap-6 md:gap-8 ${
                m.side === "left" ? "flex-row md:pr-[52%]" : "flex-row-reverse md:pl-[52%]"
              }`}
            >
              {/* Image card */}
              <div className="w-[45vw] md:w-[20vw] aspect-[4/3] bg-white p-[6px] shadow-2xl rounded-sm flex-shrink-0">
                <div className="w-full h-full bg-cover bg-center rounded-[2px]" style={{ backgroundImage: `url(${m.image})` }} />
              </div>

              {/* Dot — Always glowing gold */}
              <div className="timeline-dot absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-gold)] border-2 border-white z-10 shadow-[0_0_15px_var(--color-gold)]" />

              {/* Info Block */}
              <div className="flex flex-col gap-1 max-w-[280px]">
                <p className="text-[10px] tracking-[0.2em] uppercase font-sans text-[var(--color-text-secondary)]">
                  {m.year}
                </p>
                <h3 className="font-[family-name:var(--font-serif-display)] text-base md:text-xl text-[var(--color-text-primary)] font-bold leading-tight">
                  {m.title}
                </h3>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed mt-1 hidden sm:block">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
