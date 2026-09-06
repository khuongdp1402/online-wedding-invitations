/**
 * Logo Winglove dùng chung cho toàn site (Navbar, Footer, trang đăng
 * nhập/đăng ký, sidebar dashboard...) — biểu tượng "trái tim từ đôi cánh"
 * (2 cánh chụm lại tạo hình trái tim, các nét mảnh mô phỏng lông vũ) +
 * wordmark "Winglove".
 *
 * `variant="dark"` dùng trên nền tối (footer, sidebar tối...) để wordmark
 * đủ tương phản; mặc định `variant="light"` dùng trên nền sáng.
 */
type WingloveLogoProps = {
  className?: string;
  iconClassName?: string;
  /** Kích thước icon (px). Mặc định 24. */
  size?: number;
  /** Ẩn wordmark, chỉ hiện icon — dùng cho chỗ chật (favicon-style, mobile). */
  iconOnly?: boolean;
  variant?: "light" | "dark";
};

export function WingloveMark({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 29"
      width={size}
      height={(size * 29) / 32}
      fill="none"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="wingloveGoldInline" x1="16" y1="0" x2="16" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F3D98B" />
          <stop offset="100%" stopColor="#B8862E" />
        </linearGradient>
      </defs>
      <path
        d="M23.6 0C21.2 0 18.9 1.2 17.4 3.1L16 4.9L14.6 3.1C13.1 1.2 10.8 0 8.4 0C4 0 0.4 3.6 0.4 8C0.4 9.9 1 11.6 2.1 13.1C4.9 17.3 9.9 21.6 16 27C22.1 21.6 27.1 17.3 29.9 13.1C31 11.6 31.6 9.9 31.6 8C31.6 3.6 28 0 23.6 0Z"
        fill="url(#wingloveGoldInline)"
      />
      <g stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" fill="none">
        <path d="M3 4.2 Q6.2 2.3 9.3 4.2" />
        <path d="M2.1 7.1 Q6 5 10.1 7.1" />
        <path d="M2 10 Q6 7.8 11 10" />
        <path d="M29 4.2 Q25.8 2.3 22.7 4.2" />
        <path d="M29.9 7.1 Q26 5 21.9 7.1" />
        <path d="M30 10 Q26 7.8 21 10" />
      </g>
    </svg>
  );
}

export function WingloveLogo({
  className = "",
  iconClassName = "",
  size = 24,
  iconOnly = false,
  variant = "light",
}: WingloveLogoProps) {
  const wingText = variant === "dark" ? "text-white" : "text-gray-900";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <WingloveMark size={size} className={`shrink-0 ${iconClassName}`} />
      {!iconOnly && (
        <span className="text-xl font-bold tracking-tight">
          <span className={wingText}>Wing</span>
          <span className="text-winglove-red">love</span>
        </span>
      )}
    </span>
  );
}
