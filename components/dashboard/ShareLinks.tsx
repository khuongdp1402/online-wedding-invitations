"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  ExternalLink,
  Loader2,
  MessageCircle,
  Share2,
  Link2,
  Users,
  Search,
} from "lucide-react";

type Guest = {
  id: string;
  name: string;
  salutation: string | null;
  side: "GROOM" | "BRIDE";
  group: string | null;
  inviteLink: string | null;
  linkOpened: boolean;
};

export function ShareLinks({ weddingId, weddingSlug }: { weddingId: string; weddingSlug: string }) {
  const { toast } = useToast();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const publicUrl = `${baseUrl}/w/${weddingSlug}`;

  const fetchGuests = useCallback(async () => {
    try {
      const res = await fetch(`/api/weddings/${weddingId}/guests`);
      if (res.ok) {
        const data = await res.json();
        setGuests(data.guests);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, [weddingId]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  function getFullLink(guest: Guest) {
    return guest.inviteLink ? `${baseUrl}${guest.inviteLink}` : publicUrl;
  }

  function copyLink(text: string) {
    navigator.clipboard.writeText(text);
    toast({ title: "Đã sao chép link" });
  }

  function shareViaZalo(link: string, guestName: string) {
    const text = encodeURIComponent(
      `Trân trọng kính mời ${guestName} đến chung vui cùng chúng tôi!\n${link}`
    );
    window.open(`https://zalo.me/share?url=${encodeURIComponent(link)}&title=${text}`, "_blank");
  }

  function shareViaMessenger(link: string) {
    window.open(
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(link)}&app_id=0&redirect_uri=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  }

  function shareViaSMS(link: string, guestName: string) {
    const body = encodeURIComponent(
      `Trân trọng kính mời ${guestName} đến chung vui cùng chúng tôi! ${link}`
    );
    window.open(`sms:?body=${body}`, "_blank");
  }

  const filtered = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.group && g.group.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* General link */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Link2 className="w-5 h-5 text-rose-500" />
            Link thiệp chung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input value={publicUrl} readOnly className="font-mono text-sm" />
            <Button variant="outline" size="sm" onClick={() => copyLink(publicUrl)}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(publicUrl, "_blank")}>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Link chung không kèm tên khách. Dùng link cá nhân bên dưới để gửi cho từng khách mời.
          </p>
        </CardContent>
      </Card>

      {/* Per-guest links */}
      {guests.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              Link mời cá nhân ({guests.length} khách)
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm khách..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-60"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((guest) => {
              const fullLink = getFullLink(guest);
              return (
                <Card key={guest.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {guest.salutation ? `${guest.salutation} ` : ""}{guest.name}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {guest.side === "GROOM" ? "Nhà trai" : "Nhà gái"}
                        </Badge>
                        {guest.group && (
                          <Badge variant="secondary" className="text-[10px]">
                            {guest.group}
                          </Badge>
                        )}
                        {guest.linkOpened && (
                          <Badge className="bg-green-100 text-green-700 text-[10px]">
                            Đã xem
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 truncate font-mono">{fullLink}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => copyLink(fullLink)}
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => shareViaZalo(fullLink, guest.name)}
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-1" /> Zalo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs text-purple-600 border-purple-200 hover:bg-purple-50"
                        onClick={() => shareViaMessenger(fullLink)}
                      >
                        <Share2 className="w-3.5 h-3.5 mr-1" /> Messenger
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => shareViaSMS(fullLink, guest.name)}
                      >
                        SMS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {guests.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Thêm khách mời để tạo link cá nhân</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
