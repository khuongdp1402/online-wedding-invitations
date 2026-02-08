import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { PublishPage } from "@/components/dashboard/PublishPage";

export default async function WeddingPublishPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const wedding = await prisma.wedding.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: {
      id: true,
      slug: true,
      status: true,
      plan: true,
      groomName: true,
      brideName: true,
    },
  });

  if (!wedding) notFound();

  const weddingData = JSON.parse(JSON.stringify(wedding));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Xuất Bản Thiệp Cưới</h1>
      <p className="text-gray-500 mb-8">
        {wedding.groomName} & {wedding.brideName}
      </p>
      <PublishPage wedding={weddingData} />
    </div>
  );
}
