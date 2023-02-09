import useToast from '@/libs/react-toastify'

import { Coordinates } from '../schema/coordinates.schema'

import useMapBox from '@/features/mapbox/hooks'
import { trpc } from '@/libs/trpc'
import { useRecoilState } from 'recoil'
import { directionsState } from '../stores'
import useGeoJSON from './useGeoJSON'

const useGetDirections = (props: Coordinates[]) => {
  const { coords } = useMapBox()
  const [a, b = coords] = props

  return trpc.getDirections.useQuery([a, b as Required<typeof b>], {
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
  })
}

export default useGetDirections
