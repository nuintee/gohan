import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Hooks
import useModals from '@/hooks/context/Modals'

// Component
import Modal from '@/components/Modal'

// Context
import { Modals } from '@/context'

function App({ Component, pageProps }: AppProps) {
  const { modalsState, setModalsState } = useModals()

  return (
    <Modals.ModalsProvider>
      <Component {...pageProps} />
      <Modal.User isOpen={modalsState.user.isOpen} onClose={() => {}} />
      <Modal.Details isOpen={modalsState.details.isOpen} />
      <Modal.Confirm isOpen={modalsState.confirm.isOpen} type={'like'} onClose={() => {}} />
    </Modals.ModalsProvider>
  )
}

export default App
