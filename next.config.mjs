/**
 * Host S3/MinIO public (ảnh người dùng upload) — lấy từ S3_PUBLIC_URL lúc build/start.
 * Trả về [] nếu không set hoặc URL không hợp lệ.
 */
function s3RemotePatterns() {
  const raw = process.env.S3_PUBLIC_URL;
  if (!raw) return [];
  try {
    const u = new URL(raw);
    const protocol = u.protocol.replace(":", "");
    if (protocol !== "http" && protocol !== "https") return [];
    return [{ protocol, hostname: u.hostname, ...(u.port && { port: u.port }) }];
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9010",
      },
      {
        protocol: "http",
        hostname: "minio",
        port: "9000",
      },
      // Không dùng wildcard "**": nó biến /_next/image thành open proxy.
      // Hiện mọi <Image> với URL tuyệt đối đều `unoptimized`, danh sách này chỉ
      // là các host hợp lệ nếu sau này bật tối ưu ảnh.
      ...s3RemotePatterns(),
      { protocol: "https", hostname: "img.vietqr.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // Template assets (images, fonts, music) are self-hosted under public/ —
  // no fallback proxy to any external host.
};

export default nextConfig;
