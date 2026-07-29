"use client";

import { useState, useEffect, useCallback } from "react";
import { useAudio } from "../StoryEngine";

/**
 * Floating music toggle button — bottom-right corner
 * Shows a pulsing music icon when playing, static when paused
 */
export default function MusicToggle() {
  const audioRef = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync state with actual audio element
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Check initial state
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  const toggle = useCallback(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [audioRef]);

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer"
      style={{
        background: isPlaying
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(255, 255, 255, 0.08)",
        borderColor: isPlaying
          ? "rgba(212, 175, 55, 0.6)"
          : "rgba(255, 255, 255, 0.2)",
        boxShadow: isPlaying
          ? "0 0 20px rgba(212, 175, 55, 0.3)"
          : "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* Music bars animation */}
      <div className="flex items-end gap-[3px] h-5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-full"
            style={{
              backgroundColor: isPlaying
                ? "var(--color-gold, #D4AF37)"
                : "rgba(255,255,255,0.5)",
              height: isPlaying ? undefined : "6px",
              animation: isPlaying
                ? `musicBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`
                : "none",
            }}
          />
        ))}
      </div>

      {/* CSS animation for music bars */}
      <style jsx>{`
        @keyframes musicBar {
          0% { height: 4px; }
          100% { height: 18px; }
        }
      `}</style>
    </button>
  );
}
