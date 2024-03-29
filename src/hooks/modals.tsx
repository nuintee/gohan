// Stores
import { ActivityResolved } from '@/features/activities/types'
import { modalKeys, modalState } from '@/stores/modals'
import { useRecoilState } from 'recoil'

type ModalKey = typeof modalKeys[number]

type ModalMapper = {
  restaurantdiscovered: ActivityResolved
}

type ModalData<TData> = TData extends keyof ModalMapper ? ModalMapper[TData] : {}

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalState)

  /**
   * Checks if the target modal is open by given key
   */
  const isOpen = (key: ModalKey) => {
    return modals?.findIndex((v) => v.key === key) >= 0
  }

  const getPayload = <T extends ModalKey>(key: T): ModalData<T> => {
    const data = modals?.find((v) => v.key === key)

    return data?.payload as ModalData<T>
  }

  const _append = <T extends ModalKey>(key: T, payload?: ModalData<T>) => {
    if (isOpen(key)) {
      setModals((prev) => prev.map((v) => (v.key === key ? { key, payload } : v)))
    } else {
      setModals((prev) => [...prev, { key, payload }])
    }
  }

  const _remove = (key: ModalKey) => {
    setModals((prev) => prev.filter((v) => v.key !== key))
  }

  const open = <T extends ModalKey>(key: T, payload?: ModalData<T>) => {
    _append(key, payload)
  }

  const close = (key: ModalKey) => {
    if (!isOpen(key)) return
    _remove(key)
  }

  const toggle = <T extends ModalKey>(key: T, payload?: ModalData<T>) => {
    if (isOpen(key)) {
      close(key)
    } else {
      open(key, payload)
    }
  }

  const closeAll = () => {
    setModals(() => [])
  }

  return { open, close, toggle, closeAll, isOpen, getPayload }
}

export default useModals
