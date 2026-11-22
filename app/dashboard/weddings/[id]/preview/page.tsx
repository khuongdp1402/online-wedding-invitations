import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { PreviewClient } from "./PreviewClient";
import { toWeddingData } from "@/lib/wedding-data";

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

  const weddingData = toWeddingData(wedding);

  return (
    <PreviewClient
      weddingData={weddingData}
      templateSlug={wedding.template.slug}
      weddingId={wedding.id}
    />
  );
}
