"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

import { Heart, Flower, Loader2 } from "lucide-react";

type RSVPChoice = "yes" | "no";
type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  weddingId: string;
  /** Tên khách lấy từ link cá nhân hoá (?guest=...), dùng làm giá trị mặc định. */
  guestName?: string;
};

export function RSVPSection({ weddingId, guestName }: Props) {
  const [choice, setChoice] = useState<RSVPChoice | null>(null);
  const [name, setName] = useState(guestName ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const message = useMemo(() => {
    if (choice === "yes") return "Rất hân hạnh được đón tiếp bạn trong ngày trọng đại của chúng mình!";
    if (choice === "no") return "Chúng mình rất tiếc nhưng hoàn toàn thông cảm. Cảm ơn bạn đã gửi lời chúc!";
    return "";
  }, [choice]);

  const canSubmit = name.trim().length > 1 && choice !== null && status !== "submitting";

  async function submit() {
    if (!canSubmit || !choice) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          guestName: name.trim(),
          attendance: choice === "yes" ? "accept" : "decline",
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.error ?? "Không gửi được xác nhận, vui lòng thử lại.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Không gửi được xác nhận, vui lòng thử lại.");
      setStatus("error");
    }
  }

  return (
    <Section id="rsvp" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <div className="content-card text-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
              <Heart className="w-24 h-24 text-burgundy fill-burgundy" />
            </div>

            <h2 className="title-primary text-lg sm:text-xl font-bold mb-6 flex items-center justify-center gap-4 tracking-[0.25em]">
              <Flower className="w-5 h-5 text-gold/60" />
              Xác nhận tham dự
              <Flower className="w-5 h-5 text-gold/60" />
            </h2>
            <h3 className="text-3xl sm:text-5xl font-heading text-ink-dark font-black mb-12 leading-relaxed max-w-3xl mx-auto">
              Quý khách có thể tham dự lễ cưới cùng chúng tôi không?
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 mt-12">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setChoice("yes")}
                disabled={status === "success"}
                className={`p-10 text-center transition-all duration-500 border-2 rounded-none disabled:opacity-70 ${choice === "yes"
                  ? "border-burgundy bg-burgundy text-white shadow-2xl"
                  : "border-gold/20 bg-cream-light/30 text-burgundy hover:bg-cream-light hover:border-gold/50"
                  }`}
              >
                <div className="flex flex-col items-center gap-5">
                  <div className={`p-4 rounded-full ${choice === 'yes' ? 'bg-white/20' : 'bg-gold/10'}`}>
                    <Heart className={`w-8 h-8 ${choice === 'yes' ? 'text-white fill-white' : 'text-burgundy fill-burgundy/20'}`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base tracking-[0.2em] font-black uppercase">Sẽ tham dự</p>
                    <p className={`text-sm sm:text-base font-heading italic ${choice === "yes" ? "text-white/80" : "text-ink/60"}`}>
                      Hân hạnh được chung vui cùng hai bạn
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setChoice("no")}
                disabled={status === "success"}
                className={`p-10 text-center transition-all duration-500 border-2 rounded-none disabled:opacity-70 ${choice === "no"
                  ? "border-burgundy bg-burgundy text-white shadow-2xl"
                  : "border-gold/20 bg-cream-light/30 text-burgundy hover:bg-cream-light hover:border-gold/50"
                  }`}
              >
                <div className="flex flex-col items-center gap-5">
                  <div className={`p-4 rounded-full ${choice === 'no' ? 'bg-white/20' : 'bg-gold/10'}`}>
                    <Flower className={`w-8 h-8 ${choice === 'no' ? 'text-white' : 'text-burgundy'}`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base tracking-[0.2em] font-black uppercase">Vắng mặt</p>
                    <p className={`text-sm sm:text-base font-heading italic ${choice === "no" ? "text-white/80" : "text-ink/60"}`}>
                      Rất tiếc vì không thể tham dự
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>

            {choice && status !== "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="mt-12 max-w-md mx-auto space-y-4"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên của bạn"
                  className="w-full px-5 py-4 text-center bg-cream-light/50 border-2 border-gold/20 text-ink-dark placeholder:text-ink/40 focus:outline-none focus:border-burgundy transition-colors"
                />

                <button
                  type="button"
                  onClick={submit}
                  disabled={!canSubmit}
                  className="w-full px-8 py-4 bg-burgundy text-white text-sm tracking-[0.2em] font-black uppercase transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === "submitting" ? "Đang gửi..." : "Gửi xác nhận"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="mt-12 p-6 bg-cream-light rounded-none border border-gold/10"
              >
                <p className="text-lg font-heading text-ink-dark italic">
                  {message}
                </p>
                <div className="mt-4 flex justify-center">
                  <img src="/images/logo.png" alt="Logo" width={80} height={40} className="h-10 w-20 object-contain" />
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
