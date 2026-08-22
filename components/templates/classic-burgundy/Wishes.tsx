"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string | number;
};

type WishesProps = {
  weddingId: string;
};

export function Wishes({ weddingId }: WishesProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>("yes");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch(`/api/wishes?weddingId=${weddingId}`);
      const data = await res.json();
      if (Array.isArray(data.wishes)) {
        setWishes(data.wishes);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  }, [weddingId]);

  useEffect(() => {
    if (weddingId) fetchWishes();
  }, [weddingId, fetchWishes]);

  const canSubmit = useMemo(
    () => name.trim().length > 1 && message.trim().length > 3 && attendance !== null && status !== "submitting",
    [name, message, attendance, status]
  );

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

      if (res.ok) {
        setName("");
        setMessage("");
        setAttendance(null);
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          fetchWishes();
        }, 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
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
                <p className="text-sm tracking-[0.42em] uppercase cb-text-primary font-bold">Gửi lời chúc &amp; Xác nhận</p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-heading cb-text-body leading-tight" style={{ color: 'var(--cb-text)' }}>
                  Lời chúc gửi trao,<br />Niềm vui trọn vẹn.
                </h2>
                <p className="mt-6 text-base sm:text-lg cb-text-body leading-relaxed mb-10 font-medium">
                  Sự hiện diện và lời chúc của khách mời là món quà vô giá mà chúng mình trân quý nhất.
                </p>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-7">
              <div className="rounded-[40px] border bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden cb-border-accent" style={{ borderColor: 'color-mix(in srgb, var(--cb-accent) 10%, transparent)' }}>
                <div className="grid gap-8 relative z-10">
                  <div className="grid gap-6">
                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase cb-text-body font-bold ml-2 opacity-60">Bạn có thể tham dự chứ?</span>
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => setAttendance("yes")}
                          className={`flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center ${attendance === "yes" ? "cb-bg-primary text-white cb-border-primary shadow-lg" : "bg-white/50 text-[var(--cb-text)] hover:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)]"}`}
                          style={attendance !== "yes" ? { borderColor: 'color-mix(in srgb, var(--cb-accent) 10%, transparent)', color: 'color-mix(in srgb, var(--cb-text) 60%, transparent)' } : undefined}
                        >
                          Chắc chắn rồi
                        </button>
                        <button
                          onClick={() => setAttendance("no")}
                          className={`flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center ${attendance === "no" ? "cb-bg-primary text-white cb-border-primary shadow-lg" : "bg-white/50 hover:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)]"}`}
                          style={attendance !== "no" ? { borderColor: 'color-mix(in srgb, var(--cb-accent) 10%, transparent)', color: 'color-mix(in srgb, var(--cb-text) 60%, transparent)' } : undefined}
                        >
                          Rất tiếc, mình bận
                        </button>
                      </div>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase cb-text-body font-bold ml-2 opacity-60">Tên của bạn</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-16 rounded-2xl border bg-white/50 px-6 text-base outline-none focus:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)] transition-all shadow-sm font-medium cb-text-body"
                        style={{ borderColor: 'color-mix(in srgb, var(--cb-accent) 10%, transparent)' }}
                        placeholder="Ví dụ: Anh xã, Chị đại..."
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase cb-text-body font-bold ml-2 opacity-60">Lời chúc yêu thương</span>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[160px] rounded-2xl border bg-white/50 px-6 py-4 text-base outline-none focus:border-[color-mix(in_srgb,var(--cb-primary)_30%,transparent)] transition-all shadow-sm resize-none font-medium cb-text-body"
                        style={{ borderColor: 'color-mix(in srgb, var(--cb-accent) 10%, transparent)' }}
                        placeholder="Gửi một lời chúc thật ấm áp..."
                      />
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                    <p className="text-xs cb-text-body tracking-wider font-medium italic opacity-50">Lời chúc sẽ được lưu trữ mãi mãi.</p>
                    <motion.button
                      type="button"
                      whileHover={canSubmit ? { scale: 1.05 } : {}}
                      whileTap={canSubmit ? { scale: 0.95 } : {}}
                      onClick={onSubmit}
                      disabled={!canSubmit}
                      className={`inline-flex items-center justify-center rounded-none px-12 py-5 text-sm tracking-[0.3em] uppercase transition-all duration-300 shadow-xl min-w-[240px] font-bold ${
                        status === "submitting"
                          ? "text-white cursor-wait opacity-50"
                          : canSubmit
                          ? "cb-bg-primary text-white hover:opacity-90"
                          : "cursor-not-allowed opacity-20"
                      }`}
                      style={status === "submitting" || canSubmit ? { backgroundColor: 'var(--cb-primary)' } : { backgroundColor: 'color-mix(in srgb, var(--cb-primary) 5%, transparent)', color: 'color-mix(in srgb, var(--cb-primary) 20%, transparent)' }}
                    >
                      {status === "submitting" ? "Đang gửi..." : "Gửi lời chúc & Xác nhận"}
                    </motion.button>
                  </div>

                  {status === "success" && (
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-medium text-emerald-600 mt-4">
                      Đã gửi thành công! Cảm ơn bạn thật nhiều.
                    </motion.p>
                  )}
                  {status === "error" && <p className="text-center text-sm font-medium text-red-500 mt-4">Có lỗi xảy ra, bạn vui lòng thử lại nhé!</p>}
                </div>
              </div>

              {wishes.length > 0 && (
                <div className="mt-16 grid gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1" style={{ backgroundColor: 'color-mix(in srgb, var(--cb-accent) 20%, transparent)' }} />
                    <p className="text-[10px] tracking-[0.5em] uppercase cb-text-primary font-bold">Lời chúc ({wishes.length})</p>
                    <div className="h-px flex-1" style={{ backgroundColor: 'color-mix(in srgb, var(--cb-accent) 20%, transparent)' }} />
                  </div>
                  <div className="max-h-[720px] overflow-y-auto pr-2 scroll-smooth" style={{ scrollbarWidth: "thin", scrollbarColor: "var(--cb-primary) transparent" }}>
                    <div className="grid gap-6">
                      {wishes.map((wish) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          key={wish.id}
                          className="rounded-3xl border bg-white/40 backdrop-blur-md px-10 py-8 shadow-sm border-l-4 relative overflow-hidden group hover:bg-white/60 transition-colors cb-border-accent"
                          style={{ borderColor: 'color-mix(in srgb, var(--cb-accent) 10%, transparent)', borderLeftColor: 'color-mix(in srgb, var(--cb-primary) 40%, transparent)' }}
                        >
                          <p className="text-[10px] tracking-[0.3em] uppercase cb-text-primary font-bold mb-4">{wish.name}</p>
                          <p className="text-base sm:text-lg cb-text-body leading-relaxed font-heading italic relative z-10 opacity-80">&ldquo;{wish.message}&rdquo;</p>
                        </motion.div>
                      ))}
                    </div>
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
