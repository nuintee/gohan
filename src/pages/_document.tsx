import { IS_PRODMODE } from '@/config/env'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  componentDidMount(): void {}

  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png'></link>
          <meta name='theme-color' content='#fff' />
          <link rel='icon' href='prod_favicon.svg' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
            rel='stylesheet'
          />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@tcr_jp' />
          <meta property='og:type' content='blog' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
