import '../styles/globals.css'
import '../styles/modals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import ErrorBoundary from '@/components/fallback/ErrorBoundary'
import { Session } from 'next-auth'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

if (process.env.NODE_ENV === 'development') {
  import('@/mocks/worker').then((worker) => {
    worker.initMocks()
  })
}

const queryClient = new QueryClient()

if (typeof window !== 'undefined') {
  navigator.geolocation.getCurrentPosition = (success, error) => {
    success({
      coords: {
        latitude: 45.4111,
        longitude: -75.6981,
        altitude: 10,
        accuracy: 10,
        altitudeAccuracy: 10,
        heading: 10,
        speed: 10,
      },
      timestamp: 10,
    })
  }

  navigator.geolocation.watchPosition = (success, error) => {
    success({
      coords: {
        latitude: 45.4111,
        longitude: -75.6981,
        altitude: 10,
        accuracy: 10,
        altitudeAccuracy: 10,
        heading: 10,
        speed: 10,
      },
      timestamp: 10,
    })
  }
}

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </SessionProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  )
}

export default App
