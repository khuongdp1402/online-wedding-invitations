import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewWeddingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Tạo Thiệp Cưới Mới
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Chọn Mẫu Thiệp</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Chọn một mẫu thiệp để bắt đầu. Bạn có thể thay đổi mẫu thiệp sau.
          </p>
          {/* Template picker will be added in Phase 2 */}
        </CardContent>
      </Card>
    </div>
  );
}
