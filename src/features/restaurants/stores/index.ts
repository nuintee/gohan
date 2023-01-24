import { atom } from 'recoil'

// types
import { RestaurantData } from '../types'

export const directionsState = atom<RestaurantData | {}>({
  key: 'directionsState',
  default: {},
})
