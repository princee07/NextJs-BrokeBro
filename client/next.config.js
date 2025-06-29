const nextConfig = {
  // ...existing config...
  images: {
    domains: [
      'soxytoes.com',
      'lh3.googleusercontent.com',
      'i.pravatar.cc', // allow pravatar for next/image
      // add more domains as needed
    ],
  },
};

module.exports = nextConfig;