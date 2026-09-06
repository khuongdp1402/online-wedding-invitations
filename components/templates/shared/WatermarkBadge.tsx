type WatermarkBadgeProps = {
  className?: string;
};

/** Nhãn nhỏ hiển thị ở footer thiệp khi dùng gói Miễn Phí, khuyến khích nâng cấp. */
export function WatermarkBadge({ className }: WatermarkBadgeProps) {
  return (
    <p className={`text-xs tracking-wide opacity-60 ${className ?? ""}`}>
      ✨ Tạo bởi{" "}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-100"
      >
        Winglove
      </a>
    </p>
  );
}
