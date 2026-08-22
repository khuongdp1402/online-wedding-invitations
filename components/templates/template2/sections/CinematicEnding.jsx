"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../StoryEngine";
import { EASE_LUXURY, DURATION_AUDIO_FADE } from "../config/motionConstants";

export default function CinematicEnding({ chapter }) {
  const containerRef = useRef(null);
  const typewriterRef = useRef(null);
  const imageRef = useRef(null);
  const triggerRef = useRef(null);
  const audioRef = useAudio();

  const [displayedText, setDisplayedText] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let typewriterTimeout;

    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      once: true,
      onEnter: () => {
        // Fade in background image to 0.5 immediately for early visual feedback
        gsap.to(imageRef.current, { opacity: 0.5, duration: 2, ease: EASE_LUXURY });

        // 2. Audio fade out — Vol.2: "Nhạc nhỏ dần"
        if (audioRef?.current) {
          gsap.to(audioRef.current, { volume: 0, duration: DURATION_AUDIO_FADE });
        }

        // 3. Typewriter text
        const text = chapter.quote || "Cảm ơn bạn đã là một phần của câu chuyện này.";
        let i = 0;
        const typewrite = () => {
          if (i <= text.length) {
            setDisplayedText(text.slice(0, i));
            i++;
            typewriterTimeout = setTimeout(typewrite, 60);
          } else {
            // 4. After typewriter: Image brightens up + confetti
            setTimeout(() => {
              gsap.to(imageRef.current, { opacity: 0.85, scale: 1.03, duration: 1.5, ease: EASE_LUXURY });

              // 5. Confetti
              confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 }, colors: ["#D4AF37", "#FFFFFF", "#800020"] });
              setTimeout(() => confetti({ particleCount: 120, spread: 70, origin: { y: 0.4, x: 0.3 }, colors: ["#D4AF37", "#FFFFFF"] }), 500);
              setTimeout(() => {
                confetti({ particleCount: 120, spread: 70, origin: { y: 0.4, x: 0.7 }, colors: ["#800020", "#D4AF37"] });
                setShowBtn(true);
              }, 1000);
            }, 500);
          }
        };
        // Start typewriter after 500ms
        setTimeout(typewrite, 500);
      },
    });

    return () => {
      if (triggerRef.current) triggerRef.current.kill();
      clearTimeout(typewriterTimeout);
    };
  }, [chapter.quote, audioRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end pb-[10vh] md:pb-[14vh] bg-black"
    >
      {/* Background image — aligned to the top (bg-top) and uncropped */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-[2] opacity-0 bg-cover bg-top will-change-transform"
        style={{ backgroundImage: `url(${chapter.images[0]})` }}
      >
        {/* Gradient dark overlay: only 30-40% from bottom up */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-35% to-transparent" />
      </div>

      {/* Content — sits at the bottom z-10 */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center pointer-events-none">
        <h2 className="text-[60px] md:text-[100px] font-[family-name:var(--font-calligraphy)] text-[#F0D78C] leading-none" style={{ textShadow: '0 0 20px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.5), 0 0 120px rgba(212,175,55,0.3)' }}>
          {chapter.title}
        </h2>

        {/* Typewriter text */}
        <p
          ref={typewriterRef}
          className="text-xs md:text-sm font-serif italic text-white/90 tracking-wide leading-relaxed min-h-[2em] max-w-[500px]"
        >
          {displayedText}
          <span className="animate-pulse font-bold text-[#F0D78C]">|</span>
        </p>

        {/* Video Button with Arrow */}
        <AnimatePresence>
          {showBtn && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 relative pointer-events-auto"
            >
              {/* Decorative Arrow */}
              <div className="absolute -top-10 -right-16 md:-right-20 w-16 md:w-20 opacity-80 text-[#F0D78C] pointer-events-none transform rotate-12">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  <path d="M10,80 Q30,20 80,40 T90,90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5,5" fill="none" className="animate-pulse" />
                  <polygon points="85,80 95,90 80,95" fill="currentColor" />
                </svg>
              </div>

              <button
                onClick={() => setShowVideo(true)}
                className="px-8 py-3 bg-[color-mix(in_srgb,var(--color-gold)_20%,transparent)] border border-[var(--color-gold)] text-[#F0D78C] hover:bg-[color-mix(in_srgb,var(--color-gold)_40%,transparent)] active:scale-95 transition-all rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-[10px] tracking-[0.2em] font-semibold uppercase">Xem Video</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)] shadow-2xl">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white border border-white/20 transition-colors"
              >
                ✕
              </button>
              
              {/* Local Video Placeholder */}
              <video 
                className="w-full h-full object-contain"
                controls
                autoPlay
                src="/videos/wedding.mp4"
                poster={chapter.images[0]}
              >
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
