// Stores
import { modalKeys, modalState } from '@/stores/modals'
import { useRecoilState } from 'recoil'

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalState)

  /**
   * Checks if the target modal is open by given key
   */
  const isOpen = (key: typeof modalKeys[number]) => {
    return modals?.findIndex((v) => v.key === key) >= 0
  }

  const getPayload = (key: typeof modalKeys[number]) => {
    const data = modals?.find((v) => v.key === key)
    return data?.payload
  }

  const _append = (key: typeof modalKeys[number], payload) => {
    if (isOpen(key)) {
      setModals((prev) => prev.map((v) => (v.key === key ? { key, payload } : v)))
    } else {
      setModals((prev) => [...prev, { key, payload }])
    }
  }

  const _remove = (key: typeof modalKeys[number]) => {
    setModals((prev) => prev.filter((v) => v.key !== key))
  }

  const open = (key: typeof modalKeys[number], payload?) => {
    _append(key, payload)
  }

  const close = (key: typeof modalKeys[number]) => {
    if (!isOpen(key)) return
    _remove(key)
  }

  const toggle = (key: typeof modalKeys[number], payload?) => {
    if (isOpen(key)) {
      close(key)
    } else {
      open(key, payload)
    }
  }

  const closeAll = () => {
    setModals((prev) => [])
  }

  return { open, close, toggle, closeAll, isOpen, getPayload }
}

export default useModals
