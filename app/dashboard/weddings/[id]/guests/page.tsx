export default function GuestsPage({
  params: _params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Quản Lý Khách Mời
      </h1>
      <p className="text-gray-500">Guest management - Phase 3</p>
    </div>
  );
}
