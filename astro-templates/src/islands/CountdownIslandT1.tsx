import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function clampNonNegative(n: number) {
  return Math.max(0, n);
}

function getParts(targetMs: number): Parts {
  const now = Date.now();
  const diff = clampNonNegative(targetMs - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
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
          <span className="tabular-nums text-4xl sm:text-5xl lg:text-6xl font-heading text-burgundy font-medium tracking-tight">
            {value}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function CountdownIslandT1({ dateLabel, startsAtISO, image }: { dateLabel: string; startsAtISO: string; image?: string; }) {
  const targetMs = useMemo(() => new Date(startsAtISO).getTime(), [startsAtISO]);
  const [parts, setParts] = useState<Parts>(() => getParts(targetMs));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const items = [
    { label: "Ngày", value: String(parts.days).padStart(2, "0") },
    { label: "Giờ", value: String(parts.hours).padStart(2, "0") },
    { label: "Phút", value: String(parts.minutes).padStart(2, "0") },
    { label: "Giây", value: String(parts.seconds).padStart(2, "0") }
  ];

  return (
    <section id="countdown" className="relative py-16 sm:py-20 overflow-hidden bg-paper">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          {/* Left side */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] sm:aspect-square rounded-t-full overflow-hidden border-[8px] border-white shadow-2xl transition-transform hover:scale-[1.01] duration-700"
            >
              <img
                src={image || ""}
                alt="Together"
                className="w-full h-full object-cover scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-burgundy/5" />
            </motion.div>
          </div>

          {/* Right side */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center lg:text-left mb-12">
                <h2 className="title-primary text-lg sm:text-xl font-bold mb-6 tracking-[0.25em]">
                  Đếm ngược ngày trọng đại
                </h2>
                <div className="h-px w-24 bg-gold mx-auto lg:mx-0 opacity-60" />
                <p className="mt-8 text-4xl sm:text-5xl font-heading text-burgundy font-bold tracking-tight">
                  {dateLabel}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {items.map((item) => (
                  <div key={item.label} className="bg-white/40 backdrop-blur-md border border-gold/10 p-6 rounded-2xl shadow-sm text-center group hover:bg-white/60 transition-colors duration-500">
                    <NumberFlip value={item.value} />
                    <p className="mt-4 text-sm sm:text-base tracking-[0.3em] uppercase text-ink font-bold">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="mt-16 text-center lg:text-left italic text-ink/70 text-lg font-heading">
                “Dù đi đâu, làm gì, chỉ cần chúng ta bên nhau.”
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
