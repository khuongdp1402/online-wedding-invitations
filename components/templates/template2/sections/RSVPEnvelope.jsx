"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useGuest } from "../StoryEngine";
import { weddingData } from "../config/weddingData";
import { getFullGuestName } from "../lib/utils/guest";

export default function RSVPEnvelope({ chapter }) {
  const [envelopeState, setEnvelopeState] = useState("closed");
  const containerRef = useRef(null);
  const envelopeWrapperRef = useRef(null);
  const { side, guestName, guestRole } = useGuest();

  const defaultGuestName = (guestName && guestName !== "Quý Khách")
    ? getFullGuestName(guestRole, guestName)
    : "";

  // RSVP Form state
  const [name, setName] = useState(defaultGuestName);
  const [status, setStatus] = useState("attending"); // "attending" | "declined"
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);

  // Default wishes to seed
  const defaultWishes = [
    { name: "Bạn Thân", wish: "Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long nhé! Chúc mừng đám cưới thế kỷ của Khương & Hiền! 🎉", status: "attending" },
    { name: "Anh Đồng Nghiệp", wish: "Chúc mừng hạnh phúc Khương & Hiền! Mãi luôn thấu hiểu và cùng nhau chia sẻ mọi khoảnh khắc trong cuộc sống nhé.", status: "attending" },
    { name: "Chị Họ", wish: "Chúc đôi uyên ương mãi mãi hạnh phúc ngọt ngào bên nhau! Chúc mừng hạnh phúc gia đình mới!", status: "attending" }
  ];

  const sideData = side === "nhagai" ? weddingData.nhagai : weddingData.nhatrai;
  const ceremony = sideData.ceremony;
  const party = sideData.party;

  // Family data for Open Love Letter format
  const nhaTraiImg = "/images/chure/z7974179759081_76fdea264281169d13a97a3261f1145c.jpg";
  const nhaGaiImg = "/images/codau/z7974179703025_e749d94cbdda06a7d4d4e56c9b599db7.jpg";
  const nhaTrai = weddingData.nhatrai;
  const nhaGai = weddingData.nhagai;

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("wedding_wishes");
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      setWishes(defaultWishes);
    }
  }, []);

  useEffect(() => {
    if (guestName && guestName !== "Quý Khách") {
      setName(getFullGuestName(guestRole, guestName));
    }
  }, [guestName, guestRole]);

  useEffect(() => {
    // Dùng IntersectionObserver thay vì ScrollTrigger pin
    // Tránh lỗi scroll đứng/đảo chiều do pin trigger tính sai height
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEnvelopeState((prev) => {
              if (prev === "closed") {
                setTimeout(() => setEnvelopeState("card_extracted"), 1200);
                return "opened";
              }
              return prev;
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (envelopeWrapperRef.current) {
      observer.observe(envelopeWrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);


  const handleOpenEnvelope = () => {
    if (envelopeState === "closed") {
      setEnvelopeState("opened");
      setTimeout(() => setEnvelopeState("card_extracted"), 1200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWish = {
      name: name.trim(),
      wish: wish.trim() || "Chúc hai bạn trăm năm hạnh phúc! ♥",
      status: status
    };

    const updated = [newWish, ...wishes.filter(w => w.name !== newWish.name)];
    setWishes(updated);
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));

    setEnvelopeState("submitted");
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ["#D4AF37", "#FFFFFF", "#800020"] });
    setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6, x: 0.3 }, colors: ["#D4AF37", "#FFFFFF"] }), 500);
    setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6, x: 0.7 }, colors: ["#D4AF37", "#800020"] }), 1000);

    // Auto-scroll to ending section after 2.5 seconds
    setTimeout(() => {
      const ending = document.getElementById("chapter-7-ending");
      if (ending) {
        ending.scrollIntoView({ behavior: "smooth" });
      }
    }, 2500);
  };

  const luxuryEase = [0.76, 0, 0.24, 1];

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-start bg-white py-20 px-4 min-h-screen overflow-hidden"
    >
      {/* 1. Envelope Wrapper (Pinnable) */}
      <div 
        ref={envelopeWrapperRef}
        className="w-full min-h-[80vh] flex flex-col items-center justify-center relative cursor-pointer"
        onClick={envelopeState === "closed" ? handleOpenEnvelope : undefined}
      >
        {/* Title — only visible when closed */}
        {envelopeState === "closed" && (
          <div className="text-center z-10 mb-8 pointer-events-none">
            <h2 className="text-[50px] md:text-[80px] font-[family-name:var(--font-serif-display)] leading-none tracking-tighter text-[var(--color-text-primary)]" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.15)' }}>
              {chapter.title}
            </h2>
            <p className="mt-3 font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] text-2xl md:text-3xl">
              {getFullGuestName(guestRole, guestName)}
            </p>
            <p className="mt-4 text-[10px] tracking-[0.3em] uppercase font-sans text-[var(--color-text-secondary)] animate-pulse">
              Thiệp mời tự động mở...
            </p>
          </div>
        )}

        {/* Envelope container */}
        <motion.div
          className="relative w-[320px] md:w-[420px] h-[260px] md:h-[350px] mt-8"
          style={{ perspective: 1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: luxuryEase }}
        >
          <div className="absolute inset-0 bg-[#E8DCC4] rounded-lg shadow-lg" />

          {/* Thiệp mời bên trong — hiển thị ceremony + party info + Form */}
          <motion.div
            className="absolute bg-[#FFFDF9] shadow-[0_20px_50px_rgba(0,0,0,0.35)] rounded-sm flex flex-col p-6 md:p-8 lg:p-10 border border-[#D4AF37]/40 overflow-y-auto overflow-x-hidden scrollbar-thin"
            style={{ 
              backgroundImage: 'radial-gradient(circle at center, #FFFDF9 0%, #FAF5EC 100%)',
              left: "50%",
              top: "50%"
            }}
            initial={{ x: "-50%", y: "-50%", zIndex: 10 }}
            animate={{
              x: "-50%",
              y: (envelopeState === "card_extracted" || envelopeState === "submitted") ? "-60%" : "-50%",
              width: (envelopeState === "card_extracted" || envelopeState === "submitted") ? "min(95vw, 1000px)" : "300px",
              height: (envelopeState === "card_extracted" || envelopeState === "submitted") ? "min(90vh, 700px)" : "230px",
              zIndex: (envelopeState === "card_extracted" || envelopeState === "submitted") ? 50 : 10,
            }}
            transition={{ duration: 1.2, ease: luxuryEase }}
          >
            {/* Card Content when extracted */}
            {(envelopeState === "card_extracted" || envelopeState === "submitted") ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full text-center lg:text-left">
                {/* Column 1: Lời mời & Info (The Open Love Letter) */}
                <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[#D4AF37]/30 pb-6 lg:pb-0 lg:pr-8">
                  
                  {/* Parental Portraits - Oval Frames */}
                  <div className="flex justify-center gap-6 md:gap-12 mb-8">
                    {side === "nhagai" ? (
                      <>
                        {/* Nhà Gái */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-28 md:w-24 md:h-32 mb-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] overflow-hidden shadow-md border border-[#D4AF37]/30 p-1 bg-white">
                            <div className="w-full h-full rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-cover bg-top" style={{ backgroundImage: `url(${nhaGaiImg})` }} />
                          </div>
                          <p className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold mb-1">Nhà Gái</p>
                          <p className="text-[10px] md:text-xs text-[#4A3728] leading-tight">Ông: {nhaGai.parents.father}<br/>Bà: {nhaGai.parents.mother}</p>
                        </div>

                        {/* Dấu & */}
                        <div className="flex items-center justify-center">
                          <span className="text-3xl font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] opacity-50">&</span>
                        </div>

                        {/* Nhà Trai */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-28 md:w-24 md:h-32 mb-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] overflow-hidden shadow-md border border-[#D4AF37]/30 p-1 bg-white">
                            <div className="w-full h-full rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-cover bg-top" style={{ backgroundImage: `url(${nhaTraiImg})` }} />
                          </div>
                          <p className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold mb-1">Nhà Trai</p>
                          <p className="text-[10px] md:text-xs text-[#4A3728] leading-tight">Ông: {nhaTrai.parents.father}<br/>Bà: {nhaTrai.parents.mother}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Nhà Trai */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-28 md:w-24 md:h-32 mb-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] overflow-hidden shadow-md border border-[#D4AF37]/30 p-1 bg-white">
                            <div className="w-full h-full rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-cover bg-top" style={{ backgroundImage: `url(${nhaTraiImg})` }} />
                          </div>
                          <p className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold mb-1">Nhà Trai</p>
                          <p className="text-[10px] md:text-xs text-[#4A3728] leading-tight">Ông: {nhaTrai.parents.father}<br/>Bà: {nhaTrai.parents.mother}</p>
                        </div>

                        {/* Dấu & */}
                        <div className="flex items-center justify-center">
                          <span className="text-3xl font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] opacity-50">&</span>
                        </div>

                        {/* Nhà Gái */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-28 md:w-24 md:h-32 mb-3 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] overflow-hidden shadow-md border border-[#D4AF37]/30 p-1 bg-white">
                            <div className="w-full h-full rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-cover bg-top" style={{ backgroundImage: `url(${nhaGaiImg})` }} />
                          </div>
                          <p className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-bold mb-1">Nhà Gái</p>
                          <p className="text-[10px] md:text-xs text-[#4A3728] leading-tight">Ông: {nhaGai.parents.father}<br/>Bà: {nhaGai.parents.mother}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-center mt-2 mb-6">
                    <p className="text-[10px] md:text-xs text-[var(--color-text-secondary)] uppercase tracking-[0.2em] mb-4">Trân trọng kính mời</p>
                    <h3 className="font-[family-name:var(--font-calligraphy)] text-5xl md:text-6xl text-[var(--color-gold)] mb-2 drop-shadow-sm">
                      Lời Mời Trân Trọng
                    </h3>
                    <div className="w-20 h-[1px] bg-[var(--color-gold)] mx-auto mb-5 opacity-60" />
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mx-auto mb-2 font-serif italic">
                      <strong className="text-[var(--color-burgundy)] text-base md:text-xl block my-3 not-italic font-[family-name:var(--font-serif-display)]">{getFullGuestName(guestRole, guestName)}</strong> 
                      đến chung vui cùng gia đình chúng tôi tại lễ thành hôn của 
                      <strong className="text-neutral-800 not-italic block mt-2 text-lg md:text-xl font-[family-name:var(--font-serif-display)]">
                        {side === "nhagai" ? "Hoàng Thị Cẩm Hiền & Đỗ Phú Khương" : "Đỗ Phú Khương & Hoàng Thị Cẩm Hiền"}
                      </strong>.
                    </p>
                  </div>

                  {/* Column 1 Ceremony details continued... */}
                  <div className="grid grid-cols-1 gap-6 text-center py-4 my-2">
                    {/* Ceremony */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[var(--color-gold)] font-bold mb-1.5">
                        {ceremony.type}
                      </span>
                      <h4 className="font-[family-name:var(--font-serif-display)] text-xl text-[var(--color-text-primary)] font-bold">
                        {ceremony.dateSolar}
                      </h4>
                      <p className="text-[10px] text-neutral-500 italic mb-2">
                        (Nhằm ngày {ceremony.dateLunar})
                      </p>
                      <div className="text-xs text-neutral-600 space-y-1">
                        <p>⏰ Giờ cử hành: <span className="font-semibold text-neutral-800">{ceremony.time}</span></p>
                        <p className="leading-relaxed mt-1 max-w-[240px]">📍 {ceremony.address}</p>
                      </div>
                    </div>

                    <div className="w-1/2 h-[1px] bg-[#D4AF37]/20 mx-auto" />

                    {/* Party */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[var(--color-gold)] font-bold mb-1.5">
                        TIỆC CƯỚI MỪNG HẠNH PHÚC
                      </span>
                      <h4 className="font-[family-name:var(--font-serif-display)] text-xl text-[var(--color-text-primary)] font-bold">
                        {party.time}
                      </h4>
                      <p className="text-[10px] text-neutral-500 italic mb-2">
                        (Đón khách & Đãi tiệc)
                      </p>
                      <div className="text-xs text-neutral-600 space-y-1">
                        <p className="leading-relaxed mt-1 max-w-[240px]">📍 {party.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Form & Wishes List */}
                <div className="flex flex-col h-full overflow-hidden">
                  {envelopeState === "card_extracted" ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center shrink-0 mb-6" onClick={(e) => e.stopPropagation()}>
                      <h4 className="font-[family-name:var(--font-serif-display)] text-xl text-[var(--color-text-primary)] mb-2">
                        Xác Nhận Tham Dự
                      </h4>
                      
                      <div className="flex flex-col md:flex-row gap-3 justify-center mb-2">
                        <button
                          type="button"
                          onClick={() => setStatus("attending")}
                          className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-wider transition-all duration-300 ${
                            status === "attending"
                              ? "bg-[var(--color-burgundy)] text-white shadow-md"
                              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                          }`}
                        >
                          Sẽ tham dự ♥
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatus("declined")}
                          className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-wider transition-all duration-300 ${
                            status === "declined"
                              ? "bg-[var(--color-gold)] text-white shadow-md"
                              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                          }`}
                        >
                          Tiếc là không thể ❃
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        <input
                          type="text"
                          placeholder="Tên của bạn *"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-transparent border-b border-[#D4AF37]/40 focus:border-[var(--color-gold)] text-center text-sm py-2 focus:outline-none transition-colors font-serif"
                        />
                        <input
                          type="text"
                          placeholder="Gửi lời chúc tốt đẹp nhất..."
                          value={wish}
                          onChange={(e) => setWish(e.target.value)}
                          className="w-full bg-transparent border-b border-[#D4AF37]/40 focus:border-[var(--color-gold)] text-center text-sm py-2 focus:outline-none transition-colors font-serif"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[var(--color-gold)] hover:brightness-105 active:scale-[0.98] text-white text-[10px] font-bold uppercase tracking-[0.25em] transition-all rounded-sm shadow-md mt-2"
                      >
                        Gửi Lời Chúc & Xác Nhận
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-6 bg-amber-50/50 rounded-sm border border-[#D4AF37]/20 mb-6 shrink-0">
                      <p className="text-[var(--color-gold)] font-[family-name:var(--font-calligraphy)] text-3xl mb-1">
                        Cảm ơn {name}! ♥
                      </p>
                      <p className="text-[var(--color-text-secondary)] text-sm font-serif italic mt-2">
                        {status === "attending" ? "Hẹn gặp lại bạn tại ngày vui!" : "Cảm ơn những lời chúc tốt đẹp!"}
                      </p>
                    </div>
                  )}

                  {/* Wishes Scrollable Area inside the card */}
                  <div className="flex-1 flex flex-col min-h-0 border-t border-[#D4AF37]/20 pt-4 mt-2">
                    <h4 className="text-center font-[family-name:var(--font-serif-display)] text-lg text-[var(--color-text-primary)] mb-4">
                      Lời Chúc Từ Mọi Người
                    </h4>
                    <div className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin pb-4">
                      {wishes.map((w, idx) => (
                        <div key={idx} className="bg-white/60 p-3 rounded-sm border border-gray-100 flex flex-col gap-1 text-left">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[var(--color-text-primary)]">
                              {w.name}
                            </span>
                            <span className="text-[8px] font-sans tracking-widest uppercase text-[var(--color-gold)]">
                              {w.status === "attending" ? "Sẽ tham dự" : "Gửi lời chúc"}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--color-text-secondary)] italic leading-relaxed">
                            &quot;{w.wish}&quot;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Small Card Preview inside envelope */
              <div className="flex flex-col items-center justify-center h-full text-center pointer-events-none">
                <p className="font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] text-lg mb-2">
                  Kính gửi {getFullGuestName(guestRole, guestName)}
                </p>
                <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[var(--color-text-secondary)]">
                  {ceremony.type}
                </p>
              </div>
            )}
          </motion.div>

          {/* Mặt trước phong bì */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute inset-0 bg-[#F5EEDF] clip-envelope-front shadow-inner" />
          </div>

          {/* Nắp phong bì */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#F0E6D2] origin-top z-30 shadow-sm pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: envelopeState !== "closed" ? 180 : 0 }}
            transition={{ duration: 1, ease: luxuryEase }}
          >
            {envelopeState === "closed" && (
              <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[var(--color-burgundy)] rounded-full shadow-lg flex items-center justify-center">
                <span className="text-[var(--color-gold)] text-[11px] font-[family-name:var(--font-calligraphy)]">{side === 'nhagai' ? 'H&K' : 'K&H'}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
