import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import ErrorBoundary from '@/components/fallback/ErrorBoundary'

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ErrorBoundary>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ErrorBoundary>
  )
}

export default App
