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

import { AnimatePresence } from 'framer-motion'

// Override
import '@/utils/__arrayOverride__'
import { NextPage } from 'next'
import { ReactElement, ReactNode, use, useEffect } from 'react'
import { IS_DEVMODE } from '@/config/env'

if (IS_DEVMODE) {
  require('@/mocks/worker')
}

const queryClient = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session}>
            <main className={`font-poppins h-screen w-screen overflow-hidden`}>
              <AnimatePresence mode='wait' initial={false}>
                {getLayout(<Component {...pageProps} key={router.pathname} />)}
              </AnimatePresence>
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
