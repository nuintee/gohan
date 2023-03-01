import H from 'next/head'

type Props = {
  title?: string
  description?: string
  keyword?: string
  image?: string
  url?: string
}

const Head = ({ title = '', description = '', keyword = '', image = '', url = '' }: Props) => {
  return (
    <H>
      <title>Gohan | {title}</title>
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='keywords' content={keyword} />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content={title} />
      <meta name='twitter:url' content={image} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <link rel='canonical' href={url} />
    </H>
  )
}

export default Head
