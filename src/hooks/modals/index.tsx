// Stores
import { modalState } from '@/stores/modals'
import { useRecoilState } from 'recoil'

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalState)

  /**
   * Checks if the target modal is open by given key
   */
  const isOpen = (key: typeof modals.modalKey[number]) => {
    return modals.modalKey.includes(key)
  }

  const _appendKey = (key: typeof modals.modalKey[number]) => {
    setModals((prev) => ({ ...prev, modalKey: [...prev.modalKey.filter((v) => v !== key), key] })) // appending while keeping unique
  }

  const _removeKey = (key: typeof modals.modalKey[number]) => {
    setModals((prev) => ({ ...prev, modalKey: prev.modalKey.filter((v) => v != key) }))
  }

  const open = (key: typeof modals.modalKey[number]) => {
    if (isOpen(key)) return
    _appendKey(key)
  }

  const close = (key: typeof modals.modalKey[number]) => {
    if (!isOpen(key)) return
    _removeKey(key)
  }

  const toggle = (key: typeof modals.modalKey[number]) => {
    if (modals.modalKey.includes(key)) {
      close(key)
    } else {
      open(key)
    }
  }

  const closeAll = () => {
    setModals((prev) => ({ ...prev, modalKey: [''] }))
  }

  return { open, close, toggle, closeAll, isOpen }
}

export default useModals
