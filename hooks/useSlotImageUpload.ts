"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadFilePresigned } from "@/lib/upload-client";

/**
 * Mở file picker, upload ảnh qua flow presigned có sẵn, báo lỗi/thành công
 * qua toast. Dùng chung giữa `StructureImageField` (sidebar) và
 * `SlotEditPopover` (popover trên preview) — trích ra từ
 * `StructureImageField` để không lặp lại logic trigger+upload+toast.
 */
export function useSlotImageUpload(
  weddingId: string,
  slotKey: string,
  onUploaded: (gallery: string[]) => void
) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  function trigger() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/gif";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setBusy(true);
      try {
        const data = await uploadFilePresigned(weddingId, slotKey, file, "image");
        onUploaded(data.gallery as string[]);
        toast({ title: "Đã tải lên thành công!" });
      } catch (e) {
        toast({
          title: "Upload lỗi",
          description: e instanceof Error ? e.message : "Thử lại",
          variant: "destructive",
        });
      } finally {
        setBusy(false);
      }
    };
    input.click();
  }

  return { busy, trigger };
}
