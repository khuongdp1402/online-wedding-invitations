import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { WeddingDetail } from "@/components/dashboard/WeddingDetail";

export default async function WeddingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const wedding = await prisma.wedding.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: {
      template: true,
      _count: { select: { wishes: true, guests: true } },
    },
  });

  if (!wedding) notFound();

  // Fetch analytics data
  const guests = await prisma.guest.findMany({
    where: { weddingId: wedding.id },
    select: {
      rsvpStatus: true,
      numberOfGuests: true,
      linkOpened: true,
    },
  });

  const accepted = guests.filter((g) => g.rsvpStatus === "ACCEPTED");
  const analyticsData = {
    viewCount: wedding.viewCount,
    guestCount: guests.length,
    wishCount: wedding._count.wishes,
    acceptedCount: accepted.length,
    declinedCount: guests.filter((g) => g.rsvpStatus === "DECLINED").length,
    pendingCount: guests.filter((g) => g.rsvpStatus === "PENDING").length,
    totalAttendees: accepted.reduce((sum, g) => sum + g.numberOfGuests, 0),
    linkOpenedCount: guests.filter((g) => g.linkOpened).length,
    createdAt: wedding.createdAt.toISOString(),
    publishedAt: wedding.paidAt?.toISOString() || null,
    slug: wedding.slug,
  };

  // Serialize for client component
  const weddingData = JSON.parse(JSON.stringify(wedding));

  return <WeddingDetail wedding={weddingData} analytics={analyticsData} />;
}
