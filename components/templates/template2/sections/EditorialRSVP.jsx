"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGuest } from "../StoryEngine";
import { getFullGuestName } from "../lib/utils/guest";

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

export default function EditorialRSVP({ chapter }) {
  const { guestName, guestRole } = useGuest();
  
  const defaultGuestName = (guestName && guestName !== "Quý Khách")
    ? getFullGuestName(guestRole, guestName)
    : "";

  const [formData, setFormData] = useState({ name: defaultGuestName, attendance: "", wish: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const fetchWishes = async () => {
    if (!SCRIPT_URL || SCRIPT_URL === "ĐƯỜNG_LINK_CỦA_BẠN") {
      setWishes([
        { name: "Người thân", wish: "Chúc hai cháu trăm năm hạnh phúc, răng long đầu bạc!", timestamp: new Date().toISOString() },
        { name: "Bạn thân", wish: "Mãi mãi bên nhau bạn nhé, chúc mừng đám cưới! Hôm đó quẩy hết mình luôn.", timestamp: new Date(Date.now() - 86400000).toISOString() },
        { name: "Đồng nghiệp", wish: "Chúc hai bạn có một đám cưới thật lãng mạn và trọn vẹn ý nghĩa.", timestamp: new Date(Date.now() - 172800000).toISOString() }
      ]);
      setIsLoadingWishes(false);
      return;
    }
    
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setWishes(data);
      }
    } catch (e) {
      console.error("Error fetching wishes:", e);
    } finally {
      setIsLoadingWishes(false);
    }
  };

  useEffect(() => {
    fetchWishes();

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (guestName && guestName !== "Quý Khách") {
      setFormData(prev => ({
        ...prev,
        name: getFullGuestName(guestRole, guestName)
      }));
    }
  }, [guestName, guestRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (SCRIPT_URL && SCRIPT_URL !== "ĐƯỜNG_LINK_CỦA_BẠN") {
      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "text/plain;charset=utf-8" }
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      // Mock submit if no URL
      setWishes([{ ...formData, timestamp: new Date().toISOString() }, ...wishes]);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    if (SCRIPT_URL && SCRIPT_URL !== "ĐƯỜNG_LINK_CỦA_BẠN") {
      fetchWishes(); // Fetch real data to update
    }
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", attendance: "", wish: "" });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative w-full flex flex-col md:h-screen md:flex-row bg-[#111] overflow-hidden">
      
      {/* CỘT TRÁI (70%) - FULL BACKGROUND IMAGE WITH OVERLAY TEXT BLOCK */}
      <div 
        className={`relative w-full h-screen md:w-[70%] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-[#333] cursor-default bg-[#111] group ${isMobile ? "story-chapter" : ""}`}
        data-theme="#111111"
      >
        
        {/* Desktop Image Background */}
        <div 
          className="hidden md:block absolute inset-0 w-full h-full bg-cover bg-top transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url(${chapter.images?.[0] || "/images/banner.jpg"})` }}
        />

        {/* Mobile Image Background */}
        <div 
          className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-top transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url("/images/our-journey/z7974179737111_d58e8bb81254cb1dd071572b736cf5b5.jpg")` }}
        />

        {/* Text Block - Occupying bottom 40% (mobile) / 30% (desktop) with translucent black background */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] md:h-[30%] flex flex-col items-center justify-center px-4 md:px-0 bg-black/50">
          <h2 className="font-[family-name:var(--font-serif-display)] text-[50px] sm:text-[80px] md:text-[120px] lg:text-[150px] leading-[0.8] uppercase text-center tracking-tighter text-[#D4AF37]">
            Forever
          </h2>
          <p className="text-center text-white/90 font-sans uppercase tracking-[0.2em] md:tracking-[0.4em] text-[9px] md:text-xs mt-4 md:mt-6">
            Cảm ơn bạn đã là một phần của hành trình này
          </p>
        </div>
        
      </div>

      {/* CỘT PHẢI (30%) - 50/50 SPLIT (FORM & WISHES) */}
      <div 
        className={`relative w-full h-screen md:w-[30%] md:h-full bg-[#EBE5DB] flex flex-col ${isMobile ? "story-chapter" : ""}`}
        data-theme="#111111"
      >
        
        {/* NỬA TRÊN (50%) - FORM RSVP */}
        <div className="w-full h-[55%] flex flex-col items-center justify-center p-6 md:p-8 border-b border-[#D4AF37]/20 relative bg-[#F5F0E6]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-[400px] flex flex-col bg-[#FDFCF8] p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#D4AF37]/10"
              >
                <h3 className="font-[family-name:var(--font-serif-display)] text-3xl md:text-4xl text-[#800020] text-center mb-6">
                  Hồi Âm
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      placeholder="Đại danh của bạn..." 
                      className="w-full bg-transparent border-b border-[#D4AF37]/40 focus:border-[#800020] pb-2 text-[#333] text-sm outline-none transition-colors placeholder:text-[#999] placeholder:font-sans placeholder:italic"
                    />
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <label className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#666]">Khả năng góp mặt</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-[#444] hover:text-[#800020] transition-colors">
                        <input type="radio" name="attendance" value="yes" onChange={handleChange} required className="accent-[#800020]" />
                        Có mặt quẩy hết mình! 🎉
                      </label>
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-[#444] hover:text-[#800020] transition-colors">
                        <input type="radio" name="attendance" value="no" onChange={handleChange} className="accent-[#800020]" />
                        Tiếc ghê, bận mất rùi 🥺
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-1 pt-2">
                    <textarea 
                      rows={2} 
                      name="wish"
                      value={formData.wish}
                      onChange={handleChange}
                      placeholder="Lời nhắn gửi yêu thương..." 
                      className="w-full bg-transparent border-b border-[#D4AF37]/40 focus:border-[#800020] pb-2 text-[#333] text-sm outline-none transition-colors resize-none placeholder:text-[#999] placeholder:font-sans placeholder:italic"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#800020] text-[#FDFCF8] font-sans text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-[#5a0016] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi Hồi Âm"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#800020]/10 flex items-center justify-center text-[#800020] mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-[family-name:var(--font-serif-display)] text-3xl text-[#333]">
                  Trân trọng cảm ơn!
                </h3>
                <p className="text-[#666] text-sm italic font-sans">
                  Lời yêu thương của bạn đã được gửi gắm thành công.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NỬA DƯỚI (45%) - WISHES LIST */}
        <div className="w-full h-[45%] p-6 md:p-8 flex flex-col bg-[#F5F0E6]">
          <div className="flex-1 flex flex-col bg-[#FDFCF8] p-4 md:p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#D4AF37]/10 overflow-hidden">
            <h3 className="font-[family-name:var(--font-serif-display)] text-2xl text-[#D4AF37] text-center mb-4 md:mb-6 drop-shadow-sm">
              Lời Nhắn Gửi
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 md:pr-3 scrollbar-thin scrollbar-thumb-[#D4AF37]/30 scrollbar-track-transparent">
              {isLoadingWishes ? (
                <div className="text-center text-xs text-[#999] italic mt-10">Đang tải lời chúc...</div>
              ) : (() => {
                const displayWishes = wishes.filter(w => w && w.wish && w.wish.trim() !== "");
                if (displayWishes.length === 0) {
                  return <div className="text-center text-xs text-[#999] italic mt-10">Hãy là người đầu tiên gửi lời chúc!</div>;
                }
                return displayWishes.map((w, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-4 md:p-5 bg-white/70 backdrop-blur-md rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-[#D4AF37]/20 relative"
                  >
                    <p className="font-sans text-xs text-[#444] leading-relaxed italic mb-3 relative z-10">
                      &quot;{w.wish}&quot;
                    </p>
                    <div className="flex justify-between items-end relative z-10">
                      <span className="font-bold text-[#800020] text-[10px] uppercase tracking-widest">{w.name}</span>
                      <span className="text-[9px] text-[#999] font-sans">
                        {new Date(w.timestamp).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    {/* Decorative quote mark */}
                    <div className="absolute top-2 right-4 text-4xl text-[#D4AF37]/10 font-serif leading-none select-none">
                      &quot;
                    </div>
                  </motion.div>
                ));
              })()}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
