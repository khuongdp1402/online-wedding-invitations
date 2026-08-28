"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote as QuoteIcon, Loader2 } from "lucide-react";

type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function WishesSliderIslandAW({ weddingId }: { weddingId: string }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const fetchWishes = useCallback(async () => {
    if (!weddingId) return;
    try {
      const res = await fetch(`/api/wishes?weddingId=${weddingId}`);
      const data = await res.json();
      if (Array.isArray(data.wishes)) {
        setWishes(data.wishes);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  }, [weddingId]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const canSubmit =
    name.trim().length > 1 && message.trim().length > 3 && status !== "submitting";

  async function onSubmit() {
    if (!canSubmit) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weddingId, name: name.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error("failed");
      setName("");
      setMessage("");
      setStatus("success");
      await fetchWishes();
      setTimeout(() => {
        setStatus("idle");
        setFormOpen(false);
      }, 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const hasWishes = wishes.length > 0;
  const next = () => setCurrentIndex((prev) => (prev + 1) % wishes.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);

  return (
    <div className="space-y-8 overflow-hidden">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Guestbook</p>
        <h2 className="font-script text-4xl text-[var(--primary)]">Sổ lưu bút</h2>
      </div>

      {hasWishes && (
        <div className="relative pt-10 pb-16 px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10">
             <QuoteIcon className="w-20 h-20 text-[var(--primary)] rotate-180" />
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
                <div className="h-px w-8 bg-[color-mix(in_srgb,var(--secondary)_30%,transparent)] mb-4" />
                <p className="font-bold text-[var(--primary)] uppercase tracking-widest text-xs">
                  {wishes[currentIndex].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {wishes.length > 1 && (
            <>
              <div className="flex justify-center gap-6 mt-4">
                 <button onClick={prev} className="w-10 h-10 rounded-full border border-[color-mix(in_srgb,var(--primary)_10%,transparent)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button onClick={next} className="w-10 h-10 rounded-full border border-[color-mix(in_srgb,var(--primary)_10%,transparent)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                 {wishes.map((_, i) => (
                   <div
                     key={i}
                     className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-[var(--primary)] w-4' : 'bg-gray-300'}`}
                   />
                 ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center">
         <p className="text-sm opacity-60 mb-6 font-bold uppercase tracking-widest">Gửi lời chúc đến chúng mình</p>

         {!formOpen ? (
           <button
             onClick={() => setFormOpen(true)}
             className="w-full py-4 bg-[var(--primary)] text-white rounded-xl font-bold hover:shadow-xl transition-shadow"
           >
              Viết lời chúc
           </button>
         ) : (
           <div className="space-y-3 text-left">
             <input
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Tên của bạn"
               className="w-full px-4 py-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_15%,transparent)] bg-[color-mix(in_srgb,var(--bg-cream)_40%,transparent)] outline-none focus:border-[color-mix(in_srgb,var(--primary)_40%,transparent)] transition-colors"
             />
             <textarea
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Gửi một lời chúc thật ấm áp..."
               rows={4}
               className="w-full px-4 py-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_15%,transparent)] bg-[color-mix(in_srgb,var(--bg-cream)_40%,transparent)] outline-none focus:border-[color-mix(in_srgb,var(--primary)_40%,transparent)] transition-colors resize-none"
             />
             <div className="flex gap-3">
               <button
                 onClick={() => setFormOpen(false)}
                 className="flex-1 py-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_15%,transparent)] font-bold hover:bg-[var(--bg-cream)] transition-colors"
               >
                 Hủy
               </button>
               <button
                 onClick={onSubmit}
                 disabled={!canSubmit}
                 className="flex-1 py-3 bg-[var(--primary)] text-white rounded-xl font-bold hover:shadow-xl transition-shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
               >
                 {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                 {status === "submitting" ? "Đang gửi..." : "Gửi"}
               </button>
             </div>
             {status === "success" && (
               <p className="text-sm text-emerald-600 text-center">Cảm ơn lời chúc của bạn!</p>
             )}
             {status === "error" && (
               <p className="text-sm text-red-500 text-center">Có lỗi xảy ra, vui lòng thử lại.</p>
             )}
           </div>
         )}
      </div>
    </div>
  );
}
