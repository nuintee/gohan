import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Context
import { Modals, Sidebar } from '@/context'

function App({ Component, pageProps }: AppProps) {
  return (
    <Modals.ModalsProvider>
      <Sidebar.SidebarProvider>
        <Component {...pageProps} />
      </Sidebar.SidebarProvider>
    </Modals.ModalsProvider>
  )
}

export default App
