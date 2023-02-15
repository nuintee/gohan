import { atom } from 'recoil'

type DefaultGeolocationPosition = {
  coords: Partial<GeolocationPosition['coords']>
  timestamp: GeolocationPosition['timestamp']
  isFetching: boolean
}

export const gpsState = atom<DefaultGeolocationPosition>({
  key: 'gpsState',
  default: {
    coords: {
      accuracy: undefined,
      latitude: undefined,
      longitude: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: new Date().getMilliseconds(),
    isFetching: true,
  },
})
