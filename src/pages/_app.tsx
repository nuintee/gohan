import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

// Context
import { MapBox, Modals, Sidebar, Toast, GPS, Restaurants } from '@/context'
import { Session } from 'next-auth'

if (process.env.NODE_ENV === 'development') {
  import('@/mocks/worker').then((worker) => {
    worker.initMocks()
  })
}

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <GPS.GPSProvider>
        <Toast.ToastProvider>
          <MapBox.MapBoxProvider>
            <Modals.ModalsProvider>
              <Sidebar.SidebarProvider>
                <Restaurants.RestaurantsProvider>
                  <Component {...pageProps} />
                </Restaurants.RestaurantsProvider>
              </Sidebar.SidebarProvider>
            </Modals.ModalsProvider>
          </MapBox.MapBoxProvider>
        </Toast.ToastProvider>
      </GPS.GPSProvider>
    </SessionProvider>
  )
}

export default App
