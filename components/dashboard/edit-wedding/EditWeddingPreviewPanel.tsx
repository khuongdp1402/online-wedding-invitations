"use client";

import { useState, useEffect, useRef } from "react";
import { Monitor, Smartphone, Eye } from "lucide-react";
import type { WeddingData } from "@/lib/template-registry";
import type { WeddingTextField } from "@/lib/wedding-slots";

type Props = {
  templateSlug: string;
  weddingDraft: WeddingData;
  highlightSlot: string | null;
  onSlotClick: (slotKey: string) => void;
  /** Popover trong iframe gõ text xong gửi ngược lên đây để cập nhật state cha. */
  onFieldChange: (field: WeddingTextField, value: string) => void;
  /** Popover trong iframe upload ảnh xong gửi gallery mới lên đây. */
  onGalleryChange: (gallery: string[]) => void;
};

export function EditWeddingPreviewPanel({
  templateSlug,
  weddingDraft,
  highlightSlot,
  onSlotClick,
  onFieldChange,
  onGalleryChange,
}: Props) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("mobile");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [iframeReady, setIframeReady] = useState(false);

  // ResizeObserver to dynamically track the panel dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Listen for signals from iframe (PREVIEW_READY, SLOT_CLICK, và các thay
  // đổi từ popover sửa nhanh trong iframe: FIELD_CHANGE/GALLERY_CHANGE)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data) {
        if (e.data.type === "PREVIEW_READY") {
          setIframeReady(true);
        } else if (e.data.type === "SLOT_CLICK") {
          onSlotClick(e.data.slotKey);
        } else if (e.data.type === "FIELD_CHANGE") {
          onFieldChange(e.data.field, e.data.value);
        } else if (e.data.type === "GALLERY_CHANGE") {
          onGalleryChange(e.data.gallery);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSlotClick, onFieldChange, onGalleryChange]);

  // Sync draft and highlightSlot to the iframe
  useEffect(() => {
    if (iframeRef.current && iframeReady) {
      iframeRef.current.contentWindow?.postMessage(
        {
          type: "UPDATE_DRAFT",
          templateSlug,
          wedding: weddingDraft,
          mode: "groom",
          highlightSlot,
        },
        "*"
      );
    }
  }, [weddingDraft, templateSlug, highlightSlot, iframeReady]);

  // Determine target width & height
  const targetWidth = deviceMode === "mobile" ? 375 : 1200;
  const targetHeight = deviceMode === "mobile" ? 812 : 800;

  // Calculate dynamic scale factor to fit the iframe inside preview panel
  let scale = 1;
  if (containerSize.width && containerSize.height) {
    const scaleX = (containerSize.width - 32) / targetWidth;
    const scaleY = (containerSize.height - 32) / targetHeight;
    scale = Math.min(scaleX, scaleY);
    if (scale > 1) scale = 1;
  }

  return (
    <div className="h-full w-full flex flex-col bg-neutral-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm z-10 shrink-0">
        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Eye className="w-4 h-4 text-rose-600" /> Preview trực tiếp
        </p>
        
        <div className="flex items-center bg-gray-100 p-1 rounded-md">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded text-sm flex items-center justify-center transition-colors ${
              deviceMode === "desktop" ? "bg-white shadow-sm text-rose-600" : "text-gray-500 hover:text-gray-900"
            }`}
            title="Desktop mode"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded text-sm flex items-center justify-center transition-colors ${
              deviceMode === "mobile" ? "bg-white shadow-sm text-rose-600" : "text-gray-500 hover:text-gray-900"
            }`}
            title="Mobile mode"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="flex-1 overflow-hidden flex items-center justify-center p-4 relative"
      >
        <div
          style={{
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          className={`bg-white shadow-2xl transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
            deviceMode === "mobile"
              ? "rounded-3xl ring-8 ring-gray-900"
              : "rounded-xl ring-1 ring-gray-200"
          }`}
        >
          <iframe
            ref={iframeRef}
            src="/w/preview"
            className="w-full h-full border-none"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  );
}
