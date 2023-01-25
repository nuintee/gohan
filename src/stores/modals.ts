import { atom } from 'recoil'

const modalKeys = ['userauth', 'usersettings', 'usersignout', 'restaurantdiscovered', ''] as const

export const modalState = atom<{
  modalKey: typeof modalKeys[number][]
}>({
  key: 'modalState',
  default: {
    modalKey: [''],
  },
})
