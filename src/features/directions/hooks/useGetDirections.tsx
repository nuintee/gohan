import useToast from '@/libs/react-toastify'

import { Coordinates } from '../schema/coordinates.schema'
import { DirectionsInput } from '@/features/directions/schema/directions.schema'

import useMapBox from '@/features/mapbox/hooks'
import { trpc } from '@/libs/trpc'
import { useRecoilState } from 'recoil'
import { directionsState } from '../stores'
import useGeoJSON from './useGeoJSON'

const useGetDirections = (props: DirectionsInput) => {
  const { coords } = useMapBox()
  const { start = coords as Required<Coordinates>, destination } = props

  return trpc.getDirections.useQuery(
    { start, destination },
    {
      enabled: false,
      onError: (error) => {
        console.error(error)

        if (error instanceof Error) {
          useToast.error(error.message)
        }
      },
      onSuccess: (data) => {
        console.log(data)
      },
    },
  )
}

export default useGetDirections
