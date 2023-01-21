const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/**/**/*.stories.(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/assets': path.resolve(__dirname, '../src/assets'),
      '@/icons': path.resolve(__dirname, '../src/icons'),
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
      '@/context': path.resolve(__dirname, '../src/context'),
      '@/constants': path.resolve(__dirname, '../src/constants'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@/data': path.resolve(__dirname, '../src/data'),
      '@/config': path.resolve(__dirname, '../src/config'),
      '@/features': path.resolve(__dirname, '../src/features'),
    }

    config.resolve.modules = [...(config.resolve.modules || []), path.resolve('./')] // 絶対パスでimportできるようにする
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false, // 圧縮無効
          },
        },
        {
          loader: 'url-loader',
        },
      ],
    })

    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/

    return config
  },
}
