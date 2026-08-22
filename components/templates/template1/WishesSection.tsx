"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type Wish = {
  id: string;
  name: string;
  message: string;
  attendance?: string | null;
  createdAt: string;
};

type Props = {
  weddingId: string;
  /** Tên khách lấy từ link cá nhân hoá (?guest=...), dùng làm giá trị mặc định. */
  guestName?: string;
};

export function WishesSection({ weddingId, guestName }: Props) {
  const [name, setName] = useState(guestName ?? "");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>("yes");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const fetchWishes = useCallback(async () => {
    if (!weddingId) return;
    try {
      const res = await fetch(`/api/wishes?weddingId=${weddingId}`);
      const data = await res.json();
      if (Array.isArray(data.wishes)) setWishes(data.wishes);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  }, [weddingId]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const canSubmit = useMemo(() =>
    name.trim().length > 1 &&
    message.trim().length > 3 &&
    attendance !== null &&
    status !== "submitting",
    [name, message, attendance, status]);

  async function onSubmit() {
    if (!canSubmit) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          name: name.trim(),
          message: message.trim(),
          attendance: attendance === "yes" ? "Tham dự" : "Rất tiếc không thể",
        }),
      });

      if (!res.ok) throw new Error("Gửi lời chúc thất bại");

      setName("");
      setMessage("");
      setAttendance(null);
      setStatus("success");
      await fetchWishes();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving wish:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <Section id="loi-chuc" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            <div className="lg:col-span-12 xl:col-span-5">
              <div className="sticky top-24">
                <p className="text-sm tracking-[0.42em] uppercase text-burgundy font-bold transition-all">Gửi lời chúc & Xác nhận</p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-heading text-ink-dark leading-tight">
                  Lời chúc gửi trao,<br />Niềm vui trọn vẹn.
                </h2>
                <p className="mt-6 text-base sm:text-lg text-ink-dark leading-relaxed mb-10 font-medium">
                  Sự hiện diện và lời chúc của khách mời là món quà vô giá mà chúng mình trân quý nhất. Hãy cho tụi mình biết bạn có thể tham gia được không nhé!
                </p>

                <div className="relative aspect-[3/2] sm:aspect-[4/5] rounded-[40px] overflow-hidden border-[6px] border-white shadow-2xl rotate-[-1deg] hover:rotate-0 transition-all duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=1200"
                    alt="Love"
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-7">
              <div className="rounded-[40px] border border-gold/10 bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-burgundy/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="grid gap-8 relative z-10">
                  <div className="grid gap-6">
                    {/* Attendance Selection Added Back */}
                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase text-ink/60 font-bold ml-2">Bạn có thể tham dự chứ?</span>
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => setAttendance("yes")}
                          className={`flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center flex flex-col items-center gap-0.5 ${attendance === "yes" ? "bg-burgundy text-white border-burgundy shadow-lg" : "bg-white/50 border-gold/10 text-ink/60 hover:border-burgundy/30"}`}
                        >
                          <span className="block">Chắc chắn</span>
                          <span className="block"><span className="align-middle">rồi</span> <span className="text-lg align-middle" aria-hidden>🥂</span></span>
                        </button>
                        <button
                          onClick={() => setAttendance("no")}
                          className={`flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center flex flex-col items-center gap-0.5 ${attendance === "no" ? "bg-burgundy text-white border-burgundy shadow-lg" : "bg-white/50 border-gold/10 text-ink/60 hover:border-burgundy/30"}`}
                        >
                          <span className="block">Rất tiếc, mình</span>
                          <span className="block"><span className="align-middle">bận</span> <span className="text-lg align-middle" aria-hidden>💐</span></span>
                        </button>
                      </div>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase text-ink/60 font-bold ml-2">Tên của bạn</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-16 rounded-2xl border border-gold/10 bg-white/50 px-6 text-base outline-none focus:border-burgundy/30 transition-all shadow-sm font-medium"
                        placeholder="Ví dụ: Anh xã, Chị đại..."
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase text-ink/60 font-bold ml-2">Lời chúc yêu thương</span>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[160px] rounded-2xl border border-gold/10 bg-white/50 px-6 py-4 text-base outline-none focus:border-burgundy/30 transition-all shadow-sm resize-none font-medium"
                        placeholder="Gửi một lời chúc thật ấm áp..."
                      />
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                    <p className="text-xs text-ink/50 tracking-wider font-medium italic">Lời chúc của bạn sẽ được gửi tới cô dâu chú rể.</p>

                    <motion.button
                      type="button"
                      whileHover={canSubmit ? { scale: 1.05 } : {}}
                      whileTap={canSubmit ? { scale: 0.95 } : {}}
                      onClick={onSubmit}
                      disabled={!canSubmit}
                      className={`inline-flex items-center justify-center rounded-none px-12 py-5 text-sm tracking-[0.3em] uppercase transition-all duration-300 shadow-xl min-w-[240px] font-bold ${status === "submitting" ? "bg-burgundy/50 text-white cursor-wait" :
                        canSubmit
                          ? "bg-burgundy text-white hover:bg-burgundy-dark"
                          : "bg-burgundy/5 text-burgundy/20 cursor-not-allowed"
                        }`}
                    >
                      {status === "submitting" ? "Đang gửi..." : "Gửi lời chúc & Xác nhận"}
                    </motion.button>
                  </div>

                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm font-medium text-emerald-600 mt-4"
                    >
                      Đã gửi thành công! Cảm ơn bạn thật nhiều. ✨
                    </motion.p>
                  )}
                  {status === "error" && (
                    <p className="text-center text-sm font-medium text-red-500 mt-4">
                      Có lỗi xảy ra, bạn vui lòng thử lại nhé!
                    </p>
                  )}
                </div>
              </div>

              {/* Displaying wishes list prominently */}
              {wishes.length > 0 && (
                <div className="mt-16 grid gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gold/20" />
                    <p className="text-[10px] tracking-[0.5em] uppercase text-burgundy font-bold">Lời chúc gần đây</p>
                    <div className="h-px flex-1 bg-gold/20" />
                  </div>
                  <div className="grid gap-6">
                    {wishes.slice(0, 8).map((wish) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        key={wish.id}
                        className="rounded-3xl border border-gold/10 bg-white/40 backdrop-blur-md px-10 py-8 shadow-sm border-l-4 border-l-burgundy/40 relative overflow-hidden group hover:bg-white/60 transition-colors"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <p className="text-[10px] tracking-[0.3em] uppercase text-burgundy font-bold mb-4">{wish.name}</p>
                        <p className="text-base sm:text-lg text-ink-dark/80 leading-relaxed font-heading italic relative z-10">
                          “{wish.message}”
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
