"use client";

import type { WeddingData } from "@/types/template";
import { Calendar as CalendarIcon, Check } from "lucide-react";

type CalendarProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
};

export function Calendar({ wedding, isBrideMode }: CalendarProps) {
  const ceremony = isBrideMode ? wedding.brideCeremony : wedding.groomCeremony;
  const dateStr = ceremony?.date;

  const dateObj = dateStr ? new Date(dateStr) : new Date(2026, 10, 22);
  const validDate = isNaN(dateObj.getTime()) ? new Date(2026, 10, 22) : dateObj;

  const year = validDate.getFullYear();
  const month = validDate.getMonth();
  const day = validDate.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const koreanMonths = [
    "1월 (JANUARY)", "2월 (FEBRUARY)", "3월 (MARCH)", "4월 (APRIL)",
    "5월 (MAY)", "6월 (JUNE)", "7월 (JULY)", "8월 (AUGUST)",
    "9월 (SEPTEMBER)", "10월 (OCTOBER)", "11월 (NOVEMBER)", "12월 (DECEMBER)"
  ];

  return (
    <section className="py-20 px-6 sm:px-12 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-stone-400 block mb-2">
            // SPECIAL DATE
          </span>
          <h2 className="text-3xl font-serif text-stone-900 tracking-tight">
            Ngày Lành Tháng Tốt
          </h2>
        </div>

        {/* Minimalist Korean Calendar Box */}
        <div className="bg-white border-2 border-stone-900 p-8 sm:p-12 shadow-sm max-w-xl mx-auto">
          <div className="flex items-center justify-between border-b-2 border-stone-900 pb-4 mb-8">
            <div>
              <span className="text-base sm:text-lg font-serif font-bold text-stone-900 tracking-wider">
                {koreanMonths[month]}
              </span>
              <span className="block text-xs font-mono text-stone-400">{year}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-stone-900 text-white px-3 py-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>D-DAY SAVE</span>
            </div>
          </div>

          {/* Days of week in Korean / Monospace */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-stone-500 mb-4 pb-2 border-b border-stone-200">
            <span className="text-red-600">일 (SUN)</span>
            <span>월 (MON)</span>
            <span>화 (TUE)</span>
            <span>수 (WED)</span>
            <span>목 (THU)</span>
            <span>금 (FRI)</span>
            <span className="text-blue-600">토 (SAT)</span>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-7 gap-2 text-center font-mono text-sm">
            {days.map((d, index) => {
              if (d === null) {
                return <div key={`empty-${index}`} className="h-10" />;
              }
              const isWeddingDay = d === day;
              return (
                <div
                  key={`day-${d}`}
                  className={`h-10 flex flex-col items-center justify-center transition-all ${
                    isWeddingDay
                      ? "bg-stone-900 text-white font-bold relative ring-2 ring-stone-900 shadow-md"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <span>{d}</span>
                  {isWeddingDay && (
                    <span className="text-[8px] tracking-tighter uppercase font-mono text-yellow-400">
                      ★ D-DAY
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-2">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-stone-900" /> Ngày {day} {koreanMonths[month]} {year}
            </span>
            <span className="text-[11px] text-stone-400 tracking-wider">
              SAVE THE DATE // FORMAL CEREMONY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
