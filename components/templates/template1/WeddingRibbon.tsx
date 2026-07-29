"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const RIBBON_CONTENT = [
    { id: "top", text: "Thanh Tùng • Hương Giang" },
    { id: "thong-tin", text: "Thứ Sáu • 13 • 02 • 2026" },
    { id: "countdown", text: "Hạnh phúc là có nhau" },
    { id: "anh", text: "Vị ngọt tình yêu" },
    { id: "loi-chuc", text: "Trân trọng kính mời" },
];

export function WeddingRibbon() {
    const [activeText, setActiveText] = useState(RIBBON_CONTENT[0].text);
    const { scrollYProgress } = useScroll();

    // Parallax: lên khi scroll, nhưng cuối page hạ lại để không bị che phần trên (con dấu)
    const ribbonY = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, -85, -85, 0]);
    const smoothY = useSpring(ribbonY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = RIBBON_CONTENT[0].text;

            for (const item of RIBBON_CONTENT) {
                const element = document.getElementById(item.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is near the middle of the viewport
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentSection = item.text;
                        break;
                    }
                }
            }
            setActiveText(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed left-4 sm:left-8 top-0 h-screen w-12 sm:w-16 z-50 pointer-events-none hidden md:flex items-center justify-center overflow-hidden">
            <motion.div
                style={{ y: smoothY }}
                className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden"
            >
                {/* The Ribbon Body - SVG for organic soft shape */}
                <svg
                    viewBox="0 0 60 800"
                    className="absolute inset-0 h-full w-full drop-shadow-[4px_0_15px_rgba(128,0,32,0.3)]"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        d="M10 0 C 30 100, 0 200, 20 300 C 40 400, 10 500, 30 600 C 50 700, 20 800, 40 900"
                        stroke="#D4AF37"
                        strokeWidth="0.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    />
                    {/* Animated path to simulate continuous gentle wave */}
                    <motion.path
                        d="M0 0 L60 0 L55 800 L5 800 Z"
                        fill="#800020"
                        className="opacity-95"
                        animate={{
                            d: [
                                "M0 0 L60 0 L58 800 L2 800 Z",
                                "M0 0 L60 0 L52 800 L8 800 Z",
                                "M0 0 L60 0 L58 800 L2 800 Z"
                            ]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Subtle silk texture/shading */}
                    <rect width="60" height="800" fill="url(#silk-gradient)" />

                    <defs>
                        <linearGradient id="silk-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Gold Edges */}
                <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
                <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

                {/* Vertical Text Content - không scroll */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full overflow-hidden">
                    <div
                        className="whitespace-nowrap font-serif text-white/90 text-sm sm:text-base tracking-[0.4em] uppercase overflow-hidden"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={activeText}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="block"
                            >
                                {activeText}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Con dấu – đặt hẳn trong khung để không bị cắt nửa */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-burgundy overflow-hidden p-1 z-20">
                    <img src="/images/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                </div>
            </motion.div>
        </div>
    );
}
