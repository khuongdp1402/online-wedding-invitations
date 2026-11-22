import { redirect } from "next/navigation";

export default function CreateWeddingRedirectPage({
  searchParams,
}: {
  searchParams?: { template?: string };
}) {
  const target = searchParams?.template
    ? `/dashboard/weddings/new?template=${encodeURIComponent(searchParams.template)}`
    : "/dashboard/weddings/new";
  redirect(target);
}
