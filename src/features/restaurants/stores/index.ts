import { atom } from 'recoil'

// types
import { RestaurantData } from '../types'

export const restaurantsState = atom<RestaurantData | {}>({
  key: 'restaurantsState',
  default: {},
})
