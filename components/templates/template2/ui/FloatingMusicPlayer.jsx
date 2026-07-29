"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Auto-play khi user tương tác lần đầu
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Autoplay prevented:", err));
      }
      // Xóa event listener sau khi tương tác lần đầu
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        preload="auto" 
        autoPlay
        src="/Give Me Everything - (Cover by Archer Marsh) [Bridgerton Season 3 (Netflix Series)].mp3" 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <button 
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-transparent rounded-full shadow-2xl flex items-center justify-center border-4 border-[#D4AF37] focus:outline-none hover:scale-105 transition-transform"
        aria-label="Toggle Music"
      >
        <div className={`w-10 h-10 rounded-full border border-[#4A3728]/10 bg-[radial-gradient(circle,_#333_40%,_#111_100%)] flex items-center justify-center relative overflow-hidden ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          {/* Tâm đĩa than */}
          <div className="w-2 h-2 bg-white rounded-full absolute z-10" />
          
          {/* Nốt nhạc */}
          {!isPlaying && (
            <svg className="w-4 h-4 text-white absolute z-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        
        {/* Bong bóng nốt nhạc bay lên khi đang play */}
        {isPlaying && (
          <div className="absolute -top-4 -right-2 text-[#7a1f24] animate-bounce">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 18V5l12-2v13M9 9l12-2M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
      </button>
    </>
  );
}
