import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { EditWeddingForm } from "@/components/dashboard/EditWeddingForm";

export default async function EditWeddingPage({
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

  const weddingData = JSON.parse(JSON.stringify(wedding));

  return (
    <div>
      <EditWeddingForm
        wedding={weddingData}
        templateSlug={wedding.template.slug}
        template={{
          price: wedding.template.price,
          salePrice: wedding.template.salePrice,
          saleStartsAt: wedding.template.saleStartsAt,
          saleEndsAt: wedding.template.saleEndsAt,
        }}
      />
    </div>
  );
}
