// Stores
import { ActivityResolved } from '@/features/activities/types'
import { modalKeys, modalState } from '@/stores/modals'
import { useRecoilState } from 'recoil'

type ModalKey = typeof modalKeys[number]

type Payload<T extends ModalKey> = 'userauth' extends T
  ? {}
  : 'usersettings' extends T
  ? {}
  : 'usersignout' extends T
  ? {}
  : 'restaurantdiscovered' extends T
  ? ActivityResolved
  : {}

type ModalMapper = {
  restaurantdiscovered: ActivityResolved
  userauth: {}
  usersettings: {}
  usersignout: {}
}

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalState)

  /**
   * Checks if the target modal is open by given key
   */
  const isOpen = (key: ModalKey) => {
    return modals?.findIndex((v) => v.key === key) >= 0
  }

  const getPayload = (key: ModalKey) => {
    const data = modals?.find((v) => v.key === key)

    return data?.payload
  }

  const _append = (key: ModalKey, payload?: Payload<typeof key>) => {
    if (isOpen(key)) {
      setModals((prev) => prev.map((v) => (v.key === key ? { key, payload } : v)))
    } else {
      setModals((prev) => [...prev, { key, payload }])
    }
  }

  const _remove = (key: ModalKey) => {
    setModals((prev) => prev.filter((v) => v.key !== key))
  }

  const open = (key: ModalKey, payload?: Payload<typeof key>) => {
    _append(key, payload)
  }

  const close = (key: ModalKey) => {
    if (!isOpen(key)) return
    _remove(key)
  }

  const toggle = (key: ModalKey, payload?: Payload<typeof key>) => {
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
