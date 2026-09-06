import { cn } from "@/lib/utils";

/** Nhãn nhỏ in hoa phía trên tiêu đề section, có dấu "✦" vàng đứng trước. */
export function Eyebrow({
  children,
  center,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[.14em] text-winglove-red-deep",
        center && "justify-center",
        className
      )}
    >
      <span aria-hidden="true" className="text-[11px] text-winglove-gold">
        ✦
      </span>
      {children}
    </p>
  );
}
