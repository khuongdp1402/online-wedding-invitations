"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { getSectionDef } from "@/lib/section-registry";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId?: string;
  templateSlug?: string;
  enabledSections?: string[];
};

/**
 * Form liên hệ để khách đàm phán trực tiếp về cấu trúc thiệp.
 * Tự đính kèm mẫu đang dùng và các khối đang bật để tư vấn đúng nhu cầu.
 */
export function ContactRequestDialog({
  open,
  onOpenChange,
  weddingId,
  templateSlug,
  enabledSections = [],
}: Props) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message,
          weddingId,
          context: { templateSlug, enabledSections },
        }),
      });

      if (res.ok) {
        toast({
          title: "Đã gửi yêu cầu!",
          description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
        });
        setName("");
        setPhone("");
        setMessage("");
        onOpenChange(false);
      } else {
        const err = await res.json();
        toast({
          title: "Lỗi",
          description: err.error ?? "Không gửi được yêu cầu",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi",
        variant: "destructive",
      });
    }
    setSending(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Liên hệ với chúng tôi</DialogTitle>
          <DialogDescription>
            Bạn muốn một cấu trúc thiệp riêng, hoặc cần khối mà mẫu hiện tại
            chưa có? Để lại thông tin, chúng tôi sẽ trao đổi trực tiếp với bạn.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Nguyễn Văn A"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Số điện thoại / Zalo
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="VD: 0901234567"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Nội dung cần trao đổi
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mô tả cấu trúc thiệp bạn mong muốn..."
              rows={4}
              className="mt-1"
            />
          </div>

          {enabledSections.length > 0 && (
            <div className="rounded-md bg-gray-50 border p-2.5">
              <p className="text-[11px] text-gray-500 mb-1">
                Tự động gửi kèm để chúng tôi nắm rõ thiệp của bạn:
              </p>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                <strong>Mẫu:</strong> {templateSlug ?? "—"} ·{" "}
                <strong>Khối đang bật:</strong>{" "}
                {enabledSections.map((k) => getSectionDef(k).label).join(", ")}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              sending || !name.trim() || !phone.trim() || !message.trim()
            }
            className="bg-rose-600 hover:bg-rose-700"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
            ) : (
              <Send className="w-4 h-4 mr-1.5" />
            )}
            Gửi yêu cầu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
