import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khwjpdbckcgurxzawxie.supabase.co",
      },
    ],
  },
};

export default nextConfig;
