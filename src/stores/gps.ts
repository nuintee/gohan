import { atom } from 'recoil'

export type DefaultGeolocationPosition = {
  coords: Partial<GeolocationPosition['coords']>
  timestamp: GeolocationPosition['timestamp']
  isFetching: boolean
  isError: boolean
  error?: string | null
}

export const gpsState = atom<DefaultGeolocationPosition>({
  key: 'gpsState',
  default: {
    coords: {
      accuracy: undefined,
      latitude: undefined,
      longitude: undefined,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: new Date().getMilliseconds(),
    isFetching: true,
    isError: false,
    error: '',
  },
})
