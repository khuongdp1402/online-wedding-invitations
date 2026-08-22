"use client";

import React from "react";
import { useWeddingData } from "../StoryEngine";
import { weddingData as staticWeddingData } from "../config/weddingData";

export default function FamilyTreeSection({ chapter }) {
  const contextData = useWeddingData();
  const activeWeddingData = contextData || staticWeddingData;
  const nhaTrai = activeWeddingData.nhatrai;
  const nhaGai = activeWeddingData.nhagai;
  const groom = activeWeddingData.couple.groom;
  const bride = activeWeddingData.couple.bride;

  return (
    <div
      className="relative w-full flex flex-col items-center"
      style={{ minHeight: "max(100vh, 700px)", padding: "min(15vh, 100px) 5vw" }}
    >
      {/* Title */}
      <h2 className="text-[60px] md:text-[100px] font-[family-name:var(--font-serif-display)] text-center leading-none tracking-tighter text-[var(--color-text-primary)] mb-4" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
        {chapter.title}
      </h2>
      <div className="w-16 h-[2px] bg-[var(--color-gold)] mb-[min(8vh,60px)] opacity-60" />

      {/* Two columns */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-[min(6vh,40px)] items-stretch justify-center">

        {/* NHÀ TRAI */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white/80 backdrop-blur-md rounded-t-[100px] rounded-b-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] p-8 md:p-10 text-center w-full max-w-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/60 to-transparent pointer-events-none" />
            <div className="relative z-10">
            <p className="text-[10px] tracking-[0.4em] uppercase font-sans text-[var(--color-gold)] mb-6 font-semibold">
              Nhà Trai
            </p>

            <p className="text-[var(--color-text-secondary)] text-sm mb-1">Ông: <span className="font-medium text-[var(--color-text-primary)]">{nhaTrai.parents.father}</span></p>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">Bà: <span className="font-medium text-[var(--color-text-primary)]">{nhaTrai.parents.mother}</span></p>

            <div className="w-10 h-[1px] bg-[var(--color-gold)] mx-auto mb-4 opacity-40" />

            <p className="text-[var(--color-text-secondary)] text-xs mb-2">Trân trọng giới thiệu</p>
            <p className="font-[family-name:var(--font-serif-display)] text-2xl md:text-3xl text-[var(--color-text-primary)] mb-1">
              {groom.title}
            </p>
            <p className="font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] text-4xl md:text-5xl">
              {groom.firstName}
            </p>

            {/* Ảnh đại diện */}
            {chapter.images[0] && (
              <div className="mt-8 mx-auto w-[85%] aspect-[3/4] bg-white p-2 shadow-md rounded-t-full rounded-b-xl overflow-hidden border border-[color-mix(in_srgb,var(--color-gold)_20%,transparent)]">
                <div className="w-full h-full bg-cover bg-center rounded-t-full rounded-b-lg" style={{ backgroundImage: `url(${chapter.images[0]})` }} />
              </div>
            )}

            <p className="mt-6 text-[var(--color-text-secondary)] text-xs leading-relaxed max-w-[80%] mx-auto">
              {nhaTrai.parents.address}
            </p>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2">
          <div className="w-[2px] flex-1 bg-[var(--color-gold)] opacity-30" />
          <div className="w-8 h-8 rounded-full border border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)] text-[10px] font-[family-name:var(--font-calligraphy)]">
            &
          </div>
          <div className="w-[2px] flex-1 bg-[var(--color-gold)] opacity-30" />
        </div>

        {/* NHÀ GÁI */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white/80 backdrop-blur-md rounded-t-[100px] rounded-b-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] p-8 md:p-10 text-center w-full max-w-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/60 to-transparent pointer-events-none" />
            <div className="relative z-10">
            <p className="text-[10px] tracking-[0.4em] uppercase font-sans text-[var(--color-gold)] mb-6 font-semibold">
              Nhà Gái
            </p>

            <p className="text-[var(--color-text-secondary)] text-sm mb-1">Ông: <span className="font-medium text-[var(--color-text-primary)]">{nhaGai.parents.father}</span></p>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">Bà: <span className="font-medium text-[var(--color-text-primary)]">{nhaGai.parents.mother}</span></p>

            <div className="w-10 h-[1px] bg-[var(--color-gold)] mx-auto mb-4 opacity-40" />

            <p className="text-[var(--color-text-secondary)] text-xs mb-2">Trân trọng giới thiệu</p>
            <p className="font-[family-name:var(--font-serif-display)] text-2xl md:text-3xl text-[var(--color-text-primary)] mb-1">
              {bride.title}
            </p>
            <p className="font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] text-4xl md:text-5xl">
              {bride.firstName}
            </p>

            {/* Ảnh đại diện */}
            {chapter.images[1] && (
              <div className="mt-8 mx-auto w-[85%] aspect-[3/4] bg-white p-2 shadow-md rounded-t-full rounded-b-xl overflow-hidden border border-[color-mix(in_srgb,var(--color-gold)_20%,transparent)]">
                <div className="w-full h-full bg-cover bg-center rounded-t-full rounded-b-lg" style={{ backgroundImage: `url(${chapter.images[1]})` }} />
              </div>
            )}

            <p className="mt-6 text-[var(--color-text-secondary)] text-xs leading-relaxed max-w-[80%] mx-auto">
              {nhaGai.parents.address}
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
