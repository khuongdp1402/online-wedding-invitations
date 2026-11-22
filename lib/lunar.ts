// Helper to convert solar date to Vietnamese Lunar date string
// based on thieponline.app astronomical calendar algorithm

import { f as parseDateStr, a as getLunarInfo } from "./lunar-calendar.js";

export type LunarResult = {
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  isLeap: boolean;
  yearCanChi: string;
  monthCanChi: string;
  dayCanChi: string;
  formattedString: string; // e.g. "(Tức ngày 14 tháng 10 năm Bính Ngọ)"
};

export function convertSolarToLunar(solarDateStr: string): LunarResult | null {
  if (!solarDateStr) return null;

  try {
    // If input is YYYY-MM-DD
    let normalized = solarDateStr.trim();
    
    // Check if format is DD/MM/YYYY or DD-MM-YYYY
    const dmyMatch = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/.exec(normalized);
    if (dmyMatch) {
      const d = dmyMatch[1].padStart(2, "0");
      const m = dmyMatch[2].padStart(2, "0");
      const y = dmyMatch[3];
      normalized = `${y}-${m}-${d}`;
    }

    const dateObj = parseDateStr(normalized);
    if (!dateObj) return null;

    const info = getLunarInfo(dateObj);
    if (!info) return null;

    const formattedString = `(Tức ngày ${info.lunarDay} tháng ${info.lunarMonth}${
      info.isLeap ? " nhuận" : ""
    } năm ${info.yearCanChi})`;

    return {
      lunarDay: info.lunarDay,
      lunarMonth: info.lunarMonth,
      lunarYear: info.lunarYear,
      isLeap: info.isLeap,
      yearCanChi: info.yearCanChi,
      monthCanChi: info.monthCanChi,
      dayCanChi: info.dayCanChi,
      formattedString,
    };
  } catch (err) {
    console.error("Lunar conversion error:", err);
    return null;
  }
}
