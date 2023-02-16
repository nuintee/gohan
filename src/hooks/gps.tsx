import { DefaultGeolocationPosition, gpsState } from '@/stores/gps'
import { useRecoilState } from 'recoil'

const useGPS = () => {
  const [gps, setGPS] = useRecoilState(gpsState)

  const isGPSError = gps.isError

  const isGPSFetching = gps.isFetching

  const updateSafeGeolocation = (payload: Partial<DefaultGeolocationPosition>) => {
    setGPS((prev) => ({ ...prev, ...payload }))
  }

  const updateGeolocationStatus = (
    payload: Record<keyof Pick<DefaultGeolocationPosition, 'isError' | 'isFetching'>, boolean>,
  ) => {
    updateSafeGeolocation(payload)
  }

  return {
    gps,
    setGPSDangerously: setGPS,
    isGPSError,
    isGPSFetching,
    updateGeolocationStatus,
    updateSafeGeolocation,
  }
}

export default useGPS
