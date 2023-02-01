import { atom } from 'recoil'

export const modalKeys = [
  'userauth',
  'usersettings',
  'usersignout',
  'restaurantdiscovered',
] as const

type Managed = {
  key: typeof modalKeys[number]
  payload?: {}
}[]

export const modalState = atom<Managed>({
  key: 'modalState',
  default: [],
})
