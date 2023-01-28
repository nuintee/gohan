import { ViewState } from 'react-map-gl'
import { atom } from 'recoil'

export const mapBoxState = atom<{
  viewState: Partial<ViewState>
  coords: Partial<GeolocationCoordinates>
}>({
  key: 'directionsState',
  default: {
    viewState: {},
    coords: {},
  },
})
