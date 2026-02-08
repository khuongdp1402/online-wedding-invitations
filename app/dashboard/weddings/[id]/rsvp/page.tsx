import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { RsvpTab } from "@/components/dashboard/RsvpTab";

export default async function RsvpPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const wedding = await prisma.wedding.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: { id: true, groomName: true, brideName: true },
  });

  if (!wedding) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Theo Dõi RSVP</h1>
      <p className="text-gray-500 mb-8">{wedding.groomName} & {wedding.brideName}</p>
      <RsvpTab weddingId={wedding.id} />
    </div>
  );
}
