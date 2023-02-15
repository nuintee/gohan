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
    key: keyof Pick<DefaultGeolocationPosition, 'isError' | 'isFetching'>,
    bool: boolean,
  ) => {
    setGPS((prev) => ({ ...prev, [key]: bool }))
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
