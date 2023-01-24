import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import ErrorBoundary from '@/components/fallback/ErrorBoundary'
import { Session } from 'next-auth'
import { RecoilRoot } from 'recoil'

if (process.env.NODE_ENV === 'development') {
  import('@/mocks/worker').then((worker) => {
    worker.initMocks()
  })
}

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </RecoilRoot>
    </ErrorBoundary>
  )
}

export default App
