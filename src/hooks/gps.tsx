import { gpsState } from '@/stores/gps'
import { useRecoilState } from 'recoil'

const useGPS = () => {
  const [gps, setGPS] = useRecoilState(gpsState)

  return { gps, setGPS }
}

export default useGPS
