"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import type { WeddingData } from "@/lib/template-registry";
import { EditWeddingPreviewPanel } from "@/components/dashboard/edit-wedding/EditWeddingPreviewPanel";
import { EditWeddingMediaSection } from "@/components/dashboard/edit-wedding/EditWeddingMediaSection";
import { SortableSectionList } from "@/components/dashboard/edit-wedding/SortableSectionList";

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
    primaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
    sectionOrder?: string[];
    backgroundMusic?: string;
    status?: string;
    plan?: string;
  };
};

function normalizeGallery(g: unknown): string[] {
  const arr = Array.isArray(g) ? g.map((x) => String(x ?? "")) : [];
  while (arr.length < 6) arr.push("");
  return arr;
}

export function EditWeddingForm({ wedding, templateSlug }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [highlightSlot, setHighlightSlot] = useState<string>("global");

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
  const [fontFamily, setFontFamily] = useState(wedding.fontFamily || "");
  const DEFAULT_SECTION_ORDER = [
    "header",
    "wedding-info",
    "countdown",
    "quote",
    "gallery",
    "location",
    "wishes",
    "footer",
  ];
  const [sectionOrder, setSectionOrder] = useState<string[]>(
    Array.isArray(wedding.sectionOrder) && wedding.sectionOrder.length > 0
      ? wedding.sectionOrder
      : DEFAULT_SECTION_ORDER
  );
  const [backgroundMusic, setBackgroundMusic] = useState(wedding.backgroundMusic || "");
  const [gallery, setGallery] = useState<string[]>(() => normalizeGallery(wedding.gallery));

  const sectionLabels: Record<string, string> = {
    header: "Đầu trang (ảnh & tên)",
    "wedding-info": "Thông tin cặp đôi",
    countdown: "Đếm ngược",
    quote: "Lời mời",
    gallery: "Bộ ảnh",
    location: "Địa điểm",
    wishes: "Lời chúc",
    footer: "Chân trang",
    gifting: "Mừng cưới",
    rsvp: "Xác nhận tham dự",
  };

  const weddingDraft: WeddingData = useMemo(
    () => ({
      id: wedding.id,
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
      quote: quote || undefined,
      gallery,
      primaryColor,
      accentColor,
      backgroundColor: backgroundColor || undefined,
      fontFamily: fontFamily || undefined,
      sectionOrder: sectionOrder.length > 0 ? sectionOrder : undefined,
      backgroundMusic: backgroundMusic.trim() || undefined,
      status: (wedding.status || "DRAFT") as WeddingData["status"],
      plan: (wedding.plan || "FREE") as WeddingData["plan"],
    }),
    [
      wedding.id,
      wedding.status,
      wedding.plan,
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
      primaryColor,
      accentColor,
      backgroundColor,
      fontFamily,
      sectionOrder,
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

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/weddings/${wedding.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
          quote: quote || null,
          gallery,
          primaryColor,
          accentColor,
          backgroundColor: backgroundColor || null,
          fontFamily: fontFamily || null,
          sectionOrder: sectionOrder.length > 0 ? sectionOrder : null,
          backgroundMusic: backgroundMusic.trim() || null,
        }),
      });

      if (res.ok) {
        toast({ title: "Đã lưu thành công!" });
        router.push(`/dashboard/weddings/${wedding.id}`);
        router.refresh();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", description: "Đã xảy ra lỗi", variant: "destructive" });
    }
    setSaving(false);
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
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div 
            className={`p-3 rounded-lg border cursor-pointer transition-all ${highlightSlot === 'global' ? 'border-rose-500 bg-rose-50 ring-1 ring-rose-200' : 'bg-white hover:bg-gray-50 border-gray-200'}`}
            onClick={() => setHighlightSlot('global')}
          >
            <div className={`font-medium text-sm ${highlightSlot === 'global' ? 'text-rose-700' : 'text-gray-800'}`}>Cài đặt chung</div>
            <div className="text-xs text-gray-500 mt-1">Đường dẫn, Màu sắc, Font, Nhạc</div>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Các khối hiển thị</div>
            <SortableSectionList 
              items={sectionOrder} 
              onChange={setSectionOrder} 
              labels={sectionLabels}
              activeSection={highlightSlot}
              onSelect={setHighlightSlot}
            />
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex items-center gap-3 shrink-0">
          <Link href={`/dashboard/weddings/${wedding.id}`} className="flex-1">
            <Button variant="outline" className="w-full">Hủy</Button>
          </Link>
          <Button onClick={handleSave} disabled={saving || !groomName.trim() || !brideName.trim()} className="flex-1 bg-rose-600 hover:bg-rose-700">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
            {saving ? "Lưu..." : "Lưu"}
          </Button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="flex-1 overflow-hidden bg-neutral-100 relative z-0 flex flex-col order-3">
        <EditWeddingPreviewPanel
          templateSlug={templateSlug}
          weddingDraft={weddingDraft}
          highlightSlot={highlightSlot}
          onSlotClick={(key) => setHighlightSlot(key)}
        />
        {/* Mobile bottom actions */}
        <div className="lg:hidden p-4 border-t bg-white flex gap-3 z-10 shrink-0">
           <Link href={`/dashboard/weddings/${wedding.id}`} className="flex-1">
            <Button variant="outline" className="w-full">Quay lại</Button>
          </Link>
          <Button onClick={handleSave} disabled={saving} className="flex-1 bg-rose-600 hover:bg-rose-700">
             Lưu thay đổi
          </Button>
        </div>
      </div>

      {/* Middle: Editor */}
      <div className="w-80 bg-white border-r flex flex-col flex-shrink-0 z-20 shadow-xl hidden lg:flex order-2">
        <div className="p-4 border-b bg-gray-50 shrink-0">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            {highlightSlot === 'global' ? 'Cài đặt chung' : sectionLabels[highlightSlot] || 'Chỉnh sửa'}
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
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Font chữ</label>
                <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="">Mặc định (serif)</option>
                  <option value="Georgia, 'Times New Roman', serif">Georgia</option>
                  <option value="'Playfair Display', Georgia, serif">Playfair Display</option>
                  <option value="'Lora', Georgia, serif">Lora</option>
                  <option value="'Cormorant Garamond', Georgia, serif">Cormorant Garamond</option>
                  <option value="'Great Vibes', cursive">Great Vibes (chữ ký)</option>
                  <option value="'Dancing Script', cursive">Dancing Script</option>
                  <option value="system-ui, sans-serif">System (sans-serif)</option>
                </select>
              </div>
              <div>
                 <label className="text-sm font-medium text-gray-700">Nhạc nền (URL MP3)</label>
                 <Input value={backgroundMusic} onChange={(e) => setBackgroundMusic(e.target.value)} className="mt-1 text-sm" placeholder="https://..." />
              </div>
            </div>
          )}

          {(highlightSlot === 'wedding-info' || highlightSlot === 'header') && (
            <div className="space-y-6">
              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-semibold text-rose-700 text-sm">Chú rể</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên chú rể *</label>
                  <Input value={groomName} onChange={(e) => setGroomName(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Cha</label>
                  <Input value={groomFather} onChange={(e) => setGroomFather(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Mẹ</label>
                  <Input value={groomMother} onChange={(e) => setGroomMother(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-rose-700 text-sm">Cô dâu</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên cô dâu *</label>
                  <Input value={brideName} onChange={(e) => setBrideName(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Cha</label>
                  <Input value={brideFather} onChange={(e) => setBrideFather(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Tên Mẹ</label>
                  <Input value={brideMother} onChange={(e) => setBrideMother(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
              </div>
            </div>
          )}

          {highlightSlot === 'location' && (
            <div className="space-y-6">
              <div className="space-y-3 pb-4 border-b">
                <h4 className="font-semibold text-rose-700 text-sm">Nhà Trai (Lễ Tân Hôn)</h4>
                <div>
                  <label className="text-xs font-medium text-gray-700">Ngày cưới</label>
                  <Input value={gcDate} onChange={(e) => setGcDate(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Ngày âm lịch</label>
                  <Input value={gcLunarDate} onChange={(e) => setGcLunarDate(e.target.value)} className="mt-1 h-8 text-sm" />
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
                  <Input value={gcVenue} onChange={(e) => setGcVenue(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Địa chỉ</label>
                  <Input value={gcAddress} onChange={(e) => setGcAddress(e.target.value)} className="mt-1 h-8 text-sm" />
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
                  <Input value={bcDate} onChange={(e) => setBcDate(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Ngày âm lịch</label>
                  <Input value={bcLunarDate} onChange={(e) => setBcLunarDate(e.target.value)} className="mt-1 h-8 text-sm" />
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
                  <Input value={bcVenue} onChange={(e) => setBcVenue(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Địa chỉ</label>
                  <Input value={bcAddress} onChange={(e) => setBcAddress(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Google Maps URL</label>
                  <Input value={bcMapsUrl} onChange={(e) => setBcMapsUrl(e.target.value)} className="mt-1 h-8 text-sm" />
                </div>
              </div>
            </div>
          )}

          {highlightSlot === 'gallery' && (
            <div className="-mx-4 -my-4">
              <EditWeddingMediaSection
                weddingId={wedding.id}
                gallery={gallery}
                onGalleryChange={setGallery}
                highlightSlot={highlightSlot}
                onHighlightSlot={(key) => setHighlightSlot(key || 'gallery')}
                backgroundMusic={backgroundMusic}
                onBackgroundMusicChange={setBackgroundMusic}
              />
            </div>
          )}

          {highlightSlot === 'quote' && (
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">Lời mời / Câu trích dẫn</label>
              <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={6} className="mt-1 text-sm" />
            </div>
          )}

          {['wishes', 'countdown', 'footer', 'gifting', 'rsvp'].includes(highlightSlot) && (
            <div className="text-sm text-gray-500 text-center py-8">
              Khối này hiển thị tự động và không cần cấu hình thêm nội dung.
            </div>
          )}
          
          {!['global', 'wedding-info', 'header', 'location', 'gallery', 'quote', 'wishes', 'countdown', 'footer', 'gifting', 'rsvp'].includes(highlightSlot) && (
            <div className="text-sm text-gray-500 text-center py-8">
              Chọn khối khác để chỉnh sửa.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
