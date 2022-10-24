import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Context
import { Modals } from '@/context'

function App({ Component, pageProps }: AppProps) {
  return (
    <Modals.ModalsProvider>
      <Component {...pageProps} />
    </Modals.ModalsProvider>
  )
}

export default App
