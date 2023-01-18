/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    })
    return config
  },
  images: {
    disableStaticImages: true, // importした画像の型定義設定を無効にする
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
