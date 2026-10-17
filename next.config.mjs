/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Project images are served from /public; keep local optimization on.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
