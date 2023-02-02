import { useMutation, useQueryClient } from '@tanstack/react-query'
import useToast from '@/libs/react-toastify'

import { Props } from '../schema/getDirections.schema'

// Env
import { QUERY_KEY } from '@/features/directions/constants'
import useMapBox from '@/features/mapbox/hooks'

const useClearDirections = (points: Pick<Props, 'start' | 'end'>) => {
  const queryClient = useQueryClient()
  const { coords, coordAsString } = useMapBox()

  const {
    start = coordAsString(coords as Pick<GeolocationCoordinates, 'latitude' | 'longitude'>),
    end,
  } = points

  return useMutation({
    mutationKey: [QUERY_KEY, { start, end }],
    mutationFn: async () => {
      return {} // clear restaurant
    },
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY])
    },
  })
}

export default useClearDirections
