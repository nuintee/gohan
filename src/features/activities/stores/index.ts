import { atom } from 'recoil'

// types
import { ActivityResolved } from '../types'

export const activityPanelState = atom<{ isOpen: boolean }>({
  key: 'activityPanelState',
  default: {
    isOpen: false,
  },
})
