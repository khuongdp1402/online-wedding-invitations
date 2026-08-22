"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { type WeddingData, getTemplate } from "@/lib/template-registry";
import { EditWeddingPreviewPanel } from "@/components/dashboard/edit-wedding/EditWeddingPreviewPanel";
import { EditWeddingMediaSection } from "@/components/dashboard/edit-wedding/EditWeddingMediaSection";
import { StructureImageField } from "@/components/dashboard/edit-wedding/StructureImageField";
import { SortableSectionList } from "@/components/dashboard/edit-wedding/SortableSectionList";
import { PublishPriceBar } from "@/components/dashboard/edit-wedding/PublishPriceBar";
import { SaveStatusIndicator, worstSaveStatus } from "@/components/dashboard/edit-wedding/SaveStatusIndicator";
import { ContactRequestDialog } from "@/components/dashboard/ContactRequestDialog";
import { HEADING_FONTS, BODY_FONTS, SCRIPT_FONTS, COLOR_PRESETS } from "@/lib/font-catalog";
import { textFieldForSlotKey, type WeddingTextField } from "@/lib/wedding-slots";
import { galleryIndexForSlotKey } from "@/lib/wedding-image-slots";
import { resolveSections, type SectionConfig } from "@/lib/section-config";
import { SECTIONS, getSectionDef } from "@/lib/section-registry";
import { resolveBankBin } from "@/lib/vietqr";
import { useAutosaveField } from "@/hooks/useAutosaveField";

type Props = {
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
    typography?: { heading?: string; body?: string; script?: string } | null;
    /** `string[]` (cũ) hoặc `SectionConfig[]` (mới) — đọc qua `resolveSections`. */
    sectionOrder?: unknown;
    backgroundMusic?: string;
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    status?: string;
  };
  /** Giá xuất bản/gia hạn của template đang dùng — hiện trong `PublishPriceBar`. */
  template: {
    price: number;
    salePrice: number | null;
    saleStartsAt: string | Date | null;
    saleEndsAt: string | Date | null;
  };
};

type GiftingInfoInput = {
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  qrCodeUrl?: string;
};
type GiftingState = { groom?: GiftingInfoInput; bride?: GiftingInfoInput };

/** Bỏ các bên chưa nhập gì để không lưu object rỗng vào DB. */
function cleanGifting(g: GiftingState): GiftingState | null {
  const keep = (info?: GiftingInfoInput) => {
    const has =
      info?.bankName?.trim() ||
      info?.accountNumber?.trim() ||
      info?.accountHolder?.trim();
    return has ? info : undefined;
  };
  const groom = keep(g.groom);
  const bride = keep(g.bride);
  if (!groom && !bride) return null;
  return { ...(groom && { groom }), ...(bride && { bride }) };
}

function normalizeGallery(g: unknown): string[] {
  const arr = Array.isArray(g) ? g.map((x) => String(x ?? "")) : [];
  while (arr.length < 6) arr.push("");
  return arr;
}

export function EditWeddingForm({ wedding, templateSlug, template }: Props) {
  const { toast } = useToast();
  const [highlightSlot, setHighlightSlot] = useState<string>("global");
  const [pendingFocusField, setPendingFocusField] = useState<WeddingTextField | null>(null);
  const inputRefs = useRef<Partial<Record<WeddingTextField, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const [slug, setSlug] = useState(wedding.slug);
  const [groomName, setGroomName] = useState(wedding.groomName);
  const [brideName, setBrideName] = useState(wedding.brideName);
  const [groomFather, setGroomFather] = useState(wedding.groomParents?.father || "");
  const [groomMother, setGroomMother] = useState(wedding.groomParents?.mother || "");
  const [brideFather, setBrideFather] = useState(wedding.brideParents?.father || "");
  const [brideMother, setBrideMother] = useState(wedding.brideParents?.mother || "");

  const [gcDate, setGcDate] = useState(wedding.groomCeremony?.date || "");
  const [gcLunarDate, setGcLunarDate] = useState(wedding.groomCeremony?.lunarDate || "");
  const [gcCeremonyTime, setGcCeremonyTime] = useState(wedding.groomCeremony?.ceremonyTime || "");
  const [gcReceptionTime, setGcReceptionTime] = useState(wedding.groomCeremony?.receptionTime || "");
  const [gcVenue, setGcVenue] = useState(wedding.groomCeremony?.venue || "");
  const [gcAddress, setGcAddress] = useState(wedding.groomCeremony?.address || "");
  const [gcMapsUrl, setGcMapsUrl] = useState(wedding.groomCeremony?.googleMapsUrl || "");

  const [bcDate, setBcDate] = useState(wedding.brideCeremony?.date || "");
  const [bcLunarDate, setBcLunarDate] = useState(wedding.brideCeremony?.lunarDate || "");
  const [bcCeremonyTime, setBcCeremonyTime] = useState(wedding.brideCeremony?.ceremonyTime || "");
  const [bcReceptionTime, setBcReceptionTime] = useState(wedding.brideCeremony?.receptionTime || "");
  const [bcVenue, setBcVenue] = useState(wedding.brideCeremony?.venue || "");
  const [bcAddress, setBcAddress] = useState(wedding.brideCeremony?.address || "");
  const [bcMapsUrl, setBcMapsUrl] = useState(wedding.brideCeremony?.googleMapsUrl || "");

  const [quote, setQuote] = useState(wedding.quote || "");
  const [primaryColor, setPrimaryColor] = useState(wedding.primaryColor || "#800020");
  const [accentColor, setAccentColor] = useState(wedding.accentColor || "#d4a853");
  const [backgroundColor, setBackgroundColor] = useState(wedding.backgroundColor || "#FDFBF7");
  const [textColor, setTextColor] = useState(wedding.textColor || "#4A4A4A");
  const [fontFamily, setFontFamily] = useState(wedding.fontFamily || "");

  // Load default sections from template registry instead of hardcoding
  const templateConfig = getTemplate(templateSlug);
  const DEFAULT_SECTION_ORDER = useMemo(
    () =>
      templateConfig?.sections ?? [
        "header",
        "wedding-info",
        "countdown",
        "quote",
        "gallery",
        "location",
        "wishes",
        "footer",
      ],
    [templateConfig]
  );
  const [sections, setSections] = useState<SectionConfig[]>(() =>
    resolveSections(wedding.sectionOrder, DEFAULT_SECTION_ORDER)
  );
  const [contactOpen, setContactOpen] = useState(false);

  /** Khối có ở mẫu khác nhưng mẫu hiện tại chưa hỗ trợ — hiện mờ ở cuối danh sách. */
  const unsupportedSections = useMemo(() => {
    const supported = new Set(DEFAULT_SECTION_ORDER);
    // `info` và `wedding-info` là cùng một khối ở hai mẫu khác nhau
    if (supported.has("wedding-info")) supported.add("info");
    if (supported.has("info")) supported.add("wedding-info");
    return Object.keys(SECTIONS).filter((key) => !supported.has(key));
  }, [DEFAULT_SECTION_ORDER]);

  const [gifting, setGifting] = useState<GiftingState>(
    () => (wedding.gifting as GiftingState) || {}
  );

  function updateGifting(
    side: "groom" | "bride",
    field: keyof GiftingInfoInput,
    value: string
  ) {
    setGifting((prev) => ({
      ...prev,
      [side]: { ...prev[side], [field]: value },
    }));
  }

  const [backgroundMusic, setBackgroundMusic] = useState(wedding.backgroundMusic || "");
  const [metaTitle, setMetaTitle] = useState(wedding.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(wedding.metaDescription || "");
  const [ogImage, setOgImage] = useState(wedding.ogImage || "");
  const [gallery, setGallery] = useState<string[]>(() => normalizeGallery(wedding.gallery));
  const [typography, setTypography] = useState<{ heading?: string; body?: string; script?: string; }>(
    wedding.typography ?? {}
  );

  // ==================== Autosave ====================
  // Mỗi field/nhóm field (theo đúng cột PUT /api/weddings/[id] hỗ trợ) có 1
  // instance riêng — debounce độc lập, không field nào chờ field khác.
  const slugAutosave = useAutosaveField(wedding.id, (v: string) => ({ slug: v }));
  const groomNameAutosave = useAutosaveField(wedding.id, (v: string) => ({ groomName: v }));
  const brideNameAutosave = useAutosaveField(wedding.id, (v: string) => ({ brideName: v }));
  const groomParentsAutosave = useAutosaveField(
    wedding.id,
    (v: { father: string; mother: string }) => ({ groomParents: v })
  );
  const brideParentsAutosave = useAutosaveField(
    wedding.id,
    (v: { father: string; mother: string }) => ({ brideParents: v })
  );
  const groomCeremonyAutosave = useAutosaveField(
    wedding.id,
    (v: Record<string, string>) => ({ groomCeremony: v })
  );
  const brideCeremonyAutosave = useAutosaveField(
    wedding.id,
    (v: Record<string, string>) => ({ brideCeremony: v })
  );
  const quoteAutosave = useAutosaveField(wedding.id, (v: string) => ({ quote: v || null }));
  const giftingAutosave = useAutosaveField(wedding.id, (v: GiftingState) => ({
    gifting: cleanGifting(v),
  }));
  const primaryColorAutosave = useAutosaveField(wedding.id, (v: string) => ({ primaryColor: v }));
  const accentColorAutosave = useAutosaveField(wedding.id, (v: string) => ({ accentColor: v }));
  const backgroundColorAutosave = useAutosaveField(wedding.id, (v: string) => ({
    backgroundColor: v || null,
  }));
  const textColorAutosave = useAutosaveField(wedding.id, (v: string) => ({ textColor: v || null }));
  const fontFamilyAutosave = useAutosaveField(wedding.id, (v: string) => ({ fontFamily: v || null }));
  const typographyAutosave = useAutosaveField(
    wedding.id,
    (v: { heading?: string; body?: string; script?: string }) => ({
      typography: Object.keys(v).length > 0 ? v : null,
    })
  );
  // Kéo-thả section là hành động rời rạc, không phải gõ liên tục — debounce
  // ngắn hơn text để cảm giác "lưu ngay" sau khi thả.
  const sectionOrderAutosave = useAutosaveField(
    wedding.id,
    (v: SectionConfig[]) => ({ sectionOrder: v.length > 0 ? v : null }),
    300
  );
  const backgroundMusicAutosave = useAutosaveField(wedding.id, (v: string) => ({
    backgroundMusic: v.trim() || null,
  }));
  const metaTitleAutosave = useAutosaveField(wedding.id, (v: string) => ({
    metaTitle: v.trim() || null,
  }));
  const metaDescriptionAutosave = useAutosaveField(wedding.id, (v: string) => ({
    metaDescription: v.trim() || null,
  }));
  const ogImageAutosave = useAutosaveField(wedding.id, (v: string) => ({
    ogImage: v.trim() || null,
  }));

  const allAutosaves = [
    slugAutosave,
    groomNameAutosave,
    brideNameAutosave,
    groomParentsAutosave,
    brideParentsAutosave,
    groomCeremonyAutosave,
    brideCeremonyAutosave,
    quoteAutosave,
    giftingAutosave,
    primaryColorAutosave,
    accentColorAutosave,
    backgroundColorAutosave,
    textColorAutosave,
    fontFamilyAutosave,
    typographyAutosave,
    sectionOrderAutosave,
    backgroundMusicAutosave,
    metaTitleAutosave,
    metaDescriptionAutosave,
    ogImageAutosave,
  ];
  const overallStatus = worstSaveStatus(allAutosaves.map((a) => a.status));

  // Bỏ qua lần render đầu (giá trị khởi tạo từ server) — chỉ autosave khi
  // người dùng thực sự thay đổi gì đó.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    slugAutosave.save(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  useEffect(() => {
    if (isFirstRender.current) return;
    groomNameAutosave.save(groomName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groomName]);
  useEffect(() => {
    if (isFirstRender.current) return;
    brideNameAutosave.save(brideName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brideName]);
  useEffect(() => {
    if (isFirstRender.current) return;
    groomParentsAutosave.save({ father: groomFather, mother: groomMother });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groomFather, groomMother]);
  useEffect(() => {
    if (isFirstRender.current) return;
    brideParentsAutosave.save({ father: brideFather, mother: brideMother });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brideFather, brideMother]);
  useEffect(() => {
    if (isFirstRender.current) return;
    groomCeremonyAutosave.save({
      date: gcDate,
      lunarDate: gcLunarDate,
      ceremonyTime: gcCeremonyTime,
      receptionTime: gcReceptionTime,
      venue: gcVenue,
      address: gcAddress,
      googleMapsUrl: gcMapsUrl,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gcDate, gcLunarDate, gcCeremonyTime, gcReceptionTime, gcVenue, gcAddress, gcMapsUrl]);
  useEffect(() => {
    if (isFirstRender.current) return;
    brideCeremonyAutosave.save({
      date: bcDate,
      lunarDate: bcLunarDate,
      ceremonyTime: bcCeremonyTime,
      receptionTime: bcReceptionTime,
      venue: bcVenue,
      address: bcAddress,
      googleMapsUrl: bcMapsUrl,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bcDate, bcLunarDate, bcCeremonyTime, bcReceptionTime, bcVenue, bcAddress, bcMapsUrl]);
  useEffect(() => {
    if (isFirstRender.current) return;
    quoteAutosave.save(quote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote]);
  useEffect(() => {
    if (isFirstRender.current) return;
    giftingAutosave.save(gifting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gifting]);
  useEffect(() => {
    if (isFirstRender.current) return;
    primaryColorAutosave.save(primaryColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryColor]);
  useEffect(() => {
    if (isFirstRender.current) return;
    accentColorAutosave.save(accentColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accentColor]);
  useEffect(() => {
    if (isFirstRender.current) return;
    backgroundColorAutosave.save(backgroundColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundColor]);
  useEffect(() => {
    if (isFirstRender.current) return;
    textColorAutosave.save(textColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textColor]);
  useEffect(() => {
    if (isFirstRender.current) return;
    fontFamilyAutosave.save(fontFamily);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontFamily]);
  useEffect(() => {
    if (isFirstRender.current) return;
    typographyAutosave.save(typography);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typography]);
  useEffect(() => {
    if (isFirstRender.current) return;
    sectionOrderAutosave.save(sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);
  useEffect(() => {
    if (isFirstRender.current) return;
    backgroundMusicAutosave.save(backgroundMusic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundMusic]);
  useEffect(() => {
    if (isFirstRender.current) return;
    metaTitleAutosave.save(metaTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaTitle]);
  useEffect(() => {
    if (isFirstRender.current) return;
    metaDescriptionAutosave.save(metaDescription);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaDescription]);
  useEffect(() => {
    if (isFirstRender.current) return;
    ogImageAutosave.save(ogImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ogImage]);

  // isFirstRender chỉ nên tắt SAU khi tất cả effect ở trên đã chạy 1 lượt —
  // dùng 1 effect riêng chạy cuối cùng (thứ tự effect theo thứ tự khai báo).
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Cảnh báo rời trang nếu còn autosave chưa lưu xong (debounce chưa bắn
  // hoặc request đang bay, hoặc lần gửi gần nhất lỗi).
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      const pending = allAutosaves.some((a) => a.hasPending || a.status === "saving" || a.status === "error");
      if (pending) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overallStatus]);

  function handleSlotClick(slotKey: string) {
    setHighlightSlot(slotKey);
    const textField = textFieldForSlotKey(slotKey, templateConfig?.textSlots || []);
    if (textField) {
      setPendingFocusField(textField);
    }
  }

  useEffect(() => {
    if (!pendingFocusField) return;
    const el = inputRefs.current[pendingFocusField];
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setPendingFocusField(null);
  }, [pendingFocusField]);

  // Map field -> setter, dùng chung cho input sidebar (đã gọi thẳng setter
  // qua onChange) và cho FIELD_CHANGE gửi lên từ popover trên preview.
  const textFieldSetters: Record<WeddingTextField, (v: string) => void> = useMemo(
    () => ({
      groomName: setGroomName,
      brideName: setBrideName,
      "groomParents.father": setGroomFather,
      "groomParents.mother": setGroomMother,
      "brideParents.father": setBrideFather,
      "brideParents.mother": setBrideMother,
      "groomCeremony.date": setGcDate,
      "groomCeremony.lunarDate": setGcLunarDate,
      "groomCeremony.venue": setGcVenue,
      "groomCeremony.address": setGcAddress,
      "brideCeremony.date": setBcDate,
      "brideCeremony.lunarDate": setBcLunarDate,
      "brideCeremony.venue": setBcVenue,
      "brideCeremony.address": setBcAddress,
      quote: setQuote,
    }),
    []
  );

  function handleFieldChange(field: WeddingTextField, value: string) {
    textFieldSetters[field]?.(value);
  }

  function renderImageField(slotKey: string) {
    const slot = templateConfig?.imageSlots.find((s) => s.key === slotKey);
    if (!slot) return null;
    const galleryIndex = galleryIndexForSlotKey(slotKey, templateSlug);
    if (galleryIndex === null) return null;
    return (
      <StructureImageField
        key={slot.key}
        weddingId={wedding.id}
        slotKey={slot.key}
        label={slot.label}
        hint={slot.hint}
        url={gallery[galleryIndex]?.trim() || ""}
        active={highlightSlot === slot.key}
        onSelect={() => setHighlightSlot(slot.key)}
        onUploaded={setGallery}
      />
    );
  }

  const weddingDraft: WeddingData = useMemo(
    () => ({
      id: wedding.id,
      slug,
      typography,
      groomName,
      brideName,
      groomParents: { father: groomFather, mother: groomMother },
      brideParents: { father: brideFather, mother: brideMother },
      groomCeremony: {
        date: gcDate,
        lunarDate: gcLunarDate,
        ceremonyTime: gcCeremonyTime,
        receptionTime: gcReceptionTime,
        venue: gcVenue,
        address: gcAddress,
        googleMapsUrl: gcMapsUrl,
      },
      brideCeremony: {
        date: bcDate,
        lunarDate: bcLunarDate,
        ceremonyTime: bcCeremonyTime,
        receptionTime: bcReceptionTime,
        venue: bcVenue,
        address: bcAddress,
        googleMapsUrl: bcMapsUrl,
      },
      quote: quote || undefined,
      gallery,
      // Form cho phép nhập dở nên các trường là optional; preview chỉ hiện khi
      // đã có số tài khoản, phần thiếu để rỗng thay vì chặn cả khối.
      gifting: (cleanGifting(gifting) ?? undefined) as WeddingData["gifting"],
      primaryColor,
      accentColor,
      backgroundColor: backgroundColor || undefined,
      textColor: textColor || undefined,
      fontFamily: fontFamily || undefined,
      sectionOrder: sections.length > 0 ? sections : undefined,
      backgroundMusic: backgroundMusic.trim() || undefined,
      status: (wedding.status || "DRAFT") as WeddingData["status"],
    }),
    [
      wedding.id,
      wedding.status,
      slug,
      groomName,
      brideName,
      groomFather,
      groomMother,
      brideFather,
      brideMother,
      gcDate,
      gcLunarDate,
      gcCeremonyTime,
      gcReceptionTime,
      gcVenue,
      gcAddress,
      gcMapsUrl,
      bcDate,
      bcLunarDate,
      bcCeremonyTime,
      bcReceptionTime,
      bcVenue,
      bcAddress,
      bcMapsUrl,
      quote,
      gallery,
      gifting,
      primaryColor,
      accentColor,
      backgroundColor,
      textColor,
      fontFamily,
      typography,
      sections,
      backgroundMusic,
    ]
  );

  // Removed moveSection since dnd-kit handles sorting

  function applySampleData() {
    setGroomName("Thanh Tùng");
    setBrideName("Hương Giang");

    setGroomFather("Ông Nguyễn Văn Minh");
    setGroomMother("Bà Trần Thị Lan");
    setBrideFather("Ông Lê Văn Hòa");
    setBrideMother("Bà Phạm Thị Hạnh");

    setGcDate("Chủ nhật, 22/11/2026");
    setGcLunarDate("13 tháng 10 năm Bính Ngọ");
    setGcCeremonyTime("10:30");
    setGcReceptionTime("11:30");
    setGcVenue("Trung Tâm Hội Nghị Ánh Dương");
    setGcAddress("120 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh");
    setGcMapsUrl("https://maps.google.com/?q=10.7308,106.7218");

    setBcDate("Thứ bảy, 21/11/2026");
    setBcLunarDate("12 tháng 10 năm Bính Ngọ");
    setBcCeremonyTime("08:00");
    setBcReceptionTime("10:30");
    setBcVenue("Tư Gia Nhà Gái");
    setBcAddress("25 Lê Lợi, TP. Biên Hòa, Đồng Nai");
    setBcMapsUrl("https://maps.google.com/?q=10.9509,106.8241");

    setQuote("Cảm ơn bạn đã đến và chứng kiến khoảnh khắc hạnh phúc của Thanh Tùng & Hương Giang.");

    if (!slug.trim()) {
      setSlug("thanh-tung-huong-giang");
    }

    toast({
      title: "Đã điền dữ liệu mẫu",
      description: "Đã nạp nhanh mẫu Thanh Tùng & Hương Giang để bạn test.",
    });
  }


  return (
    <div className="flex h-[calc(100vh-4rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-8 overflow-hidden bg-gray-100 font-sans">
      {/* Left Sidebar: Section Manager */}
      <div className="w-72 bg-white border-r flex flex-col flex-shrink-0 z-20 shadow-sm hidden lg:flex">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between shrink-0">
          <h3 className="font-semibold text-gray-800">Cấu trúc thiệp</h3>
          <Button size="sm" variant="outline" onClick={applySampleData}>
            <Sparkles className="w-3 h-3 mr-1" /> Mẫu
          </Button>
        </div>
        <div className="px-4 py-2 border-b bg-white flex items-center justify-end min-h-[2.25rem] shrink-0">
          <SaveStatusIndicator status={overallStatus} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div 
            className={`p-3 rounded-lg border cursor-pointer transition-all ${highlightSlot === 'global' ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-200' : 'bg-white hover:bg-gray-50 border-gray-200'}`}
            onClick={() => setHighlightSlot('global')}
          >
            <div className={`font-medium text-sm ${highlightSlot === 'global' ? 'text-rose-700' : 'text-gray-800'}`}>Cài đặt chung</div>
            <div className="text-xs text-gray-500 mt-1">Đường dẫn, Màu sắc, Font, Nhạc</div>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
              Các khối hiển thị
            </div>
            <SortableSectionList
              items={sections}
              onChange={setSections}
              activeSection={highlightSlot}
              onSelect={setHighlightSlot}
              unsupported={unsupportedSections}
            />
          </div>
        </div>

        <PublishPriceBar
          weddingId={wedding.id}
          status={wedding.status || "DRAFT"}
          templatePrice={template.price}
          templateSalePrice={template.salePrice}
          templateSaleEndsAt={template.saleEndsAt}
          onContactClick={() => setContactOpen(true)}
        />

        <div className="p-4 border-t bg-gray-50 flex items-center gap-3 shrink-0">
          <Link href={`/dashboard/weddings/${wedding.id}`} className="flex-1">
            <Button variant="outline" className="w-full">Xong</Button>
          </Link>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="flex-1 overflow-hidden bg-neutral-100 relative z-0 flex flex-col order-3">
        <EditWeddingPreviewPanel
          templateSlug={templateSlug}
          weddingDraft={weddingDraft}
          highlightSlot={highlightSlot}
          onSlotClick={handleSlotClick}
          onFieldChange={handleFieldChange}
          onGalleryChange={setGallery}
        />
        {/* Mobile bottom actions */}
        <div className="lg:hidden p-4 border-t bg-white flex items-center gap-3 z-10 shrink-0">
          <Link href={`/dashboard/weddings/${wedding.id}`} className="flex-1">
            <Button variant="outline" className="w-full">Quay lại</Button>
          </Link>
          <SaveStatusIndicator status={overallStatus} className="shrink-0" />
        </div>
      </div>

      {/* Middle: Editor */}
      <div className="w-80 bg-white border-r flex flex-col flex-shrink-0 z-20 shadow-xl hidden lg:flex order-2">
        <div className="p-4 border-b bg-gray-50 shrink-0">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            {highlightSlot === 'global' ? 'Cài đặt chung' : getSectionDef(highlightSlot).label}
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {highlightSlot === 'global' && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Đường dẫn (/w/...)</label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} className="mt-1" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Màu sắc</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-500 w-20">Màu chính</span>
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 h-8 text-xs" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-500 w-20">Màu phụ</span>
                  <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="flex-1 h-8 text-xs" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-500 w-20">Màu nền</span>
                  <Input value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="flex-1 h-8 text-xs" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-500 w-20">Màu chữ</span>
                  <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1 h-8 text-xs" />
                </div>
              </div>

              <div className="pt-2">
                <label className="text-xs font-medium text-gray-700">Bảng màu gợi ý</label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      title={preset.label}
                      onClick={() => {
                        setPrimaryColor(preset.primary);
                        setAccentColor(preset.accent);
                        setBackgroundColor(preset.background);
                        setTextColor(preset.textColor);
                      }}
                      className="h-8 rounded border border-gray-200 overflow-hidden flex hover:ring-2 hover:ring-rose-300 transition-all"
                    >
                      <span className="flex-1" style={{ backgroundColor: preset.primary }} />
                      <span className="flex-1" style={{ backgroundColor: preset.accent }} />
                      <span className="flex-1" style={{ backgroundColor: preset.background }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Kiểu chữ (Typography)</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Font Tiêu đề (Heading)</label>
                    <select
                      value={typography.heading || ""}
                      onChange={(e) => setTypography({ ...typography, heading: e.target.value })}
                      className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Mặc định của template</option>
                      {HEADING_FONTS.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Font Nội dung (Body)</label>
                    <select
                      value={typography.body || ""}
                      onChange={(e) => setTypography({ ...typography, body: e.target.value })}
                      className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Mặc định của template</option>
                      {BODY_FONTS.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Font Nghệ thuật (Script)</label>
                    <select
                      value={typography.script || ""}
                      onChange={(e) => setTypography({ ...typography, script: e.target.value })}
                      className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Mặc định của template</option>
                      {SCRIPT_FONTS.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                    <p className="text-[10px] text-gray-500 mt-1">Dùng cho chữ Save the date, Quotes...</p>
                  </div>
                </div>
              </div>
              <div>
                 <label className="text-sm font-medium text-gray-700">Nhạc nền (URL MP3)</label>
                 <Input value={backgroundMusic} onChange={(e) => setBackgroundMusic(e.target.value)} className="mt-1 text-sm" placeholder="https://..." />
              </div>

              {/* Quyết định thiệp trông thế nào khi chia sẻ lên Zalo/Facebook.
                  Trước đây 3 trường này có trong DB và đã được đọc ở
                  generateMetadata nhưng không có chỗ nhập, nên link chia sẻ
                  luôn thiếu ảnh preview. */}
              <div className="pt-4 border-t space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Chia sẻ & SEO</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Hiển thị khi bạn gửi link thiệp qua Zalo, Facebook, Messenger.
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tiêu đề khi chia sẻ</label>
                  <Input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="mt-1 text-sm"
                    placeholder={`Thiệp cưới ${groomName || "Chú rể"} & ${brideName || "Cô dâu"}`}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Mô tả ngắn</label>
                  <Textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={2}
                    className="mt-1 text-sm"
                    placeholder="Trân trọng kính mời bạn đến chung vui cùng chúng tôi..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Ảnh preview</label>
                  <Input
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="mt-1 text-sm"
                    placeholder="Dán URL ảnh, hoặc để trống dùng ảnh bìa"
                  />
                  {/* Gợi ý dùng lại ảnh bìa đã upload thay vì bắt tự dán URL */}
                  {!ogImage && gallery[0]?.trim() && (
                    <button
                      type="button"
                      onClick={() => setOgImage(gallery[0].trim())}
                      className="text-[11px] text-rose-600 hover:underline mt-1.5"
                    >
                      Dùng ảnh bìa làm ảnh preview
                    </button>
                  )}
                  {ogImage?.trim() && (
                    <img
                      src={ogImage}
                      alt="Xem trước ảnh chia sẻ"
                      className="mt-2 w-full h-32 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {(highlightSlot === 'wedding-info' || highlightSlot === 'info' || highlightSlot === 'header' || highlightSlot === 'hero') && (
            <div className="space-y-6">
              {renderImageField("cb-hero")}
              {renderImageField("mc-hero")}

              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-semibold text-rose-700 text-sm">Chú rể</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên chú rể *</label>
                  <Input
                    ref={(el) => { inputRefs.current.groomName = el; }}
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-groom-name")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-semibold text-rose-700 text-sm">Cô dâu</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên cô dâu *</label>
                  <Input
                    ref={(el) => { inputRefs.current.brideName = el; }}
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-bride-name")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {renderImageField("cb-wedding-a")}
                {renderImageField("cb-wedding-b")}
              </div>

              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-semibold text-rose-700 text-sm">Cha mẹ chú rể</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Cha</label>
                  <Input
                    ref={(el) => { inputRefs.current["groomParents.father"] = el; }}
                    value={groomFather}
                    onChange={(e) => setGroomFather(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-groom-father")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Mẹ</label>
                  <Input
                    ref={(el) => { inputRefs.current["groomParents.mother"] = el; }}
                    value={groomMother}
                    onChange={(e) => setGroomMother(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-groom-mother")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-rose-700 text-sm">Cha mẹ cô dâu</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Cha</label>
                  <Input
                    ref={(el) => { inputRefs.current["brideParents.father"] = el; }}
                    value={brideFather}
                    onChange={(e) => setBrideFather(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-bride-father")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Mẹ</label>
                  <Input
                    ref={(el) => { inputRefs.current["brideParents.mother"] = el; }}
                    value={brideMother}
                    onChange={(e) => setBrideMother(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-bride-mother")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {(highlightSlot === 'location' || highlightSlot === 'invitation') && (
            <div className="space-y-6">
              {renderImageField("mc-invitation")}
              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-semibold text-rose-700 text-sm">Nhà Trai (Lễ Tân Hôn)</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Ngày cưới</label>
                  <Input
                    ref={(el) => { inputRefs.current["groomCeremony.date"] = el; }}
                    value={gcDate}
                    onChange={(e) => setGcDate(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-groom-date")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Ngày âm lịch</label>
                  <Input
                    ref={(el) => { inputRefs.current["groomCeremony.lunarDate"] = el; }}
                    value={gcLunarDate}
                    onChange={(e) => setGcLunarDate(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-groom-lunar-date")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Giờ làm lễ</label>
                    <Input value={gcCeremonyTime} onChange={(e) => setGcCeremonyTime(e.target.value)} className="mt-1 h-8 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Giờ nhập tiệc</label>
                    <Input value={gcReceptionTime} onChange={(e) => setGcReceptionTime(e.target.value)} className="mt-1 h-8 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên địa điểm</label>
                  <Input
                    ref={(el) => { inputRefs.current["groomCeremony.venue"] = el; }}
                    value={gcVenue}
                    onChange={(e) => setGcVenue(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-groom-venue")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Địa chỉ</label>
                  <Input
                    ref={(el) => { inputRefs.current["groomCeremony.address"] = el; }}
                    value={gcAddress}
                    onChange={(e) => setGcAddress(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-groom-address")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Google Maps URL</label>
                  <Input value={gcMapsUrl} onChange={(e) => setGcMapsUrl(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-rose-700 text-sm">Nhà Gái (Lễ Vu Quy)</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Ngày cưới</label>
                  <Input
                    ref={(el) => { inputRefs.current["brideCeremony.date"] = el; }}
                    value={bcDate}
                    onChange={(e) => setBcDate(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-bride-date")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Ngày âm lịch</label>
                  <Input
                    ref={(el) => { inputRefs.current["brideCeremony.lunarDate"] = el; }}
                    value={bcLunarDate}
                    onChange={(e) => setBcLunarDate(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-bride-lunar-date")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Giờ làm lễ</label>
                    <Input value={bcCeremonyTime} onChange={(e) => setBcCeremonyTime(e.target.value)} className="mt-1 h-8 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Giờ nhập tiệc</label>
                    <Input value={bcReceptionTime} onChange={(e) => setBcReceptionTime(e.target.value)} className="mt-1 h-8 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên địa điểm</label>
                  <Input
                    ref={(el) => { inputRefs.current["brideCeremony.venue"] = el; }}
                    value={bcVenue}
                    onChange={(e) => setBcVenue(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-bride-venue")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Địa chỉ</label>
                  <Input
                    ref={(el) => { inputRefs.current["brideCeremony.address"] = el; }}
                    value={bcAddress}
                    onChange={(e) => setBcAddress(e.target.value)}
                    onFocus={() => setHighlightSlot("cb-bride-address")}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Google Maps URL</label>
                  <Input value={bcMapsUrl} onChange={(e) => setBcMapsUrl(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
              </div>
            </div>
          )}

          {(highlightSlot === 'gallery' || highlightSlot === 'journey' || highlightSlot === 'mousetrail' || highlightSlot === 'carousel' || highlightSlot === 'story') && (
            <div className="-mx-4 -my-4">
              <EditWeddingMediaSection
                weddingId={wedding.id}
                gallery={gallery}
                onGalleryChange={setGallery}
                highlightSlot={highlightSlot}
                onHighlightSlot={(key) => setHighlightSlot(key || 'gallery')}
                backgroundMusic={backgroundMusic}
                onBackgroundMusicChange={setBackgroundMusic}
                albumStartIndex={templateConfig?.albumStartIndex || 0}
                // Không giới hạn ảnh khi thiệp ĐÃ xuất bản — đang soạn thảo
                // (DRAFT) thì áp giới hạn nhẹ, khớp với chặn phía server.
                isPublished={wedding.status === "PUBLISHED"}
              />
            </div>
          )}

          {(highlightSlot === 'quote') && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {renderImageField("cb-quote-a")}
                {renderImageField("cb-quote-b")}
              </div>
              <label className="text-sm font-medium text-gray-700">Lời mời / Câu trích dẫn</label>
              <Textarea
                ref={(el) => { inputRefs.current.quote = el; }}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                onFocus={() => setHighlightSlot("cb-quote")}
                rows={6}
                className="mt-1 text-sm"
              />
            </div>
          )}

          {(highlightSlot === 'countdown') && (
            <div className="space-y-4">
              {renderImageField("cb-countdown")}
              <p className="text-sm text-gray-500 text-center py-4">
                Khối đếm ngược hiển thị tự động dựa trên ngày cưới đã nhập.
              </p>
            </div>
          )}

          {highlightSlot === 'gifting' && (
            <div className="space-y-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                Nhập tài khoản để khách gửi mừng cưới. Mã QR sẽ tự sinh theo
                chuẩn VietQR — khách quét bằng app ngân hàng là tự điền sẵn
                số tài khoản. Để trống bên nào thì bên đó không hiển thị.
              </p>

              {(["groom", "bride"] as const).map((side) => (
                <div key={side} className="space-y-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {side === "groom" ? "Nhà trai" : "Nhà gái"}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Ngân hàng</label>
                    <Input
                      value={gifting[side]?.bankName || ""}
                      onChange={(e) => updateGifting(side, "bankName", e.target.value)}
                      placeholder="VD: Vietcombank, MB Bank, Techcombank"
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Số tài khoản</label>
                    <Input
                      value={gifting[side]?.accountNumber || ""}
                      onChange={(e) => updateGifting(side, "accountNumber", e.target.value)}
                      placeholder="VD: 1234567890"
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Chủ tài khoản</label>
                    <Input
                      value={gifting[side]?.accountHolder || ""}
                      onChange={(e) => updateGifting(side, "accountHolder", e.target.value)}
                      placeholder="VD: NGUYEN VAN A"
                      className="mt-1 text-sm"
                    />
                  </div>
                  {/* Cảnh báo sớm nếu tên ngân hàng không nhận diện được, vì khi
                      đó QR sẽ không sinh ra và khách phải nhập tay. */}
                  {gifting[side]?.bankName?.trim() &&
                    !resolveBankBin(gifting[side]!.bankName) && (
                      <p className="text-[11px] text-amber-600">
                        Chưa nhận diện được ngân hàng này nên sẽ không tạo được mã
                        QR. Bạn thử nhập tên phổ biến hơn (VD: Vietcombank, BIDV).
                      </p>
                    )}
                </div>
              ))}
            </div>
          )}

          {highlightSlot === 'rsvp' && (
            <div className="space-y-4">
              {renderImageField("mc-rsvp")}
              <p className="text-sm text-gray-500 text-center py-4">
                Khối này hiển thị tự động và không cần cấu hình thêm nội dung.
              </p>
            </div>
          )}

          {['wishes', 'footer'].includes(highlightSlot) && (
            <div className="text-sm text-gray-500 text-center py-8">
              Khối này hiển thị tự động và không cần cấu hình thêm nội dung.
            </div>
          )}
          
          {!['global', 'wedding-info', 'info', 'header', 'location', 'gallery', 'quote', 'wishes', 'countdown', 'footer', 'gifting', 'rsvp', 'timeline', 'card-opening', 'hero', 'story', 'journey', 'invitation', 'mousetrail', 'carousel'].includes(highlightSlot) && (
            <div className="text-sm text-gray-500 text-center py-8">
              Chọn khối khác để chỉnh sửa.
            </div>
          )}
        </div>
      </div>

      <ContactRequestDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        weddingId={wedding.id}
        templateSlug={templateSlug}
        enabledSections={sections.filter((s) => s.visible).map((s) => s.key)}
      />
    </div>
  );
}
