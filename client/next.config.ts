import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com",
      "public.blob.vercel-storage.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "lh3.googleusercontent.com", "i.pravatar.cc",
      'randomuser.me',
      'm.media-amazon.com',
      'brokebro.in', // Add production domain
      'www.brokebro.in', // Add www subdomain
      'vectorseek.com',
      'encrypted-tbn0.gstatic.com',
      'upload.wikimedia.org',
    ],

  },
  experimental: {
    esmExternals: "loose",
  },
  // Production-specific configurations
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.NODE_ENV === 'production' ? 'https://brokebro.in' : '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
