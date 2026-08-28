"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusicIslandAW({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle auto-play on first interaction if not already playing
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };

    window.addEventListener("click", handleFirstInteraction);
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [hasInteracted]);

  return (
    <>
      <audio ref={audioRef} src={url} loop />
      
      <div className="fixed bottom-6 left-6 z-[60]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isPlaying ? 'bg-[var(--primary)] text-white' : 'bg-white text-[var(--primary)] border border-[color-mix(in_srgb,var(--primary)_10%,transparent)]'
          }`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Music2 className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="paused">
                <Music className="w-5 h-5 opacity-40" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsing rings when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[var(--primary)] animate-ping opacity-20" />
          )}
        </motion.button>
      </div>
    </>
  );
}
