import { Coordinates } from '@/features/directions/schema/coordinates.schema'
import { ViewState } from 'react-map-gl'
import { atom } from 'recoil'

export const mapBoxState = atom<{
  viewState: Partial<ViewState>
  coords: Partial<Coordinates>
  isLoadingUserLocation: boolean
}>({
  key: 'directionsState',
  default: {
    viewState: {},
    coords: {},
    isLoadingUserLocation: false,
  },
})
