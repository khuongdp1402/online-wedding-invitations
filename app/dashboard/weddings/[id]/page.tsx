import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WeddingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Chi Tiết Thiệp Cưới
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Wedding ID: {params.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Chi tiết thiệp cưới sẽ được hiển thị ở đây.
          </p>
          {/* Wedding detail tabs will be added in Phase 2 */}
        </CardContent>
      </Card>
    </div>
  );
}
