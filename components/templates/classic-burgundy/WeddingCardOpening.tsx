"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

type WeddingCardOpeningProps = {
  groomName: string;
  brideName: string;
  isBrideMode: boolean;
  guestName?: string;
  guestSalutation?: string;
};

export function WeddingCardOpening({
  groomName,
  brideName,
  isBrideMode,
  guestName,
  guestSalutation,
}: WeddingCardOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayName =
    guestSalutation && guestName
      ? `${guestSalutation} ${guestName}`
      : guestName || null;

  useEffect(() => {
    if (!isOpen) {
      const html = document.documentElement;
      const body = document.body;
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      const prevBodyHeight = body.style.height;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.height = "100%";
      return () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        body.style.height = prevBodyHeight;
      };
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.height = "";
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);

  const firstName = isBrideMode ? brideName : groomName;
  const secondName = isBrideMode ? groomName : brideName;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#70261B]"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden cb-bling-layer" aria-hidden>
            <div className="cb-bling-shimmer" />
            <div className="cb-bling-sparkles">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="cb-sparkle" aria-hidden />
              ))}
            </div>
          </div>

          <div
            className="relative w-[min(90vw,320px)] sm:w-[min(85vw,360px)] md:max-w-[380px] aspect-[3/4] max-h-[80vh] shrink-0 cursor-pointer mx-auto"
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
            aria-label="Chạm để mở thiệp"
          >
            <div className="absolute inset-x-0 bottom-[-20px] h-10 bg-black/20 blur-xl rounded-full" />
            <div className="absolute inset-0 bg-white shadow-sm rounded-lg border border-[#D4AF37]/5" />

            <motion.div
              className="absolute inset-0 z-10 origin-left"
              whileHover={{ rotateY: -10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="absolute inset-0 bg-white border border-[#D4AF37]/10 rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" aria-hidden />
                <div className="absolute inset-4 border border-[#D4AF37]/20 pointer-events-none" aria-hidden />

                <div className="mb-4 sm:mb-6 relative shrink-0">
                  <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden flex items-center justify-center shadow-lg border border-[#800020]/20 bg-white p-1.5">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#800020] fill-[#800020]/20" />
                  </div>
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="relative z-10 shrink-0"
                >
                  {displayName && (
                    <p className="text-[#800020]/90 text-sm sm:text-base font-serif mb-3">
                      Kính gửi: <span className="font-black text-[#800020]">{displayName}</span>
                    </p>
                  )}
                  <p className="text-[#800020] text-sm sm:text-base tracking-[0.4em] uppercase font-bold mb-4">
                    Trân trọng báo tin
                  </p>
                  <div className="h-px w-24 bg-[#D4AF37]/40 mx-auto mb-6" />

                  <div className="mb-8 space-y-2">
                    <p className="text-3xl sm:text-4xl font-script text-[#800020] font-bold">
                      {firstName}
                    </p>
                    <p className="text-xl sm:text-2xl font-script text-[#D4AF37]">&amp;</p>
                    <p className="text-3xl sm:text-4xl font-script text-[#800020] font-bold">
                      {secondName}
                    </p>
                  </div>

                  <h2 className="text-lg sm:text-xl font-serif text-[#4A4A4A]/60 italic mb-8">
                    (Chạm để mở thiệp)
                  </h2>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[#D4AF37]/60"
                  >
                    <Heart className="w-8 h-8 fill-[#D4AF37]/10 mx-auto" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
