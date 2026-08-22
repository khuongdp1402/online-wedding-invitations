"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getTemplate, type WeddingData } from "@/lib/template-registry";
import { textFieldForSlotKey, getTextFieldValue, type WeddingTextField } from "@/lib/wedding-slots";
import { galleryIndexForSlotKey } from "@/lib/wedding-image-slots";
import { useSlotImageUpload } from "@/hooks/useSlotImageUpload";

type SlotEditPopoverProps = {
  anchorEl: HTMLElement;
  slotKey: string;
  weddingId: string;
  wedding: WeddingData;
  templateSlug: string;
  onClose: () => void;
  /** Text: gõ xong gửi thay đổi lên parent (postMessage FIELD_CHANGE). */
  onFieldChange: (field: WeddingTextField, value: string) => void;
  /** Ảnh: upload xong gửi gallery mới lên parent (postMessage GALLERY_CHANGE). */
  onGalleryChange: (gallery: string[]) => void;
};

const POPOVER_WIDTH = 280;

/**
 * Popover sửa nhanh 1 slot ngay tại vị trí bấm trên preview — render trong
 * chính document của iframe (`/w/preview`), portal vào `document.body` của
 * iframe đó. Không cần biết gì về CSS scale của parent vì chạy trong toạ độ
 * nội bộ của iframe.
 */
export function SlotEditPopover({
  anchorEl,
  slotKey,
  weddingId,
  wedding,
  templateSlug,
  onClose,
  onFieldChange,
  onGalleryChange,
}: SlotEditPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ visibility: "hidden" });

  const templateConfig = getTemplate(templateSlug);
  const textField = textFieldForSlotKey(slotKey, templateConfig?.textSlots ?? []);
  const textSlot = templateConfig?.textSlots.find((s) => s.key === slotKey) ?? null;
  const galleryIndex = textField ? null : galleryIndexForSlotKey(slotKey, templateSlug);

  const { busy: uploadBusy, trigger: triggerUpload } = useSlotImageUpload(
    weddingId,
    slotKey,
    onGalleryChange
  );

  // Định vị: tính lại mỗi khi anchor/kích thước popover đổi (resize/scroll
  // trong cùng document của iframe — không cần message ra ngoài).
  useEffect(() => {
    function reposition() {
      const rect = anchorEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const popoverEl = popoverRef.current;
      const height = popoverEl?.offsetHeight ?? 160;

      let left = rect.left;
      left = Math.max(8, Math.min(left, vw - POPOVER_WIDTH - 8));

      let top = rect.bottom + 8;
      let placement: "below" | "above" = "below";
      if (top + height + 8 > vh) {
        const above = rect.top - height - 8;
        if (above >= 8) {
          top = above;
          placement = "above";
        }
      }

      setStyle({
        position: "fixed",
        left,
        top,
        width: POPOVER_WIDTH,
        visibility: "visible",
        zIndex: 9999,
      });
      void placement;
    }

    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [anchorEl]);

  // Đóng khi bấm ra ngoài hoặc Escape.
  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node) && e.target !== anchorEl) {
        onClose();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anchorEl, onClose]);

  if (!textField && galleryIndex === null) return null;

  const content = (
    <div
      ref={popoverRef}
      style={style}
      className="rounded-lg border border-gray-200 bg-white shadow-xl p-3"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {textField && textSlot ? (
        <TextSlotBody
          label={textSlot.label}
          inputType={textSlot.inputType}
          initialValue={getTextFieldValue(wedding, textField)}
          onChange={(value) => onFieldChange(textField, value)}
        />
      ) : (
        <ImageSlotBody
          url={galleryIndex !== null ? wedding.gallery?.[galleryIndex]?.trim() || "" : ""}
          busy={uploadBusy}
          onUpload={triggerUpload}
        />
      )}
    </div>
  );

  return createPortal(content, document.body);
}

function TextSlotBody({
  label,
  inputType,
  initialValue,
  onChange,
}: {
  label: string;
  inputType: "text" | "textarea";
  initialValue: string;
  onChange: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  function handleChange(v: string) {
    setValue(v);
    onChange(v);
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {inputType === "textarea" ? (
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-400"
        />
      ) : (
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-400"
        />
      )}
    </div>
  );
}

function ImageSlotBody({
  url,
  busy,
  onUpload,
}: {
  url: string;
  busy: boolean;
  onUpload: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="aspect-[4/3] rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400 px-2 text-center">Chưa có ảnh</span>
        )}
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={onUpload}
        className="w-full rounded-md bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-sm font-medium py-1.5 transition-colors"
      >
        {busy ? "Đang tải..." : "Đổi ảnh"}
      </button>
    </div>
  );
}
