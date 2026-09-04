"use client";

import { useEffect, useRef } from "react";

const chapters = [
  {
    chapter: "CHƯƠNG I",
    emoji: "🌱",
    title: "Khoảnh Khắc Định Mệnh",
    desc: "Một ngày xuân trong veo, khi những cánh hoa anh đào vừa hé nở, chúng mình đã vô tình tìm thấy mảnh ghép còn thiếu của cuộc đời nhau.",
    bg: "from-[#FFEBF0] to-[#FFF0F5]",
    delay: 0,
  },
  {
    chapter: "CHƯƠNG II",
    emoji: "🌸",
    title: "Cùng Nhau Đi Qua Năm Tháng",
    desc: "Những chuyến đi xa, những chiều ngồi kể chuyện, những bữa cơm hai người — tình yêu cứ thế lớn lên dịu dàng như đoá anh đào đơm bông rực rỡ.",
    bg: "from-[#FFF0F5] to-[#FFE4EF]",
    delay: 0.15,
  },
  {
    chapter: "CHƯƠNG III",
    emoji: "💍",
    title: "Hẹn Ước Trăm Năm",
    desc: "Lời đồng ý thiêng liêng, chiếc nhẫn khắc tên, và trái tim hoà làm một — bắt đầu hành trình chung đôi trọn đời, mãi mãi không rời.",
    bg: "from-[#FFE4EF] to-[#FFF7F9]",
    delay: 0.3,
  },
];

export function LoveStory() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || "0");
            setTimeout(() => {
              el.classList.add("ss-in-view");
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-5 relative overflow-hidden border-b border-[#F6D6DF]"
      style={{ background: "linear-gradient(180deg,#FFF7F9 0%,#FFEBF0 50%,#FFF7F9 100%)" }}>

      {/* Floating background petals */}
      <div className="absolute top-4 left-4 text-4xl opacity-10 select-none ss-branch-deco pointer-events-none">🌸</div>
      <div className="absolute bottom-4 right-4 text-3xl opacity-10 select-none ss-branch-deco pointer-events-none" style={{ animationDelay: "4s" }}>🌸</div>

      <div className="max-w-sm mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 ss-reveal-up ss-in-view">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4456B] font-semibold mb-2">
            Our Story
          </p>
          <h2 className="text-2xl font-serif text-[#3D1A26] font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Chuyện Tình Yêu
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#F8B4C4]" />
            <span className="text-[#F8B4C4] text-sm">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#F8B4C4]" />
          </div>
        </div>

        {/* 3D Flip Chapter Cards */}
        <div className="space-y-5">
          {chapters.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="ss-chapter-card"
              data-delay={item.delay}
              style={{ animationDelay: `${item.delay}s` }}
            >
              <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${item.bg} border border-[#F6D6DF] shadow-sm`}>
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#D4456B] via-[#F8B4C4] to-transparent" />

                <div className="p-5">
                  {/* Chapter label + emoji */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4456B] uppercase bg-white px-2.5 py-0.5 rounded-full border border-[#F6D6DF]">
                      {item.chapter}
                    </span>
                    <span className="text-3xl">{item.emoji}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-serif font-semibold text-[#3D1A26] mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {item.desc}
                  </p>

                  {/* Bottom decorative dots */}
                  <div className="flex items-center gap-1 mt-3">
                    {[0, 1, 2].map((d) => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgba(212,69,107,${0.3 - d * 0.08})` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom heart */}
        <div className="text-center mt-8">
          <span className="ss-heartbeat text-[#D4456B] text-2xl inline-block">♥</span>
        </div>
      </div>
    </section>
  );
}

