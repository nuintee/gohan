import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

// Context
import { Modals, Sidebar, Toast } from '@/context'
import { Session } from 'next-auth'

if (process.env.NODE_ENV === 'development') {
  import('@/mocks/worker').then((worker) => {
    worker.initMocks()
  })
}

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toast.ToastProvider>
        <Modals.ModalsProvider>
          <Sidebar.SidebarProvider>
            <Component {...pageProps} />
          </Sidebar.SidebarProvider>
        </Modals.ModalsProvider>
      </Toast.ToastProvider>
    </SessionProvider>
  )
}

export default App
