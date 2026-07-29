"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  CLASSIC_BURGUNDY_STRUCTURE_SLOTS,
  CLASSIC_BURGUNDY_ALBUM_START_INDEX,
  albumSlotKey,
} from "@/lib/wedding-image-slots";
import { cn } from "@/lib/utils";
import { uploadFilePresigned } from "@/lib/upload-client";


type Props = {
  weddingId: string;
  gallery: string[];
  onGalleryChange: (next: string[]) => void;
  highlightSlot: string | null;
  onHighlightSlot: (key: string | null) => void;
  backgroundMusic: string;
  onBackgroundMusicChange: (v: string) => void;
};

export function EditWeddingMediaSection({
  weddingId,
  gallery,
  onGalleryChange,
  highlightSlot,
  onHighlightSlot,
  backgroundMusic,
  onBackgroundMusicChange,
}: Props) {
  const { toast } = useToast();
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  async function uploadToSlot(slotKey: string, file: File, fileType: "image" | "audio" = "image") {
    setUploadingSlot(slotKey);
    try {
      const data = await uploadFilePresigned(weddingId, slotKey, file, fileType);
      
      if (fileType === "image") {
        onGalleryChange(data.gallery as string[]);
      } else {
        onBackgroundMusicChange(data.publicUrl);
      }
      
      toast({ title: "Đã tải lên thành công!" });
    } catch (e) {
      toast({ 
        title: "Upload lỗi", 
        description: e instanceof Error ? e.message : "Thử lại", 
        variant: "destructive" 
      });
    } finally {
      setUploadingSlot(null);
    }
  }

  function triggerFile(slotKey: string, fileType: "image" | "audio" = "image") {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = fileType === "image" 
      ? "image/jpeg,image/png,image/webp,image/gif" 
      : "audio/mpeg";
    input.onchange = () => {
      const f = input.files?.[0];
      if (f) void uploadToSlot(slotKey, f, fileType);
    };
    input.click();
  }


  const albumCount = Math.max(0, gallery.length - CLASSIC_BURGUNDY_ALBUM_START_INDEX);
  const nextAlbumSlot = albumSlotKey(albumCount);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-rose-600" />
          Ảnh thiệp & vị trí hiển thị
        </CardTitle>
        <p className="text-sm text-gray-500 font-normal">
          Mỗi ô tương ứng một vùng trên thiệp. Bấm ô hoặc bấm trực tiếp trên
          preview bên phải để chọn, rồi tải ảnh lên.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {CLASSIC_BURGUNDY_STRUCTURE_SLOTS.map((slot) => {
            const url = gallery[slot.galleryIndex]?.trim();
            const active = highlightSlot === slot.key;
            const busy = uploadingSlot === slot.key;
            return (
              <div
                key={slot.key}
                className={cn(
                  "rounded-lg border p-3 transition-colors cursor-pointer",
                  active
                    ? "border-rose-500 bg-rose-50/60 ring-2 ring-rose-200"
                    : "border-gray-200 hover:border-rose-200 bg-white"
                )}
                onClick={() => onHighlightSlot(slot.key)}
              >
                <p className="text-sm font-semibold text-gray-900">{slot.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 mb-2">{slot.hint}</p>
                <div className="aspect-[4/3] rounded-md bg-gray-100 overflow-hidden mb-2 flex items-center justify-center">
                  {url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
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
                  disabled={!!busy}
                  onClick={(e) => {
                    e.stopPropagation();
                    onHighlightSlot(slot.key);
                    triggerFile(slot.key);
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
          })}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-800 mb-2">
            Album “Bộ ảnh kỷ niệm”
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Ảnh từ ô thứ 7 trở đi chỉ hiện trong khối gallery. Có thể thêm nhiều
            ảnh.
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {Array.from({ length: albumCount }).map((_, i) => {
              const key = albumSlotKey(i);
              const url = gallery[CLASSIC_BURGUNDY_ALBUM_START_INDEX + i]?.trim();
              const active = highlightSlot === key;
              return (
                <div
                  key={key}
                  className={cn(
                    "relative w-24 rounded-lg border overflow-hidden shrink-0",
                    active ? "ring-2 ring-rose-500" : "border-gray-200"
                  )}
                >
                  <button
                    type="button"
                    className="block w-full aspect-square"
                    onClick={() => onHighlightSlot(key)}
                  >
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-gray-400 p-1 flex items-center justify-center h-full">
                        Trống
                      </span>
                    )}
                  </button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="w-full rounded-none text-xs h-7"
                    disabled={!!uploadingSlot}
                    onClick={(e) => {
                      e.stopPropagation();
                      onHighlightSlot(key);
                      triggerFile(key);
                    }}
                  >
                    Đổi
                  </Button>
                </div>
              );
            })}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!!uploadingSlot}
            onClick={() => {
              onHighlightSlot(nextAlbumSlot);
              triggerFile(nextAlbumSlot);
            }}
          >
            <Upload className="w-4 h-4 mr-1" />
            Thêm ảnh album
          </Button>
        </div>

        <div className="border-t pt-4 space-y-2">
          <p className="text-sm font-medium text-gray-800">Nhạc nền (MP3)</p>
          <p className="text-xs text-gray-500">
            Dán link HTTPS hoặc tải trực tiếp file .mp3. Khách mở thiệp có thể bật/tắt.
          </p>
          <div className="flex gap-2">
            <Input
              type="url"
              value={backgroundMusic}
              onChange={(e) => onBackgroundMusicChange(e.target.value)}
              placeholder="https://example.com/music.mp3"
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline"
              disabled={!!uploadingSlot}
              onClick={() => triggerFile("bg-music", "audio")}
            >
              {uploadingSlot === "bg-music" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-1" />
              )}
              Tải nhạc
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
