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
        toast({ title: "Đã gửi lời chúc!", description: "Cảm ơn bạn đã chúc phúc cho cô dâu & chú rể." });
      }
    } catch {
      toast({ title: "Lỗi", description: "Không thể gửi lời chúc. Vui lòng thử lại.", variant: "destructive" });
    }
    setSubmitting(false);
  }

  return (
    <section className="py-12 px-6 bg-[#FAF9F5]">
      <div className="max-w-md mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#B39D82] font-semibold mb-2">
          GUEST BOOK
        </p>
        <h2 className="text-2xl font-serif text-[#2C3E50] mb-6">Gửi Lời Chúc Phúc</h2>

        {submitted ? (
          <div className="bg-white border border-[#E8E5DD] p-6 rounded-2xl shadow-xs text-center">
            <Heart className="w-8 h-8 text-rose-500 fill-current mx-auto mb-2" />
            <p className="font-semibold text-gray-900 text-sm">Cảm ơn lời chúc của bạn!</p>
            <p className="text-xs text-gray-500 mt-1">Lời chúc đã được lưu giữ vào sổ lưu bút của cặp đôi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#E8E5DD] p-6 rounded-2xl shadow-xs space-y-4 text-left">
            <div>
              <label className="text-xs font-medium text-gray-700">Tên của bạn *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Hoàng Long"
                className="mt-1 text-xs"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Lời chúc mừng *</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Chúc hai bạn trăm năm hạnh phúc..."
                className="mt-1 text-xs"
                rows={3}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2C3E50] hover:bg-[#34495E] text-white text-xs font-medium py-2 rounded-xl"
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
