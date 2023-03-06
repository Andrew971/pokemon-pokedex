/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['andrew-pokemon.s3.amazonaws.com'],
  },
}

module.exports = nextConfig