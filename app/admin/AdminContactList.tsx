"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSectionDef } from "@/lib/section-registry";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, CheckCircle2, MessageSquare, Clock, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

type ContactRow = {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
  context: unknown;
  wedding: { slug: string; groomName: string; brideName: string } | null;
};

const STATUS_CONFIG: Record<string, { label: string; badgeClass: string; icon: typeof Clock }> = {
  NEW: {
    label: "Chưa liên hệ",
    badgeClass: "bg-rose-50 text-rose-800 border-rose-200",
    icon: Clock,
  },
  CONTACTED: {
    label: "Đang trao đổi",
    badgeClass: "bg-sky-50 text-sky-800 border-sky-200",
    icon: MessageSquare,
  },
  CLOSED: {
    label: "Đã hoàn tất",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
  },
};

function contextSummary(context: unknown): string | null {
  if (typeof context !== "object" || context === null) return null;
  const { templateSlug, enabledSections } = context as {
    templateSlug?: string;
    enabledSections?: string[];
  };
  const parts: string[] = [];
  if (templateSlug) parts.push(`Mẫu: ${templateSlug}`);
  if (enabledSections?.length) {
    parts.push(
      `Khối: ${enabledSections.map((k) => getSectionDef(k).label).join(", ")}`
    );
  }
  return parts.length > 0 ? parts.join(" · ") : null;
}

export function AdminContactList({ contacts }: { contacts: ContactRow[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: "NEW" | "CONTACTED" | "CLOSED") {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast({ title: "Đã cập nhật trạng thái yêu cầu tư vấn" });
        router.refresh();
      } else {
        const d = await res.json();
        toast({ title: "Lỗi", description: d.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Lỗi kết nối", variant: "destructive" });
    }
    setUpdatingId(null);
  }

  if (contacts.length === 0) {
    return (
      <Card className="border border-amber-900/10 bg-white rounded-xl">
        <CardContent className="py-12 text-center text-stone-500 text-sm">
          Chưa có yêu cầu tư vấn nào từ khách hàng.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((c) => {
        const summary = contextSummary(c.context);
        const st = STATUS_CONFIG[c.status] || STATUS_CONFIG.NEW;
        const Icon = st.icon;

        return (
          <Card
            key={c.id}
            className="border border-amber-900/10 shadow-xs bg-white rounded-xl hover:shadow-sm transition-shadow overflow-hidden"
          >
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-stone-900 text-base font-serif">
                      {c.name}
                    </span>
                    <a
                      href={`tel:${c.phone}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C1C24] hover:underline bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-amber-900/10"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{c.phone}</span>
                    </a>
                    <Badge variant="outline" className={`text-[11px] gap-1 ${st.badgeClass}`}>
                      <Icon className="w-3 h-3" />
                      <span>{st.label}</span>
                    </Badge>
                  </div>

                  {c.wedding && (
                    <div className="text-xs text-stone-500 flex items-center gap-1.5">
                      <span>Thiệp cưới:</span>
                      <Link
                        href={`/w/${c.wedding.slug}`}
                        target="_blank"
                        className="text-stone-700 hover:text-[#8C1C24] font-medium hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>
                          {c.wedding.groomName} &amp; {c.wedding.brideName}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start">
                  <span className="text-xs text-stone-400 whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleString("vi-VN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </span>

                  {/* Actions to update status */}
                  <div className="flex items-center gap-1">
                    {c.status !== "CONTACTED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px] px-2 text-sky-700 border-sky-200 hover:bg-sky-50"
                        onClick={() => updateStatus(c.id, "CONTACTED")}
                        disabled={updatingId === c.id}
                      >
                        {updatingId === c.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          "Đã liên hệ"
                        )}
                      </Button>
                    )}
                    {c.status !== "CLOSED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[11px] px-2 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => updateStatus(c.id, "CLOSED")}
                        disabled={updatingId === c.id}
                      >
                        {updatingId === c.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          "Xong"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-3 p-3 bg-[#FAF7F2] rounded-lg border border-amber-900/5 text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">
                {c.message}
              </div>

              {summary && (
                <div className="mt-2.5 text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
                  <span className="text-stone-400">Ngữ cảnh:</span>
                  <span>{summary}</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
