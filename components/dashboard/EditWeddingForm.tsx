"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
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
    backgroundMusic?: string;
  };
};

export function EditWeddingForm({ wedding }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Basic info
  const [slug, setSlug] = useState(wedding.slug);
  const [groomName, setGroomName] = useState(wedding.groomName);
  const [brideName, setBrideName] = useState(wedding.brideName);
  const [groomFather, setGroomFather] = useState(wedding.groomParents?.father || "");
  const [groomMother, setGroomMother] = useState(wedding.groomParents?.mother || "");
  const [brideFather, setBrideFather] = useState(wedding.brideParents?.father || "");
  const [brideMother, setBrideMother] = useState(wedding.brideParents?.mother || "");

  // Groom ceremony
  const [gcDate, setGcDate] = useState(wedding.groomCeremony?.date || "");
  const [gcLunarDate, setGcLunarDate] = useState(wedding.groomCeremony?.lunarDate || "");
  const [gcCeremonyTime, setGcCeremonyTime] = useState(wedding.groomCeremony?.ceremonyTime || "");
  const [gcReceptionTime, setGcReceptionTime] = useState(wedding.groomCeremony?.receptionTime || "");
  const [gcVenue, setGcVenue] = useState(wedding.groomCeremony?.venue || "");
  const [gcAddress, setGcAddress] = useState(wedding.groomCeremony?.address || "");
  const [gcMapsUrl, setGcMapsUrl] = useState(wedding.groomCeremony?.googleMapsUrl || "");

  // Bride ceremony
  const [bcDate, setBcDate] = useState(wedding.brideCeremony?.date || "");
  const [bcLunarDate, setBcLunarDate] = useState(wedding.brideCeremony?.lunarDate || "");
  const [bcCeremonyTime, setBcCeremonyTime] = useState(wedding.brideCeremony?.ceremonyTime || "");
  const [bcReceptionTime, setBcReceptionTime] = useState(wedding.brideCeremony?.receptionTime || "");
  const [bcVenue, setBcVenue] = useState(wedding.brideCeremony?.venue || "");
  const [bcAddress, setBcAddress] = useState(wedding.brideCeremony?.address || "");
  const [bcMapsUrl, setBcMapsUrl] = useState(wedding.brideCeremony?.googleMapsUrl || "");

  // Other
  const [quote, setQuote] = useState(wedding.quote || "");
  const [primaryColor, setPrimaryColor] = useState(wedding.primaryColor || "#800020");
  const [accentColor, setAccentColor] = useState(wedding.accentColor || "#d4a853");
  const [backgroundMusic, setBackgroundMusic] = useState(wedding.backgroundMusic || "");

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
          primaryColor,
          accentColor,
          backgroundMusic: backgroundMusic || null,
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
    <div className="max-w-3xl space-y-8">
      {/* Couple Info */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Thông tin cặp đôi</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-rose-700">Chú rể</h4>
            <div><label className="text-sm font-medium text-gray-700">Tên chú rể *</label><Input value={groomName} onChange={(e) => setGroomName(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium text-gray-700">Cha</label><Input value={groomFather} onChange={(e) => setGroomFather(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium text-gray-700">Mẹ</label><Input value={groomMother} onChange={(e) => setGroomMother(e.target.value)} className="mt-1" /></div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-rose-700">Cô dâu</h4>
            <div><label className="text-sm font-medium text-gray-700">Tên cô dâu *</label><Input value={brideName} onChange={(e) => setBrideName(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium text-gray-700">Cha</label><Input value={brideFather} onChange={(e) => setBrideFather(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium text-gray-700">Mẹ</label><Input value={brideMother} onChange={(e) => setBrideMother(e.target.value)} className="mt-1" /></div>
          </div>
        </CardContent>
      </Card>

      {/* Groom Ceremony */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Lễ Tân Hôn (Nhà trai)</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium text-gray-700">Ngày cưới</label><Input value={gcDate} onChange={(e) => setGcDate(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Ngày âm lịch</label><Input value={gcLunarDate} onChange={(e) => setGcLunarDate(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Giờ làm lễ</label><Input value={gcCeremonyTime} onChange={(e) => setGcCeremonyTime(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Giờ nhập tiệc</label><Input value={gcReceptionTime} onChange={(e) => setGcReceptionTime(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Tên địa điểm</label><Input value={gcVenue} onChange={(e) => setGcVenue(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Địa chỉ</label><Input value={gcAddress} onChange={(e) => setGcAddress(e.target.value)} className="mt-1" /></div>
          <div className="md:col-span-2"><label className="text-sm font-medium text-gray-700">Google Maps URL</label><Input value={gcMapsUrl} onChange={(e) => setGcMapsUrl(e.target.value)} className="mt-1" /></div>
        </CardContent>
      </Card>

      {/* Bride Ceremony */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Lễ Vu Quy (Nhà gái)</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium text-gray-700">Ngày cưới</label><Input value={bcDate} onChange={(e) => setBcDate(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Ngày âm lịch</label><Input value={bcLunarDate} onChange={(e) => setBcLunarDate(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Giờ làm lễ</label><Input value={bcCeremonyTime} onChange={(e) => setBcCeremonyTime(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Giờ nhập tiệc</label><Input value={bcReceptionTime} onChange={(e) => setBcReceptionTime(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Tên địa điểm</label><Input value={bcVenue} onChange={(e) => setBcVenue(e.target.value)} className="mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Địa chỉ</label><Input value={bcAddress} onChange={(e) => setBcAddress(e.target.value)} className="mt-1" /></div>
          <div className="md:col-span-2"><label className="text-sm font-medium text-gray-700">Google Maps URL</label><Input value={bcMapsUrl} onChange={(e) => setBcMapsUrl(e.target.value)} className="mt-1" /></div>
        </CardContent>
      </Card>

      {/* Quote & Colors */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Lời chúc & Tuỳ chỉnh</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Lời chúc mặc định</label>
            <Textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={3} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Màu chính</label>
              <div className="flex items-center gap-2 mt-1">
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded border cursor-pointer" />
                <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Màu phụ</label>
              <div className="flex items-center gap-2 mt-1">
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-10 h-10 rounded border cursor-pointer" />
                <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="flex-1" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Nhạc nền (URL)</label>
            <Input value={backgroundMusic} onChange={(e) => setBackgroundMusic(e.target.value)} placeholder="https://..." className="mt-1" />
          </div>
        </CardContent>
      </Card>

      {/* Slug */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Đường dẫn</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-0">
            <span className="bg-gray-100 border border-r-0 rounded-l-md px-3 py-2 text-sm text-gray-500 whitespace-nowrap">/w/</span>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              className="rounded-l-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pb-8">
        <Link href={`/dashboard/weddings/${wedding.id}`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Quay lại
          </Button>
        </Link>
        <Button onClick={handleSave} disabled={saving || !groomName.trim() || !brideName.trim()} className="bg-rose-600 hover:bg-rose-700">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Đang lưu..." : "Lưu Thay Đổi"}
        </Button>
      </div>
    </div>
  );
}
