"use client";

import { motion } from "framer-motion";
import { WeddingData } from "@/lib/template-registry";
import { cn } from "@/lib/utils";
import Image from "next/image";

type HeaderProps = {
  wedding: WeddingData;
  isBrideMode: boolean;
  editOverlay?: {
    highlightSlot: string | null;
    onSlotClick?: (slotKey: string) => void;
  };
};

export function InvitationHeader({ wedding, isBrideMode, editOverlay }: HeaderProps) {
  const firstName = isBrideMode ? wedding.brideName : wedding.groomName;
  const secondName = isBrideMode ? wedding.groomName : wedding.brideName;

  // Use wedding gallery for photos (Slot 1 & 2 as polaroids)
  const polaroid1 = wedding.gallery[0] || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600";
  const polaroid2 = wedding.gallery[1] || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600";

  return (
    <div className="relative pt-24 pb-12 px-6 flex flex-col items-center">
      {/* Names Header */}
      <div className="text-center z-10 mb-16">
        <p className="text-sm tracking-[0.3em] uppercase opacity-60 mb-8">Lễ thành hôn</p>
        <h1 className="font-script text-6xl text-[#422114] leading-tight">
          {firstName}
          <span className="block text-2xl my-2">&amp;</span>
          {secondName}
        </h1>
      </div>

      {/* Polaroid Section */}
      <div className="relative w-full h-[400px] flex justify-center">
        {/* Photo 1 (Tilted Left) */}
        <motion.div
          initial={{ rotate: 0, x: 0 }}
          whileInView={{ rotate: -8, x: -40 }}
          viewport={{ once: true }}
          className={cn(
            "polaroid-frame absolute z-20 w-[200px] cursor-pointer",
            editOverlay?.highlightSlot === "intro-1" && "ring-4 ring-[#b9856f]"
          )}
          onClick={() => editOverlay?.onSlotClick?.("intro-1")}
        >
          <Image src={polaroid1} alt={firstName} className="w-full aspect-square object-cover" width={200} height={200} unoptimized />
          <p className="font-script text-lg text-center mt-3 opacity-70">{firstName}</p>
        </motion.div>

        {/* Photo 2 (Tilted Right) */}
        <motion.div
          initial={{ rotate: 0, x: 0 }}
          whileInView={{ rotate: 6, x: 50, y: 80 }}
          viewport={{ once: true }}
          className={cn(
            "polaroid-frame absolute z-10 w-[200px] cursor-pointer",
            editOverlay?.highlightSlot === "intro-2" && "ring-4 ring-[#b9856f]"
          )}
          onClick={() => editOverlay?.onSlotClick?.("intro-2")}
        >
          <Image src={polaroid2} alt={secondName} className="w-full aspect-square object-cover" width={200} height={200} unoptimized />
          <p className="font-script text-lg text-center mt-3 opacity-70">{secondName}</p>
        </motion.div>
      </div>
      
      {/* Decorative leaf */}
      <div className="absolute top-1/2 -right-10 opacity-20 transform rotate-45 pointer-events-none">
         <svg width="150" height="150" viewBox="0 0 100 100" className="fill-[#b9856f]">
            <path d="M50,10 C60,40 90,50 50,90 C10,50 40,40 50,10" />
         </svg>
      </div>
    </div>
  );
}
