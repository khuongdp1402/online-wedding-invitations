"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Template = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  isPremium: boolean;
  minPlan: string;
};

type Props = {
  weddingId: string;
  currentTemplateId: string;
  templates: Template[];
};

export function TemplateChanger({ weddingId, currentTemplateId, templates }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [selected, setSelected] = useState(currentTemplateId);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (selected === currentTemplateId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/weddings/${weddingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selected }),
      });
      if (res.ok) {
        toast({ title: "Đã đổi mẫu thiệp!" });
        router.push(`/dashboard/weddings/${weddingId}`);
        router.refresh();
      } else {
        const err = await res.json();
        toast({ title: "Lỗi", description: err.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi", variant: "destructive" });
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((t) => (
          <Card
            key={t.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selected === t.id
                ? "ring-2 ring-rose-500 shadow-lg"
                : "hover:ring-1 hover:ring-gray-200"
            }`}
            onClick={() => setSelected(t.id)}
          >
            <CardContent className="p-4">
              <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 mb-3 flex items-center justify-center relative">
                <p className="font-serif text-sm font-semibold text-gray-600">{t.name}</p>
                {selected === t.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                {currentTemplateId === t.id && (
                  <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-500 text-white text-[10px]">Hiện tại</Badge>
                )}
                {t.isPremium && (
                  <Badge className="absolute bottom-2 left-2 bg-amber-500 hover:bg-amber-500 text-white text-[10px]">Premium</Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{t.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Link href={`/dashboard/weddings/${weddingId}`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Quay lại
          </Button>
        </Link>
        <Button
          onClick={handleSave}
          disabled={saving || selected === currentTemplateId}
          className="bg-rose-600 hover:bg-rose-700"
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
          {saving ? "Đang lưu..." : "Áp Dụng Mẫu Mới"}
        </Button>
      </div>
    </div>
  );
}
