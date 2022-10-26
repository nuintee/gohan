import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Context
import { Modals, Sidebar, Toast, GeoLocation } from '@/context'

function App({ Component, pageProps }: AppProps) {
  return (
    <GeoLocation.GeoLocationProvider>
      <Toast.ToastProvider>
        <Modals.ModalsProvider>
          <Sidebar.SidebarProvider>
            <Component {...pageProps} />
          </Sidebar.SidebarProvider>
        </Modals.ModalsProvider>
      </Toast.ToastProvider>
    </GeoLocation.GeoLocationProvider>
  )
}

export default App
