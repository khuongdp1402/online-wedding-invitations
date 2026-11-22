"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Columns,
  ExternalLink,
  Eye,
  Gift,
  Heart,
  Image as ImageIcon,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Monitor,
  Music,
  Palette,
  Pause,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Save,
  Share2,
  Smartphone,
  Sparkles,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { THIEPONLINE_BY_SLUG, THIEPONLINE_CATALOG, type ThiepOnlineCatalogItem } from "@/lib/thieponline-catalog";
import { buildPartialContentFromWeddingData } from "@/components/templates/thieponline/ThiepOnlineClient";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import type { WeddingData } from "@/types/template";
import { POPULAR_WEDDING_TRACKS } from "@/lib/wedding-music";
import { VIETNAMESE_BANKS } from "@/lib/banks";
import { resolveBankBin } from "@/lib/vietqr";

type EditorMode = "edit" | "split" | "preview";

type ThiepOnlineEditorProps = {
  templateSlug: string;
  wedding: {
    id: string;
    slug: string;
    groomName: string;
    brideName: string;
    groomParents: { father?: string; mother?: string };
    brideParents: { father?: string; mother?: string };
    groomCeremony: {
      date?: string;
      lunarDate?: string;
      ceremonyTime?: string;
      receptionTime?: string;
      venue?: string;
      address?: string;
      googleMapsUrl?: string;
    };
    brideCeremony: {
      date?: string;
      lunarDate?: string;
      ceremonyTime?: string;
      receptionTime?: string;
      venue?: string;
      address?: string;
      googleMapsUrl?: string;
    };
    quote?: string;
    gallery: string[];
    gifting?: unknown;
    primaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    typography?: {
      heading?: string;
      body?: string;
      script?: string;
      thiepOnlineContent?: Record<string, any>;
    } | null;
    sectionOrder?: unknown;
    backgroundMusic?: string;
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    status?: string;
  };
  template: {
    price: number;
    salePrice: number | null;
    saleStartsAt: string | Date | null;
    saleEndsAt: string | Date | null;
  };
};

const DRESS_CODE_PRESETS = [
  {
    name: "Đỏ Rượu & Vàng Kim",
    colors: ["#790606", "#d4af37", "#f5e6d3", "#2b1414"],
  },
  {
    name: "Xanh Olive & Kem",
    colors: ["#556b2f", "#8fbc8f", "#f5f5dc", "#2f4f4f"],
  },
  {
    name: "Pastel Ngọt Ngào",
    colors: ["#f4c2c2", "#ffe4e1", "#e6e6fa", "#d8bfd8"],
  },
  {
    name: "Nâu Vintage & Be",
    colors: ["#4c3223", "#8c6754", "#d1b48c", "#f5ebe0"],
  },
  {
    name: "Xanh Navy & Bạc",
    colors: ["#1b2a4a", "#4a6fa5", "#c0c5ce", "#f8f9fa"],
  },
];

const INTRO_SUGGESTIONS = [
  "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
  "TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH\nĐẾN DỰ BUỔI TIỆC RƯỢU CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI",
  "MỖI CUỘC GẶP GỠ ĐỀU LÀ MỘT DUYÊN LÀNH\nCHÚNG MÌNH RẤT MONG ĐƯỢC ĐÓN TIẾP BẠN TRONG NGÀY TRỌNG ĐẠI",
];

const THANKYOU_SUGGESTIONS = [
  "Sự hiện diện của quý khách là niềm vinh hạnh lớn lao của gia đình chúng tôi!",
  "Cảm ơn bạn đã dành thời gian quý báu đến chung vui và chúc phúc cho hành trình mới của chúng mình!",
  "Rất hân hạnh được đón tiếp quý khách trong ngày vui trọng đại này!",
];

async function uploadSingleImage(weddingId: string, slotKey: string, file: File): Promise<string> {
  const fd = new FormData();
  fd.set("file", file);
  fd.set("slotKey", slotKey);
  const res = await fetch(`/api/weddings/${weddingId}/upload`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Tải ảnh thất bại");
  }
  const data = await res.json();
  return data.url || data.publicUrl;
}

function ImageSlotUploader({
  weddingId,
  slotKey,
  label,
  hint,
  value,
  defaultUrl,
  aspectClass = "aspect-[4/3]",
  onChange,
}: {
  weddingId: string;
  slotKey: string;
  label: string;
  hint?: string;
  value: string;
  defaultUrl?: string;
  aspectClass?: string;
  onChange: (newUrl: string) => void;
}) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const displayUrl = value || defaultUrl || "";
  const isCustom = Boolean(value && value !== defaultUrl);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadSingleImage(weddingId, slotKey, file);
      onChange(url);
      toast({ title: `Đã cập nhật: ${label}` });
    } catch (err) {
      toast({
        title: "Lỗi tải ảnh",
        description: err instanceof Error ? err.message : "Vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 flex flex-col justify-between transition-all hover:border-rose-200">
      <div>
        <div className="flex items-start justify-between gap-1.5 mb-1">
          <span className="text-xs font-semibold text-gray-900 leading-snug">{label}</span>
          {isCustom ? (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
              Ảnh riêng
            </span>
          ) : (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              Ảnh mẫu
            </span>
          )}
        </div>
        {hint && <p className="text-[11px] text-gray-500 mb-2 leading-tight">{hint}</p>}
      </div>

      <div
        className={`relative w-full ${aspectClass} rounded-lg overflow-hidden bg-gray-200 border border-gray-200 mb-2.5 group cursor-pointer`}
        onClick={() => inputRef.current?.click()}
      >
        {displayUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayUrl}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs p-2 text-center">
            <ImageIcon className="w-6 h-6 mb-1 opacity-60" />
            Bấm để tải ảnh
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-rose-600" /> Đổi ảnh này
          </span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex-1 h-8 text-xs bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
        >
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5 mr-1.5" />
          )}
          {uploading ? "Đang tải..." : "Tải ảnh lên"}
        </Button>
        {isCustom && defaultUrl && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onChange(defaultUrl)}
            title="Khôi phục ảnh mẫu mặc định"
            className="h-8 px-2 text-xs text-gray-500 hover:text-gray-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

function SectionCard({
  id,
  title,
  subtitle,
  icon,
  visible,
  onVisibleChange,
  defaultOpen = true,
  badge,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  visible?: boolean;
  onVisibleChange?: (v: boolean) => void;
  defaultOpen?: boolean;
  badge?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden transition-all"
    >
      <div
        className="flex items-center justify-between gap-3 px-4 py-3.5 bg-gray-50/70 border-b border-gray-100 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
              {badge && (
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                  {badge}
                </span>
              )}
              {visible === false && (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                  Đang ẩn trên thiệp
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 truncate mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
          {onVisibleChange !== undefined && (
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-gray-600">
              <input
                type="checkbox"
                checked={visible !== false}
                onChange={(e) => onVisibleChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="hidden sm:inline font-medium">
                {visible !== false ? "Hiển thị" : "Ẩn"}
              </span>
            </label>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="p-4 sm:p-5 space-y-4 bg-white text-gray-900">
          {visible === false ? (
            <div className="rounded-xl bg-gray-50 border border-dashed border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500 mb-2">
                Mục <strong>{title}</strong> đang được tạm ẩn trên thiệp cưới.
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onVisibleChange?.(true)}
                className="h-8 text-xs"
              >
                Bật hiển thị lại mục này
              </Button>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}

export function ThiepOnlineEditor({
  templateSlug,
  wedding,
}: ThiepOnlineEditorProps) {
  const { toast } = useToast();
  const catalogItem: ThiepOnlineCatalogItem =
    THIEPONLINE_BY_SLUG[templateSlug] || THIEPONLINE_CATALOG[0];

  const defaultImages = useMemo(
    () => catalogItem.defaultImages || [],
    [catalogItem]
  );

  // Initialize rich content state from wedding + catalogItem
  const initialContent = useMemo(() => {
    const initialWeddingData: WeddingData = {
      id: wedding.id,
      slug: wedding.slug,
      groomName: wedding.groomName,
      brideName: wedding.brideName,
      groomParents: {
        father: wedding.groomParents?.father || "",
        mother: wedding.groomParents?.mother || "",
      },
      brideParents: {
        father: wedding.brideParents?.father || "",
        mother: wedding.brideParents?.mother || "",
      },
      groomCeremony: {
        date: wedding.groomCeremony?.date || "2026-11-22",
        lunarDate: wedding.groomCeremony?.lunarDate || "",
        ceremonyTime: wedding.groomCeremony?.ceremonyTime || "09:00",
        receptionTime: wedding.groomCeremony?.receptionTime || "11:30",
        venue: wedding.groomCeremony?.venue || "",
        address: wedding.groomCeremony?.address || "",
        googleMapsUrl: wedding.groomCeremony?.googleMapsUrl || "",
      },
      brideCeremony: {
        date: wedding.brideCeremony?.date || "2026-11-21",
        lunarDate: wedding.brideCeremony?.lunarDate || "",
        ceremonyTime: wedding.brideCeremony?.ceremonyTime || "08:00",
        receptionTime: wedding.brideCeremony?.receptionTime || "10:30",
        venue: wedding.brideCeremony?.venue || "",
        address: wedding.brideCeremony?.address || "",
        googleMapsUrl: wedding.brideCeremony?.googleMapsUrl || "",
      },
      quote: wedding.quote,
      gallery: wedding.gallery || [],
      gifting: wedding.gifting as WeddingData["gifting"],
      typography: wedding.typography || undefined,
      backgroundMusic: wedding.backgroundMusic,
      status: (wedding.status as WeddingData["status"]) || "DRAFT",
    };
    return buildPartialContentFromWeddingData(initialWeddingData, catalogItem);
  }, [wedding, catalogItem]);

  const [content, setContent] = useState<Record<string, any>>(initialContent);
  const [slug, setSlug] = useState(wedding.slug || "");
  const [metaTitle, setMetaTitle] = useState(wedding.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(wedding.metaDescription || "");
  const [editorMode, setEditorMode] = useState<EditorMode>("split");
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");
  const [skipIntroPreview, setSkipIntroPreview] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved" | "error">("saved");
  const [uploadingAlbum, setUploadingAlbum] = useState(false);
  const [playingTrackUrl, setPlayingTrackUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const albumInputRef = useRef<HTMLInputElement | null>(null);
  const firstRenderRef = useRef(true);
  const saveTimerRef = useRef<number | null>(null);

  // Helper to update a top-level section of `content`
  const updateSection = useCallback((sectionKey: string, patch: Record<string, any>) => {
    setContent((prev) => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        ...patch,
      },
    }));
    setSaveStatus("unsaved");
  }, []);

  // Build payload that syncs both top-level Wedding columns AND typography.thiepOnlineContent
  const buildSavePayload = useCallback(
    (c: Record<string, any>, currentSlug: string) => {
      const groomName = c.basicInfo?.groomName || wedding.groomName || "Chú Rể";
      const brideName = c.basicInfo?.brideName || wedding.brideName || "Cô Dâu";
      const groomParents = {
        father: c.family?.groom?.father || "",
        mother: c.family?.groom?.mother || "",
      };
      const brideParents = {
        father: c.family?.bride?.father || "",
        mother: c.family?.bride?.mother || "",
      };
      const firstCeremony = c.ceremony?.items?.[0] || {};
      const secondCeremony = c.ceremony?.items?.[1] || firstCeremony;

      const groomCeremony = {
        date: firstCeremony.date || c.party?.date || "2026-11-22",
        lunarDate: wedding.groomCeremony?.lunarDate || "",
        ceremonyTime: firstCeremony.time || c.party?.guestArrivalTime || "09:00",
        receptionTime: c.party?.time || "18:00",
        venue: firstCeremony.venue || c.party?.venueName || "",
        address: firstCeremony.address || c.party?.address || "",
        googleMapsUrl: firstCeremony.mapLink || c.party?.googleMapLink || "",
      };

      const brideCeremony = {
        date: secondCeremony.date || c.party?.date || "2026-11-21",
        lunarDate: wedding.brideCeremony?.lunarDate || "",
        ceremonyTime: secondCeremony.time || "08:00",
        receptionTime: c.party?.time || "18:00",
        venue: c.party?.venueName || secondCeremony.venue || "",
        address: c.party?.address || secondCeremony.address || "",
        googleMapsUrl: c.party?.googleMapLink || secondCeremony.mapLink || "",
      };

      const groomBank = (c.bank?.accounts || []).find(
        (a: any) => a.for === "groom"
      );
      const brideBank = (c.bank?.accounts || []).find(
        (a: any) => a.for === "bride"
      );

      const gifting = {
        ...(groomBank
          ? {
              groom: {
                bankName: groomBank.bankName || "",
                accountNumber: groomBank.accountNumber || "",
                accountHolder: groomBank.accountName || groomName,
                qrCodeUrl: groomBank.imageUrl || "",
              },
            }
          : {}),
        ...(brideBank
          ? {
              bride: {
                bankName: brideBank.bankName || "",
                accountNumber: brideBank.accountNumber || "",
                accountHolder: brideBank.accountName || brideName,
                qrCodeUrl: brideBank.imageUrl || "",
              },
            }
          : {}),
      };

      const galleryUrls = [
        c.headerPhoto?.url || defaultImages[0] || "",
        c.couplePhotos?.groom || defaultImages[4] || defaultImages[1] || "",
        c.couplePhotos?.bride || defaultImages[5] || defaultImages[2] || "",
        ...((c.gallery?.photos || []).map((p: any) => p.url).filter(Boolean) as string[]),
      ].filter(Boolean);

      return {
        slug: currentSlug.trim() || wedding.slug,
        groomName,
        brideName,
        groomParents,
        brideParents,
        groomCeremony,
        brideCeremony,
        quote: c.thankYou?.text || wedding.quote || "",
        gallery: galleryUrls,
        gifting,
        backgroundMusic: c.music?.audioUrl || "",
        metaTitle: metaTitle.trim() || undefined,
        metaDescription: metaDescription.trim() || undefined,
        typography: {
          ...(wedding.typography || {}),
          thiepOnlineContent: c,
        },
      };
    },
    [wedding, defaultImages, metaTitle, metaDescription]
  );

  const performSave = useCallback(
    async (showToast = false) => {
      setSaveStatus("saving");
      try {
        const payload = buildSavePayload(content, slug);
        const res = await fetch(`/api/weddings/${wedding.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Lưu thất bại");
        }
        setSaveStatus("saved");
        if (showToast) {
          toast({
            title: "Đã lưu thay đổi!",
            description: "Mọi thông tin và hình ảnh thiệp đã được cập nhật.",
          });
        }
      } catch (err) {
        setSaveStatus("error");
        if (showToast) {
          toast({
            title: "Lỗi khi lưu",
            description: err instanceof Error ? err.message : "Vui lòng thử lại",
            variant: "destructive",
          });
        }
      }
    },
    [buildSavePayload, content, slug, toast, wedding.id]
  );

  // Debounced auto-save when content changes
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      performSave(false);
    }, 1000);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [content, slug, metaTitle, metaDescription, performSave]);

  // Live WeddingData passed directly to TemplateRenderer for 0ms real-time preview
  const liveWeddingData: WeddingData = useMemo(() => {
    const payload = buildSavePayload(content, slug);
    return {
      id: wedding.id,
      slug: payload.slug,
      groomName: payload.groomName,
      brideName: payload.brideName,
      groomParents: payload.groomParents,
      brideParents: payload.brideParents,
      groomCeremony: payload.groomCeremony,
      brideCeremony: payload.brideCeremony,
      quote: payload.quote,
      gallery: payload.gallery,
      gifting: payload.gifting,
      backgroundMusic: payload.backgroundMusic,
      typography: payload.typography,
      status: (wedding.status as WeddingData["status"]) || "DRAFT",
    };
  }, [buildSavePayload, content, slug, wedding.id, wedding.status]);

  // Fill complete sample data matching thieponline.app concept
  function handleLoadSampleData() {
    setContent((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        groomName: prev.basicInfo?.groomName || "Nguyễn Thanh Tùng",
        brideName: prev.basicInfo?.brideName || "Lê Hương Giang",
        groomShortName: "Thanh Tùng",
        brideShortName: "Hương Giang",
        groomTitle: "Trưởng Nam",
        brideTitle: "Út Nữ",
        displayOrder: "groom-first",
      },
      family: {
        groom: {
          title: "Ông Bà",
          father: "Nguyễn Văn Minh",
          mother: "Trần Thị Lan",
          address: "120 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
          visible: true,
        },
        bride: {
          title: "Ông Bà",
          father: "Lê Văn Hòa",
          mother: "Phạm Thị Hạnh",
          address: "25 Lê Lợi, TP. Biên Hòa, Đồng Nai",
          visible: true,
        },
      },
      party: {
        ...prev.party,
        date: "2026-11-22",
        time: "18:00",
        guestArrivalTime: "17:30",
        startTime: "18:00",
        showReceptionTimes: true,
        venueName: "Trung Tâm Hội Nghị White Palace",
        address: "194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh",
        googleMapLink: "https://maps.google.com/?q=White+Palace+Hoang+Van+Thu",
        photo: prev.party?.photo || defaultImages[1] || defaultImages[0] || "",
        calendarPhoto:
          prev.party?.calendarPhoto || defaultImages[2] || defaultImages[0] || "",
        showCountdown: true,
        showMap: true,
        visible: true,
      },
      headerPhoto: {
        url: prev.headerPhoto?.url || defaultImages[0] || "",
        quote: "Trăm năm tình viên mãn — Bạc đầu nghĩa phu thê",
        visible: true,
      },
      couplePhotos: {
        groom:
          prev.couplePhotos?.groom ||
          defaultImages[4] ||
          defaultImages[1] ||
          defaultImages[0] ||
          "",
        bride:
          prev.couplePhotos?.bride ||
          defaultImages[5] ||
          defaultImages[2] ||
          defaultImages[0] ||
          "",
        groomDescription: "Chàng trai ấm áp, chân thành và luôn yêu thương gia đình.",
        brideDescription: "Cô gái dịu dàng, rạng rỡ với nụ cười tỏa nắng.",
        visible: true,
      },
    }));
    setSaveStatus("unsaved");
    toast({
      title: "Đã nạp dữ liệu mẫu!",
      description: "Thiệp đã được điền đầy đủ thông tin gợi ý. Bạn có thể sửa bất kỳ ô nào.",
    });
  }

  async function handleMultiAlbumUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingAlbum(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadSingleImage(
          wedding.id,
          `thieponline-album-${Date.now()}-${i}`,
          files[i]
        );
        uploadedUrls.push(url);
      }
      const existingPhotos = content.gallery?.photos || [];
      updateSection("gallery", {
        photos: [
          ...existingPhotos,
          ...uploadedUrls.map((url) => ({ url, position: { x: 0.5, y: 0.5 } })),
        ],
      });
      toast({
        title: `Đã tải lên ${uploadedUrls.length} ảnh vào Album!`,
      });
    } catch (err) {
      toast({
        title: "Lỗi tải ảnh album",
        description: err instanceof Error ? err.message : "Vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setUploadingAlbum(false);
      if (albumInputRef.current) albumInputRef.current.value = "";
    }
  }

  function toggleAudioPreview(url: string) {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setPlayingTrackUrl(null);
    }
    if (playingTrackUrl === url) {
      audioRef.current.pause();
      setPlayingTrackUrl(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play().catch(() => {});
      setPlayingTrackUrl(url);
    }
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const groomBank = useMemo(() => {
    return (
      (content.bank?.accounts || []).find((a: any) => a.for === "groom") || {
        id: "bank-groom",
        type: "vietqr",
        for: "groom",
        bankName: "Vietcombank",
        bankCode: "VCB",
        accountNumber: "",
        accountName: content.basicInfo?.groomName || "",
        imageUrl: "",
      }
    );
  }, [content.bank?.accounts, content.basicInfo?.groomName]);

  const brideBank = useMemo(() => {
    return (
      (content.bank?.accounts || []).find((a: any) => a.for === "bride") || {
        id: "bank-bride",
        type: "vietqr",
        for: "bride",
        bankName: "Techcombank",
        bankCode: "TCB",
        accountNumber: "",
        accountName: content.basicInfo?.brideName || "",
        imageUrl: "",
      }
    );
  }, [content.bank?.accounts, content.basicInfo?.brideName]);

  function updateBankAccount(side: "groom" | "bride", patch: Record<string, any>) {
    const currentGroom = { ...groomBank, ...(side === "groom" ? patch : {}) };
    const currentBride = { ...brideBank, ...(side === "bride" ? patch : {}) };
    const nextAccounts = [currentGroom, currentBride].filter(
      (a) => a.accountNumber?.trim() || a.imageUrl?.trim() || a.bankName?.trim()
    );
    updateSection("bank", { accounts: nextAccounts });
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Sticky Top Header Bar — Exact thieponline.app Editor Concept */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-white/95 backdrop-blur border-b border-gray-200 shadow-xs mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back & Template info */}
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/weddings/${wedding.id}`}>
              <Button variant="ghost" size="sm" className="h-9 px-2.5 text-gray-700">
                <ArrowLeft className="w-4 h-4 mr-1" /> Chi tiết
              </Button>
            </Link>
            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
              {catalogItem.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={catalogItem.thumbnail}
                  alt={catalogItem.name}
                  className="h-9 w-7 rounded object-cover border border-gray-200"
                />
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-gray-900 leading-tight">
                    {content.basicInfo?.groomShortName || content.basicInfo?.groomName} &amp;{" "}
                    {content.basicInfo?.brideShortName || content.basicInfo?.brideName}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                      wedding.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {wedding.status === "PUBLISHED" ? "Đã xuất bản" : "Nháp"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[11px] text-rose-600 font-medium">
                    Mẫu: {catalogItem.name}
                  </p>
                  <Link
                    href={`/dashboard/weddings/${wedding.id}/template`}
                    className="text-[11px] text-gray-500 hover:text-rose-600 underline underline-offset-2"
                  >
                    Đổi mẫu
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Center: 3-Way Mode Switcher (Chỉnh sửa | Song song | Xem trước) */}
          <div className="flex items-center rounded-xl bg-gray-100 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setEditorMode("edit")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                editorMode === "edit"
                  ? "bg-white text-gray-900 shadow-xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Pencil className="w-3.5 h-3.5 text-rose-600" />
              Chỉnh sửa
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("split")}
              className={`hidden lg:flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                editorMode === "split"
                  ? "bg-white text-gray-900 shadow-xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Columns className="w-3.5 h-3.5 text-rose-600" />
              Song song
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("preview")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                editorMode === "preview"
                  ? "bg-white text-gray-900 shadow-xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-rose-600" />
              Xem trước
            </button>
          </div>

          {/* Right: Sample Data, Save Status, Save Button, Publish */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLoadSampleData}
              className="h-9 text-xs border-rose-200 text-rose-700 hover:bg-rose-50"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
              <span className="hidden sm:inline">Nạp dữ liệu mẫu</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => performSave(true)}
              disabled={saveStatus === "saving"}
              className="h-9 text-xs bg-white"
            >
              {saveStatus === "saving" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-rose-600" />
                  Đang lưu...
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Đã lưu
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                  Lưu ngay
                </>
              )}
            </Button>

            <Link href={`/w/${slug || wedding.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="h-9 text-xs hidden md:inline-flex">
                <ExternalLink className="w-3.5 h-3.5 mr-1" /> Mở thiệp
              </Button>
            </Link>

            <Link href={`/dashboard/weddings/${wedding.id}/publish`}>
              <Button size="sm" className="h-9 text-xs bg-rose-600 hover:bg-rose-700 text-white">
                Xuất bản
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout based on editorMode */}
      <div
        className={
          editorMode === "split"
            ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            : editorMode === "edit"
              ? "max-w-3xl mx-auto"
              : "w-full"
        }
      >
        {/* LEFT / MAIN COLUMN: EDITOR CARDS */}
        {editorMode !== "preview" && (
          <div
            className={
              editorMode === "split" ? "lg:col-span-6 xl:col-span-6 space-y-5" : "space-y-5"
            }
          >
            {/* Quick Section Jump Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { href: "#sec-photos-quick", label: "📸 Tất cả Ảnh" },
                { href: "#sec-basic", label: "💑 Cô dâu & Chú rể" },
                { href: "#sec-party", label: "📅 Ngày & Địa điểm tiệc" },
                { href: "#sec-ceremony", label: "🏠 Lễ Nhà trai/gái" },
                { href: "#sec-family", label: "👨‍👩‍👧‍👦 Gia đình" },
                { href: "#sec-timeline", label: "⏰ Timeline" },
                { href: "#sec-lovestory", label: "💌 Chuyện tình yêu" },
                { href: "#sec-dresscode", label: "👗 Dress Code" },
                { href: "#sec-album", label: "🖼️ Album ảnh" },
                { href: "#sec-bank", label: "🧧 Mừng cưới QR" },
                { href: "#sec-music", label: "🎵 Nhạc nền" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* 0. QUICK ALL-IN-ONE PHOTO REPLACEMENT HUB */}
            <SectionCard
              id="sec-photos-quick"
              title="Thay nhanh toàn bộ Ảnh trên thiệp"
              subtitle="Bấm vào bất kỳ khung ảnh nào bên dưới để đổi sang ảnh cưới của bạn"
              badge="Tiện lợi nhất"
              icon={<Camera className="w-4 h-4" />}
              defaultOpen={true}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ImageSlotUploader
                  weddingId={wedding.id}
                  slotKey="thieponline-header"
                  label="1. Ảnh đầu thiệp (Hero)"
                  hint="Ảnh lớn mở đầu thiệp"
                  value={content.headerPhoto?.url || ""}
                  defaultUrl={defaultImages[0]}
                  aspectClass="aspect-[3/4]"
                  onChange={(url) => updateSection("headerPhoto", { url })}
                />
                <ImageSlotUploader
                  weddingId={wedding.id}
                  slotKey="thieponline-groom"
                  label="2. Ảnh Chú Rể"
                  hint="Khung chân dung chú rể"
                  value={content.couplePhotos?.groom || ""}
                  defaultUrl={defaultImages[4] || defaultImages[1] || defaultImages[0]}
                  aspectClass="aspect-[3/4]"
                  onChange={(url) => updateSection("couplePhotos", { groom: url })}
                />
                <ImageSlotUploader
                  weddingId={wedding.id}
                  slotKey="thieponline-bride"
                  label="3. Ảnh Cô Dâu"
                  hint="Khung chân dung cô dâu"
                  value={content.couplePhotos?.bride || ""}
                  defaultUrl={defaultImages[5] || defaultImages[2] || defaultImages[0]}
                  aspectClass="aspect-[3/4]"
                  onChange={(url) => updateSection("couplePhotos", { bride: url })}
                />
                <ImageSlotUploader
                  weddingId={wedding.id}
                  slotKey="thieponline-party"
                  label="4. Ảnh ngang dưới phong bì"
                  hint="Ảnh trang trí phần thông tin tiệc"
                  value={content.party?.photo || ""}
                  defaultUrl={defaultImages[1] || defaultImages[0]}
                  aspectClass="aspect-[4/3]"
                  onChange={(url) => updateSection("party", { photo: url })}
                />
                <ImageSlotUploader
                  weddingId={wedding.id}
                  slotKey="thieponline-calendar"
                  label="5. Ảnh nền lịch & đếm ngược"
                  hint="Ảnh nền phần Save the Date"
                  value={content.party?.calendarPhoto || ""}
                  defaultUrl={defaultImages[2] || defaultImages[0]}
                  aspectClass="aspect-[4/3]"
                  onChange={(url) => updateSection("party", { calendarPhoto: url })}
                />
                <ImageSlotUploader
                  weddingId={wedding.id}
                  slotKey="thieponline-thankyou"
                  label="6. Ảnh chân thiệp (Cảm ơn)"
                  hint="Ảnh cuối thiệp kèm lời cảm ơn"
                  value={content.thankYou?.photo || ""}
                  defaultUrl={defaultImages[3] || defaultImages[defaultImages.length - 1]}
                  aspectClass="aspect-[4/3]"
                  onChange={(url) => updateSection("thankYou", { photo: url })}
                />
              </div>
            </SectionCard>

            {/* 1. BASIC INFO (CÔ DÂU & CHÚ RỂ) */}
            <SectionCard
              id="sec-basic"
              title="Thông tin cơ bản (Cô dâu & Chú rể)"
              subtitle="Họ tên, tên gọi ngắn trên phong bì và thứ tự hiển thị"
              icon={<Heart className="w-4 h-4" />}
              defaultOpen={true}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3 rounded-xl bg-rose-50/40 border border-rose-100 p-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Thông tin Chú Rể
                  </p>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Họ và tên Chú Rể *
                    </label>
                    <Input
                      value={content.basicInfo?.groomName || ""}
                      onChange={(e) =>
                        updateSection("basicInfo", {
                          groomName: e.target.value,
                          groomShortName: e.target.value,
                        })
                      }
                      placeholder="VD: Nguyễn Thanh Tùng"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Tên hiển thị trên bìa / phong bì
                    </label>
                    <Input
                      value={content.basicInfo?.groomShortName || ""}
                      onChange={(e) =>
                        updateSection("basicInfo", { groomShortName: e.target.value })
                      }
                      placeholder="VD: Thanh Tùng"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Thứ bậc trong gia đình
                    </label>
                    <Input
                      value={content.basicInfo?.groomTitle || ""}
                      onChange={(e) =>
                        updateSection("basicInfo", { groomTitle: e.target.value })
                      }
                      placeholder="VD: Trưởng Nam / Thứ Nam / Quý Nam"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-3 rounded-xl bg-rose-50/40 border border-rose-100 p-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Thông tin Cô Dâu
                  </p>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Họ và tên Cô Dâu *
                    </label>
                    <Input
                      value={content.basicInfo?.brideName || ""}
                      onChange={(e) =>
                        updateSection("basicInfo", {
                          brideName: e.target.value,
                          brideShortName: e.target.value,
                        })
                      }
                      placeholder="VD: Lê Hương Giang"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Tên hiển thị trên bìa / phong bì
                    </label>
                    <Input
                      value={content.basicInfo?.brideShortName || ""}
                      onChange={(e) =>
                        updateSection("basicInfo", { brideShortName: e.target.value })
                      }
                      placeholder="VD: Hương Giang"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Thứ bậc trong gia đình
                    </label>
                    <Input
                      value={content.basicInfo?.brideTitle || ""}
                      onChange={(e) =>
                        updateSection("basicInfo", { brideTitle: e.target.value })
                      }
                      placeholder="VD: Út Nữ / Trưởng Nữ / Ái Nữ"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-medium text-gray-700">
                  Thứ tự ưu tiên hiển thị trên thiệp:
                </span>
                <div className="flex rounded-lg bg-gray-100 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("basicInfo", { displayOrder: "groom-first" })
                    }
                    className={`rounded-md px-3 py-1.5 font-medium transition-all ${
                      content.basicInfo?.displayOrder !== "bride-first"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Nhà Trai trước (Chú rể - Cô dâu)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateSection("basicInfo", { displayOrder: "bride-first" })
                    }
                    className={`rounded-md px-3 py-1.5 font-medium transition-all ${
                      content.basicInfo?.displayOrder === "bride-first"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Nhà Gái trước (Cô dâu - Chú rể)
                  </button>
                </div>
              </div>
            </SectionCard>

            {/* 2. FAMILY INFO (GIA ĐÌNH HAI BÊN) */}
            <SectionCard
              id="sec-family"
              title="Thông tin Gia đình hai bên (Nhà Trai & Nhà Gái)"
              subtitle="Họ tên Cha Mẹ và địa chỉ tư gia hai bên"
              icon={<Users className="w-4 h-4" />}
              defaultOpen={true}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Groom Family */}
                <div className="space-y-3 rounded-xl border border-gray-200 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-800">
                      Gia đình Nhà Trai
                    </span>
                    <label className="inline-flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={content.family?.groom?.visible !== false}
                        onChange={(e) =>
                          updateSection("family", {
                            groom: {
                              ...(content.family?.groom || {}),
                              visible: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-gray-300 text-rose-600"
                      />
                      Hiện
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Họ tên Cha chú rể
                    </label>
                    <Input
                      value={content.family?.groom?.father || ""}
                      onChange={(e) =>
                        updateSection("family", {
                          groom: {
                            ...(content.family?.groom || {}),
                            father: e.target.value,
                          },
                        })
                      }
                      placeholder="VD: Ông Nguyễn Văn Minh"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Họ tên Mẹ chú rể
                    </label>
                    <Input
                      value={content.family?.groom?.mother || ""}
                      onChange={(e) =>
                        updateSection("family", {
                          groom: {
                            ...(content.family?.groom || {}),
                            mother: e.target.value,
                          },
                        })
                      }
                      placeholder="VD: Bà Trần Thị Lan"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Địa chỉ Nhà Trai
                    </label>
                    <Input
                      value={content.family?.groom?.address || ""}
                      onChange={(e) =>
                        updateSection("family", {
                          groom: {
                            ...(content.family?.groom || {}),
                            address: e.target.value,
                          },
                        })
                      }
                      placeholder="VD: Quận 7, TP. Hồ Chí Minh"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Bride Family */}
                <div className="space-y-3 rounded-xl border border-gray-200 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-800">
                      Gia đình Nhà Gái
                    </span>
                    <label className="inline-flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={content.family?.bride?.visible !== false}
                        onChange={(e) =>
                          updateSection("family", {
                            bride: {
                              ...(content.family?.bride || {}),
                              visible: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-gray-300 text-rose-600"
                      />
                      Hiện
                    </label>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Họ tên Cha cô dâu
                    </label>
                    <Input
                      value={content.family?.bride?.father || ""}
                      onChange={(e) =>
                        updateSection("family", {
                          bride: {
                            ...(content.family?.bride || {}),
                            father: e.target.value,
                          },
                        })
                      }
                      placeholder="VD: Ông Lê Văn Hòa"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Họ tên Mẹ cô dâu
                    </label>
                    <Input
                      value={content.family?.bride?.mother || ""}
                      onChange={(e) =>
                        updateSection("family", {
                          bride: {
                            ...(content.family?.bride || {}),
                            mother: e.target.value,
                          },
                        })
                      }
                      placeholder="VD: Bà Phạm Thị Hạnh"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Địa chỉ Nhà Gái
                    </label>
                    <Input
                      value={content.family?.bride?.address || ""}
                      onChange={(e) =>
                        updateSection("family", {
                          bride: {
                            ...(content.family?.bride || {}),
                            address: e.target.value,
                          },
                        })
                      }
                      placeholder="VD: TP. Biên Hòa, Đồng Nai"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 3. SAVE THE DATE & TIỆC CƯỚI CHÍNH (PARTY) */}
            <SectionCard
              id="sec-party"
              title="Tiệc cưới chính & Lịch Save the Date"
              subtitle="Ngày giờ đãi tiệc, nhà hàng, bản đồ chỉ đường và đồng hồ đếm ngược"
              icon={<Calendar className="w-4 h-4" />}
              visible={content.party?.visible !== false}
              onVisibleChange={(v) => updateSection("party", { visible: v })}
              defaultOpen={true}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Ngày tổ chức tiệc *
                  </label>
                  <Input
                    type="date"
                    value={content.party?.date || "2026-11-22"}
                    onChange={(e) => updateSection("party", { date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Giờ đón khách
                  </label>
                  <Input
                    type="time"
                    value={content.party?.guestArrivalTime || "17:30"}
                    onChange={(e) =>
                      updateSection("party", { guestArrivalTime: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Giờ khai tiệc chính
                  </label>
                  <Input
                    type="time"
                    value={content.party?.time || "18:00"}
                    onChange={(e) =>
                      updateSection("party", {
                        time: e.target.value,
                        startTime: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Tên Nhà hàng / Địa điểm tổ chức
                  </label>
                  <Input
                    value={content.party?.venueName || ""}
                    onChange={(e) =>
                      updateSection("party", { venueName: e.target.value })
                    }
                    placeholder="VD: Trung Tâm Hội Nghị White Palace"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Link Google Maps chỉ đường
                  </label>
                  <Input
                    value={content.party?.googleMapLink || ""}
                    onChange={(e) =>
                      updateSection("party", {
                        googleMapLink: e.target.value,
                        mapAddress: e.target.value || content.party?.address || "",
                      })
                    }
                    placeholder="https://maps.app.goo.gl/..."
                    className="mt-1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700">
                    Địa chỉ chi tiết
                  </label>
                  <Input
                    value={content.party?.address || ""}
                    onChange={(e) =>
                      updateSection("party", {
                        address: e.target.value,
                        mapAddress: content.party?.googleMapLink || e.target.value,
                      })
                    }
                    placeholder="VD: 194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
                <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={content.party?.showCountdown !== false}
                    onChange={(e) =>
                      updateSection("party", { showCountdown: e.target.checked })
                    }
                    className="rounded border-gray-300 text-rose-600"
                  />
                  Hiện đồng hồ đếm ngược
                </label>
                <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={content.party?.showMap !== false}
                    onChange={(e) =>
                      updateSection("party", { showMap: e.target.checked })
                    }
                    className="rounded border-gray-300 text-rose-600"
                  />
                  Hiện nút chỉ đường Google Maps
                </label>
                <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={content.party?.showReceptionTimes !== false}
                    onChange={(e) =>
                      updateSection("party", { showReceptionTimes: e.target.checked })
                    }
                    className="rounded border-gray-300 text-rose-600"
                  />
                  Hiện giờ đón khách &amp; khai tiệc
                </label>
              </div>
            </SectionCard>

            {/* 4. LỜI THÔNG BÁO & CÁC BUỔI LỄ (INTRO & CEREMONY) */}
            <SectionCard
              id="sec-ceremony"
              title="Lời thông báo & Lễ Thành Hôn / Vu Quy"
              subtitle="Câu mở đầu báo hỷ và danh sách các buổi lễ tại tư gia"
              icon={<MapPin className="w-4 h-4" />}
              visible={content.ceremony?.visible !== false}
              onVisibleChange={(v) => updateSection("ceremony", { visible: v })}
              defaultOpen={true}
            >
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Lời thông báo mở đầu
                </label>
                <Textarea
                  value={content.intro?.text || ""}
                  onChange={(e) => updateSection("intro", { text: e.target.value })}
                  rows={2}
                  className="mt-1"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {INTRO_SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => updateSection("intro", { text: s })}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                    >
                      Mẫu câu {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">
                    Danh sách các buổi lễ (Lễ Thành Hôn / Lễ Vu Quy / Báo Hỷ)
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const items = content.ceremony?.items || [];
                      updateSection("ceremony", {
                        items: [
                          ...items,
                          {
                            id: `ceremony-${Date.now()}`,
                            title: "LỄ VU QUY ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA NHÀ GÁI",
                            date: content.party?.date || "2026-11-21",
                            time: "08:00",
                            venue: "Tại Tư Gia Nhà Gái",
                            address: "",
                            mapLink: "",
                            showMap: true,
                          },
                        ],
                      });
                    }}
                    className="h-7 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Thêm buổi lễ
                  </Button>
                </div>

                {(content.ceremony?.items || []).map((item: any, idx: number) => (
                  <div
                    key={item.id || idx}
                    className="rounded-xl border border-gray-200 bg-gray-50/50 p-3.5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-700">
                        Buổi lễ #{idx + 1}
                      </span>
                      {(content.ceremony?.items || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const next = (content.ceremony?.items || []).filter(
                              (_: any, i: number) => i !== idx
                            );
                            updateSection("ceremony", { items: next });
                          }}
                          className="text-xs text-red-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xoá
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-gray-700">
                          Tiêu đề buổi lễ
                        </label>
                        <Input
                          value={item.title || ""}
                          onChange={(e) => {
                            const next = [...(content.ceremony?.items || [])];
                            next[idx] = { ...next[idx], title: e.target.value };
                            updateSection("ceremony", { items: next });
                          }}
                          placeholder="VD: LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI TƯ GIA NHÀ TRAI"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700">
                          Ngày làm lễ
                        </label>
                        <Input
                          type="date"
                          value={item.date || "2026-11-22"}
                          onChange={(e) => {
                            const next = [...(content.ceremony?.items || [])];
                            next[idx] = { ...next[idx], date: e.target.value };
                            updateSection("ceremony", { items: next });
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700">
                          Giờ làm lễ
                        </label>
                        <Input
                          type="time"
                          value={item.time || "09:00"}
                          onChange={(e) => {
                            const next = [...(content.ceremony?.items || [])];
                            next[idx] = { ...next[idx], time: e.target.value };
                            updateSection("ceremony", { items: next });
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700">
                          Nơi cử hành lễ
                        </label>
                        <Input
                          value={item.venue || ""}
                          onChange={(e) => {
                            const next = [...(content.ceremony?.items || [])];
                            next[idx] = { ...next[idx], venue: e.target.value };
                            updateSection("ceremony", { items: next });
                          }}
                          placeholder="VD: Tại Tư Gia Nhà Trai"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700">
                          Địa chỉ nơi làm lễ
                        </label>
                        <Input
                          value={item.address || ""}
                          onChange={(e) => {
                            const next = [...(content.ceremony?.items || [])];
                            next[idx] = { ...next[idx], address: e.target.value };
                            updateSection("ceremony", { items: next });
                          }}
                          placeholder="VD: 120 Nguyễn Văn Linh, Quận 7, TP.HCM"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 5. LỊCH TRÌNH NGÀY CƯỚI (TIMELINE / SCHEDULE) */}
            <SectionCard
              id="sec-timeline"
              title="Lịch trình ngày cưới (Timeline)"
              subtitle="Các mốc giờ đón khách, làm lễ, khai tiệc hiển thị trên thiệp"
              icon={<Clock className="w-4 h-4" />}
              visible={content.schedule?.visible !== false}
              onVisibleChange={(v) => updateSection("schedule", { visible: v })}
              defaultOpen={true}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-700">
                    Tiêu đề mục Lịch trình
                  </label>
                  <Input
                    value={content.schedule?.title || "Timeline"}
                    onChange={(e) =>
                      updateSection("schedule", { title: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const items = content.schedule?.items || [];
                    updateSection("schedule", {
                      items: [
                        ...items,
                        {
                          id: `sch-${Date.now()}`,
                          time: "20:00",
                          label: "Hoạt động tiếp theo",
                          icon: "music",
                        },
                      ],
                    });
                  }}
                  className="mt-6 h-9 text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Thêm mốc giờ
                </Button>
              </div>

              <div className="space-y-2.5">
                {(content.schedule?.items || []).map((item: any, idx: number) => (
                  <div
                    key={item.id || idx}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 p-2.5"
                  >
                    <Input
                      type="time"
                      value={item.time || "17:00"}
                      onChange={(e) => {
                        const next = [...(content.schedule?.items || [])];
                        next[idx] = { ...next[idx], time: e.target.value };
                        updateSection("schedule", { items: next });
                      }}
                      className="w-28 shrink-0"
                    />
                    <Input
                      value={item.label || ""}
                      onChange={(e) => {
                        const next = [...(content.schedule?.items || [])];
                        next[idx] = { ...next[idx], label: e.target.value };
                        updateSection("schedule", { items: next });
                      }}
                      placeholder="VD: Đón khách & chụp ảnh"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = (content.schedule?.items || []).filter(
                          (_: any, i: number) => i !== idx
                        );
                        updateSection("schedule", { items: next });
                      }}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 6. CÂU CHUYỆN TÌNH YÊU (LOVE STORY) */}
            <SectionCard
              id="sec-lovestory"
              title="Câu chuyện tình yêu (Love Story)"
              subtitle="Kể lại những cột mốc đáng nhớ của hai bạn"
              icon={<Heart className="w-4 h-4" />}
              visible={content.loveStory?.visible !== false}
              onVisibleChange={(v) => updateSection("loveStory", { visible: v })}
              defaultOpen={false}
            >
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Lời dẫn mở đầu câu chuyện
                </label>
                <Textarea
                  value={content.loveStory?.content || ""}
                  onChange={(e) =>
                    updateSection("loveStory", { content: e.target.value })
                  }
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">
                    Các cột mốc kỷ niệm
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const events = content.loveStory?.events || [];
                      updateSection("loveStory", {
                        events: [
                          ...events,
                          {
                            id: `ls-${Date.now()}`,
                            date: "2026",
                            title: "Cột mốc mới",
                            text: "Chia sẻ kỷ niệm đáng nhớ của hai bạn...",
                          },
                        ],
                      });
                    }}
                    className="h-7 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Thêm cột mốc
                  </Button>
                </div>

                {(content.loveStory?.events || []).map((ev: any, idx: number) => (
                  <div
                    key={ev.id || idx}
                    className="rounded-xl border border-gray-200 bg-gray-50/50 p-3 space-y-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <Input
                        value={ev.date || ""}
                        onChange={(e) => {
                          const next = [...(content.loveStory?.events || [])];
                          next[idx] = { ...next[idx], date: e.target.value };
                          updateSection("loveStory", { events: next });
                        }}
                        placeholder="Thời gian (VD: 2024)"
                        className="w-32 shrink-0"
                      />
                      <Input
                        value={ev.title || ""}
                        onChange={(e) => {
                          const next = [...(content.loveStory?.events || [])];
                          next[idx] = { ...next[idx], title: e.target.value };
                          updateSection("loveStory", { events: next });
                        }}
                        placeholder="Tiêu đề cột mốc"
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = (content.loveStory?.events || []).filter(
                            (_: any, i: number) => i !== idx
                          );
                          updateSection("loveStory", { events: next });
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <Textarea
                      value={ev.text || ""}
                      onChange={(e) => {
                        const next = [...(content.loveStory?.events || [])];
                        next[idx] = { ...next[idx], text: e.target.value };
                        updateSection("loveStory", { events: next });
                      }}
                      rows={2}
                      placeholder="Nội dung kỷ niệm..."
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 7. DRESS CODE */}
            <SectionCard
              id="sec-dresscode"
              title="Dress Code (Tông màu trang phục)"
              subtitle="Gợi ý màu sắc trang phục cho khách mời tham dự"
              icon={<Palette className="w-4 h-4" />}
              visible={content.dressCode?.visible !== false}
              onVisibleChange={(v) => updateSection("dressCode", { visible: v })}
              defaultOpen={false}
            >
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Lời nhắn gợi ý trang phục
                </label>
                <Textarea
                  value={content.dressCode?.description || ""}
                  onChange={(e) =>
                    updateSection("dressCode", { description: e.target.value })
                  }
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 block mb-2">
                  Chọn nhanh bảng màu gợi ý:
                </label>
                <div className="flex flex-wrap gap-2">
                  {DRESS_CODE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() =>
                        updateSection("dressCode", { colors: preset.colors })
                      }
                      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-rose-300 hover:bg-rose-50"
                    >
                      <span className="flex -space-x-1">
                        {preset.colors.map((c, i) => (
                          <span
                            key={i}
                            className="h-4 w-4 rounded-full border border-white shadow-2xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </span>
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {(content.dressCode?.colors || []).map((hex: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5"
                  >
                    <input
                      type="color"
                      value={hex}
                      onChange={(e) => {
                        const next = [...(content.dressCode?.colors || [])];
                        next[idx] = e.target.value;
                        updateSection("dressCode", { colors: next });
                      }}
                      className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                    />
                    <span className="text-xs font-mono text-gray-700 uppercase">
                      {hex}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = (content.dressCode?.colors || []).filter(
                          (_: string, i: number) => i !== idx
                        );
                        updateSection("dressCode", { colors: next });
                      }}
                      className="text-gray-400 hover:text-red-600 ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateSection("dressCode", {
                      colors: [...(content.dressCode?.colors || []), "#d4af37"],
                    })
                  }
                  className="h-8 text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Thêm màu
                </Button>
              </div>
            </SectionCard>

            {/* 8. ALBUM ẢNH CƯỚI (GALLERY) */}
            <SectionCard
              id="sec-album"
              title="Thư viện Ảnh cưới (Album)"
              subtitle="Tải nhiều ảnh cùng lúc, đổi kiểu hiển thị Lưới / Ghép ảnh / 3D"
              icon={<ImageIcon className="w-4 h-4" />}
              visible={content.gallery?.visible !== false}
              onVisibleChange={(v) => updateSection("gallery", { visible: v })}
              defaultOpen={true}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700">
                    Kiểu hiển thị:
                  </span>
                  <div className="flex rounded-lg bg-gray-100 p-1 text-xs">
                    {[
                      { id: "grid", label: "Lưới đều" },
                      { id: "masonry", label: "Ghép nghệ thuật" },
                      { id: "cards", label: "Thẻ trượt" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          updateSection("gallery", { displayMode: mode.id })
                        }
                        className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                          (content.gallery?.displayMode || "grid") === mode.id
                            ? "bg-white text-gray-900 shadow-xs"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={albumInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleMultiAlbumUpload}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => albumInputRef.current?.click()}
                    disabled={uploadingAlbum}
                    className="h-8 text-xs bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    {uploadingAlbum ? (
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                    )}
                    {uploadingAlbum ? "Đang tải ảnh..." : "+ Tải thêm nhiều ảnh"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateSection("gallery", {
                        photos: defaultImages.map((url) => ({
                          url,
                          position: { x: 0.5, y: 0.5 },
                        })),
                      })
                    }
                    className="h-8 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" /> Khôi phục ảnh mẫu
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {(content.gallery?.photos || []).map((p: any, idx: number) => (
                  <div
                    key={`${p.url}-${idx}`}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt={`Album ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      #{idx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const next = (content.gallery?.photos || []).filter(
                          (_: any, i: number) => i !== idx
                        );
                        updateSection("gallery", { photos: next });
                      }}
                      className="absolute top-1.5 right-1.5 rounded-lg bg-red-600/90 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      title="Xoá ảnh này khỏi album"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 9. HỘP MỪNG CƯỚI (QR NGÂN HÀNG) */}
            <SectionCard
              id="sec-bank"
              title="Hộp Mừng Cưới (QR Ngân Hàng)"
              subtitle="Tự động tạo mã VietQR hoặc tải ảnh mã QR ngân hàng của hai bên"
              icon={<Gift className="w-4 h-4" />}
              visible={content.bank?.visible !== false}
              onVisibleChange={(v) => updateSection("bank", { visible: v })}
              defaultOpen={true}
            >
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-100">
                <span className="text-xs font-medium text-gray-700">
                  Kiểu hiển thị trên thiệp:
                </span>
                <div className="flex rounded-lg bg-gray-100 p-1 text-xs">
                  {[
                    { id: "envelope", label: "Phong bì đỏ" },
                    { id: "gift-box", label: "Hộp quà mừng" },
                    { id: "qr-direct", label: "Hiện mã QR trực tiếp" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => updateSection("bank", { displayMode: m.id })}
                      className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                        (content.bank?.displayMode || "envelope") === m.id
                          ? "bg-white text-gray-900 shadow-xs"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Groom Bank */}
                <div className="space-y-3 rounded-xl border border-gray-200 p-3.5">
                  <p className="text-xs font-bold uppercase text-rose-700">
                    Ngân hàng Chú Rể (Nhà Trai)
                  </p>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Ngân hàng
                    </label>
                    <select
                      value={groomBank.bankName || "Vietcombank"}
                      onChange={(e) =>
                        updateBankAccount("groom", {
                          bankName: e.target.value,
                          bankCode: resolveBankBin(e.target.value) || e.target.value,
                        })
                      }
                      className="mt-1 flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm text-gray-900 shadow-xs"
                    >
                      {VIETNAMESE_BANKS.map((b) => (
                        <option key={b.shortName} value={b.shortName}>
                          {b.shortName} — {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Số tài khoản
                    </label>
                    <Input
                      value={groomBank.accountNumber || ""}
                      onChange={(e) =>
                        updateBankAccount("groom", { accountNumber: e.target.value })
                      }
                      placeholder="VD: 1023456789"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Tên chủ tài khoản
                    </label>
                    <Input
                      value={groomBank.accountName || ""}
                      onChange={(e) =>
                        updateBankAccount("groom", { accountName: e.target.value })
                      }
                      placeholder="VD: NGUYEN THANH TUNG"
                      className="mt-1"
                    />
                  </div>
                  <ImageSlotUploader
                    weddingId={wedding.id}
                    slotKey="thieponline-qr-groom"
                    label="Ảnh QR Chú Rể (Tùy chọn)"
                    hint="Để trống sẽ tự tạo mã VietQR theo STK"
                    value={groomBank.imageUrl || ""}
                    aspectClass="aspect-square max-w-[140px] mx-auto"
                    onChange={(url) =>
                      updateBankAccount("groom", {
                        imageUrl: url,
                        type: url ? "upload_qr" : "vietqr",
                      })
                    }
                  />
                </div>

                {/* Bride Bank */}
                <div className="space-y-3 rounded-xl border border-gray-200 p-3.5">
                  <p className="text-xs font-bold uppercase text-rose-700">
                    Ngân hàng Cô Dâu (Nhà Gái)
                  </p>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Ngân hàng
                    </label>
                    <select
                      value={brideBank.bankName || "Techcombank"}
                      onChange={(e) =>
                        updateBankAccount("bride", {
                          bankName: e.target.value,
                          bankCode: resolveBankBin(e.target.value) || e.target.value,
                        })
                      }
                      className="mt-1 flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm text-gray-900 shadow-xs"
                    >
                      {VIETNAMESE_BANKS.map((b) => (
                        <option key={b.shortName} value={b.shortName}>
                          {b.shortName} — {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Số tài khoản
                    </label>
                    <Input
                      value={brideBank.accountNumber || ""}
                      onChange={(e) =>
                        updateBankAccount("bride", { accountNumber: e.target.value })
                      }
                      placeholder="VD: 19036789012"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">
                      Tên chủ tài khoản
                    </label>
                    <Input
                      value={brideBank.accountName || ""}
                      onChange={(e) =>
                        updateBankAccount("bride", { accountName: e.target.value })
                      }
                      placeholder="VD: LE HUONG GIANG"
                      className="mt-1"
                    />
                  </div>
                  <ImageSlotUploader
                    weddingId={wedding.id}
                    slotKey="thieponline-qr-bride"
                    label="Ảnh QR Cô Dâu (Tùy chọn)"
                    hint="Để trống sẽ tự tạo mã VietQR theo STK"
                    value={brideBank.imageUrl || ""}
                    aspectClass="aspect-square max-w-[140px] mx-auto"
                    onChange={(url) =>
                      updateBankAccount("bride", {
                        imageUrl: url,
                        type: url ? "upload_qr" : "vietqr",
                      })
                    }
                  />
                </div>
              </div>
            </SectionCard>

            {/* 10. LỜI CẢM ƠN & RSVP & SỔ LƯU BÚT */}
            <SectionCard
              id="sec-thankyou"
              title="Lời cảm ơn, Xác nhận tham dự (RSVP) & Sổ lưu bút"
              subtitle="Tùy chỉnh lời cảm ơn cuối thiệp và biểu mẫu khách gửi lời chúc"
              icon={<MessageSquare className="w-4 h-4" />}
              defaultOpen={false}
            >
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Lời cảm ơn cuối thiệp
                </label>
                <Textarea
                  value={content.thankYou?.text || ""}
                  onChange={(e) =>
                    updateSection("thankYou", { text: e.target.value })
                  }
                  rows={2}
                  className="mt-1"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {THANKYOU_SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => updateSection("thankYou", { text: s })}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                    >
                      Gợi ý {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <label className="flex items-center justify-between rounded-xl border border-gray-200 p-3 cursor-pointer">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      Xác nhận tham dự (RSVP)
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Cho phép khách báo số người tham dự
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={content.rsvp?.visible !== false}
                    onChange={(e) =>
                      updateSection("rsvp", { visible: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-rose-600"
                  />
                </label>

                <label className="flex items-center justify-between rounded-xl border border-gray-200 p-3 cursor-pointer">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      Sổ lưu bút &amp; Lời chúc
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Cho phép khách gửi lời chúc mừng trên thiệp
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={content.guestbook?.visible !== false}
                    onChange={(e) =>
                      updateSection("guestbook", { visible: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-rose-600"
                  />
                </label>
              </div>
            </SectionCard>

            {/* 11. NHẠC NỀN & PHONG BÌ & CHIA SẺ */}
            <SectionCard
              id="sec-music"
              title="Nhạc nền, Phong bì mở đầu & Đường dẫn chia sẻ"
              subtitle="Chọn bài hát đám cưới, câu chào trên phong bì và link thiệp"
              icon={<Music className="w-4 h-4" />}
              defaultOpen={true}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-800">
                    Chọn bài hát nhạc nền có sẵn
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={content.music?.visible !== false}
                      onChange={(e) =>
                        updateSection("music", { visible: e.target.checked })
                      }
                      className="rounded border-gray-300 text-rose-600"
                    />
                    Bật nhạc nền
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                  {POPULAR_WEDDING_TRACKS.map((track) => {
                    const isSelected = content.music?.audioUrl === track.url;
                    const isPlaying = playingTrackUrl === track.url;
                    return (
                      <div
                        key={track.id}
                        onClick={() =>
                          updateSection("music", { audioUrl: track.url, visible: true })
                        }
                        className={`flex items-center justify-between gap-2 rounded-xl border p-2.5 cursor-pointer transition-all ${
                          isSelected
                            ? "border-rose-500 bg-rose-50/70 ring-1 ring-rose-200"
                            : "border-gray-200 hover:border-rose-200 bg-white"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">
                            {track.title}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            {track.artist} · {track.duration}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAudioPreview(track.url);
                          }}
                          className="h-7 w-7 shrink-0 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center hover:bg-rose-200"
                          title={isPlaying ? "Tạm dừng" : "Nghe thử"}
                        >
                          {isPlaying ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5 ml-0.5" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label className="text-xs font-medium text-gray-700">
                    Hoặc dán đường dẫn file nhạc MP3 tùy chỉnh
                  </label>
                  <Input
                    value={content.music?.audioUrl || ""}
                    onChange={(e) =>
                      updateSection("music", { audioUrl: e.target.value })
                    }
                    placeholder="https://.../nhac-cuoi.mp3"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-600" />
                    Lời kính mời trên Phong bì mở đầu
                  </label>
                  <Input
                    value={content.envelope?.salutation || "Thân Mời"}
                    onChange={(e) =>
                      updateSection("envelope", { salutation: e.target.value })
                    }
                    placeholder="VD: Thân Mời / Trân Trọng Kính Mời"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-rose-600" />
                    Đường dẫn thiệp (/w/...)
                  </label>
                  <Input
                    value={slug}
                    onChange={(e) =>
                      setSlug(
                        e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                      )
                    }
                    placeholder="thanh-tung-huong-giang"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Tiêu đề khi chia sẻ Zalo / Facebook
                  </label>
                  <Input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={`Thiệp Cưới ${content.basicInfo?.groomShortName || ""} & ${content.basicInfo?.brideShortName || ""}`}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Mô tả ngắn khi chia sẻ
                  </label>
                  <Input
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi"
                    className="mt-1"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* RIGHT / FULL COLUMN: REAL-TIME INTERACTIVE PREVIEW */}
        {(editorMode === "split" || editorMode === "preview") && (
          <div
            className={
              editorMode === "split"
                ? "lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20"
                : "w-full max-w-5xl mx-auto"
            }
          >
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Preview Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-800">
                    Xem trước trực tiếp (Cập nhật tức thì)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Toggle Envelope vs Card Body */}
                  <div className="flex rounded-lg bg-gray-200/80 p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSkipIntroPreview(true)}
                      className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                        skipIntroPreview
                          ? "bg-rose-600 text-white shadow-2xs"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      Nội dung thiệp
                    </button>
                    <button
                      type="button"
                      onClick={() => setSkipIntroPreview(false)}
                      className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                        !skipIntroPreview
                          ? "bg-rose-600 text-white shadow-2xs"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      Phong bì
                    </button>
                  </div>

                  {/* Mobile / Desktop frame toggle */}
                  <div className="flex rounded-lg bg-gray-200/80 p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("mobile")}
                      className={`p-1 rounded-md ${
                        previewDevice === "mobile"
                          ? "bg-white text-gray-900 shadow-2xs"
                          : "text-gray-600"
                      }`}
                      title="Khung điện thoại"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice("desktop")}
                      className={`p-1 rounded-md ${
                        previewDevice === "desktop"
                          ? "bg-white text-gray-900 shadow-2xs"
                          : "text-gray-600"
                      }`}
                      title="Toàn chiều rộng"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Live Preview Viewport */}
              <div className="bg-neutral-900/95 p-3 sm:p-5 flex justify-center">
                <div
                  className={`bg-white rounded-2xl overflow-hidden shadow-2xl relative [transform:translateZ(0)] transition-all ${
                    previewDevice === "mobile"
                      ? "w-full max-w-[430px] border-[5px] border-neutral-800 rounded-[28px]"
                      : "w-full"
                  }`}
                  style={{ height: "calc(100vh - 165px)", minHeight: "620px" }}
                >
                  <div className="w-full h-full overflow-y-auto thieponline-embedded-preview">
                    <TemplateRenderer
                      templateSlug={templateSlug}
                      wedding={liveWeddingData}
                      mode="groom"
                      isDemo={true}
                      isPreview={skipIntroPreview}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
