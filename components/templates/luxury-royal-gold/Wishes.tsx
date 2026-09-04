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
        toast({ title: "Đã gửi lời chúc!", description: "Cảm ơn bạn đã chúc phúc cho đôi uyên ương." });
      }
    } catch {
      toast({ title: "Lỗi", description: "Không thể gửi lời chúc. Vui lòng thử lại.", variant: "destructive" });
    }
    setSubmitting(false);
  }

  return (
    <section className="py-14 px-6 bg-[#FAF6EE] border-b border-[#F0E6D2]">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <span className="h-[1px] w-6 bg-[#E5A93C]" />
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#E5A93C] font-semibold">
            ROYAL GUESTBOOK
          </p>
          <span className="h-[1px] w-6 bg-[#E5A93C]" />
        </div>
        <h2 className="text-2xl font-serif text-[#8B0000] mb-6">Sổ Lưu Bút Chúc Phúc</h2>

        {submitted ? (
          <div className="bg-white border-2 border-[#E5A93C]/40 p-7 rounded-2xl shadow-sm text-center">
            <Heart className="w-9 h-9 text-[#8B0000] fill-current mx-auto mb-3" />
            <p className="font-serif font-bold text-stone-900 text-base">Trân trọng cảm ơn bạn!</p>
            <p className="text-xs text-stone-600 mt-1">Lời chúc tốt đẹp đã được trao gửi đến cô dâu và chú rể.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border-2 border-[#E5A93C]/30 p-6 rounded-2xl shadow-sm space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-stone-700">Tên của bạn *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Hoàng Long"
                className="mt-1 text-xs border-[#F0E6D2] focus-visible:ring-[#E5A93C]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700">Lời chúc mừng *</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi lời chúc phúc trăm năm đến cặp đôi..."
                className="mt-1 text-xs border-[#F0E6D2] focus-visible:ring-[#E5A93C]"
                rows={3}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#8B0000] hover:bg-[#700000] text-[#FFE29F] text-xs font-medium py-2.5 rounded-xl shadow-sm"
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
