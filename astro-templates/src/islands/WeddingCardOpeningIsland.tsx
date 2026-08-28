import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

/**
 * Port từ components/templates/classic-burgundy/WeddingCardOpening.tsx.
 * `guestName`/`guestSalutation` là cá nhân hoá theo từng khách qua URL
 * (?name=...&salutation=...) — HTML được build sẵn 1 lần cho mọi khách nên
 * KHÔNG thể nhận 2 giá trị này qua prop build-time. Đọc thẳng từ
 * `window.location.search` lúc hydrate thay vì props (khác bản React gốc
 * chạy trong Next, nơi giá trị này tới từ `searchParams` server-side).
 */
type Props = {
  groomName: string;
  brideName: string;
  isBrideMode: boolean;
};

export default function WeddingCardOpeningIsland({
  groomName,
  brideName,
  isBrideMode,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState<string | undefined>();
  const [guestSalutation, setGuestSalutation] = useState<string | undefined>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get("guest") || params.get("name") || undefined);
    setGuestSalutation(params.get("salutation") || params.get("xung_ho") || undefined);
  }, []);

  const displayName =
    guestSalutation && guestName ? `${guestSalutation} ${guestName}` : guestName || null;

  useEffect(() => {
    if (!isOpen) {
      const html = document.documentElement;
      const body = document.body;
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      const prevBodyHeight = body.style.height;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.height = "100%";
      return () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        body.style.height = prevBodyHeight;
      };
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.height = "";
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);

  const firstName = isBrideMode ? brideName : groomName;
  const secondName = isBrideMode ? groomName : brideName;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#70261B]"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden cb-bling-layer" aria-hidden>
            <div className="cb-bling-shimmer" />
            <div className="cb-bling-sparkles">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="cb-sparkle" aria-hidden />
              ))}
            </div>
          </div>

          <div
            className="relative w-[min(90vw,320px)] sm:w-[min(85vw,360px)] md:max-w-[380px] aspect-[3/4] max-h-[80vh] shrink-0 cursor-pointer mx-auto"
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
            aria-label="Chạm để mở thiệp"
          >
            <div className="absolute inset-x-0 bottom-[-20px] h-10 bg-black/20 blur-xl rounded-full" />
            <div className="absolute inset-0 bg-white shadow-sm rounded-lg border cb-border-accent" style={{ borderColor: "color-mix(in srgb, var(--cb-accent) 5%, transparent)" }} />

            <motion.div
              className="absolute inset-0 z-10 origin-left"
              whileHover={{ rotateY: -10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="absolute inset-0 bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8 text-center overflow-hidden cb-border-accent" style={{ borderWidth: "1px", borderColor: "color-mix(in srgb, var(--cb-accent) 10%, transparent)" }}>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" aria-hidden />
                <div className="absolute inset-4 pointer-events-none cb-border-accent" style={{ borderWidth: "1px", borderColor: "color-mix(in srgb, var(--cb-accent) 20%, transparent)" }} aria-hidden />

                <div className="mb-4 sm:mb-6 relative shrink-0">
                  <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-white p-1.5 cb-border-primary" style={{ borderWidth: "1px", borderColor: "color-mix(in srgb, var(--cb-primary) 20%, transparent)" }}>
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 cb-text-primary" style={{ color: "var(--cb-primary)", fill: "color-mix(in srgb, var(--cb-primary) 20%, transparent)" }} />
                  </div>
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="relative z-10 shrink-0"
                >
                  {displayName && (
                    <p className="text-sm sm:text-base font-heading mb-3 cb-text-primary opacity-90">
                      Kính gửi: <span className="font-black cb-text-primary">{displayName}</span>
                    </p>
                  )}
                  <p className="cb-text-primary text-sm sm:text-base tracking-[0.4em] uppercase font-bold mb-4">
                    Trân trọng báo tin
                  </p>
                  <div className="h-px w-24 mx-auto mb-6" style={{ backgroundColor: "color-mix(in srgb, var(--cb-accent) 40%, transparent)" }} />

                  <div className="mb-8 space-y-2">
                    <p className="text-3xl sm:text-4xl font-script cb-text-primary font-bold">{firstName}</p>
                    <p className="text-xl sm:text-2xl font-script cb-text-accent">&amp;</p>
                    <p className="text-3xl sm:text-4xl font-script cb-text-primary font-bold">{secondName}</p>
                  </div>

                  <h2 className="text-lg sm:text-xl font-heading italic mb-8 cb-text-body opacity-60">
                    (Chạm để mở thiệp)
                  </h2>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="cb-text-accent opacity-60"
                  >
                    <Heart className="w-8 h-8 mx-auto" style={{ fill: "color-mix(in srgb, var(--cb-accent) 10%, transparent)", color: "var(--cb-accent)" }} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
