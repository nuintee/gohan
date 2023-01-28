import { atom } from 'recoil'

// types
import { GeoJSON } from '../types/geojson'

export const directionsState = atom<GeoJSON>({
  key: 'directionsState',
  default: {
    source: {},
    layer: {},
    destination: [],
  },
})
