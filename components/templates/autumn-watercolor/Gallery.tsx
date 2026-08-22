"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type GalleryProps = {
  images: string[];
  weddingId: string;
  editOverlay?: {
    highlightSlot: string | null;
    onSlotClick?: (slotKey: string, el?: HTMLElement) => void;
  };
};

export function Gallery({ images, editOverlay }: GalleryProps) {
  // We use images from index 2 onwards for the gallery grid
  const galleryImages = images.slice(2, 8); // Display 6 images in grid

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] opacity-40 mb-2">Moments</p>
        <h2 className="font-script text-4xl text-[var(--primary)]">Album ảnh cưới</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {galleryImages.map((img, i) => {
          const slotKey = `gallery-${i + 2}`;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 cursor-pointer border border-white shadow-sm",
                editOverlay?.highlightSlot === slotKey && "ring-4 ring-[var(--secondary)]"
              )}
              onClick={(e) => editOverlay?.onSlotClick?.(slotKey, e.currentTarget)}
            >
              <Image 
                src={img || "https://images.unsplash.com/photo-1544594081-347898b4807c?q=80&w=400"} 
                alt="" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                width={400}
                height={533}
                unoptimized
              />
            </motion.div>
          );
        })}
      </div>
      
      {galleryImages.length === 0 && (
        <p className="text-sm text-center italic opacity-40">Chưa có ảnh trong bộ sưu tập</p>
      )}
    </div>
  );
}
