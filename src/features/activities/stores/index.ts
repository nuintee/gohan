import { atom } from 'recoil'

// types
import { ActivityResolved } from '../types'

export const directionsState = atom<ActivityResolved | {}>({
  key: 'directionsState',
  default: {},
})
