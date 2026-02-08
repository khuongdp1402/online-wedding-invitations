"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Calendar } from "lucide-react";

type Ceremony = {
  date?: string;
  lunarDate?: string;
  ceremonyTime?: string;
  receptionTime?: string;
  venue?: string;
  address?: string;
  googleMapsUrl?: string;
};

type Props = {
  wedding: {
    groomName: string;
    brideName: string;
    groomParents: { father?: string; mother?: string };
    brideParents: { father?: string; mother?: string };
    groomCeremony: Ceremony;
    brideCeremony: Ceremony;
    quote?: string;
    gallery: string[];
    primaryColor?: string;
    accentColor?: string;
    slug: string;
  };
};

function CeremonyCard({ title, ceremony }: { title: string; ceremony: Ceremony }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {ceremony.date && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{ceremony.date}</span>
            {ceremony.lunarDate && <span className="text-gray-400">({ceremony.lunarDate})</span>}
          </div>
        )}
        {ceremony.ceremonyTime && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Lễ: {ceremony.ceremonyTime}</span>
            {ceremony.receptionTime && <span className="text-gray-400">| Tiệc: {ceremony.receptionTime}</span>}
          </div>
        )}
        {ceremony.venue && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{ceremony.venue}</span>
          </div>
        )}
        {ceremony.address && <p className="text-gray-500 pl-6">{ceremony.address}</p>}
        {!ceremony.date && !ceremony.venue && (
          <p className="text-gray-400 italic">Chưa nhập thông tin</p>
        )}
      </CardContent>
    </Card>
  );
}

export function WeddingInfoTab({ wedding }: Props) {
  return (
    <div className="space-y-6">
      {/* Couple info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-rose-700">Chú rể</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-semibold text-gray-900 text-base">{wedding.groomName}</p>
            {wedding.groomParents.father && <p className="text-gray-600">Cha: {wedding.groomParents.father}</p>}
            {wedding.groomParents.mother && <p className="text-gray-600">Mẹ: {wedding.groomParents.mother}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-rose-700">Cô dâu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p className="font-semibold text-gray-900 text-base">{wedding.brideName}</p>
            {wedding.brideParents.father && <p className="text-gray-600">Cha: {wedding.brideParents.father}</p>}
            {wedding.brideParents.mother && <p className="text-gray-600">Mẹ: {wedding.brideParents.mother}</p>}
          </CardContent>
        </Card>
      </div>

      {/* Ceremonies */}
      <div className="grid md:grid-cols-2 gap-6">
        <CeremonyCard title="Lễ Tân Hôn (Nhà trai)" ceremony={wedding.groomCeremony} />
        <CeremonyCard title="Lễ Vu Quy (Nhà gái)" ceremony={wedding.brideCeremony} />
      </div>

      {/* Quote */}
      {wedding.quote && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Lời chúc mặc định</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic text-gray-600">&ldquo;{wedding.quote}&rdquo;</p>
          </CardContent>
        </Card>
      )}

      {/* Gallery */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Bộ sưu tập ảnh ({wedding.gallery.length} ảnh)</CardTitle>
        </CardHeader>
        <CardContent>
          {wedding.gallery.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {wedding.gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">Chưa có ảnh nào. Chỉnh sửa thiệp để thêm ảnh.</p>
          )}
        </CardContent>
      </Card>

      {/* Slug / Link */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Đường dẫn thiệp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <code className="text-sm flex-1 text-gray-700">
              {typeof window !== "undefined" ? window.location.origin : ""}/w/{wedding.slug}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
