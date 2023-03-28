import H from 'next/head'

type Props = {
  title?: string
  description?: string
  keyword?: string
  image?: string
  url?: string
  locale?: string
}

const Head = ({
  title = 'Gohan',
  description = '本サービス"Gohan"はユーザーの位置情報を元に、周辺のレストランをランダムで紹介するものです。ログイン時は履歴の確認・マイ評価の追加をしてレストランを管理する事ができます。',
  keyword = '',
  image = '/icon-512x512.png',
  url = '/',
  locale = 'ja_JP',
}: Props) => {
  return (
    <H>
      <title>{title}</title>
      <meta property='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='keywords' content={keyword} />
      <meta property='og:locale' content={locale} />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content={title} />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <link rel='canonical' href={url} />
    </H>
  )
}

export default Head
