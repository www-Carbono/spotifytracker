/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp'
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co'
      }
    ]
  }
}

export default nextConfig
