import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "i.pravatar.cc"],
  },
  transpilePackages: ["framer-motion"],
  experimental: {
    esmExternals: false,
  },
};

export default nextConfig;
