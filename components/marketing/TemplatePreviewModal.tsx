"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { getSampleWeddingForTemplate } from "@/lib/sample-wedding-data";
import { Heart, Smartphone, Monitor, X, ExternalLink } from "lucide-react";
import Link from "next/link";

type TemplatePreviewModalProps = {
  templateSlug: string | null;
  templateName?: string;
  category?: string;
  onClose: () => void;
  onSelectTemplate?: (slug: string) => void;
};

export function TemplatePreviewModal({
  templateSlug,
  templateName,
  category,
  onClose,
  onSelectTemplate,
}: TemplatePreviewModalProps) {
  const [mode, setMode] = useState<"groom" | "bride">("groom");
  // Mặc định xem như website thật (desktop, không khung mock) — có thể bật
  // chế độ mobile nếu muốn kiểm tra giao diện điện thoại.
  const [viewDevice, setViewDevice] = useState<"mobile" | "desktop">("desktop");

  if (!templateSlug) return null;

  const sampleWedding = getSampleWeddingForTemplate(templateSlug);

  return (
    <Dialog open={!!templateSlug} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[98vw] w-[98vw] h-[95vh] p-0 flex flex-col overflow-hidden bg-neutral-900 border-neutral-800 text-white">
        <DialogTitle className="sr-only">
          {templateName || "Xem thử mẫu thiệp"}
        </DialogTitle>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg text-white">
              {templateName || "Xem Thử Mẫu Thiệp"}
            </h3>
            {category && (
              <Badge variant="outline" className="text-xs border-neutral-700 text-neutral-300">
                {category}
              </Badge>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="bg-neutral-800 p-0.5 rounded-lg flex text-xs">
              <button
                type="button"
                onClick={() => setMode("groom")}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  mode === "groom"
                    ? "bg-rose-600 text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Nhà Trai
              </button>
              <button
                type="button"
                onClick={() => setMode("bride")}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  mode === "bride"
                    ? "bg-rose-600 text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Nhà Gái
              </button>
            </div>

            {/* Device Switcher: mặc định desktop (website thật), có thể bật mobile để kiểm tra */}
            <div className="flex bg-neutral-800 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setViewDevice("desktop")}
                className={`p-1.5 rounded-md transition-all ${
                  viewDevice === "desktop"
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Xem như website thật (mặc định)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewDevice("mobile")}
                className={`p-1.5 rounded-md transition-all ${
                  viewDevice === "mobile"
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Xem dạng điện thoại (mô phỏng khung 430px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Link
              href={`/templates/preview/${templateSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors"
              title="Mở trong tab mới"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mở Tab Mới</span>
            </Link>

            {onSelectTemplate ? (
              <Button
                size="sm"
                onClick={() => onSelectTemplate(templateSlug)}
                className="bg-[#8C1C24] hover:bg-[#70161D] text-white font-medium rounded-full px-4"
              >
                <Heart className="w-4 h-4 mr-1.5 fill-current" />
                Dùng Mẫu Này
              </Button>
            ) : (
              <Link href={`/dashboard/weddings/new?template=${templateSlug}`}>
                <Button
                  size="sm"
                  className="bg-[#8C1C24] hover:bg-[#70161D] text-white font-medium rounded-full px-4"
                >
                  <Heart className="w-4 h-4 mr-1.5 fill-current" />
                  Dùng Mẫu Này
                </Button>
              </Link>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview viewport: mặc định full-bleed như website thật trong modal,
            chỉ khi bật mobile mới thu vào khung mô phỏng điện thoại. */}
        <div className="flex-1 overflow-y-auto bg-neutral-900 flex justify-center p-2 sm:p-4">
          <div
            className={`transition-all duration-300 bg-white text-gray-900 shadow-2xl relative ${
              viewDevice === "mobile"
                ? "w-full max-w-[430px] border-[6px] border-neutral-800 rounded-[32px] overflow-hidden my-auto min-h-[720px] max-h-[85vh] overflow-y-auto"
                : "w-full h-full rounded-lg overflow-y-auto"
            }`}
          >
            <TemplateRenderer
              templateSlug={templateSlug}
              wedding={sampleWedding}
              mode={mode}
              isDemo={true}
              guestName="Khách Quý"
              guestSalutation="Bạn"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
