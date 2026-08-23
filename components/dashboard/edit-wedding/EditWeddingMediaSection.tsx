"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { albumSlotKey } from "@/lib/wedding-image-slots";
import { cn } from "@/lib/utils";
import { uploadFilePresigned, uploadFilesPresigned, persistGalleryReorder } from "@/lib/upload-client";
import { DRAFT_MAX_PHOTOS } from "@/lib/payment";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


type Props = {
  weddingId: string;
  gallery: string[];
  onGalleryChange: (next: string[]) => void;
  highlightSlot: string | null;
  onHighlightSlot: (key: string | null) => void;
  backgroundMusic: string;
  onBackgroundMusicChange: (v: string) => void;
  albumStartIndex: number;
  /** Thiệp đã xuất bản: không giới hạn số ảnh. Chưa xuất bản: giới hạn nhẹ. */
  isPublished?: boolean;
};

function AlbumThumb({
  id,
  url,
  active,
  busy,
  onSelect,
  onChangeClick,
}: {
  id: string;
  url: string;
  active: boolean;
  busy: boolean;
  onSelect: () => void;
  onChangeClick: (e: React.MouseEvent) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative w-24 rounded-lg border overflow-hidden shrink-0 bg-white",
        active ? "ring-2 ring-rose-500" : "border-gray-200"
      )}
    >
      <button
        type="button"
        className="absolute top-1 left-1 z-10 bg-white/90 rounded p-0.5 cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-700"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        aria-label="Kéo để sắp xếp"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="8" cy="6" r="1.5" /><circle cx="16" cy="6" r="1.5" /><circle cx="8" cy="12" r="1.5" /><circle cx="16" cy="12" r="1.5" /><circle cx="8" cy="18" r="1.5" /><circle cx="16" cy="18" r="1.5" /></svg>
      </button>
      <button type="button" className="block w-full aspect-square" onClick={onSelect}>
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
        disabled={busy}
        onClick={onChangeClick}
      >
        Đổi
      </Button>
    </div>
  );
}

export function EditWeddingMediaSection({
  weddingId,
  gallery,
  onGalleryChange,
  highlightSlot,
  onHighlightSlot,
  backgroundMusic,
  onBackgroundMusicChange,
  albumStartIndex,
  isPublished,
}: Props) {
  const { toast } = useToast();
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number } | null>(null);

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

  const albumCount = Math.max(0, gallery.length - albumStartIndex);
  const nextAlbumSlot = albumSlotKey(albumCount);

  async function uploadMultipleToAlbum(files: FileList) {
    const list = Array.from(files);
    if (list.length === 0) return;

    const slotKeys = list.map((_, i) => albumSlotKey(albumCount + i));
    setBatchProgress({ done: 0, total: list.length });
    try {
      const results = await uploadFilesPresigned(weddingId, slotKeys, list, (done, total) =>
        setBatchProgress({ done, total })
      );
      const last = results[results.length - 1];
      if (last?.gallery) onGalleryChange(last.gallery);
      toast({ title: `Đã tải lên ${results.length} ảnh thành công!` });
    } catch (e) {
      toast({
        title: "Upload lỗi",
        description: e instanceof Error ? e.message : "Thử lại",
        variant: "destructive",
      });
    } finally {
      setBatchProgress(null);
    }
  }

  function triggerMultiFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/gif";
    input.multiple = true;
    input.onchange = () => {
      if (input.files?.length) void uploadMultipleToAlbum(input.files);
    };
    input.click();
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleAlbumDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const albumUrls = gallery.slice(albumStartIndex);
    const albumIds = albumUrls.map((_, i) => albumSlotKey(i));
    const oldIndex = albumIds.indexOf(active.id as string);
    const newIndex = albumIds.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(albumUrls, oldIndex, newIndex);
    const newGallery = [...gallery.slice(0, albumStartIndex), ...reordered];
    onGalleryChange(newGallery);
    try {
      await persistGalleryReorder(weddingId, newGallery);
    } catch (e) {
      toast({
        title: "Lưu thứ tự thất bại",
        description: e instanceof Error ? e.message : "Thử lại",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-rose-600" />
          Bộ ảnh kỷ niệm
        </CardTitle>
        <p className="text-sm text-gray-500 font-normal">
          Thêm nhiều ảnh cùng lúc hoặc kéo thả để sắp xếp lại thứ tự hiển thị trong album.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleAlbumDragEnd}>
            <SortableContext
              items={Array.from({ length: albumCount }, (_, i) => albumSlotKey(i))}
              strategy={rectSortingStrategy}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.from({ length: albumCount }).map((_, i) => {
                  const key = albumSlotKey(i);
                  const url = gallery[albumStartIndex + i]?.trim() || "";
                  const active = highlightSlot === key;
                  return (
                    <AlbumThumb
                      key={key}
                      id={key}
                      url={url}
                      active={active}
                      busy={!!uploadingSlot}
                      onSelect={() => onHighlightSlot(key)}
                      onChangeClick={(e) => {
                        e.stopPropagation();
                        onHighlightSlot(key);
                        triggerFile(key);
                      }}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!!uploadingSlot || !!batchProgress}
              onClick={() => {
                onHighlightSlot(nextAlbumSlot);
                triggerFile(nextAlbumSlot);
              }}
            >
              <Upload className="w-4 h-4 mr-1" />
              Thêm 1 ảnh
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!!uploadingSlot || !!batchProgress}
              onClick={triggerMultiFile}
            >
              {batchProgress ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  Đang tải {batchProgress.done}/{batchProgress.total}...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-1" />
                  Tải nhiều ảnh cùng lúc
                </>
              )}
            </Button>
          </div>
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
