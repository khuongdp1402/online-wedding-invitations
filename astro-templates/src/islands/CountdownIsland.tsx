import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Port từ components/templates/classic-burgundy/Countdown.tsx — chỉ phần
 * đếm ngược thật sự cần JS (setInterval mỗi giây). Ảnh + heading tĩnh được
 * render sẵn ở CountdownStatic.astro bên ngoài island này; edit-overlay
 * (useEditOverlay/editSlotClass) bị bỏ vì không cần ở trang public.
 */
type Parts = { days: number; hours: number; minutes: number; seconds: number };

function getParts(targetMs: number): Parts {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function NumberFlip({ value }: { value: string }) {
  return (
    <div className="relative h-[3.5rem] sm:h-[4.5rem] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="tabular-nums text-4xl sm:text-5xl lg:text-6xl font-heading cb-text-primary font-medium tracking-tight">
            {value}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function CountdownIsland({ targetISO }: { targetISO: string }) {
  const targetMs = useMemo(() => {
    const d = new Date(targetISO);
    return isNaN(d.getTime()) ? Date.now() + 30 * 86400000 : d.getTime();
  }, [targetISO]);

  const [parts, setParts] = useState<Parts>(() => getParts(targetMs));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const items = [
    { label: "Ngày", value: String(parts.days).padStart(2, "0") },
    { label: "Giờ", value: String(parts.hours).padStart(2, "0") },
    { label: "Phút", value: String(parts.minutes).padStart(2, "0") },
    { label: "Giây", value: String(parts.seconds).padStart(2, "0") },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white/40 backdrop-blur-md border p-6 rounded-2xl shadow-sm text-center group hover:bg-white/60 transition-colors duration-500"
          style={{ borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)" }}
        >
          <NumberFlip value={item.value} />
          <p className="mt-4 text-sm sm:text-base tracking-[0.3em] uppercase cb-text-body font-bold">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
