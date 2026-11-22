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
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/images/template-previews/:path*",
          destination: "https://cdn.thieponline.app/images/template-previews/:path*",
        },
        {
          source: "/images/template-showcase/:path*",
          destination: "https://cdn.thieponline.app/images/template-showcase/:path*",
        },
        {
          source: "/images/:path*",
          destination: "https://thieponline.app/images/:path*",
        },
        {
          source: "/font/:path*",
          destination: "https://thieponline.app/font/:path*",
        },
        {
          source: "/music/:track",
          destination: "https://music.thieponline.app/library/:track",
        },
      ],
    };
  },
};

export default nextConfig;
