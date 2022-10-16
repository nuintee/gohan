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
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@/components': path.resolve(__dirname, '../src/components'),
    // }

    // config.module.rules = config.module.rules.map((rule) => {
    //   if (
    //     String(rule.test) ===
    //     String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/)
    //   ) {
    //     return {
    //       ...rule,
    //       test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
    //     }
    //   }

    //   return rule
    // })

    // return config
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, '../src/components'),
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
      ],
    })
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/
    return config
  },
}
