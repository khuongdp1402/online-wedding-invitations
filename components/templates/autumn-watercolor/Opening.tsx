"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

type OpeningProps = {
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
}: OpeningProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);

  const firstName = isBrideMode ? brideName : groomName;
  const secondName = isBrideMode ? groomName : brideName;

  const displayName = guestSalutation && guestName ? `${guestSalutation} ${guestName}` : guestName;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--primary)] overflow-hidden"
        >
          {/* Falling Leaves Background */}
          <div className="leaves-container">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="leaf" />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[320px] aspect-[3/4] bg-white rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center text-center border-8 border-white ring-1 ring-[color-mix(in_srgb,var(--secondary)_20%,transparent)]"
            onClick={handleOpen}
          >
            {/* Watercolor Corner Decor */}
            <div className="absolute -top-4 -right-4 w-24 h-24 opacity-60">
               <svg viewBox="0 0 100 100" className="fill-[var(--secondary)]">
                 <path d="M10,90 Q50,50 90,10" stroke="currentColor" fill="none" />
                 <circle cx="90" cy="10" r="5" />
               </svg>
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 rounded-full border border-[color-mix(in_srgb,var(--secondary)_30%,transparent)] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[var(--secondary)] fill-[color-mix(in_srgb,var(--secondary)_10%,transparent)]" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-script text-4xl text-[var(--primary)]">
                {firstName} <span className="text-2xl block my-1">&amp;</span> {secondName}
              </p>
              
              <div className="h-px w-16 bg-[color-mix(in_srgb,var(--secondary)_30%,transparent)] mx-auto my-4" />
              
              <p className="text-sm tracking-[0.2em] uppercase text-gray-500 font-bold">
                10 tháng 5, 2026
              </p>

              {displayName && (
                <div className="mt-8 p-3 bg-gray-50 rounded-md border border-gray-100 italic">
                  <p className="text-xs text-gray-400 mb-1">Kính mời</p>
                  <p className="text-sm font-bold text-[var(--primary)]">{displayName}</p>
                </div>
              )}

              <button
                className="mt-10 px-8 py-3 bg-[var(--primary)] text-white rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Mở thiệp
              </button>
            </div>
            
            <p className="absolute bottom-6 text-[10px] text-gray-400 tracking-widest uppercase">
              Chạm để xem thiệp
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
