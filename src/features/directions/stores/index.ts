import { atom } from 'recoil'

// types
import { GEOJSON } from '../types/geojson'

export const directionsState = atom<GEOJSON>({
  key: 'directionsState',
  default: {
    source: {},
    layer: {},
  },
})
