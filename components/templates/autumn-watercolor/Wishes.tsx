"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote as QuoteIcon } from "lucide-react";

type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export function WishesSlider({ weddingId: _weddingId }: { weddingId: string }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for demo/template preview
  useEffect(() => {
    setWishes([
      { id: "1", name: "Gia đình chị Phương", message: "Chúc hai em Thanh Tùng & Mỹ Duyên trăm năm hạnh phúc, sớm có quý tử nhé!", createdAt: "2026-04-14" },
      { id: "2", name: "Anh Minh Quân", message: "Mãi mặn nồng như ngày đầu nha hai bạn thân của tôi.", createdAt: "2026-04-14" },
      { id: "3", name: "Bạn Thu Trang", message: "Một đám cưới thật lãng mạn và tuyệt vời. Chúc mừng hạnh phúc gia đình nhỏ!", createdAt: "2026-04-14" },
    ]);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % wishes.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);

  if (wishes.length === 0) return null;

  return (
    <div className="space-y-8 overflow-hidden">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Guestbook</p>
        <h2 className="font-script text-4xl text-[#422114]">Sổ lưu bút</h2>
      </div>

      <div className="relative pt-10 pb-16 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10">
           <QuoteIcon className="w-20 h-20 text-[#422114] rotate-180" />
        </div>

        <div className="relative h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
            >
              <p className="text-base italic leading-relaxed opacity-80 mb-6">
                &ldquo;{wishes[currentIndex].message}&rdquo;
              </p>
              <div className="h-px w-8 bg-[#b9856f]/30 mb-4" />
              <p className="font-bold text-[#422114] uppercase tracking-widest text-xs">
                {wishes[currentIndex].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6 mt-4">
           <button onClick={prev} className="w-10 h-10 rounded-full border border-[#422114]/10 flex items-center justify-center hover:bg-[#422114] hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
           </button>
           <button onClick={next} className="w-10 h-10 rounded-full border border-[#422114]/10 flex items-center justify-center hover:bg-[#422114] hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
           </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
           {wishes.map((_, i) => (
             <div 
               key={i} 
               className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-[#422114] w-4' : 'bg-gray-300'}`} 
             />
           ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center">
         <p className="text-sm opacity-60 mb-6 font-bold uppercase tracking-widest">Gửi lời chúc đến chúng mình</p>
         <button className="w-full py-4 bg-[#422114] text-white rounded-xl font-bold hover:shadow-xl transition-shadow">
            Viết lời chúc
         </button>
      </div>
    </div>
  );
}
