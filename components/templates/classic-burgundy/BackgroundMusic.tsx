"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

type BackgroundMusicProps = {
  musicUrl?: string;
};

export function BackgroundMusic({ musicUrl }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!musicUrl) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const startMusic = () => {
      if (hasStarted.current) return;
      audio.currentTime = 5;
      audio.play().then(() => {
        setIsPlaying(true);
        hasStarted.current = true;
      }).catch(() => {});
    };

    const timer = setTimeout(startMusic, 1000);

    const handleInteraction = () => {
      startMusic();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [musicUrl]);

  if (!musicUrl) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop autoPlay src={musicUrl} />
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <button
          onClick={togglePlay}
          className="group relative bg-[#800020]/90 backdrop-blur-md text-white p-2.5 sm:p-3 md:p-3.5 rounded-full shadow-2xl hover:bg-[#800020] transition-all duration-300 hover:scale-110 border border-[#D4AF37]/30"
          aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />}
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-[#800020] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
          </span>
          {isPlaying && <span className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/50 animate-ping" />}
        </button>
      </div>
    </>
  );
}
