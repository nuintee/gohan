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
import { trpc } from '@/libs/trpc'
import { ToastCatcher } from '@/components/ui'

if (process.env.NODE_ENV === 'development') {
  import('@/mocks/worker').then((worker) => {
    worker.initMocks()
  })
}

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session}>
            <main className={`font-poppins h-screen w-screen`}>
              <Component {...pageProps} />
              <ToastCatcher position='top-center' />
            </main>
            <ReactQueryDevtools />
          </SessionProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  )
}

export default trpc.withTRPC(App)
