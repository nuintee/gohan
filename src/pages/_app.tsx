import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Context
import { Modals, Sidebar, Toast } from '@/context'

function App({ Component, pageProps }: AppProps) {
  return (
    <Toast.ToastProvider>
      <Modals.ModalsProvider>
        <Sidebar.SidebarProvider>
          <Component {...pageProps} />
        </Sidebar.SidebarProvider>
      </Modals.ModalsProvider>
    </Toast.ToastProvider>
  )
}

export default App
