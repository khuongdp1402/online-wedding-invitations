import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { PreviewClient } from "./PreviewClient";
import type { WeddingData } from "@/lib/template-registry";

export default async function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const wedding = await prisma.wedding.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: { template: true },
  });

  if (!wedding) notFound();

  const weddingData: WeddingData = {
    id: wedding.id,
    slug: wedding.slug,
    groomName: wedding.groomName,
    brideName: wedding.brideName,
    groomParents: wedding.groomParents as WeddingData["groomParents"],
    brideParents: wedding.brideParents as WeddingData["brideParents"],
    groomCeremony: wedding.groomCeremony as WeddingData["groomCeremony"],
    brideCeremony: wedding.brideCeremony as WeddingData["brideCeremony"],
    quote: wedding.quote || undefined,
    gallery: (wedding.gallery as string[]) || [],
    gifting: wedding.gifting as WeddingData["gifting"],
    primaryColor: wedding.primaryColor || undefined,
    accentColor: wedding.accentColor || undefined,
    backgroundMusic: wedding.backgroundMusic || undefined,
    status: wedding.status as WeddingData["status"],
    plan: wedding.plan as WeddingData["plan"],
  };

  return (
    <PreviewClient
      weddingData={weddingData}
      templateSlug={wedding.template.slug}
      weddingId={wedding.id}
    />
  );
}
