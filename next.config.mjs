/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.gravatar.com",
      "cdn.cloudflare.steamstatic.com",
      "res.cloudinary.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
