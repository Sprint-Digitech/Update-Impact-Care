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

// trigger reload
// trigger reload 2
// trigger reload 3
// trigger reload 4
// trigger reload 5
// trigger reload 6
// trigger reload 7
// trigger reload 8
// trigger reload 9
// trigger reload 10
// trigger reload 11
// trigger reload 12
// trigger reload 13
// trigger reload 14
// trigger reload 15
// trigger reload 16
// trigger reload 17