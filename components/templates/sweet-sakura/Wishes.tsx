"use client";

import { useState } from "react";
import { Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type WishesProps = {
  weddingId: string;
};

export function Wishes({ weddingId }: WishesProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId,
          name: name.trim(),
          message: message.trim(),
          attendance: "Tham dự",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Đã gửi lời chúc!", description: "Cảm ơn bạn đã gửi lời chúc yêu thương." });
      }
    } catch {
      toast({ title: "Lỗi", description: "Không thể gửi lời chúc. Vui lòng thử lại.", variant: "destructive" });
    }
    setSubmitting(false);
  }

  return (
    <section className="py-14 px-6 bg-[#FFF7F9] border-b border-[#F6D6DF]">
      <div className="max-w-md mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#E05A7A] font-semibold mb-2">
          SAKURA GUESTBOOK
        </p>
        <h2 className="text-2xl font-serif text-[#382329] mb-6">Sổ Ký Tên Chúc Phúc</h2>

        {submitted ? (
          <div className="bg-white border border-[#F6D6DF] p-7 rounded-2xl shadow-xs text-center">
            <Heart className="w-8 h-8 text-[#E05A7A] fill-current mx-auto mb-2" />
            <p className="font-serif font-bold text-[#382329] text-base">Cảm ơn lời chúc của bạn!</p>
            <p className="text-xs text-stone-500 mt-1">Lời chúc đã được lưu giữ cẩn thận trong sổ lưu niệm.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#F6D6DF] p-6 rounded-2xl shadow-xs space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-stone-700">Tên của bạn *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Thùy Linh"
                className="mt-1 text-xs border-[#F6D6DF] focus-visible:ring-[#E05A7A]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700">Lời chúc mừng *</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi lời chúc phúc ngọt ngào nhất..."
                className="mt-1 text-xs border-[#F6D6DF] focus-visible:ring-[#E05A7A]"
                rows={3}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#E05A7A] hover:bg-[#C94765] text-white text-xs font-medium py-2.5 rounded-xl shadow-xs"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              {submitting ? "Đang gửi..." : "Gửi Lời Chúc"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
