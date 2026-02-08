"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  ExternalLink,
  Settings,
  Users,
  MessageSquare,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { WeddingInfoTab } from "@/components/dashboard/WeddingInfoTab";
import { GuestsTab } from "@/components/dashboard/GuestsTab";
import { WishesTab } from "@/components/dashboard/WishesTab";
import { RsvpTab } from "@/components/dashboard/RsvpTab";

type WeddingDetailProps = {
  wedding: {
    id: string;
    slug: string;
    status: string;
    plan: string;
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
    backgroundMusic?: string;
    viewCount: number;
    template: {
      id: string;
      name: string;
      slug: string;
    };
    _count: {
      wishes: number;
      guests: number;
    };
    createdAt: string;
    updatedAt: string;
  };
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  DRAFT: { label: "Nháp", variant: "secondary" },
  DEMO: { label: "Demo", variant: "outline" },
  PUBLISHED: { label: "Đã xuất bản", variant: "default" },
  EXPIRED: { label: "Hết hạn", variant: "destructive" },
};

const planConfig: Record<string, string> = {
  FREE: "Miễn phí",
  BASIC: "Cơ bản - 500k",
  STANDARD: "Tiêu chuẩn - 1tr",
  PREMIUM: "Cao cấp - 2tr",
};

export function WeddingDetail({ wedding }: WeddingDetailProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);

  const status = statusConfig[wedding.status] || statusConfig.DRAFT;

  async function handleDelete() {
    if (!confirm("Bạn có chắc chắn muốn xoá thiệp cưới này? Hành động này không thể hoàn tác.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/weddings/${wedding.id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Đã xoá thiệp cưới" });
        router.push("/dashboard");
      } else {
        toast({ title: "Lỗi", description: "Không thể xoá thiệp cưới", variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", description: "Đã xảy ra lỗi", variant: "destructive" });
    }
    setDeleting(false);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {wedding.groomName} & {wedding.brideName}
            </h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className="text-gray-500 mt-1">
            {wedding.template.name} · {planConfig[wedding.plan]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/weddings/${wedding.id}/preview`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1.5" /> Xem trước
            </Button>
          </Link>
          <Link href={`/w/${wedding.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-1.5" /> Mở thiệp
            </Button>
          </Link>
          <Link href={`/dashboard/weddings/${wedding.id}/edit`}>
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
              <Edit className="w-4 h-4 mr-1.5" /> Chỉnh sửa
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-500" />
              <div><p className="text-xs text-gray-500">Lượt xem</p><p className="text-lg font-bold">{wedding.viewCount}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-emerald-500" />
              <div><p className="text-xs text-gray-500">Khách mời</p><p className="text-lg font-bold">{wedding._count.guests}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <div><p className="text-xs text-gray-500">Lời chúc</p><p className="text-lg font-bold">{wedding._count.wishes}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-rose-500" />
              <div><p className="text-xs text-gray-500">Gói</p><p className="text-lg font-bold">{planConfig[wedding.plan]}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info">
        <TabsList className="mb-6">
          <TabsTrigger value="info" className="gap-1.5">
            <Settings className="w-4 h-4" /> Thông tin
          </TabsTrigger>
          <TabsTrigger value="guests" className="gap-1.5">
            <Users className="w-4 h-4" /> Khách mời
          </TabsTrigger>
          <TabsTrigger value="wishes" className="gap-1.5">
            <MessageSquare className="w-4 h-4" /> Lời chúc
          </TabsTrigger>
          <TabsTrigger value="rsvp" className="gap-1.5">
            <CheckCircle className="w-4 h-4" /> RSVP
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <WeddingInfoTab wedding={wedding} />
        </TabsContent>
        <TabsContent value="guests">
          <GuestsTab weddingId={wedding.id} />
        </TabsContent>
        <TabsContent value="wishes">
          <WishesTab weddingId={wedding.id} />
        </TabsContent>
        <TabsContent value="rsvp">
          <RsvpTab weddingId={wedding.id} />
        </TabsContent>
      </Tabs>

      {/* Danger zone */}
      <Card className="mt-10 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 text-base">Vùng nguy hiểm</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Xoá vĩnh viễn thiệp cưới này và tất cả dữ liệu liên quan.</p>
          </div>
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
            <Trash2 className="w-4 h-4 mr-1.5" /> {deleting ? "Đang xoá..." : "Xoá Thiệp"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
