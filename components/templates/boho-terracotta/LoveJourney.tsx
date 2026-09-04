"use client";

import { Heart, Sun, Sparkles } from "lucide-react";

export function LoveJourney() {
  const milestones = [
    {
      year: "2022",
      title: "Chạm Ánh Mắt Đầu Tiên",
      desc: "Một chiều nắng vàng dịu nhẹ nơi góc quán quen, chúng mình tìm thấy nhau giữa vạn người tình cờ.",
      icon: Sun,
      tag: "First Meet",
    },
    {
      year: "2024",
      title: "Lời Cầu Hôn Dưới Hoàng Hôn",
      desc: "Khoảnh khắc trao chiếc nhẫn ước hẹn bên bờ cát sa mạc rực rỡ và nụ cười ngập tràn giọt nước mắt hạnh phúc.",
      icon: Sparkles,
      tag: "The Proposal",
    },
    {
      year: "2026",
      title: "Khởi Đầu Trọn Đời Bên Nhau",
      desc: "Cùng nắm chặt tay nhau bước vào lễ đường, đánh dấu một chương mới đầy bình yên và ngập tràn thương yêu.",
      icon: Heart,
      tag: "Forever Yes",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#FAF3EC] border-b border-[#EEDFD5] relative overflow-hidden">
      {/* Decorative sunburst radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#DDA15E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-[#EEDFD5]/60 text-[#C25E42] text-[11px] uppercase tracking-[0.25em] font-semibold mb-3">
          OUR LOVE STORY
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#3A231B] mb-4 font-medium">
          Hành Trình Yêu Thương
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto mb-14 leading-relaxed">
          Tình yêu như dòng sông cát dịu dàng, uốn lượn qua những tháng năm và cập bến bờ hạnh phúc viên mãn.
        </p>

        {/* 3-Column Milestone Cards on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting rope line across desktop cards */}
          <div className="hidden md:block absolute top-[70px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-[#DDA15E]/60 z-0" />

          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xs border-2 border-[#EEDFD5] rounded-t-full rounded-b-3xl p-6 sm:p-8 text-center relative z-10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all group"
              >
                {/* Pottery Arch Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-[#FDF8F5] border-2 border-[#C25E42] flex items-center justify-center mx-auto mb-5 text-[#C25E42] shadow-sm group-hover:bg-[#C25E42] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#C25E42] bg-[#F5E6DD] px-3 py-0.5 rounded-full border border-[#EEDFD5]">
                    {m.year}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                    {m.tag}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#3A231B] mb-2.5">
                  {m.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
