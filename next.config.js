/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "images.unsplash.com",
      "static.wixstatic.com",
    ],
  },
};

const SITE_NAME = process.env.SITE_NAME || "Logo";

module.exports = {
  ...nextConfig,
  env: {
    SITE_NAME,
  },
};
