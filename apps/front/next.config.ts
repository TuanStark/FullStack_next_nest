import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cai nay do anh lay tu tren mang ve nen can cau hinh,
  // sau nay nah khac thi cau hinh khac
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "leizouvjwnheowphsofz.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
