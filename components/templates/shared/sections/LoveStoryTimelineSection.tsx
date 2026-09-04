"use client";

import React from "react";
import { Heart, Calendar, MapPin, Sparkles } from "lucide-react";

export interface LoveStoryMilestone {
  year: string;
  date?: string;
  title: string;
  description: string;
  location?: string;
  image?: string;
}

interface LoveStoryTimelineSectionProps {
  milestones?: LoveStoryMilestone[];
  title?: string;
  subtitle?: string;
  badge?: string;
  theme?: {
    primaryColor?: string;
    accentColor?: string;
    bgStyle?: string;
  };
}

export function LoveStoryTimelineSection({
  milestones,
  title = "Chuyện Tình Yêu",
  subtitle = "Hành trình từ hai người xa lạ đến lúc cùng chung một nhịp đập trái tim.",
  badge = "OUR LOVE STORY",
}: LoveStoryTimelineSectionProps) {
  const defaultMilestones: LoveStoryMilestone[] = [
    {
      year: "2021",
      date: "14 Tháng 02",
      title: "Lần Đầu Tiên Gặp Gỡ",
      description: "Một chiều mưa tại quán cà phê góc phố, cái nhìn đầu tiên đã gieo vào lòng những rung động khó quên.",
      location: "TP. Hồ Chí Minh",
      image: "/templates/classic-burgundy/samples/01.jpg",
    },
    {
      year: "2022",
      date: "20 Tháng 10",
      title: "Chính Thức Yêu Nhau",
      description: "Dưới ánh đèn lấp lánh của thành phố, chúng mình đã nhận lời cùng nhau bước vào thế giới của tình yêu.",
      location: "Đà Lạt",
      image: "/templates/classic-burgundy/samples/02.jpg",
    },
    {
      year: "2024",
      date: "24 Tháng 12",
      title: "Lời Cầu Hôn Ngọt Ngào",
      description: "Trước biển đêm bình yên và muôn ngàn vì sao, một chiếc nhẫn nhỏ cùng câu nói: 'Em đồng ý làm vợ anh nhé?'",
      location: "Phú Quốc",
      image: "/templates/classic-burgundy/samples/03.jpg",
    },
    {
      year: "2026",
      date: "Hôm Nay",
      title: "Ngày Chung Đôi Trọn Đời",
      description: "Cùng viết tiếp chương đẹp nhất của cuộc đời trong sự chúc phúc trọn vẹn của gia đình và người thân.",
      location: "Lễ Thành Hôn",
      image: "/templates/classic-burgundy/samples/04.jpg",
    },
  ];

  const list = milestones && milestones.length > 0 ? milestones : defaultMilestones;

  return (
    <section className="py-20 px-4 sm:px-8 relative overflow-hidden bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-300 text-xs font-serif uppercase tracking-[0.25em] mb-3">
            <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-3 font-medium">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-16 leading-relaxed font-serif">
            {subtitle}
          </p>
        )}

        {/* Vertical Timeline with Interleaved Milestones */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-stone-300 via-rose-300 to-stone-300 sm:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {list.map((m, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-6 sm:gap-12 pl-10 sm:pl-0`}
                >
                  {/* Timeline Node Icon on central line */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-rose-400 shadow-md flex items-center justify-center z-10 top-0">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full sm:w-1/2 ${isEven ? "sm:text-left" : "sm:text-right"}`}>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow group">
                      {/* Year badge */}
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? "justify-start" : "sm:justify-end"}`}>
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold">
                          {m.year}
                        </span>
                        {m.date && (
                          <span className="text-xs font-serif text-stone-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {m.date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-serif font-semibold text-stone-800 mb-2">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif mb-3">
                        {m.description}
                      </p>

                      {m.location && (
                        <div className={`flex items-center gap-1 text-xs text-stone-400 font-serif ${isEven ? "justify-start" : "sm:justify-end"}`}>
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{m.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Empty space for alternate side on desktop */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
