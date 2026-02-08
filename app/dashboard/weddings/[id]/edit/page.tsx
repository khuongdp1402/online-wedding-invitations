export default function EditWeddingPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Chỉnh Sửa Thiệp Cưới
      </h1>
      <p className="text-gray-500">
        Form chỉnh sửa thông tin thiệp cưới - Phase 2
      </p>
    </div>
  );
}
