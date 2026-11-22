"use client";

import { useMemo } from "react";
import { Heart } from "lucide-react";

type MonthCalendarProps = {
  dateStr?: string; // e.g. "2026-11-22" or "22/11/2026" or "Chủ nhật, 22/11/2026"
  primaryColor?: string;
  calendarBg?: string;
};

export function MonthCalendar({
  dateStr,
  primaryColor = "#511419",
  calendarBg = "#ece4d8",
}: MonthCalendarProps) {
  const parsed = useMemo(() => {
    if (!dateStr) return null;

    // Try finding DD, MM, YYYY
    let d = 0, m = 0, y = 0;
    const matchDMY = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/.exec(dateStr);
    const matchYMD = /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/.exec(dateStr);

    if (matchDMY) {
      d = Number(matchDMY[1]);
      m = Number(matchDMY[2]);
      y = Number(matchDMY[3]);
    } else if (matchYMD) {
      y = Number(matchYMD[1]);
      m = Number(matchYMD[2]);
      d = Number(matchYMD[3]);
    } else {
      const dt = new Date(dateStr);
      if (!isNaN(dt.getTime())) {
        d = dt.getDate();
        m = dt.getMonth() + 1;
        y = dt.getFullYear();
      }
    }

    if (!d || !m || !y) return null;

    // Number of days in month
    const totalDays = new Date(y, m, 0).getDate();
    // Day of week of 1st day (0 is Sun, 1 is Mon... in JS)
    // Convert to Monday=0, Sun=6
    const firstDayIndex = (new Date(y, m - 1, 1).getDay() + 6) % 7;

    return {
      day: d,
      month: m,
      year: y,
      totalDays,
      firstDayIndex,
    };
  }, [dateStr]);

  if (!parsed) return null;

  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const daysArray = Array.from({ length: parsed.totalDays }, (_, i) => i + 1);

  return (
    <div
      className="mx-auto mt-4 w-fit max-w-full overflow-hidden rounded-xl px-5 py-4 shadow-sm"
      style={{ backgroundColor: calendarBg }}
    >
      <div
        className="mx-auto w-[280px] md:w-[320px] text-center"
        style={{ color: primaryColor }}
      >
        {/* Month & Year Header */}
        <div
          className="border-b py-2 text-center text-lg md:text-xl font-serif font-bold tracking-widest uppercase"
          style={{ borderColor: `${primaryColor}33` }}
        >
          THÁNG {String(parsed.month).padStart(2, "0")} • {parsed.year}
        </div>

        {/* Days of week header */}
        <div
          className="grid grid-cols-7 border-b-2 py-2"
          style={{ borderColor: primaryColor }}
        >
          {weekdays.map((w, i) => (
            <div
              key={i}
              className="text-center text-[11px] md:text-xs font-semibold opacity-75"
            >
              {w}
            </div>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-y-1.5 px-1 py-3 text-sm">
          {Array.from({ length: parsed.firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 md:h-9" />
          ))}

          {daysArray.map((dayNum) => {
            const isHighlight = dayNum === parsed.day;
            return (
              <div
                key={dayNum}
                className="flex h-8 md:h-9 items-center justify-center relative"
              >
                {isHighlight ? (
                  <div
                    className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-white font-bold text-xs shadow-md animate-pulse"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span>{dayNum}</span>
                    <Heart
                      className="absolute -top-1.5 -right-1 w-3.5 h-3.5 fill-[#d4a853] text-[#d4a853] drop-shadow"
                    />
                  </div>
                ) : (
                  <span className="text-xs md:text-sm font-medium opacity-85">
                    {dayNum}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
