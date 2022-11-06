import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'

// Context
import { Modals, Sidebar, Toast, GeoLocation } from '@/context'

if (process.env.NODE_ENV === 'development') {
  import('@/mocks/worker').then((worker) => {
    worker.initMocks()
  })
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Toast.ToastProvider>
      <GeoLocation.GeoLocationProvider>
        <Modals.ModalsProvider>
          <Sidebar.SidebarProvider>
            <Component {...pageProps} />
          </Sidebar.SidebarProvider>
        </Modals.ModalsProvider>
      </GeoLocation.GeoLocationProvider>
    </Toast.ToastProvider>
  )
}

export default App
