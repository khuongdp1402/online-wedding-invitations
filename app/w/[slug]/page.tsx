import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Thiệp Cưới - ${params.slug}`,
    description: "Thiệp cưới online được tạo bởi Thiệp Cưới Online",
  };
}

export default function PublicWeddingPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thiệp Cưới: {params.slug}
        </h1>
        <p className="text-gray-500">
          Public wedding page sẽ được triển khai ở Phase 3
        </p>
      </div>
    </div>
  );
}
