"use client";

import { useEffect, useState } from "react";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { SlotEditPopover } from "@/components/templates/shared/SlotEditPopover";
import type { WeddingData } from "@/lib/template-registry";
import type { WeddingTextField } from "@/lib/wedding-slots";

export default function PreviewPage() {
  const [data, setData] = useState<{
    templateSlug: string;
    wedding: WeddingData;
    mode: "bride" | "groom";
    highlightSlot: string | null;
  } | null>(null);

  const [openPopover, setOpenPopover] = useState<{ slotKey: string; anchorEl: HTMLElement } | null>(null);

  useEffect(() => {
    // Notify parent that we are ready
    if (typeof window !== "undefined" && window.parent) {
      window.parent.postMessage({ type: "PREVIEW_READY" }, "*");
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "UPDATE_DRAFT") {
        setData({
          templateSlug: event.data.templateSlug,
          wedding: event.data.wedding,
          mode: event.data.mode || "groom",
          highlightSlot: event.data.highlightSlot,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white font-sans">
        <div className="text-center">
          <p className="text-sm opacity-50 animate-pulse">Đang tải preview...</p>
        </div>
      </div>
    );
  }

  const handleSlotClick = (slotKey: string, el?: HTMLElement) => {
    // Vẫn báo lên parent để đổi section hiển thị ở sidebar — giữ hành vi cũ
    // cho người thích sửa qua form rộng.
    if (typeof window !== "undefined" && window.parent) {
      window.parent.postMessage({ type: "SLOT_CLICK", slotKey }, "*");
    }
    if (el) {
      setOpenPopover({ slotKey, anchorEl: el });
    }
  };

  function handleFieldChange(field: WeddingTextField, value: string) {
    window.parent?.postMessage({ type: "FIELD_CHANGE", field, value }, "*");
  }

  function handleGalleryChange(gallery: string[]) {
    window.parent?.postMessage({ type: "GALLERY_CHANGE", gallery }, "*");
  }

  return (
    <>
      <TemplateRenderer
        templateSlug={data.templateSlug}
        wedding={data.wedding}
        mode={data.mode}
        isDemo={true}
        editOverlay={{
          highlightSlot: data.highlightSlot,
          onSlotClick: handleSlotClick,
        }}
      />
      {openPopover && (
        <SlotEditPopover
          anchorEl={openPopover.anchorEl}
          slotKey={openPopover.slotKey}
          weddingId={data.wedding.id}
          wedding={data.wedding}
          templateSlug={data.templateSlug}
          onClose={() => setOpenPopover(null)}
          onFieldChange={handleFieldChange}
          onGalleryChange={handleGalleryChange}
        />
      )}
    </>
  );
}
