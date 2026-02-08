export default function PreviewPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Xem Trước Thiệp
      </h1>
      <p className="text-gray-500">Preview page - Phase 2</p>
    </div>
  );
}
