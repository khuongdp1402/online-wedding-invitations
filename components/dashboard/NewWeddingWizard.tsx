"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { resolveTemplatePrice } from "@/lib/template-pricing";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { TemplatePreviewModal } from "@/components/marketing/TemplatePreviewModal";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

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
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(() => {
    if (initialTemplateSlug) {
      const found = templates.find((t) => t.slug === initialTemplateSlug);
      if (found) return found.id;
    }
    return "";
  });
  const [previewModalTemplate, setPreviewModalTemplate] = useState<Template | null>(null);

  // Đồng bộ selectedTemplateId khi initialTemplateSlug thay đổi từ URL
  useEffect(() => {
    if (initialTemplateSlug) {
      const found = templates.find((t) => t.slug === initialTemplateSlug);
      if (found) {
        setSelectedTemplateId(found.id);
      }
    }
  }, [initialTemplateSlug, templates]);

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
          gallery: [
            "/templates/classic-burgundy/samples/01.jpg",
            "/templates/classic-burgundy/samples/02.jpg",
            "/templates/classic-burgundy/samples/03.jpg",
            "/templates/classic-burgundy/samples/04.jpg",
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast({ title: "Tạo thiệp thành công!", description: "Thiệp cưới của bạn đã được khởi tạo." });
        router.push(`/dashboard/weddings/${data.wedding.id}`);
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
    gallery: [
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
        {STEPS.map((s, i) => {
          const isCurrent = step === s.id;
          const isPassed = step > s.id;
          return (
            <div key={s.id} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (s.id === 1) {
                    setStep(1);
                  } else if (s.id === 2) {
                    if (!selectedTemplateId) {
                      toast({
                        title: "Vui lòng chọn mẫu thiệp",
                        description: "Nhấp chọn một mẫu thiệp bên dưới trước khi qua bước nhập thông tin.",
                      });
                      return;
                    }
                    setStep(2);
                  } else if (s.id === 3) {
                    if (!selectedTemplateId) {
                      toast({ title: "Chưa chọn mẫu thiệp", description: "Vui lòng chọn một mẫu thiệp trước." });
                      return;
                    }
                    if (!groomName.trim() || !brideName.trim()) {
                      toast({
                        title: "Chưa nhập thông tin cặp đôi",
                        description: "Vui lòng nhập tên Chú Rể và Cô Dâu trước khi xem trước.",
                      });
                      return;
                    }
                    setStep(3);
                  } else if (s.id === 4) {
                    if (!selectedTemplateId || !groomName.trim() || !brideName.trim()) {
                      toast({
                        title: "Chưa hoàn thành thông tin",
                        description: "Vui lòng hoàn thành chọn mẫu và thông tin cặp đôi trước.",
                      });
                      return;
                    }
                    if (!slug) setSlug(generateSlug());
                    setStep(4);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer",
                  isCurrent
                    ? "bg-[#8C1C24] text-white shadow-md"
                    : isPassed
                    ? "bg-[#F7DEDD] text-[#8C1C24] hover:bg-[#F2CECC]"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                )}
              >
                {isPassed ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-8 md:w-16 h-0.5 mx-1 transition-colors",
                    isPassed ? "bg-[#8C1C24]/30" : "bg-stone-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Template Picker */}
      {step === 1 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Chọn mẫu thiệp</h2>
              <p className="text-sm text-gray-500">
                Khám phá và chọn phong cách thiệp cưới mà bạn ưng ý nhất.
              </p>
            </div>
            {selectedTemplate && (
              <Button
                onClick={handleNext}
                className="bg-[#8C1C24] hover:bg-[#70161D] text-white text-xs sm:text-sm font-medium shadow-sm"
              >
                Tiếp tục: Nhập thông tin <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((t) => (
              <Card
                key={t.id}
                className={`cursor-pointer transition-all hover:shadow-lg relative overflow-hidden flex flex-col justify-between ${
                  selectedTemplateId === t.id
                    ? "ring-2 ring-[#8C1C24] shadow-lg border-[#8C1C24] bg-rose-50/10"
                    : "hover:ring-1 hover:ring-stone-300"
                }`}
                onClick={() => setSelectedTemplateId(t.id)}
                onDoubleClick={() => {
                  setSelectedTemplateId(t.id);
                  handleNext();
                }}
              >
                <CardContent className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 mb-3 flex items-center justify-center overflow-hidden relative group">
                      {t.thumbnail ? (
                        <img
                          src={t.thumbnail}
                          alt={t.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      {(() => {
                        const { isOnSale } = resolveTemplatePrice({
                          price: t.price,
                          salePrice: t.salePrice,
                          saleStartsAt: t.saleStartsAt ? new Date(t.saleStartsAt) : null,
                          saleEndsAt: t.saleEndsAt ? new Date(t.saleEndsAt) : null,
                        });
                        return isOnSale ? (
                          <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-500 text-white text-[10px]">
                            Khuyến mãi
                          </Badge>
                        ) : null;
                      })()}
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{t.name}</h3>
                      <Badge variant="outline" className="text-[10px]">
                        {t.category}
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
                          {effectivePrice.toLocaleString("vi-VN")}đ
                          {isOnSale && (
                            <span className="line-through text-gray-400 font-normal ml-1">
                              {t.price.toLocaleString("vi-VN")}đ
                            </span>
                          )}
                        </p>
                      );
                    })()}

                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-[#8C1C24] hover:text-[#70161D] hover:bg-rose-50 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewModalTemplate(t);
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" /> Xem thử
                      </Button>
                      {selectedTemplateId === t.id && (
                        <Button
                          type="button"
                          size="sm"
                          className="h-7 text-xs bg-[#8C1C24] hover:bg-[#70161D] text-white px-2.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                        >
                          Dùng mẫu này →
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Floating action bar for Step 1 when a template is selected */}
          {selectedTemplate && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Đã chọn: <strong className="text-amber-300 font-serif">{selectedTemplate.name}</strong></span>
              </div>
              <Button
                size="sm"
                onClick={handleNext}
                className="bg-[#8C1C24] hover:bg-[#A8222C] text-white rounded-full px-4 h-8 text-xs font-semibold shadow"
              >
                Tiếp tục: Nhập thông tin
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          )}

          {/* Modal xem thử nhanh */}
          {previewModalTemplate && (
            <TemplatePreviewModal
              templateSlug={previewModalTemplate.slug}
              templateName={previewModalTemplate.name}
              category={previewModalTemplate.category}
              onClose={() => setPreviewModalTemplate(null)}
              onSelectTemplate={(slug) => {
                const found = templates.find((t) => t.slug === slug);
                if (found) {
                  setSelectedTemplateId(found.id);
                  setStep(2);
                }
                setPreviewModalTemplate(null);
              }}
            />
          )}
        </div>
      )}

      {/* Step 2: Wedding Info Form */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto space-y-8">
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
              <div><label className="text-sm font-medium text-gray-700">Ngày cưới</label><Input value={gcDate} onChange={(e) => setGcDate(e.target.value)} placeholder="Ví dụ: Chủ nhật, 22/11/2026" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Ngày âm lịch</label><Input value={gcLunarDate} onChange={(e) => setGcLunarDate(e.target.value)} placeholder="Ví dụ: 13 tháng 10 năm Bính Ngọ" className="mt-1" /></div>
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
              <div><label className="text-sm font-medium text-gray-700">Ngày cưới</label><Input value={bcDate} onChange={(e) => setBcDate(e.target.value)} placeholder="Ví dụ: Thứ bảy, 21/11/2026" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Ngày âm lịch</label><Input value={bcLunarDate} onChange={(e) => setBcLunarDate(e.target.value)} placeholder="Ví dụ: 12 tháng 10 năm Bính Ngọ" className="mt-1" /></div>
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
                className={`transition-all duration-300 bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl relative ${
                  previewDevice === "mobile"
                    ? "w-full max-w-[420px] border-[6px] border-neutral-800 rounded-[32px] min-h-[700px] max-h-[78vh] overflow-y-auto"
                    : "w-full rounded-lg min-h-[700px] max-h-[78vh] overflow-y-auto"
                }`}
              >
                {selectedTemplate && (
                  <TemplateRenderer
                    templateSlug={selectedTemplate.slug}
                    wedding={previewWeddingData}
                    mode={previewMode}
                    isDemo={true}
                    guestName="Khách Quý"
                    guestSalutation="Bạn"
                  />
                )}
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

          {/* Floating action bar for Step 3 */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setStep(2)}
              className="text-stone-300 hover:text-white text-xs h-8 px-3 hover:bg-stone-800 rounded-full"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Quay lại
            </Button>
            <div className="w-[1px] h-4 bg-stone-700" />
            <Button
              type="button"
              size="sm"
              onClick={handleNext}
              className="bg-[#8C1C24] hover:bg-[#A8222C] text-white rounded-full px-4 h-8 text-xs font-semibold shadow"
            >
              Tiếp tục: Chọn đường dẫn thiệp
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
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
          <Button onClick={handleNext} disabled={!canGoNext()} className="bg-[#8C1C24] hover:bg-[#70161D] text-white">
            Tiếp theo <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={!canGoNext() || saving} className="bg-[#8C1C24] hover:bg-[#70161D] text-white">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
            {saving ? "Đang tạo thiệp..." : "Tạo Thiệp Cưới"}
          </Button>
        )}
      </div>
    </div>
  );
}
