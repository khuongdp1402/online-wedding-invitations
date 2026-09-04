import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getEffectiveWeddingStatus } from "@/lib/payment";
import { toWeddingData } from "@/lib/wedding-data";
import { WeddingPageClient } from "./WeddingPageClient";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function absoluteOgUrl(ogImage: string | null | undefined): string[] {
  if (!ogImage?.trim()) return [];
  const u = ogImage.trim();
  if (u.startsWith("http://") || u.startsWith("https://")) return [u];
  const base = (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    ""
  ).replace(/\/$/, "");
  if (!base) return [u];
  return [`${base}${u.startsWith("/") ? u : `/${u}`}`];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const wedding = await prisma.wedding.findUnique({
    where: { slug: params.slug },
    select: {
      groomName: true,
      brideName: true,
      metaTitle: true,
      metaDescription: true,
      ogImage: true,
    },
  });

  if (!wedding) {
    return { title: "Thiệp cưới không tồn tại" };
  }

  const title =
    wedding.metaTitle ||
    `Thiệp Cưới ${wedding.groomName} & ${wedding.brideName}`;
  const description =
    wedding.metaDescription ||
    `Trân trọng kính mời bạn đến chung vui cùng ${wedding.groomName} & ${wedding.brideName}`;
  const ogImages = absoluteOgUrl(wedding.ogImage);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImages.length ? { images: ogImages } : {}),
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImages.length ? { images: ogImages } : {}),
    },
  };
}

export default async function PublicWeddingPage({
  params,
  searchParams,
}: PageProps) {
  const wedding = await prisma.wedding.findUnique({
    where: { slug: params.slug },
    include: {
      template: true,
    },
  });

  if (!wedding) {
    notFound();
  }

  // Thiệp DRAFT chưa phát hành: chỉ chủ sở hữu xem được.
  // DEMO vẫn công khai (kèm watermark) để khách chia sẻ bản dùng thử.
  if (wedding.status === "DRAFT") {
    const session = await auth();
    if (session?.user?.id !== wedding.userId) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thiệp cưới chưa được phát hành
            </h1>
            <p className="text-gray-500">
              Thiệp cưới này đang ở chế độ nháp. Vui lòng liên hệ cô dâu chú rể
              để nhận đường dẫn chính thức.
            </p>
          </div>
        </div>
      );
    }
  }

  // Increment view count (fire and forget)
  prisma.wedding
    .update({
      where: { id: wedding.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch(() => {});

  // Parse search params
  const mode =
    (searchParams.mode as string) === "bride" ||
    (searchParams.mode as string) === "nhagai"
      ? "bride"
      : "groom";
  const guestName = (searchParams.guest as string) || (searchParams.name as string) || undefined;
  const guestSalutation =
    (searchParams.salutation as string) || (searchParams.xung_ho as string) || undefined;

  // Determine if demo — thiệp chưa xuất bản (chưa trả tiền) luôn coi là demo.
  const isDemo = wedding.status === "DRAFT" || wedding.status === "DEMO";

  // Trạng thái hiệu lực thực tế — tính cả trường hợp đã quá `expiresAt`
  // nhưng `status` trong DB vẫn còn "PUBLISHED" (không có cron cập nhật).
  const effectiveStatus = getEffectiveWeddingStatus(wedding);

  // Check if expired
  if (effectiveStatus === "EXPIRED") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thiệp cưới đã hết hạn
          </h1>
          <p className="text-gray-500">
            Thiệp cưới này đã hết thời hạn sử dụng. Vui lòng liên hệ cô dâu chú
            rể để biết thêm chi tiết.
          </p>
        </div>
      </div>
    );
  }

  // Transform DB data to WeddingData format
  const weddingData = toWeddingData(wedding);

  // JSON-LD structured data for SEO
  const groomCeremony = wedding.groomCeremony as { date?: string; venue?: string; address?: string } | null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Lễ Cưới ${wedding.groomName} & ${wedding.brideName}`,
    description: `Trân trọng kính mời bạn đến chung vui cùng ${wedding.groomName} & ${wedding.brideName}`,
    ...(groomCeremony?.date && { startDate: groomCeremony.date }),
    ...(groomCeremony?.venue && {
      location: {
        "@type": "Place",
        name: groomCeremony.venue,
        ...(groomCeremony.address && {
          address: {
            "@type": "PostalAddress",
            streetAddress: groomCeremony.address,
          },
        }),
      },
    }),
    organizer: {
      "@type": "Person",
      name: `${wedding.groomName} & ${wedding.brideName}`,
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WeddingPageClient
        templateSlug={wedding.template.slug}
        wedding={weddingData}
        mode={mode}
        isDemo={isDemo}
        guestName={guestName}
        guestSalutation={guestSalutation}
      />
    </>
  );
}
