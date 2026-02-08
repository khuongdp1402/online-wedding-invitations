import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WeddingPageClient } from "./WeddingPageClient";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: wedding.ogImage ? [wedding.ogImage] : [],
      type: "website",
      locale: "vi_VN",
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

  // Determine if demo
  const isDemo =
    wedding.status === "DRAFT" ||
    wedding.status === "DEMO" ||
    wedding.plan === "FREE";

  // Check if expired
  if (wedding.status === "EXPIRED") {
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
  const weddingData = {
    id: wedding.id,
    slug: wedding.slug,
    groomName: wedding.groomName,
    brideName: wedding.brideName,
    groomParents: wedding.groomParents as { father: string; mother: string },
    brideParents: wedding.brideParents as { father: string; mother: string },
    groomCeremony: wedding.groomCeremony as {
      date: string;
      lunarDate?: string;
      ceremonyTime: string;
      receptionTime: string;
      venue: string;
      address: string;
      googleMapsUrl?: string;
    },
    brideCeremony: wedding.brideCeremony as {
      date: string;
      lunarDate?: string;
      ceremonyTime: string;
      receptionTime: string;
      venue: string;
      address: string;
      googleMapsUrl?: string;
    },
    quote: wedding.quote || undefined,
    gallery: (wedding.gallery as string[]) || [],
    gifting: wedding.gifting as {
      groom?: {
        bankName: string;
        accountNumber: string;
        accountHolder: string;
        qrCodeUrl?: string;
      };
      bride?: {
        bankName: string;
        accountNumber: string;
        accountHolder: string;
        qrCodeUrl?: string;
      };
    } | undefined,
    primaryColor: wedding.primaryColor || undefined,
    accentColor: wedding.accentColor || undefined,
    fontFamily: wedding.fontFamily || undefined,
    backgroundMusic: wedding.backgroundMusic || undefined,
    status: wedding.status as "DRAFT" | "DEMO" | "PUBLISHED" | "EXPIRED",
    plan: wedding.plan as "FREE" | "BASIC" | "STANDARD" | "PREMIUM",
  };

  return (
    <WeddingPageClient
      templateSlug={wedding.template.slug}
      wedding={weddingData}
      mode={mode}
      isDemo={isDemo}
      guestName={guestName}
      guestSalutation={guestSalutation}
    />
  );
}
