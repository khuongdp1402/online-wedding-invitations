"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Palette,
  FileText,
  Eye,
  Link2,
} from "lucide-react";

type Template = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  isPremium: boolean;
  minPlan: string;
  config: unknown;
};

type WizardProps = {
  templates: Template[];
};

const STEPS = [
  { id: 1, label: "Chọn mẫu", icon: Palette },
  { id: 2, label: "Thông tin", icon: FileText },
  { id: 3, label: "Xem trước", icon: Eye },
  { id: 4, label: "Hoàn tất", icon: Link2 },
];

export function NewWeddingWizard({ templates }: WizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 1: Template
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

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

  // Step 4: Slug
  const [slug, setSlug] = useState("");

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  function generateSlug() {
    const remove = (s: string) =>
      s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();
    return `${remove(groomName)}-${remove(brideName)}`;
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
          gallery: [],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast({ title: "Tạo thiệp thành công!", description: "Thiệp cưới của bạn đã được tạo." });
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

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step === s.id
                  ? "bg-rose-600 text-white"
                  : step > s.id
                  ? "bg-rose-100 text-rose-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 mx-1 ${step > s.id ? "bg-rose-300" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Template Picker */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Chọn mẫu thiệp</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <Card
                key={t.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplateId === t.id
                    ? "ring-2 ring-rose-500 shadow-lg"
                    : "hover:ring-1 hover:ring-gray-200"
                }`}
                onClick={() => setSelectedTemplateId(t.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 mb-3 flex items-center justify-center overflow-hidden relative">
                    <div className="text-center p-4">
                      <div className="text-3xl mb-2" style={{ color: (t.config as { defaultColors?: { primary?: string } })?.defaultColors?.primary || "#800020" }}>
                        ♥
                      </div>
                      <p className="font-serif text-sm font-semibold" style={{ color: (t.config as { defaultColors?: { primary?: string } })?.defaultColors?.primary || "#800020" }}>
                        {t.name}
                      </p>
                    </div>
                    {selectedTemplateId === t.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {t.isPremium && (
                      <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-500 text-white text-[10px]">Premium</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">{t.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-[10px]">{t.category}</Badge>
                    {!t.isPremium && <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200">Miễn phí</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Wedding Info Form */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Couple Info */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Thông tin cặp đôi</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-rose-700">Chú rể</h4>
                <div><label className="text-sm font-medium text-gray-700">Tên chú rể *</label><Input value={groomName} onChange={(e) => setGroomName(e.target.value)} placeholder="Ví dụ: Thanh Tùng" className="mt-1" /></div>
                <div><label className="text-sm font-medium text-gray-700">Cha</label><Input value={groomFather} onChange={(e) => setGroomFather(e.target.value)} placeholder="Ví dụ: Ông Nguyễn Văn A" className="mt-1" /></div>
                <div><label className="text-sm font-medium text-gray-700">Mẹ</label><Input value={groomMother} onChange={(e) => setGroomMother(e.target.value)} placeholder="Ví dụ: Bà Trần Thị B" className="mt-1" /></div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-rose-700">Cô dâu</h4>
                <div><label className="text-sm font-medium text-gray-700">Tên cô dâu *</label><Input value={brideName} onChange={(e) => setBrideName(e.target.value)} placeholder="Ví dụ: Hương Giang" className="mt-1" /></div>
                <div><label className="text-sm font-medium text-gray-700">Cha</label><Input value={brideFather} onChange={(e) => setBrideFather(e.target.value)} placeholder="Ví dụ: Ông Lê Văn C" className="mt-1" /></div>
                <div><label className="text-sm font-medium text-gray-700">Mẹ</label><Input value={brideMother} onChange={(e) => setBrideMother(e.target.value)} placeholder="Ví dụ: Bà Phạm Thị D" className="mt-1" /></div>
              </div>
            </CardContent>
          </Card>

          {/* Groom Ceremony */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Lễ Tân Hôn (Nhà trai)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700">Ngày cưới</label><Input value={gcDate} onChange={(e) => setGcDate(e.target.value)} placeholder="Ví dụ: Thứ Sáu, 13/02/2026" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Ngày âm lịch</label><Input value={gcLunarDate} onChange={(e) => setGcLunarDate(e.target.value)} placeholder="Ví dụ: 26 tháng Chạp năm Ất Tỵ" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Giờ làm lễ</label><Input value={gcCeremonyTime} onChange={(e) => setGcCeremonyTime(e.target.value)} placeholder="11:00" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Giờ nhập tiệc</label><Input value={gcReceptionTime} onChange={(e) => setGcReceptionTime(e.target.value)} placeholder="12:30" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Tên địa điểm</label><Input value={gcVenue} onChange={(e) => setGcVenue(e.target.value)} placeholder="Tư Gia Nhà Trai" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Địa chỉ</label><Input value={gcAddress} onChange={(e) => setGcAddress(e.target.value)} placeholder="Địa chỉ đầy đủ" className="mt-1" /></div>
              <div className="md:col-span-2"><label className="text-sm font-medium text-gray-700">Google Maps URL</label><Input value={gcMapsUrl} onChange={(e) => setGcMapsUrl(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="mt-1" /></div>
            </CardContent>
          </Card>

          {/* Bride Ceremony */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Lễ Vu Quy (Nhà gái)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700">Ngày cưới</label><Input value={bcDate} onChange={(e) => setBcDate(e.target.value)} placeholder="Ví dụ: Thứ Năm, 12/02/2026" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Ngày âm lịch</label><Input value={bcLunarDate} onChange={(e) => setBcLunarDate(e.target.value)} placeholder="Ví dụ: 25 tháng Chạp năm Ất Tỵ" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Giờ làm lễ</label><Input value={bcCeremonyTime} onChange={(e) => setBcCeremonyTime(e.target.value)} placeholder="07:00" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Giờ nhập tiệc</label><Input value={bcReceptionTime} onChange={(e) => setBcReceptionTime(e.target.value)} placeholder="11:00" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Tên địa điểm</label><Input value={bcVenue} onChange={(e) => setBcVenue(e.target.value)} placeholder="Tư Gia Nhà Gái" className="mt-1" /></div>
              <div><label className="text-sm font-medium text-gray-700">Địa chỉ</label><Input value={bcAddress} onChange={(e) => setBcAddress(e.target.value)} placeholder="Địa chỉ đầy đủ" className="mt-1" /></div>
              <div className="md:col-span-2"><label className="text-sm font-medium text-gray-700">Google Maps URL</label><Input value={bcMapsUrl} onChange={(e) => setBcMapsUrl(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="mt-1" /></div>
            </CardContent>
          </Card>

          {/* Quote */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Lời chúc mặc định</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Lời chúc hiển thị trên thiệp..." rows={3} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader><CardTitle>Xem trước thông tin</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6 bg-rose-50 rounded-xl">
                <p className="text-sm text-rose-600 uppercase tracking-wider font-semibold mb-2">Thiệp cưới</p>
                <h2 className="text-3xl font-bold text-gray-900">{groomName} & {brideName}</h2>
                <p className="text-sm text-gray-500 mt-2">Mẫu: {selectedTemplate?.name}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-rose-700">Nhà trai</h4>
                  {groomFather && <p className="text-sm text-gray-600">{groomFather}</p>}
                  {groomMother && <p className="text-sm text-gray-600">{groomMother}</p>}
                  {gcDate && <p className="text-sm"><span className="text-gray-400">Ngày:</span> {gcDate}</p>}
                  {gcVenue && <p className="text-sm"><span className="text-gray-400">Tại:</span> {gcVenue}</p>}
                  {gcAddress && <p className="text-sm text-gray-500">{gcAddress}</p>}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-rose-700">Nhà gái</h4>
                  {brideFather && <p className="text-sm text-gray-600">{brideFather}</p>}
                  {brideMother && <p className="text-sm text-gray-600">{brideMother}</p>}
                  {bcDate && <p className="text-sm"><span className="text-gray-400">Ngày:</span> {bcDate}</p>}
                  {bcVenue && <p className="text-sm"><span className="text-gray-400">Tại:</span> {bcVenue}</p>}
                  {bcAddress && <p className="text-sm text-gray-500">{bcAddress}</p>}
                </div>
              </div>

              {quote && (
                <div className="text-center py-4 border-t">
                  <p className="italic text-gray-600">&ldquo;{quote}&rdquo;</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Slug & Save */}
      {step === 4 && (
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader><CardTitle>Chọn đường dẫn thiệp</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">URL thiệp cưới</label>
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
                  Chỉ sử dụng chữ thường, số và dấu gạch ngang. Ví dụ: thanhtung-huonggiang
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Lưu ý:</strong> Thiệp sẽ được tạo ở chế độ Nháp (DRAFT). Bạn có thể chỉnh sửa thêm thông tin, upload ảnh, và xem trước trước khi xuất bản.
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
            {saving ? "Đang tạo..." : "Tạo Thiệp Cưới"}
          </Button>
        )}
      </div>
    </div>
  );
}
