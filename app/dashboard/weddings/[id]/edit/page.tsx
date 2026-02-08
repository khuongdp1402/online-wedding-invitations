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
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Chỉnh Sửa Thiệp</h1>
      <p className="text-gray-500 mb-8">
        {wedding.groomName} & {wedding.brideName}
      </p>
      <EditWeddingForm wedding={weddingData} />
    </div>
  );
}
