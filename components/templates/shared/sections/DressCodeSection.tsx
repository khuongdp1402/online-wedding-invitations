"use client";

import React, { useState } from "react";
import { Check, Shirt } from "lucide-react";

export interface ColorSwatch {
  name: string;
  hex: string;
  description?: string;
}

interface DressCodeSectionProps {
  swatches?: ColorSwatch[];
  title?: string;
  subtitle?: string;
  badge?: string;
  notes?: string[];
  theme?: {
    bgStyle?: string;
    textColor?: string;
  };
}

export function DressCodeSection({
  swatches,
  title = "Trang Phục Tham Dự (Dress Code)",
  subtitle = "Chúng mình rất mong được cùng bạn ghi lại những thước hình đồng điệu và rạng rỡ nhất trong ngày vui.",
  badge = "GUEST ATTIRE",
  notes = [
    "Khuyến khích trang phục lịch sự, trang nhã theo tông màu gợi ý bên dưới.",
    "Quý khách vui lòng hạn chế mặc trang phục thuần màu trắng (dành riêng cho cô dâu).",
  ],
}: DressCodeSectionProps) {
  const defaultSwatches: ColorSwatch[] = [
    { name: "Sage Green", hex: "#8A9A5B", description: "Xanh lá xô thơm dịu mát" },
    { name: "Earthy Olive", hex: "#556B2F", description: "Xanh ô liu mộc mạc" },
    { name: "Soft Beige", hex: "#E8DFC8", description: "Beige nhã nhặn, ấm áp" },
    { name: "Warm Cream", hex: "#FDFBF7", description: "Kem dịu dàng, tự nhiên" },
  ];

  const list = swatches && swatches.length > 0 ? swatches : defaultSwatches;
  const [selectedHex, setSelectedHex] = useState<string>(list[0].hex);

  return (
    <section className="py-16 px-4 sm:px-8 bg-white border-b border-stone-200 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-300 text-xs font-serif uppercase tracking-[0.25em] mb-3">
            <Shirt className="w-3.5 h-3.5 text-stone-600" />
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-serif text-stone-900 mb-3 font-medium">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto mb-10 leading-relaxed font-serif">
            {subtitle}
          </p>
        )}

        {/* Interactive Color Palette Swatches */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 my-8">
          {list.map((color, idx) => {
            const isSelected = selectedHex === color.hex;

            return (
              <div
                key={idx}
                onClick={() => setSelectedHex(color.hex)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Color Circle */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md transition-all duration-300 flex items-center justify-center relative ${
                    isSelected ? "scale-115 ring-4 ring-offset-2 ring-stone-400" : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    border: color.hex.toLowerCase() === "#ffffff" || color.hex.toLowerCase() === "#fdfbf7" ? "2px solid #E5E5E5" : "none",
                  }}
                >
                  {isSelected && (
                    <Check className="w-5 h-5 text-white drop-shadow-md" />
                  )}
                </div>

                {/* Color Label */}
                <span className="mt-3 font-serif text-xs font-semibold text-stone-800">
                  {color.name}
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  {color.hex}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Color Note */}
        {selectedHex && (
          <div className="mt-2 mb-8 inline-block px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-xs font-serif text-stone-600">
            ✨ {list.find((s) => s.hex === selectedHex)?.description || "Tông màu được chọn"}
          </div>
        )}

        {/* Notes List */}
        {notes.length > 0 && (
          <div className="bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200 max-w-xl mx-auto text-left text-xs font-serif text-stone-600 space-y-2">
            {notes.map((note, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-stone-400 mt-0.5">•</span>
                <p>{note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
