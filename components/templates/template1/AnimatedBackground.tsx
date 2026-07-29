"use client";

import { motion } from "framer-motion";

const SPARKLE_ICON_COUNT = 18;
const sparklePositions = Array.from({ length: SPARKLE_ICON_COUNT }, (_, i) => {
  const angle = (i / SPARKLE_ICON_COUNT) * Math.PI * 2 + i * 0.7;
  const radius = 18 + (i % 5) * 8 + (i % 3) * 4;
  return {
    left: 50 + Math.cos(angle) * radius + (i % 2 === 0 ? 5 : -5),
    top: 50 + Math.sin(angle) * radius * 0.9 + (i % 3) * 2,
    size: 28 + (i % 4) * 12,
    rotate: (i * 37) % 360,
    opacity: 0.06 + (i % 5) * 0.025,
  };
});

/* Vị trí sparkle bling toàn site */
const SITE_SPARKLES = [
  { left: "8%", top: "12%", delay: 0 },
  { left: "92%", top: "8%", delay: 0.4 },
  { left: "15%", top: "85%", delay: 0.8 },
  { left: "85%", top: "88%", delay: 0.2 },
  { left: "50%", top: "5%", delay: 0.6 },
  { left: "5%", top: "50%", delay: 0.3 },
  { left: "95%", top: "45%", delay: 0.7 },
  { left: "25%", top: "35%", delay: 0.1 },
  { left: "75%", top: "70%", delay: 0.5 },
];

/* Vị trí icon trái tim nền */
const HEART_POSITIONS = [
  { left: "12%", top: "8%", size: 32, rotate: -10 },
  { left: "88%", top: "18%", size: 28, rotate: 8 },
  { left: "8%", top: "75%", size: 36, rotate: 5 },
  { left: "92%", top: "82%", size: 30, rotate: -6 },
  { left: "22%", top: "52%", size: 24, rotate: -15 },
  { left: "78%", top: "48%", size: 26, rotate: 12 },
  { left: "50%", top: "28%", size: 22, rotate: 0 },
  { left: "50%", top: "72%", size: 28, rotate: 3 },
];

/* Vị trí icon sparkles (lucide) nền */
const SPARKLES_ICON_POSITIONS = [
  { left: "18%", top: "22%", size: 28, rotate: -5 },
  { left: "82%", top: "12%", size: 32, rotate: 10 },
  { left: "10%", top: "55%", size: 24, rotate: 8 },
  { left: "90%", top: "65%", size: 30, rotate: -8 },
  { left: "35%", top: "8%", size: 26, rotate: 0 },
  { left: "65%", top: "88%", size: 28, rotate: 5 },
  { left: "5%", top: "35%", size: 22, rotate: -12 },
  { left: "95%", top: "38%", size: 24, rotate: 6 },
];

/* Chữ watermark thêm */
const EXTRA_WATERMARK_WORDS = [
  { text: "Happiness", left: "72%", top: "42%", size: "4rem", rotate: 8 },
  { text: "Blessed", left: "18%", top: "62%", size: "3.5rem", rotate: -8 },
  { text: "Always", left: "55%", top: "12%", size: "3rem", rotate: -5 },
  { text: "Joy", left: "8%", top: "42%", size: "4.5rem", rotate: 12 },
  { text: "Dream", left: "85%", top: "75%", size: "3.5rem", rotate: -10 },
];

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Chữ nền watermark Love, Forever, Together – nhìn thấy trên nền tối */}
      <div className="absolute inset-0 overflow-hidden">
        <span
          className="absolute left-[5%] top-[15%] font-serif italic text-gold/20 sm:text-gold/25 lg:text-gold/20 text-[3rem] sm:text-[5rem] lg:text-[8rem] rotate-[-15deg] select-none bg-bling-text"
          aria-hidden
        >
          Love
        </span>
        <span
          className="absolute right-[10%] top-[25%] font-serif italic text-gold/20 sm:text-gold/25 lg:text-gold/20 text-[2.5rem] sm:text-[4rem] lg:text-[6rem] rotate-12 select-none bg-bling-text"
          aria-hidden
        >
          Together
        </span>
        <span
          className="absolute left-1/2 bottom-[20%] -translate-x-1/2 font-serif italic text-gold/20 sm:text-gold/25 lg:text-gold/20 text-[3rem] sm:text-[6rem] lg:text-[9rem] select-none bg-bling-text"
          aria-hidden
        >
          Forever
        </span>
        {/* Chữ watermark thêm: Happiness, Blessed, Always, Joy, Dream */}
        {EXTRA_WATERMARK_WORDS.map((w, i) => (
          <span
            key={`wm-${i}`}
            className="absolute font-serif italic text-gold/20 sm:text-gold/25 select-none bg-bling-text hidden sm:inline"
            style={{
              left: w.left,
              top: w.top,
              transform: `translate(-50%, -50%) rotate(${w.rotate}deg)`,
              fontSize: w.size,
            }}
            aria-hidden
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* Icon trái tim nền */}
      {HEART_POSITIONS.map((pos, i) => (
        <div
          key={`bg-heart-${i}`}
          className="absolute text-gold/20 sm:text-gold/25 pointer-events-none bg-bling-text"
          style={{
            left: pos.left,
            top: pos.top,
            width: pos.size,
            height: pos.size,
            transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
          }}
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      ))}

      {/* Icon sparkles (lucide) nền */}
      {SPARKLES_ICON_POSITIONS.map((pos, i) => (
        <div
          key={`bg-sparkles-${i}`}
          className="absolute text-gold/20 sm:text-gold/25 pointer-events-none bg-bling-text"
          style={{
            left: pos.left,
            top: pos.top,
            width: pos.size,
            height: pos.size,
            transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
          }}
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
        </div>
      ))}

      {/* Sparkle bling toàn web */}
      {SITE_SPARKLES.map((s, i) => (
        <div
          key={`site-bling-${i}`}
          className="site-bling-sparkle"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: `${s.delay}s`,
          }}
          aria-hidden
        />
      ))}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-[0.05]"
        style={{
          backgroundImage: "url('/xi-character.png')",
          backgroundSize: "350px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
          mixBlendMode: "multiply",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {sparklePositions.map((pos, i) => (
        <div
          key={i}
          className="absolute bg-no-repeat bg-center bg-contain pointer-events-none"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            width: pos.size,
            height: pos.size,
            transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
            backgroundImage: "url('/happiness-sparkle-icon.png')",
            opacity: pos.opacity,
            mixBlendMode: "multiply",
          }}
        />
      ))}

      <div
        className="absolute inset-4 md:inset-8 border transform rotate-1"
        style={{
          borderColor: "rgba(212, 175, 55, 0.4)",
          borderWidth: "1.5px",
        }}
      />
      <div
        className="absolute inset-6 md:inset-10 border transform -rotate-1"
        style={{
          borderColor: "rgba(212, 175, 55, 0.3)",
          borderWidth: "1px",
        }}
      />

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px]"
          initial={{
            x: (i / 12) * 100 + "%",
            y: "110%",
            opacity: 0,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 10 + (i % 5) * 3,
            repeat: Infinity,
            delay: (i % 4) * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
