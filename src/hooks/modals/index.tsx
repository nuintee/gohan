// Stores
import { modalState } from '@/stores/modals'
import { useRecoilState } from 'recoil'

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalState)

  const open = (key: typeof modals.modalKey[number]) => {
    if (modals.modalKey.includes(key)) return

    setModals((prev) => ({ ...prev, modalKey: [...prev.modalKey, key] }))
  }

  const close = (key: typeof modals.modalKey[number]) => {
    if (!modals.modalKey.includes(key)) return
    setModals((prev) => ({ ...prev, modalKey: prev.modalKey.filter((v) => v != key) }))
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

  return { open, close, toggle, closeAll }
}

export default useModals
