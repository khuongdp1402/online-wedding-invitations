"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { resolveTemplatePrice } from "@/lib/template-pricing";
import { formatTemplatePrice } from "@/lib/format-price";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { TemplatePreviewModal } from "@/components/marketing/TemplatePreviewModal";
import { convertSolarToLunar } from "@/lib/lunar";
import { THIEPONLINE_BY_SLUG } from "@/lib/thieponline-catalog";
import type { WeddingData } from "@/types/template";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Palette,
  FileText,
  Eye,
  Link2,
  Sparkles,
  Smartphone,
  Monitor,
  Heart,
  Search,
  Flame,
} from "lucide-react";

const WIZARD_CATEGORIES: Record<string, string> = {
  all: "Tất cả",
  classic: "Cổ Điển",
  modern: "Hiện Đại",
  minimal: "Tối Giản",
  luxury: "Sang Trọng",
  vintage: "Vintage",
};

type Template = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  salePrice: number | null;
  saleStartsAt: string | null;
  saleEndsAt: string | null;
  config: unknown;
};

type WizardProps = {
  templates: Template[];
  initialTemplateSlug?: string;
};

const STEPS = [
  { id: 1, label: "Chọn mẫu", icon: Palette },
  { id: 2, label: "Thông tin", icon: FileText },
  { id: 3, label: "Xem trước thiệp", icon: Eye },
  { id: 4, label: "Đường dẫn", icon: Link2 },
];

export function NewWeddingWizard({ templates, initialTemplateSlug }: WizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const WIZARD_PAGE_SIZE = 12;
  const initialTemplateIndex = initialTemplateSlug
    ? templates.findIndex((t) => t.slug === initialTemplateSlug)
    : -1;
  const [step, setStep] = useState(() => (initialTemplateIndex >= 0 ? 2 : 1));
  const [saving, setSaving] = useState(false);

  // Step 1: Template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() =>
    initialTemplateIndex >= 0 ? templates[initialTemplateIndex].id : ""
  );
  const [previewModalTemplate, setPreviewModalTemplate] = useState<Template | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "hot" | "new">("all");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [templatePage, setTemplatePage] = useState<number>(() =>
    initialTemplateIndex >= 0
      ? Math.floor(initialTemplateIndex / WIZARD_PAGE_SIZE) + 1
      : 1
  );

  const enrichedTemplates = useMemo(() => {
    return templates.map((t) => {
      const thiep = THIEPONLINE_BY_SLUG[t.slug];
      const isBuiltIn = t.slug === "classic-elegance" || t.slug === "modern-cinematic";
      return {
        ...t,
        category: thiep?.category || t.category,
        tags:
          thiep?.tags ||
          (t.slug === "classic-elegance"
            ? ["Truyền thống", "Chữ Hỷ", "Sang trọng"]
            : t.slug === "modern-cinematic"
            ? ["Hiện đại", "Có ảnh", "Tối giản"]
            : []),
        isHot: thiep?.isHot ?? isBuiltIn,
        isNew: thiep?.isNew ?? false,
        trendingScore: thiep?.trendingScore ?? (isBuiltIn ? 20 : 0),
      };
    });
  }, [templates]);

  const filteredWizardTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = enrichedTemplates.filter((t) => {
      if (filterCategory !== "all" && t.category !== filterCategory) return false;
      if (filterStatus === "hot" && !t.isHot) return false;
      if (filterStatus === "new" && !t.isNew) return false;
      if (filterTag !== "all" && !t.tags.includes(filterTag)) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
    if (filterStatus === "hot") {
      return [...list].sort((a, b) => b.trendingScore - a.trendingScore);
    }
    return list;
  }, [enrichedTemplates, filterCategory, filterStatus, filterTag, searchQuery]);

  const topWizardTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of enrichedTemplates) {
      for (const tag of t.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [enrichedTemplates]);

  // Step 2: Wedding info
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [groomFather, setGroomFather] = useState("");
  const [groomMother, setGroomMother] = useState("");
  const [brideFather, setBrideFather] = useState("");
  const [brideMother, setBrideMother] = useState("");
  // Groom ceremony
  const [gcDate, setGcDate] = useState("");
  const [gcLunarDate, setGcLunarDate] = useState("");
  const [gcCeremonyTime, setGcCeremonyTime] = useState("");
  const [gcReceptionTime, setGcReceptionTime] = useState("");
  const [gcVenue, setGcVenue] = useState("");
  const [gcAddress, setGcAddress] = useState("");
  const [gcMapsUrl, setGcMapsUrl] = useState("");
  // Bride ceremony
  const [bcDate, setBcDate] = useState("");
  const [bcLunarDate, setBcLunarDate] = useState("");
  const [bcCeremonyTime, setBcCeremonyTime] = useState("");
  const [bcReceptionTime, setBcReceptionTime] = useState("");
  const [bcVenue, setBcVenue] = useState("");
  const [bcAddress, setBcAddress] = useState("");
  const [bcMapsUrl, setBcMapsUrl] = useState("");
  // Quote
  const [quote, setQuote] = useState("Hạnh phúc là có bạn bên cạnh trong ngày trọng đại.");

  // Step 3: Interactive preview controls
  const [previewMode, setPreviewMode] = useState<"groom" | "bride">("groom");
  // Mặc định xem như website thật (desktop) — có thể bật mobile để kiểm tra giao diện điện thoại.
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("desktop");
  const [previewTab, setPreviewTab] = useState<"live" | "summary">("live");
  const [skipIntroPreview, setSkipIntroPreview] = useState(true);

  // Step 4: Slug
  const [slug, setSlug] = useState("");

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  function generateSlug() {
    const remove = (s: string) =>
      s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    return `${remove(groomName)}-${remove(brideName)}`;
  }

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

  function canGoNext(): boolean {
    if (step === 1) return !!selectedTemplateId;
    if (step === 2) return !!(groomName.trim() && brideName.trim());
    if (step === 3) return true;
    if (step === 4) return !!slug.trim();
    return false;
  }

  function handleNext() {
    if (step === 2 && !slug) setSlug(generateSlug());
    if (step < 4) setStep(step + 1);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/weddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplateId,
          slug,
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
          quote,
          gallery:
            THIEPONLINE_BY_SLUG[selectedTemplate?.slug || ""]?.defaultImages?.slice(0, 8) || [
              "/templates/classic-burgundy/samples/01.jpg",
              "/templates/classic-burgundy/samples/02.jpg",
              "/templates/classic-burgundy/samples/03.jpg",
              "/templates/classic-burgundy/samples/04.jpg",
            ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast({
          title: "Tạo thiệp thành công!",
          description: "Đang mở trình chỉnh sửa chi tiết thiệp cưới của bạn...",
        });
        router.push(`/dashboard/weddings/${data.wedding.id}/edit`);
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error || "Không thể tạo thiệp", variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", description: "Đã xảy ra lỗi, vui lòng thử lại.", variant: "destructive" });
    }
    setSaving(false);
  }

  // Construct live preview wedding data
  const previewWeddingData: WeddingData = {
    id: "wizard-preview-wedding",
    slug: slug || "preview-slug",
    groomName: groomName || "Chú Rể",
    brideName: brideName || "Cô Dâu",
    groomParents: { father: groomFather, mother: groomMother },
    brideParents: { father: brideFather, mother: brideMother },
    groomCeremony: {
      date: gcDate || "Chủ nhật, 22/11/2026",
      lunarDate: gcLunarDate || "13 tháng 10 năm Bính Ngọ",
      ceremonyTime: gcCeremonyTime || "10:30",
      receptionTime: gcReceptionTime || "11:30",
      venue: gcVenue || "Trung Tâm Tiệc Cưới",
      address: gcAddress || "Địa chỉ tiệc cưới nhà trai",
      googleMapsUrl: gcMapsUrl,
    },
    brideCeremony: {
      date: bcDate || "Thứ bảy, 21/11/2026",
      lunarDate: bcLunarDate || "12 tháng 10 năm Bính Ngọ",
      ceremonyTime: bcCeremonyTime || "08:00",
      receptionTime: bcReceptionTime || "10:30",
      venue: bcVenue || "Tư Gia Nhà Gái",
      address: bcAddress || "Địa chỉ tiệc cưới nhà gái",
      googleMapsUrl: bcMapsUrl,
    },
    quote: quote || "Hạnh phúc là có bạn bên cạnh trong ngày trọng đại.",
    gallery:
      THIEPONLINE_BY_SLUG[selectedTemplate?.slug || ""]?.defaultImages?.slice(0, 8) || [
        "/templates/classic-burgundy/samples/01.jpg",
        "/templates/classic-burgundy/samples/02.jpg",
        "/templates/classic-burgundy/samples/03.jpg",
        "/templates/classic-burgundy/samples/04.jpg",
        "/templates/classic-burgundy/samples/01.jpg",
        "/templates/classic-burgundy/samples/02.jpg",
      ],
    gifting: {
      groom: {
        bankName: "MBBank",
        accountNumber: "0987654321",
        accountHolder: groomName ? groomName.toUpperCase() : "CHU RE",
      },
      bride: {
        bankName: "Techcombank",
        accountNumber: "1903456789",
        accountHolder: brideName ? brideName.toUpperCase() : "CO DAU",
      },
    },
    primaryColor: (selectedTemplate?.config as { defaultColors?: { primary?: string } })?.defaultColors?.primary || "#800020",
    accentColor: (selectedTemplate?.config as { defaultColors?: { accent?: string } })?.defaultColors?.accent || "#d4a853",
    backgroundColor: (selectedTemplate?.config as { defaultColors?: { background?: string } })?.defaultColors?.background || "#faf8f5",
    textColor: "#4A4A4A",
    status: "DEMO",
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              type="button"
              disabled={step < s.id}
              onClick={() => {
                if (s.id < step || canGoNext()) setStep(s.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step === s.id
                  ? "bg-rose-600 text-white shadow"
                  : step > s.id
                  ? "bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 mx-1 ${step > s.id ? "bg-rose-300" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Template Picker */}
      {step === 1 && (
        <div>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Chọn mẫu thiệp</h2>
                <p className="text-sm text-gray-500">
                  Khám phá {enrichedTemplates.length} mẫu thiệp và chọn phong cách mà bạn ưng ý nhất.
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setTemplatePage(1);
                  }}
                  placeholder="Tìm tên mẫu, mã hoặc tag..."
                  className="pl-9 rounded-full"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(WIZARD_CATEGORIES).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setFilterCategory(key);
                      setTemplatePage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      filterCategory === key
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-rose-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: "all" as const, label: "Tất cả" },
                  { key: "hot" as const, label: "🔥 Hot" },
                  { key: "new" as const, label: "✨ Mới" },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => {
                      setFilterStatus(st.key);
                      setTemplatePage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      filterStatus === st.key
                        ? "bg-amber-600 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-amber-300"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1 w-full pt-2 border-t border-gray-200/70">
                <span className="text-[11px] font-semibold text-gray-500 mr-1">Tag:</span>
                <button
                  type="button"
                  onClick={() => {
                    setFilterTag("all");
                    setTemplatePage(1);
                  }}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                    filterTag === "all"
                      ? "bg-stone-800 text-white"
                      : "bg-white border border-gray-200 text-gray-600"
                  }`}
                >
                  Tất cả
                </button>
                {topWizardTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setFilterTag(filterTag === tag ? "all" : tag);
                      setTemplatePage(1);
                    }}
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      filterTag === tag
                        ? "bg-rose-600 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-rose-300"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(() => {
            const totalPages = Math.max(
              1,
              Math.ceil(filteredWizardTemplates.length / WIZARD_PAGE_SIZE)
            );
            const safePage = Math.min(templatePage, totalPages);
            const paged = filteredWizardTemplates.slice(
              (safePage - 1) * WIZARD_PAGE_SIZE,
              safePage * WIZARD_PAGE_SIZE
            );

            return (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paged.map((t) => (
                    <Card
                      key={t.id}
                      className={`cursor-pointer transition-all hover:shadow-lg relative overflow-hidden flex flex-col justify-between ${
                        selectedTemplateId === t.id
                          ? "ring-2 ring-rose-500 shadow-lg border-rose-500"
                          : "hover:ring-1 hover:ring-gray-200"
                      }`}
                      onClick={() => setSelectedTemplateId(t.id)}
                    >
                      <CardContent className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 mb-3 flex items-center justify-center overflow-hidden relative group">
                            {t.thumbnail ? (
                              <img
                                src={t.thumbnail}
                                alt={t.name}
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <div
                                  className="text-3xl mb-2"
                                  style={{
                                    color:
                                      (t.config as { defaultColors?: { primary?: string } })?.defaultColors
                                        ?.primary || "#800020",
                                  }}
                                >
                                  ♥
                                </div>
                                <p
                                  className="font-serif text-sm font-semibold"
                                  style={{
                                    color:
                                      (t.config as { defaultColors?: { primary?: string } })?.defaultColors
                                        ?.primary || "#800020",
                                  }}
                                >
                                  {t.name}
                                </p>
                              </div>
                            )}
                            {selectedTemplateId === t.id && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                              {t.isHot && (
                                <Badge className="bg-rose-600 hover:bg-rose-600 text-white text-[10px] gap-0.5">
                                  <Flame className="w-2.5 h-2.5 fill-current" /> Hot
                                </Badge>
                              )}
                              {t.isNew && (
                                <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[10px]">
                                  Mới
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-1">
                            <h3 className="font-semibold text-gray-900 truncate">{t.name}</h3>
                            <Badge variant="outline" className="text-[10px] shrink-0">
                              {WIZARD_CATEGORIES[t.category] ?? t.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{t.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                          {(() => {
                            const { effectivePrice, isOnSale } = resolveTemplatePrice({
                              price: t.price,
                              salePrice: t.salePrice,
                              saleStartsAt: t.saleStartsAt ? new Date(t.saleStartsAt) : null,
                              saleEndsAt: t.saleEndsAt ? new Date(t.saleEndsAt) : null,
                            });
                            return (
                              <p className="text-xs text-gray-700 font-semibold">
                                {formatTemplatePrice(effectivePrice)}
                                {isOnSale && (
                                  <span className="line-through text-gray-400 font-normal ml-1">
                                    {t.price.toLocaleString("vi-VN")}đ
                                  </span>
                                )}
                              </p>
                            );
                          })()}

                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewModalTemplate(t);
                            }}
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" /> Xem thử
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <span className="text-xs text-gray-500">
                      Trang {safePage} / {totalPages} ({filteredWizardTemplates.length} mẫu)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={safePage <= 1}
                        onClick={() => setTemplatePage(safePage - 1)}
                      >
                        <ChevronLeft className="w-4 h-4" /> Trước
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={safePage >= totalPages}
                        onClick={() => setTemplatePage(safePage + 1)}
                      >
                        Sau <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* Modal xem thử nhanh */}
          {previewModalTemplate && (
            <TemplatePreviewModal
              templateSlug={previewModalTemplate.slug}
              templateName={previewModalTemplate.name}
              category={previewModalTemplate.category}
              onClose={() => setPreviewModalTemplate(null)}
            />
          )}
        </div>
      )}

      {/* Step 2: Wedding Info Form */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto space-y-8">
          {selectedTemplate && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-3">
                {selectedTemplate.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedTemplate.thumbnail}
                    alt={selectedTemplate.name}
                    className="h-14 w-11 rounded-lg object-cover border border-gray-200"
                  />
                )}
                <div>
                  <p className="text-xs font-medium text-gray-500">Mẫu thiệp đang chọn</p>
                  <p className="text-sm font-bold text-gray-900">{selectedTemplate.name}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep(1)}
                className="text-xs"
              >
                <Palette className="w-3.5 h-3.5 mr-1.5" /> Đổi mẫu khác
              </Button>
            </div>
          )}

          <div className="flex justify-between items-center bg-rose-50 border border-rose-100 rounded-xl p-4">
            <div>
              <p className="font-semibold text-rose-900 text-sm">Điền nhanh dữ liệu mẫu?</p>
              <p className="text-xs text-rose-700">Tự động nạp thông tin cặp đôi mẫu để bạn trải nghiệm ngay.</p>
            </div>
            <Button type="button" variant="secondary" onClick={applySampleData} className="bg-white hover:bg-rose-100 text-rose-800 border border-rose-200">
              <Sparkles className="w-4 h-4 mr-2 text-rose-500" /> Nạp mẫu Thanh Tùng & Hương Giang
            </Button>
          </div>

          {/* Couple Info */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Thông tin cặp đôi</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-rose-700">Chú rể</h4>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tên chú rể *</label>
                  <Input value={groomName} onChange={(e) => setGroomName(e.target.value)} placeholder="Ví dụ: Thanh Tùng" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cha chú rể</label>
                  <Input value={groomFather} onChange={(e) => setGroomFather(e.target.value)} placeholder="Ví dụ: Ông Nguyễn Văn Minh" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Mẹ chú rể</label>
                  <Input value={groomMother} onChange={(e) => setGroomMother(e.target.value)} placeholder="Ví dụ: Bà Trần Thị Lan" className="mt-1" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-rose-700">Cô dâu</h4>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tên cô dâu *</label>
                  <Input value={brideName} onChange={(e) => setBrideName(e.target.value)} placeholder="Ví dụ: Hương Giang" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cha cô dâu</label>
                  <Input value={brideFather} onChange={(e) => setBrideFather(e.target.value)} placeholder="Ví dụ: Ông Lê Văn Hòa" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Mẹ cô dâu</label>
                  <Input value={brideMother} onChange={(e) => setBrideMother(e.target.value)} placeholder="Ví dụ: Bà Phạm Thị Hạnh" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Groom Ceremony */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Lễ Tân Hôn (Nhà trai)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Ngày cưới</label>
                <Input
                  value={gcDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setGcDate(val);
                    const lunar = convertSolarToLunar(val);
                    if (lunar) setGcLunarDate(lunar.formattedString);
                  }}
                  placeholder="Ví dụ: 2026-11-22 hoặc 22/11/2026"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Ngày âm lịch (tự động tính)</label>
                <Input value={gcLunarDate} onChange={(e) => setGcLunarDate(e.target.value)} placeholder="Ví dụ: (Tức ngày 14 tháng 10 năm Bính Ngọ)" className="mt-1 bg-amber-50/50" />
              </div>
              <div><label className="text-sm font-medium text-gray-700">Giờ làm lễ</label><Input value={gcCeremonyTime} onChange={(e) => setGcCeremonyTime(e.target.value)} placeholder="10:30" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Giờ nhập tiệc</label><Input value={gcReceptionTime} onChange={(e) => setGcReceptionTime(e.target.value)} placeholder="11:30" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Tên địa điểm</label><Input value={gcVenue} onChange={(e) => setGcVenue(e.target.value)} placeholder="Trung Tâm Hội Nghị Ánh Dương" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Địa chỉ</label><Input value={gcAddress} onChange={(e) => setGcAddress(e.target.value)} placeholder="120 Nguyễn Văn Linh, Quận 7, TP. HCM" className="mt-1" /></div>
              <div className="md:col-span-2"><label className="text-sm font-medium text-gray-700">Google Maps URL</label><Input value={gcMapsUrl} onChange={(e) => setGcMapsUrl(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="mt-1" /></div>
            </CardContent>
          </Card>

          {/* Bride Ceremony */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Lễ Vu Quy (Nhà gái)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Ngày cưới</label>
                <Input
                  value={bcDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setBcDate(val);
                    const lunar = convertSolarToLunar(val);
                    if (lunar) setBcLunarDate(lunar.formattedString);
                  }}
                  placeholder="Ví dụ: 2026-11-21 hoặc 21/11/2026"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Ngày âm lịch (tự động tính)</label>
                <Input value={bcLunarDate} onChange={(e) => setBcLunarDate(e.target.value)} placeholder="Ví dụ: (Tức ngày 13 tháng 10 năm Bính Ngọ)" className="mt-1 bg-amber-50/50" />
              </div>
              <div><label className="text-sm font-medium text-gray-700">Giờ làm lễ</label><Input value={bcCeremonyTime} onChange={(e) => setBcCeremonyTime(e.target.value)} placeholder="08:00" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Giờ nhập tiệc</label><Input value={bcReceptionTime} onChange={(e) => setBcReceptionTime(e.target.value)} placeholder="10:30" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Tên địa điểm</label><Input value={bcVenue} onChange={(e) => setBcVenue(e.target.value)} placeholder="Tư Gia Nhà Gái" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Địa chỉ</label><Input value={bcAddress} onChange={(e) => setBcAddress(e.target.value)} placeholder="25 Lê Lợi, TP. Biên Hòa, Đồng Nai" className="mt-1" /></div>
              <div className="md:col-span-2"><label className="text-sm font-medium text-gray-700">Google Maps URL</label><Input value={bcMapsUrl} onChange={(e) => setBcMapsUrl(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="mt-1" /></div>
            </CardContent>
          </Card>

          {/* Quote */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Lời chúc mừng & Thông điệp</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Lời chúc hiển thị trên thiệp cưới..." rows={3} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Interactive Live Preview */}
      {step === 3 && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Xem trước thiệp cưới thực tế: {groomName} & {brideName}
              </h3>
              <p className="text-xs text-gray-500">
                Mẫu thiệp: <strong className="text-rose-600">{selectedTemplate?.name}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mode switch */}
              <div className="bg-gray-100 p-1 rounded-lg flex text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewMode("groom")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    previewMode === "groom" ? "bg-rose-600 text-white shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Nhà Trai (Tân Hôn)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("bride")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    previewMode === "bride" ? "bg-rose-600 text-white shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Nhà Gái (Vu Quy)
                </button>
              </div>

              {/* Envelope / Content switch */}
              <div className="bg-gray-100 p-1 rounded-lg flex text-xs">
                <button
                  type="button"
                  onClick={() => setSkipIntroPreview(true)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    skipIntroPreview ? "bg-rose-600 text-white shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Nội dung thiệp
                </button>
                <button
                  type="button"
                  onClick={() => setSkipIntroPreview(false)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    !skipIntroPreview ? "bg-rose-600 text-white shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Phong bì mở đầu
                </button>
              </div>

              {/* Device switch */}
              <div className="hidden sm:flex bg-gray-100 p-1 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 rounded-md transition-all ${
                    previewDevice === "mobile" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-900"
                  }`}
                  title="Xem dạng điện thoại"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 rounded-md transition-all ${
                    previewDevice === "desktop" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-900"
                  }`}
                  title="Xem dạng toàn màn hình"
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>

              {/* Tab switch */}
              <div className="bg-gray-100 p-1 rounded-lg flex text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewTab("live")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    previewTab === "live" ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Thiệp Mẫu
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab("summary")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                    previewTab === "summary" ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Tóm Tắt
                </button>
              </div>
            </div>
          </div>

          {previewTab === "live" ? (
            <div className="flex justify-center bg-neutral-900/90 rounded-2xl p-4 sm:p-8 min-h-[650px]">
              <div
                className={`transition-all duration-300 bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl relative [transform:translateZ(0)] ${
                  previewDevice === "mobile"
                    ? "w-full max-w-[420px] border-[6px] border-neutral-800 rounded-[32px] h-[75vh] min-h-[680px]"
                    : "w-full rounded-lg h-[75vh] min-h-[680px]"
                }`}
              >
                <div className="w-full h-full overflow-y-auto thieponline-embedded-preview">
                  {selectedTemplate && (
                    <TemplateRenderer
                      templateSlug={selectedTemplate.slug}
                      wedding={previewWeddingData}
                      mode={previewMode}
                      isDemo={true}
                      isPreview={skipIntroPreview}
                      guestName="Khách Quý"
                      guestSalutation="Bạn"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader><CardTitle>Bảng tóm tắt thông tin</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                    <h4 className="font-semibold text-rose-700">Nhà trai (Tân Hôn)</h4>
                    <p className="text-sm font-medium text-gray-900">Chú rể: {groomName}</p>
                    {groomFather && <p className="text-xs text-gray-600">Thân phụ: {groomFather}</p>}
                    {groomMother && <p className="text-xs text-gray-600">Thân mẫu: {groomMother}</p>}
                    {gcDate && <p className="text-xs text-gray-700 mt-2"><strong>Ngày:</strong> {gcDate}</p>}
                    {gcVenue && <p className="text-xs text-gray-700"><strong>Địa điểm:</strong> {gcVenue}</p>}
                    {gcAddress && <p className="text-xs text-gray-500">{gcAddress}</p>}
                  </div>
                  <div className="space-y-2 p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                    <h4 className="font-semibold text-rose-700">Nhà gái (Vu Quy)</h4>
                    <p className="text-sm font-medium text-gray-900">Cô dâu: {brideName}</p>
                    {brideFather && <p className="text-xs text-gray-600">Thân phụ: {brideFather}</p>}
                    {brideMother && <p className="text-xs text-gray-600">Thân mẫu: {brideMother}</p>}
                    {bcDate && <p className="text-xs text-gray-700 mt-2"><strong>Ngày:</strong> {bcDate}</p>}
                    {bcVenue && <p className="text-xs text-gray-700"><strong>Địa điểm:</strong> {bcVenue}</p>}
                    {bcAddress && <p className="text-xs text-gray-500">{bcAddress}</p>}
                  </div>
                </div>

                {quote && (
                  <div className="text-center py-4 border-t">
                    <p className="italic text-gray-600">&ldquo;{quote}&rdquo;</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 4: Slug & Save */}
      {step === 4 && (
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader><CardTitle>Chọn đường dẫn thiệp của bạn</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Đường dẫn thiệp cưới (URL slug)</label>
                <div className="flex items-center gap-0 mt-2">
                  <span className="bg-gray-100 border border-r-0 rounded-l-md px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                    thiepcuoi.online/w/
                  </span>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="rounded-l-none"
                    placeholder="thanhtung-huonggiang"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Chỉ sử dụng chữ thường không dấu, số và gạch ngang. Ví dụ: thanhtung-huonggiang
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Lưu ý:</strong> Thiệp sẽ được tạo ở trạng thái <strong>Nháp (DRAFT)</strong>. Sau khi tạo, bạn có thể chỉnh sửa tự do trong Bộ soạn thảo, tải ảnh cưới thực tế của bạn lên và xuất bản khi sẵn sàng.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10 max-w-3xl mx-auto">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Quay lại
        </Button>
        {step < 4 ? (
          <Button onClick={handleNext} disabled={!canGoNext()} className="bg-rose-600 hover:bg-rose-700">
            Tiếp theo <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={!canGoNext() || saving} className="bg-rose-600 hover:bg-rose-700">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
            {saving ? "Đang tạo thiệp..." : "Tạo Thiệp Cưới"}
          </Button>
        )}
      </div>
    </div>
  );
}
