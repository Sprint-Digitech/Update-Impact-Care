import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "/assets/uploads/:path*",
      },
      {
        source: "/wp-content/themes/dispnsary/:path*",
        destination: "/assets/theme/:path*",
      },
      {
        source: "/wp-content/plugins/:path*",
        destination: "/vendor/plugins/:path*",
      },
      {
        source: "/wp-includes/:path*",
        destination: "/vendor/wp-includes/:path*",
      },
      {
        source: "/wp-admin/admin-ajax.php",
        destination: "/api/admin-ajax",
      },
      {
        source: "/wp-json/:path*",
        destination: "/api/wp-json/:path*",
      },
    ];
  },
};

export default nextConfig;
