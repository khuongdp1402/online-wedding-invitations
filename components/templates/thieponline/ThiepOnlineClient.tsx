"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as jsxRuntime from "react/jsx-runtime";
import type { WeddingData, WeddingTemplateProps } from "@/types/template";
import type { ThiepOnlineCatalogItem } from "@/lib/thieponline-catalog";
import { visibleSectionKeys } from "@/lib/section-config";

type GlobalWindow = Window & {
  __WEDDING_REACT__?: typeof React;
  __WEDDING_REACT_DOM__?: typeof ReactDOM;
  __WEDDING_JSX_RUNTIME__?: typeof jsxRuntime;
  __WEDDING_USE_FETCHER__?: () => {
    state: "idle" | "submitting";
    data: Record<string, unknown> | null;
    submit: (formData: FormData, opts?: { method?: string }) => Promise<void>;
  };
  __WEDDING_USE_REVALIDATOR__?: () => {
    revalidate: () => Promise<void>;
    state: "idle";
  };
  __WEDDING_USE_PARAMS__?: () => { slug?: string };
  __WEDDING_CURRENT_ID__?: string;
  __WEDDING_CURRENT_SLUG__?: string;
};

function toIsoDate(raw?: string): string {
  if (!raw) return "2026-11-22";
  const trimmed = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 10);
  }
  const dmy = trimmed.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (dmy) {
    return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return "2026-11-22";
}

export function buildPartialContentFromWeddingData(
  wedding: WeddingData,
  item: ThiepOnlineCatalogItem,
  guestName?: string,
  guestSalutation?: string
): Record<string, any> {
  const saved = (
    wedding.typography as Record<string, any> | undefined
  )?.thiepOnlineContent as Record<string, any> | undefined;

  const defaultImages = item.defaultImages || [];
  const userImages = (wedding.gallery || []).filter(
    (url) =>
      typeof url === "string" &&
      url.trim() &&
      !url.includes("images.unsplash.com") &&
      !url.startsWith("/templates/classic-burgundy/samples/")
  );

  const defaultSections = [
    "header",
    "wedding-info",
    "gallery",
    "countdown",
    "calendar",
    "location",
    "dresscode",
    "timeline",
    "rsvp",
    "wishes",
    "gifting",
    "footer",
  ];
  const visibleSet = wedding.sectionOrder
    ? new Set(visibleSectionKeys(wedding.sectionOrder, defaultSections))
    : null;
  const hasSection = (key: string) => !visibleSet || visibleSet.has(key);

  const partyDate = toIsoDate(
    saved?.party?.date ||
      wedding.brideCeremony?.date ||
      wedding.groomCeremony?.date
  );
  const ceremonyDate = toIsoDate(
    wedding.groomCeremony?.date || wedding.brideCeremony?.date
  );

  const partyTime =
    saved?.party?.time ||
    wedding.brideCeremony?.receptionTime ||
    wedding.groomCeremony?.receptionTime ||
    wedding.brideCeremony?.ceremonyTime ||
    "18:00";

  const guestArrivalTime =
    saved?.party?.guestArrivalTime ||
    wedding.brideCeremony?.ceremonyTime ||
    wedding.groomCeremony?.ceremonyTime ||
    "17:30";

  const venueName =
    saved?.party?.venueName ??
    (wedding.brideCeremony?.venue || wedding.groomCeremony?.venue || "Trung Tâm Hội Nghị Tiệc Cưới");
  const partyAddress =
    saved?.party?.address ??
    (wedding.brideCeremony?.address || wedding.groomCeremony?.address || "");
  const googleMapLink =
    saved?.party?.googleMapLink ??
    (wedding.brideCeremony?.googleMapsUrl ||
      wedding.groomCeremony?.googleMapsUrl ||
      "");

  const bankAccounts: Array<Record<string, unknown>> = [];
  if (
    saved?.bank?.accounts &&
    Array.isArray(saved.bank.accounts) &&
    saved.bank.accounts.length > 0
  ) {
    bankAccounts.push(...saved.bank.accounts);
  } else {
    if (wedding.gifting?.groom?.accountNumber) {
      bankAccounts.push({
        id: "bank-groom",
        type: wedding.gifting.groom.qrCodeUrl ? "upload_qr" : "vietqr",
        for: "groom",
        bankName: wedding.gifting.groom.bankName || "Vietcombank",
        bankCode: wedding.gifting.groom.bankName || "VCB",
        accountNumber: wedding.gifting.groom.accountNumber || "",
        accountName:
          wedding.gifting.groom.accountHolder || wedding.groomName || "",
        imageUrl: wedding.gifting.groom.qrCodeUrl || "",
      });
    }
    if (wedding.gifting?.bride?.accountNumber) {
      bankAccounts.push({
        id: "bank-bride",
        type: wedding.gifting.bride.qrCodeUrl ? "upload_qr" : "vietqr",
        for: "bride",
        bankName: wedding.gifting.bride.bankName || "Techcombank",
        bankCode: wedding.gifting.bride.bankName || "TCB",
        accountNumber: wedding.gifting.bride.accountNumber || "",
        accountName:
          wedding.gifting.bride.accountHolder || wedding.brideName || "",
        imageUrl: wedding.gifting.bride.qrCodeUrl || "",
      });
    }
  }

  const salutation = guestName
    ? `${guestSalutation || saved?.envelope?.salutation || "Thân mời"} ${guestName}`
    : guestSalutation || saved?.envelope?.salutation || "Thân Mời";

  const headerPhotoUrl =
    saved?.headerPhoto?.url || userImages[0] || defaultImages[0] || "";
  const groomPhotoUrl =
    saved?.couplePhotos?.groom ||
    userImages[1] ||
    defaultImages[4] ||
    defaultImages[1] ||
    defaultImages[0] ||
    "";
  const bridePhotoUrl =
    saved?.couplePhotos?.bride ||
    userImages[2] ||
    defaultImages[5] ||
    defaultImages[2] ||
    defaultImages[0] ||
    "";
  const partyPhotoUrl =
    saved?.party?.photo || defaultImages[1] || defaultImages[0] || "";
  const calendarPhotoUrl =
    saved?.party?.calendarPhoto || defaultImages[2] || defaultImages[0] || "";
  const thankYouPhotoUrl =
    saved?.thankYou?.photo ||
    defaultImages[3] ||
    defaultImages[defaultImages.length - 1] ||
    defaultImages[0] ||
    "";

  const galleryPhotoList: Array<{ url: string; position: { x: number; y: number } }> =
    saved?.gallery?.photos &&
    Array.isArray(saved.gallery.photos) &&
    saved.gallery.photos.length > 0
      ? saved.gallery.photos
      : (userImages.length > 0 ? userImages : defaultImages).map((url) => ({
          url,
          position: { x: 0.5, y: 0.5 },
        }));

  const defaultCeremonyItems = [
    {
      id: "ceremony-1",
      title: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA NHÀ TRAI",
      date: ceremonyDate,
      time: wedding.groomCeremony?.ceremonyTime || "09:00",
      venue: wedding.groomCeremony?.venue || "Tại Tư Gia Nhà Trai",
      address: wedding.groomCeremony?.address || "",
      mapLink: wedding.groomCeremony?.googleMapsUrl || "",
      showMap: Boolean(wedding.groomCeremony?.address || wedding.groomCeremony?.googleMapsUrl),
    },
  ];
  if (
    wedding.brideCeremony &&
    (wedding.brideCeremony.venue || wedding.brideCeremony.address) &&
    (wedding.brideCeremony.venue !== wedding.groomCeremony?.venue ||
      wedding.brideCeremony.address !== wedding.groomCeremony?.address)
  ) {
    defaultCeremonyItems.push({
      id: "ceremony-2",
      title: "LỄ VU QUY ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA NHÀ GÁI",
      date: toIsoDate(wedding.brideCeremony.date || ceremonyDate),
      time: wedding.brideCeremony.ceremonyTime || "08:00",
      venue: wedding.brideCeremony.venue || "Tại Tư Gia Nhà Gái",
      address: wedding.brideCeremony.address || "",
      mapLink: wedding.brideCeremony.googleMapsUrl || "",
      showMap: Boolean(wedding.brideCeremony.address || wedding.brideCeremony.googleMapsUrl),
    });
  }

  return {
    activeLocales: ["vi"],
    basicInfo: {
      groomName:
        wedding.groomName || saved?.basicInfo?.groomName || "Họ Tên Chú Rể",
      brideName:
        wedding.brideName || saved?.basicInfo?.brideName || "Họ Tên Cô Dâu",
      groomShortName:
        saved?.basicInfo?.groomShortName || wedding.groomName || "",
      brideShortName:
        saved?.basicInfo?.brideShortName || wedding.brideName || "",
      groomTitle: saved?.basicInfo?.groomTitle ?? "Trưởng Nam",
      brideTitle: saved?.basicInfo?.brideTitle ?? "Út Nữ",
      displayOrder: saved?.basicInfo?.displayOrder || "groom-first",
      ...(saved?.basicInfo?.eventHeading
        ? { eventHeading: saved.basicInfo.eventHeading }
        : {}),
    },
    family: {
      groom: {
        title: saved?.family?.groom?.title ?? "Ông Bà",
        father:
          wedding.groomParents?.father ?? saved?.family?.groom?.father ?? "",
        mother:
          wedding.groomParents?.mother ?? saved?.family?.groom?.mother ?? "",
        address:
          saved?.family?.groom?.address ??
          wedding.groomCeremony?.address ??
          "",
        visible: saved?.family?.groom?.visible ?? hasSection("wedding-info"),
      },
      bride: {
        title: saved?.family?.bride?.title ?? "Ông Bà",
        father:
          wedding.brideParents?.father ?? saved?.family?.bride?.father ?? "",
        mother:
          wedding.brideParents?.mother ?? saved?.family?.bride?.mother ?? "",
        address:
          saved?.family?.bride?.address ??
          wedding.brideCeremony?.address ??
          "",
        visible: saved?.family?.bride?.visible ?? hasSection("wedding-info"),
      },
    },
    intro: {
      text:
        saved?.intro?.text ||
        "TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
      visible: saved?.intro?.visible ?? hasSection("wedding-info"),
    },
    ceremony: {
      visible: saved?.ceremony?.visible ?? hasSection("wedding-info"),
      ...(saved?.ceremony?.infoTitle
        ? { infoTitle: saved.ceremony.infoTitle }
        : {}),
      items:
        saved?.ceremony?.items &&
        Array.isArray(saved.ceremony.items) &&
        saved.ceremony.items.length > 0
          ? saved.ceremony.items
          : defaultCeremonyItems,
    },
    party: {
      type: saved?.party?.type || item.occasion || "wedding",
      date: partyDate,
      time: partyTime,
      timeFormat: saved?.party?.timeFormat || "24h",
      showReceptionTimes: saved?.party?.showReceptionTimes ?? true,
      guestArrivalTime,
      startTime: saved?.party?.startTime || partyTime,
      venueName,
      address: partyAddress,
      mapAddress: googleMapLink || partyAddress,
      googleMapLink,
      photo: partyPhotoUrl,
      calendarPhoto: calendarPhotoUrl,
      showCountdown: saved?.party?.showCountdown ?? hasSection("countdown"),
      showMap: saved?.party?.showMap ?? hasSection("location"),
      visible:
        saved?.party?.visible ??
        (hasSection("wedding-info") || hasSection("location")),
    },
    headerPhoto: {
      url: headerPhotoUrl,
      quote: saved?.headerPhoto?.quote || "",
      visible: saved?.headerPhoto?.visible ?? hasSection("header"),
    },
    couplePhotos: {
      groom: groomPhotoUrl,
      bride: bridePhotoUrl,
      groomDescription: saved?.couplePhotos?.groomDescription || "",
      brideDescription: saved?.couplePhotos?.brideDescription || "",
      visible:
        saved?.couplePhotos?.visible ??
        (hasSection("header") || hasSection("wedding-info")),
    },
    loveStory: {
      visible: saved?.loveStory?.visible ?? true,
      title: saved?.loveStory?.title || "Câu Chuyện Tình Yêu",
      content:
        saved?.loveStory?.content ||
        "Mỗi cuộc gặp gỡ trong đời đều là duyên phận. Cảm ơn vì đã tìm thấy nhau và cùng nhau viết tiếp chương mới hạnh phúc.",
      photo: saved?.loveStory?.photo || defaultImages[0] || "",
      events:
        saved?.loveStory?.events &&
        Array.isArray(saved.loveStory.events) &&
        saved.loveStory.events.length > 0
          ? saved.loveStory.events
          : [
              {
                id: "ls-1",
                date: "2023",
                title: "Lần đầu gặp gỡ",
                text: "Khoảnh khắc ánh mắt chạm nhau, chúng mình biết đây là định mệnh.",
              },
              {
                id: "ls-2",
                date: "2025",
                title: "Lời cầu hôn ngọt ngào",
                text: "Giữa ánh nến lung linh, lời đồng ý đã mở ra hành trình mới.",
              },
              {
                id: "ls-3",
                date: "2026",
                title: "Về chung một nhà",
                text: "Cùng nắm tay bước vào lễ đường trong sự chúc phúc của hai bên gia đình.",
              },
            ],
    },
    schedule: {
      visible: saved?.schedule?.visible ?? hasSection("timeline"),
      title: saved?.schedule?.title || "Timeline",
      photo: saved?.schedule?.photo || defaultImages[1] || "",
      items:
        saved?.schedule?.items &&
        Array.isArray(saved.schedule.items) &&
        saved.schedule.items.length > 0
          ? saved.schedule.items
          : [
              {
                id: "sch-1",
                time: "16:00",
                label: "Đón khách & chụp ảnh",
                icon: "camera",
              },
              {
                id: "sch-2",
                time: "17:00",
                label: "Lễ thành hôn",
                icon: "rings",
              },
              {
                id: "sch-3",
                time: "18:00",
                label: "Khai tiệc chung vui",
                icon: "champagne",
              },
              {
                id: "sch-4",
                time: "19:30",
                label: "Giao lưu & âm nhạc",
                icon: "music",
              },
            ],
    },
    dressCode: {
      visible: saved?.dressCode?.visible ?? hasSection("dresscode"),
      title: saved?.dressCode?.title || "Dress Code",
      description:
        saved?.dressCode?.description ||
        "Rất mong quý khách diện trang phục theo tông màu gợi ý để buổi tiệc thêm phần trọn vẹn.",
      colors:
        saved?.dressCode?.colors &&
        Array.isArray(saved.dressCode.colors) &&
        saved.dressCode.colors.length > 0
          ? saved.dressCode.colors
          : [
              item.defaultColors.primary || "#790606",
              item.defaultColors.accent || "#d4af37",
              "#f5e6d3",
              "#2b1414",
            ],
    },
    gallery: {
      visible: saved?.gallery?.visible ?? hasSection("gallery"),
      displayMode: saved?.gallery?.displayMode || "grid",
      photos: galleryPhotoList,
    },
    rsvp: {
      visible: saved?.rsvp?.visible ?? hasSection("rsvp"),
      displayMode: saved?.rsvp?.displayMode || "button",
      maxGuestCount: saved?.rsvp?.maxGuestCount ?? 10,
    },
    guestbook: {
      visible: saved?.guestbook?.visible ?? hasSection("wishes"),
    },
    bank: {
      visible: saved?.bank?.visible ?? hasSection("gifting"),
      displayMode: saved?.bank?.displayMode || "envelope",
      accounts: bankAccounts,
    },
    thankYou: {
      visible: saved?.thankYou?.visible ?? hasSection("footer"),
      photo: thankYouPhotoUrl,
      text:
        saved?.thankYou?.text ||
        wedding.quote ||
        "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
    },
    music: {
      visible: saved?.music?.visible ?? true,
      ...(wedding.backgroundMusic &&
      wedding.backgroundMusic !== "/background-music.mp3"
        ? { audioUrl: wedding.backgroundMusic }
        : saved?.music?.audioUrl
          ? { audioUrl: saved.music.audioUrl }
          : {}),
    },
    envelope: {
      visible: saved?.envelope?.visible ?? true,
      salutation,
    },
  };
}

function ensureStylesheet(href: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const existing = document.querySelector<HTMLLinkElement>(
    `link[rel="stylesheet"][href="${href}"]`
  );
  if (existing?.sheet) return Promise.resolve();
  return new Promise((resolve) => {
    const link = existing ?? document.createElement("link");
    const done = () => resolve();
    const timer = window.setTimeout(done, 1500);
    link.addEventListener(
      "load",
      () => {
        window.clearTimeout(timer);
        done();
      },
      { once: true }
    );
    link.addEventListener(
      "error",
      () => {
        window.clearTimeout(timer);
        done();
      },
      { once: true }
    );
    if (!existing) {
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  });
}

function setupGlobalRuntime(weddingId?: string, slug?: string) {
  if (typeof window === "undefined") return;
  const w = window as GlobalWindow;
  w.__WEDDING_REACT__ = React;
  w.__WEDDING_REACT_DOM__ = ReactDOM;
  w.__WEDDING_JSX_RUNTIME__ = jsxRuntime;
  if (weddingId !== undefined) w.__WEDDING_CURRENT_ID__ = weddingId;
  if (slug !== undefined) w.__WEDDING_CURRENT_SLUG__ = slug;

  if (!w.__WEDDING_USE_REVALIDATOR__) {
    w.__WEDDING_USE_REVALIDATOR__ = () => ({
      revalidate: async () => {},
      state: "idle",
    });
  }

  if (!w.__WEDDING_USE_PARAMS__) {
    w.__WEDDING_USE_PARAMS__ = () => ({
      slug: (window as GlobalWindow).__WEDDING_CURRENT_SLUG__ || "",
    });
  }

  if (!w.__WEDDING_USE_FETCHER__) {
    w.__WEDDING_USE_FETCHER__ = function useWeddingFetcher() {
      const [state, setState] = React.useState<"idle" | "submitting">("idle");
      const [resData, setResData] = React.useState<Record<string, unknown> | null>(
        null
      );

      const submit = React.useCallback(async (formData: FormData) => {
        const intent = String(formData.get("intent") || "");
        const currentWeddingId = (window as GlobalWindow).__WEDDING_CURRENT_ID__;
        setState("submitting");
        try {
          if (intent === "submitGuestbook") {
            const guestName = String(formData.get("guestName") || "").trim();
            const message = String(formData.get("message") || "").trim();
            let entryId = `wish-${Date.now()}`;
            if (
              currentWeddingId &&
              currentWeddingId !== "sample-demo-wedding-id" &&
              currentWeddingId !== "wizard-preview-wedding"
            ) {
              const res = await fetch("/api/wishes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  weddingId: currentWeddingId,
                  name: guestName,
                  message,
                }),
              }).catch(() => null);
              if (res?.ok) {
                const json = await res.json().catch(() => null);
                if (json?.wish?.id) entryId = json.wish.id;
              }
            }
            setResData({
              success: true,
              entry: {
                id: entryId,
                guestName,
                message,
                createdAt: new Date().toISOString(),
              },
            });
          } else if (intent === "submitRsvp") {
            const guestName = String(formData.get("guestName") || "").trim();
            const attendanceStatus = String(
              formData.get("attendanceStatus") || "attending"
            );
            const guestCount = Number(formData.get("guestCount") || 1);
            const message = String(formData.get("message") || "").trim();
            if (
              currentWeddingId &&
              currentWeddingId !== "sample-demo-wedding-id" &&
              currentWeddingId !== "wizard-preview-wedding"
            ) {
              await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  weddingId: currentWeddingId,
                  guestName,
                  attendance:
                    attendanceStatus === "attending" ? "accept" : "decline",
                  numberOfGuests: guestCount,
                }),
              }).catch(() => {});

              if (message) {
                await fetch("/api/wishes", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    weddingId: currentWeddingId,
                    name: guestName,
                    message,
                    attendance:
                      attendanceStatus === "attending" ? "accept" : "decline",
                  }),
                }).catch(() => {});
              }
            }
            setResData({
              success: true,
              rsvp: {
                id: `rsvp-${Date.now()}`,
              },
            });
          }
        } finally {
          setState("idle");
        }
      }, []);

      return { state, data: resData, submit };
    };
  }
}

if (typeof window !== "undefined") {
  setupGlobalRuntime();
}

type LoadedModules = {
  TemplateComponent: React.ComponentType;
  TemplateDataProvider: React.ComponentType<Record<string, unknown>>;
  normalizeContent: (raw: Record<string, unknown>) => Record<string, unknown>;
};

const moduleCache = new Map<string, Promise<LoadedModules>>();

function loadTemplateBundle(item: ThiepOnlineCatalogItem): Promise<LoadedModules> {
  setupGlobalRuntime();
  const existing = moduleCache.get(item.slug);
  if (existing) return existing;

  const importer = new Function("u", "return import(u)") as (
    url: string
  ) => Promise<Record<string, unknown>>;

  const promise = Promise.all([
    importer("/thieponline-bundles/template-data-provider-Ck2hFQtS.js"),
    importer("/thieponline-bundles/invitations-BbXCo4D8.js"),
    importer(`/thieponline-bundles/${item.jsFile}`),
  ])
    .then(([tdpMod, invMod, tplMod]) => {
      const TemplateDataProvider = tdpMod.T as React.ComponentType<
        Record<string, unknown>
      >;
      const normalizeContent = invMod.m as (
        raw: Record<string, unknown>
      ) => Record<string, unknown>;
      const TemplateComponent = (tplMod[item.exportName] ||
        Object.values(tplMod)[0]) as React.ComponentType;
      return {
        TemplateComponent,
        TemplateDataProvider,
        normalizeContent,
      };
    })
    .catch((err) => {
      moduleCache.delete(item.slug);
      throw err;
    });

  moduleCache.set(item.slug, promise);
  return promise;
}

class TemplateErrorBoundary extends React.Component<
  { templateName: string; children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { templateName: string; children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 p-8 text-center text-sm text-red-600">
          <p className="font-semibold">
            Không thể hiển thị mẫu thiệp {this.props.templateName}
          </p>
          <p className="text-xs text-gray-500">{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export type ThiepOnlineClientProps = WeddingTemplateProps & {
  item: ThiepOnlineCatalogItem;
};

export default function ThiepOnlineClient({
  item,
  wedding,
  isDemo,
  isPreview,
  guestName,
  guestSalutation,
}: ThiepOnlineClientProps) {
  const [loaded, setLoaded] = React.useState<LoadedModules | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [guestbookEntries, setGuestbookEntries] = React.useState<
    Array<{ id: string; guestName: string; message: string; createdAt: string }>
  >([]);

  const isCatalogDemo =
    !wedding?.id || wedding.id === "sample-demo-wedding-id";

  React.useEffect(() => {
    if (isCatalogDemo || wedding?.id === "wizard-preview-wedding") {
      setGuestbookEntries([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/wishes?weddingId=${encodeURIComponent(wedding.id)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !Array.isArray(data?.wishes)) return;
        setGuestbookEntries(
          data.wishes.map(
            (w: {
              id: string;
              name: string;
              message: string;
              createdAt: string;
            }) => ({
              id: w.id,
              guestName: w.name,
              message: w.message,
              createdAt: w.createdAt,
            })
          )
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isCatalogDemo, wedding?.id]);

  React.useEffect(() => {
    setupGlobalRuntime(wedding?.id, wedding?.slug || item.slug);
    const cssPromises = [
      ensureStylesheet("/thieponline-bundles/css/thieponline-core.css"),
      ...item.cssFiles.map((cssFile) =>
        ensureStylesheet(`/thieponline-bundles/css/${cssFile}`)
      ),
    ];

    let cancelled = false;
    setError(null);
    Promise.all([loadTemplateBundle(item), ...cssPromises])
      .then(([mods]) => {
        if (!cancelled) setLoaded(mods);
      })
      .catch((err) => {
        console.error(`[ThiepOnlineTemplate:${item.slug}] load error:`, err);
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      });

    return () => {
      cancelled = true;
    };
  }, [item, wedding?.id, wedding?.slug]);

  const content = React.useMemo(() => {
    if (!loaded || isCatalogDemo) return null;
    return loaded.normalizeContent(
      buildPartialContentFromWeddingData(wedding, item, guestName, guestSalutation)
    );
  }, [loaded, isCatalogDemo, wedding, item, guestName, guestSalutation]);

  const guestInvite = React.useMemo(() => {
    if (!guestName?.trim()) return null;
    return {
      name: guestName.trim(),
      salutation: guestSalutation?.trim() || "Thân mời",
      inviteMessage: "",
    };
  }, [guestName, guestSalutation]);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-8 text-center text-sm text-red-600">
        Không thể tải mẫu thiệp {item.name}: {error}
      </div>
    );
  }

  if (!loaded) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-3"
        style={{ backgroundColor: item.defaultColors.background }}
      >
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-t-transparent"
          style={{
            borderColor: `${item.defaultColors.primary} transparent ${item.defaultColors.primary} ${item.defaultColors.primary}`,
          }}
        />
        <p
          className="text-sm font-medium"
          style={{ color: item.defaultColors.primary }}
        >
          Đang mở thiệp {item.name}...
        </p>
      </div>
    );
  }

  const { TemplateDataProvider, TemplateComponent } = loaded;

  return (
    <TemplateErrorBoundary key={item.slug} templateName={item.name}>
      <div
        className={`thieponline-template-root w-full ${isPreview ? "thieponline-embedded-preview" : ""}`}
        data-theme="light"
      >
        <TemplateDataProvider
          content={content}
          demoSlug={item.slug}
          invitationId={!isCatalogDemo ? wedding.id : undefined}
          guestbookEntries={!isCatalogDemo ? guestbookEntries : undefined}
          guestInvite={guestInvite}
          skipIntro={Boolean(isPreview && !isCatalogDemo)}
          embedded={Boolean(isPreview)}
          isEditor={Boolean(isPreview)}
          hideCredit={true}
        >
          <TemplateComponent />
        </TemplateDataProvider>
      </div>
    </TemplateErrorBoundary>
  );
}
