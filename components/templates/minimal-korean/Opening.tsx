"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#24292E]/70 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-[#FAF9F5] p-8 rounded-2xl shadow-2xl border border-[#E8E5DD] text-center flex flex-col items-center relative"
          >
            <div className="w-12 h-0.5 bg-[#B39D82] mb-6" />
            
            <p className="text-xs uppercase tracking-[0.25em] text-[#B39D82] font-semibold mb-2">
              Wedding Invitation
            </p>

            <h2 className="text-2xl font-serif text-[#2C3E50] mb-1">
              {groomName} & {brideName}
            </h2>

            <p className="text-xs text-[#777777] mb-6">
              {isBrideMode ? "Lễ Vu Quy" : "Lễ Tân Hôn"}
            </p>

            {guestName && (
              <div className="bg-white/80 border border-[#E8E5DD] rounded-xl px-5 py-3 mb-6 w-full">
                <p className="text-xs text-[#777777] mb-0.5">Kính mời:</p>
                <p className="text-sm font-semibold text-[#2C3E50]">
                  {guestSalutation ? `${guestSalutation} ` : ""}{guestName}
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="px-6 py-2.5 rounded-full bg-[#2C3E50] text-white text-xs font-medium tracking-wider uppercase hover:bg-[#34495E] transition-all shadow-md"
            >
              Mở Thiệp Cưới
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
