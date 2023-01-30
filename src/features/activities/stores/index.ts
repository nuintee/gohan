import { atom } from 'recoil'

// types
import { ActivityResolved } from '../types'

export const activitiesState = atom<ActivityResolved[] | []>({
  key: 'activitiesState',
  default: [],
})
