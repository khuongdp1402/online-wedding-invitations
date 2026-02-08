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

  // Serialize for client component
  const weddingData = JSON.parse(JSON.stringify(wedding));

  return <WeddingDetail wedding={weddingData} />;
}
