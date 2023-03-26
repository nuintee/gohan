import { atom } from 'recoil'

export const activityPanelState = atom<{ isOpen: boolean }>({
  key: 'activityPanelState',
  default: {
    isOpen: true,
  },
})
