/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['pps.whatsapp.net'],
  },

}

module.exports = nextConfig
