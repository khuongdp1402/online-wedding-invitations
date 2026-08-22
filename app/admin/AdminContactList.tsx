import { getSectionDef } from "@/lib/section-registry";

type ContactRow = {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
  context: unknown;
  wedding: { slug: string; groomName: string; brideName: string } | null;
};

const STATUS_CLASS: Record<string, string> = {
  NEW: "bg-rose-100 text-rose-700",
  CONTACTED: "bg-sky-100 text-sky-700",
  CLOSED: "bg-gray-100 text-gray-600",
};

const STATUS_LABEL: Record<string, string> = {
  NEW: "Mới",
  CONTACTED: "Đã liên hệ",
  CLOSED: "Đã xong",
};

function contextSummary(context: unknown): string | null {
  if (typeof context !== "object" || context === null) return null;
  const { templateSlug, enabledSections } = context as {
    templateSlug?: string;
    enabledSections?: string[];
  };
  const parts: string[] = [];
  if (templateSlug) parts.push(`Mẫu: ${templateSlug}`);
  if (enabledSections?.length) {
    parts.push(
      `Khối: ${enabledSections.map((k) => getSectionDef(k).label).join(", ")}`
    );
  }
  return parts.length > 0 ? parts.join(" · ") : null;
}

export function AdminContactList({ contacts }: { contacts: ContactRow[] }) {
  if (contacts.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 text-sm text-gray-500 text-center">
        Chưa có yêu cầu liên hệ nào.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((c) => {
        const summary = contextSummary(c.context);
        return (
          <div key={c.id} className="rounded-lg border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900">{c.name}</span>
                  <a
                    href={`tel:${c.phone}`}
                    className="text-sm text-rose-600 hover:underline"
                  >
                    {c.phone}
                  </a>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      STATUS_CLASS[c.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {STATUS_LABEL[c.status] ?? c.status}
                  </span>
                </div>
                {c.wedding && (
                  <p className="text-xs text-gray-500 mt-1">
                    Thiệp: {c.wedding.groomName} &amp; {c.wedding.brideName} (
                    {c.wedding.slug})
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400 shrink-0">
                {new Date(c.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap">
              {c.message}
            </p>

            {summary && (
              <p className="text-[11px] text-gray-500 mt-3 pt-3 border-t">
                {summary}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
