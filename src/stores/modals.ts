import { atom } from 'recoil'

export const modalState = atom<{
  modalKey: 'userauth' | 'usersettings' | 'usersignout' | 'restaurantdiscovered' | ''
}>({
  key: 'modalState',
  default: {
    modalKey: '',
  },
})
