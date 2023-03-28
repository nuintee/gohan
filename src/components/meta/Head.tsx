import { BASE_URL } from '@/config/env'
import H from 'next/head'
import { useRouter } from 'next/router'

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
  description = 'Gohanはユーザーの位置情報を元に、周辺のレストランをランダムで紹介するサービスです。ログイン時は履歴の確認・マイ評価の追加をしてレストランを管理する事ができます。',
  keyword = '',
  image = '/ogp-image.png',
  locale = 'ja_JP',
}: Props) => {
  const router = useRouter()
  const url = `${BASE_URL}${router.asPath}`

  return (
    <H>
      {/* Due to HTML comment in title issue */}
      <title>{typeof location !== 'undefined' ? title : 'Gohan'}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='keywords' content={keyword} />
      <meta property='og:locale' content={locale} />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content={title} />
      <meta property='fb:admins' content={''} />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <link rel='canonical' href={url} />
    </H>
  )
}

export default Head
