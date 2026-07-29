"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Heart, Calendar, MapPin } from "lucide-react";
import type { InvitationData } from "./lib/invitation";

type MobileRedSealProps = {
    data: InvitationData;
};

export function MobileRedSeal({ data }: MobileRedSealProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Con dấu chữ Hỷ – ẩn trên mobile theo yêu cầu */}
            <div className="fixed bottom-24 right-6 z-[60] hidden md:block">
                <motion.button
                    whileTap={{ scale: 0.85 }}
                    animate={{
                        scale: isOpen ? 0.8 : [1, 1.05, 1],
                        opacity: 1
                    }}
                    transition={{
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-16 h-16 rounded-full bg-burgundy shadow-[0_8px_20px_rgba(128,0,32,0.4)] border-2 border-gold/30 flex items-center justify-center group overflow-hidden"
                >
                    {/* Logo (nền trắng) – kích thước rõ ràng */}
                    <img src="/images/logo.png" alt="Logo" width={48} height={48} className="w-12 h-12 object-contain p-1 relative z-10 transition-transform group-active:scale-95 select-none" />

                    {/* Wax Texture / Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                    {/* Active State Pulse */}
                    {isOpen && (
                        <motion.div
                            layoutId="seal-active"
                            className="absolute inset-0 bg-burgundy-dark/50"
                        />
                    )}
                </motion.button>
            </div>

            {/* Information Popup Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
                        />
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            className="fixed bottom-0 left-0 right-0 z-[80] p-6 md:hidden"
                        >
                            <div className="bg-white rounded-[40px] shadow-2xl p-8 border border-gold/10 relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-burgundy/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 p-2 text-ink/20 hover:text-ink/60"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="text-center space-y-6">
                                    <div className="flex justify-center">
                                        <Heart className="w-8 h-8 text-burgundy/40 fill-burgundy/5" />
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] tracking-[0.5em] uppercase text-burgundy font-bold">Lễ Thành Hôn</p>
                                        <h3 className="text-3xl font-script text-burgundy leading-tight">
                                            {data.groom.name} & {data.bride.name}
                                        </h3>
                                    </div>

                                    <div className="grid gap-4 pt-4">
                                        <div className="flex items-center gap-4 bg-cream-light/50 p-4 rounded-2xl border border-gold/5">
                                            <Calendar className="w-5 h-5 text-burgundy/40" />
                                            <p className="text-sm font-serif text-ink-dark font-medium leading-none">{data.ceremony.solarDateLabel}</p>
                                        </div>
                                        <div className="flex items-center gap-4 bg-cream-light/50 p-4 rounded-2xl border border-gold/5">
                                            <MapPin className="w-5 h-5 text-burgundy/40" />
                                            <p className="text-sm font-serif text-ink-dark font-medium text-left leading-tight">{data.ceremony.venueName}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-[10px] text-ink/40 tracking-[0.3em] font-medium uppercase italic">Trân trọng kính mời</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
