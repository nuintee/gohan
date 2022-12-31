import InitialValues from '@/components/Toast/types'
const modes = ['success', 'error'] as const

const initialValues: InitialValues = {
  isOpen: false,
  mode: 'success',
  main: 'MODAL',
  onClose: () => {},
}

export { modes, initialValues }
