const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      reactRemoveProperties: {
        properties: ['^data-testid$'],
      },
      removeConsole: true,
    },
  }),
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { nextRuntime }) => {
    if (nextRuntime !== 'nodejs') return config
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '3000',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return process.env.NEXT_PUBLIC_IS_MAINTENANCE == 'true'
      ? [
          {
            source: '/((?!maintenance$).*$)',
            statusCode: 302,
            destination: '/maintenance',
            permanent: false,
          },
        ]
      : []
  },
}

module.exports = withPWA(nextConfig)
