"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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

  async function fetchWishes() {
    try {
      const res = await fetch(`/api/wishes?weddingId=${weddingId}`);
      const data = await res.json();
      if (Array.isArray(data.wishes)) {
        setWishes(data.wishes);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  }

  useEffect(() => {
    if (weddingId) fetchWishes();
  }, [weddingId]);

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
                <p className="text-sm tracking-[0.42em] uppercase text-[#800020] font-bold">Gửi lời chúc &amp; Xác nhận</p>
                <h2 className="mt-4 text-4xl sm:text-5xl font-serif text-[#2A2A2A] leading-tight">
                  Lời chúc gửi trao,<br />Niềm vui trọn vẹn.
                </h2>
                <p className="mt-6 text-base sm:text-lg text-[#2A2A2A] leading-relaxed mb-10 font-medium">
                  Sự hiện diện và lời chúc của khách mời là món quà vô giá mà chúng mình trân quý nhất.
                </p>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-7">
              <div className="rounded-[40px] border border-[#D4AF37]/10 bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden">
                <div className="grid gap-8 relative z-10">
                  <div className="grid gap-6">
                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase text-[#4A4A4A]/60 font-bold ml-2">Bạn có thể tham dự chứ?</span>
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => setAttendance("yes")}
                          className={`flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center ${attendance === "yes" ? "bg-[#800020] text-white border-[#800020] shadow-lg" : "bg-white/50 border-[#D4AF37]/10 text-[#4A4A4A]/60 hover:border-[#800020]/30"}`}
                        >
                          Chắc chắn rồi
                        </button>
                        <button
                          onClick={() => setAttendance("no")}
                          className={`flex-1 py-4 rounded-2xl border transition-all text-base font-medium text-center ${attendance === "no" ? "bg-[#800020] text-white border-[#800020] shadow-lg" : "bg-white/50 border-[#D4AF37]/10 text-[#4A4A4A]/60 hover:border-[#800020]/30"}`}
                        >
                          Rất tiếc, mình bận
                        </button>
                      </div>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase text-[#4A4A4A]/60 font-bold ml-2">Tên của bạn</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-16 rounded-2xl border border-[#D4AF37]/10 bg-white/50 px-6 text-base outline-none focus:border-[#800020]/30 transition-all shadow-sm font-medium"
                        placeholder="Ví dụ: Anh xã, Chị đại..."
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs sm:text-sm tracking-[0.32em] uppercase text-[#4A4A4A]/60 font-bold ml-2">Lời chúc yêu thương</span>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[160px] rounded-2xl border border-[#D4AF37]/10 bg-white/50 px-6 py-4 text-base outline-none focus:border-[#800020]/30 transition-all shadow-sm resize-none font-medium"
                        placeholder="Gửi một lời chúc thật ấm áp..."
                      />
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                    <p className="text-xs text-[#4A4A4A]/50 tracking-wider font-medium italic">Lời chúc sẽ được lưu trữ mãi mãi.</p>
                    <motion.button
                      type="button"
                      whileHover={canSubmit ? { scale: 1.05 } : {}}
                      whileTap={canSubmit ? { scale: 0.95 } : {}}
                      onClick={onSubmit}
                      disabled={!canSubmit}
                      className={`inline-flex items-center justify-center rounded-none px-12 py-5 text-sm tracking-[0.3em] uppercase transition-all duration-300 shadow-xl min-w-[240px] font-bold ${
                        status === "submitting"
                          ? "bg-[#800020]/50 text-white cursor-wait"
                          : canSubmit
                          ? "bg-[#800020] text-white hover:bg-[#5A0016]"
                          : "bg-[#800020]/5 text-[#800020]/20 cursor-not-allowed"
                      }`}
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
                    <div className="h-px flex-1 bg-[#D4AF37]/20" />
                    <p className="text-[10px] tracking-[0.5em] uppercase text-[#800020] font-bold">Lời chúc ({wishes.length})</p>
                    <div className="h-px flex-1 bg-[#D4AF37]/20" />
                  </div>
                  <div className="max-h-[720px] overflow-y-auto pr-2 scroll-smooth" style={{ scrollbarWidth: "thin", scrollbarColor: "#800020 transparent" }}>
                    <div className="grid gap-6">
                      {wishes.map((wish) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          key={wish.id}
                          className="rounded-3xl border border-[#D4AF37]/10 bg-white/40 backdrop-blur-md px-10 py-8 shadow-sm border-l-4 border-l-[#800020]/40 relative overflow-hidden group hover:bg-white/60 transition-colors"
                        >
                          <p className="text-[10px] tracking-[0.3em] uppercase text-[#800020] font-bold mb-4">{wish.name}</p>
                          <p className="text-base sm:text-lg text-[#2A2A2A]/80 leading-relaxed font-serif italic relative z-10">&ldquo;{wish.message}&rdquo;</p>
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
