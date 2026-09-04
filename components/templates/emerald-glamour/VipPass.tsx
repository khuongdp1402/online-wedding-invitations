"use client";

import type { WeddingData } from "@/types/template";
import { Sparkles, Ticket } from "lucide-react";

type VipPassProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function VipPass({ wedding, isBrideMode }: VipPassProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const title = isBrideMode ? "LỄ VU QUY VIP SOIRÉE" : "LỄ TÂN HÔN VIP SOIRÉE";

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#04120D] border-b border-[#D4AF37]/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em] mb-2">
            <Ticket className="w-3.5 h-3.5" /> THE GOLDEN PASS
          </div>
          <h2 className="text-3xl font-serif text-[#D4AF37] font-bold tracking-wider">
            Vé Mời Dạ Tiệc VIP
          </h2>
        </div>

        {/* Physical Gatsby VIP Ticket with Perforated Edge */}
        <div className="bg-gradient-to-r from-[#0A261D] via-[#0E3529] to-[#0A261D] border-2 border-[#D4AF37] rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative">
          {/* Main Ticket Body */}
          <div className="md:col-span-8 p-8 sm:p-10 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-[#D4AF37]/50 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
                THE GREAT GATSBY WEDDING
              </span>
              <span className="text-xs font-mono text-emerald-300">NO. 2026-VIP</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              {title}
            </h3>

            <p className="text-xs font-serif italic text-stone-300 mb-6 leading-relaxed">
              Trân trọng kính mời quý vị khách quý tham dự đêm dạ tiệc tôn vinh tình yêu vĩnh cửu của chúng tôi.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-stone-300 pt-4 border-t border-[#D4AF37]/30">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">DATE & TIME</span>
                <strong className="text-white text-sm">{ceremony?.date || "22.11.2026"}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">CEREMONY</span>
                <strong className="text-white text-sm">{ceremony?.ceremonyTime || "09:00"}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">BANQUET</span>
                <strong className="text-white text-sm">{ceremony?.receptionTime || "11:30"}</strong>
              </div>
            </div>
          </div>

          {/* Perforated Stub / Ticket Tear-off */}
          <div className="md:col-span-4 p-8 bg-[#071F17] flex flex-col justify-between items-center text-center relative">
            <div>
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-serif uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                ADMIT ONE
              </span>
              <span className="text-[10px] font-mono text-stone-400 block">
                VIP TABLE RESERVATION
              </span>
            </div>

            {/* Retro Barcode Mock */}
            <div className="mt-6 w-full pt-4 border-t border-[#D4AF37]/30 flex flex-col items-center">
              <div className="h-10 w-40 flex items-center justify-center gap-1 opacity-70">
                <div className="h-full w-1 bg-white" />
                <div className="h-full w-2 bg-white" />
                <div className="h-full w-0.5 bg-white" />
                <div className="h-full w-1.5 bg-white" />
                <div className="h-full w-3 bg-white" />
                <div className="h-full w-0.5 bg-white" />
                <div className="h-full w-2 bg-white" />
                <div className="h-full w-1 bg-white" />
              </div>
              <span className="text-[9px] font-mono text-stone-400 tracking-widest mt-1">
                ★ GATSBY-2026-TICKET ★
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
