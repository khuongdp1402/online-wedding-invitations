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
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D0A0A]/85 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-[#8B0000] text-[#FFFDF9] p-8 rounded-3xl shadow-2xl border-2 border-[#E5A93C] text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Background luxury ornament */}
            <div className="text-6xl text-[#E5A93C] mb-3 font-serif select-none">
              囍
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-[#FFE29F] font-semibold mb-2">
              ROYAL WEDDING
            </p>

            <h2 className="text-2xl font-serif text-[#FFFDF9] mb-1 font-bold">
              {groomName} & {brideName}
            </h2>

            <p className="text-xs text-[#E5A93C] mb-6">
              {isBrideMode ? "Kính Mời Lễ Vu Quy" : "Kính Mời Lễ Tân Hôn"}
            </p>

            {guestName && (
              <div className="bg-[#660000] border border-[#E5A93C]/40 rounded-xl px-5 py-3 mb-6 w-full">
                <p className="text-xs text-[#FFE29F]/80 mb-0.5">Trân trọng kính mời:</p>
                <p className="text-sm font-semibold text-white">
                  {guestSalutation ? `${guestSalutation} ` : ""}{guestName}
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FFE29F] via-[#FFAE34] to-[#ED9E21] text-[#660000] text-xs font-bold tracking-wider uppercase shadow-lg hover:brightness-110 transition-all"
            >
              Mở Thiệp Chúc Mừng
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
