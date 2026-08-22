"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSlotImageUpload } from "@/hooks/useSlotImageUpload";

type Props = {
  weddingId: string;
  slotKey: string;
  label: string;
  hint: string;
  url: string;
  active: boolean;
  onSelect: () => void;
  onUploaded: (gallery: string[]) => void;
};

/** 1 ô ảnh cấu trúc cố định (hero, countdown, wedding-a/b, quote-a/b...) hiển thị xen kẽ trong form của section tương ứng. */
export function StructureImageField({
  weddingId,
  slotKey,
  label,
  hint,
  url,
  active,
  onSelect,
  onUploaded,
}: Props) {
  const { busy, trigger } = useSlotImageUpload(weddingId, slotKey, onUploaded);

  return (
    <div
      className={cn(
        "rounded-lg border p-3 transition-colors cursor-pointer",
        active
          ? "border-rose-500 bg-rose-50/60 ring-2 ring-rose-200"
          : "border-gray-200 hover:border-rose-200 bg-white"
      )}
      onClick={onSelect}
    >
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5 mb-2">{hint}</p>
      <div className="aspect-[4/3] rounded-md bg-gray-100 overflow-hidden mb-2 flex items-center justify-center">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400 px-2 text-center">
            Chưa có ảnh (thiệp dùng ảnh mẫu)
          </span>
        )}
      </div>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="w-full"
        disabled={busy}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
          trigger();
        }}
      >
        {busy ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1" />
        ) : (
          <Upload className="w-4 h-4 mr-1" />
        )}
        Tải ảnh
      </Button>
    </div>
  );
}
