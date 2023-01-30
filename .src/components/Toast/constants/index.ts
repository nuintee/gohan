import InitialValues from '@/components/Toast/types'
const modes = ['success', 'error'] as const

const initialValues: InitialValues = {
  isOpen: false,
  mode: 'success',
  main: 'MODAL',
  onClose: () => {},
  sub: '',
  infinite: false,
  timeout: 1000, // Millisecond
}

export { modes, initialValues }
