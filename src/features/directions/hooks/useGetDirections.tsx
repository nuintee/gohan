import useToast from '@/libs/react-toastify'

import { Coordinates } from '../schema/coordinates.schema'
import { DirectionsInput } from '@/features/directions/schema/directions.schema'

import useMapBox from '@/features/mapbox/hooks'
import { trpc } from '@/libs/trpc'
import { useRecoilState } from 'recoil'
import { directionsState } from '../stores'
import useGeoJSON from './useGeoJSON'
import { DirectionsAPI } from '../types/api'

const useGetDirections = (
  props: DirectionsInput,
  successCallback: (data: DirectionsAPI) => void,
) => {
  const { coords } = useMapBox()
  const { start = coords, destination } = props

  const isGPSValid = start.latitude && start.longitude

  return trpc.getDirections.useQuery(
    { start, destination },
    {
      enabled: false,
      retry: isGPSValid ? 3 : 0,
      onError: (error) => {
        console.error(error)

        if (error instanceof Error) {
          const message = !isGPSValid ? `Please allow user geolocaiton tracking` : error.message

          useToast.error(message)
        }
      },
      onSuccess: (data) => {
        successCallback(data)
        console.log(data)
      },
    },
  )
}

export default useGetDirections
