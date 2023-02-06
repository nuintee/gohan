import { useQuery } from '@tanstack/react-query'
import { DirectionsAPI } from '../types/api'
import useToast from '@/libs/react-toastify'

import { Props } from '../schema/getDirections.schema'

// Env
import { QUERY_KEY } from '@/features/directions/constants'
import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useMapBox from '@/features/mapbox/hooks'
import { trpc } from '@/libs/trpc'

const fetcher = ({ start, end }: { start: string; end: string }) => {
  return axios
    .get(`${BASE_URL}/api/v1/directions?start=${start}&end=${end}`)
    .then((res) => res.data)
}

// const useGetDirections = (points: Partial<Pick<Props, 'start' | 'end'>>) => {
//   const { coords, coordAsString } = useMapBox()
//   const {
//     start = coordAsString(coords as Pick<GeolocationCoordinates, 'latitude' | 'longitude'>),
//     end,
//   } = points

//   const isGPSAvailable = coords.latitude && coords.longitude

//   return useQuery<DirectionsAPI>({
//     queryKey: [QUERY_KEY, { start, end }],
//     queryFn: () => {
//       if (!isGPSAvailable) throw Error('Please allow user location tracking')
//       return fetcher({ start, end })
//     },
//     enabled: false,
//     ...(!isGPSAvailable && { retry: 0 }),
//     onError: (error) => {
//       console.error(error)

//       if (error instanceof Error) {
//         useToast.error(error.message)
//       }
//     },
//     onSuccess: (data) => {
//       console.log(data)
//     },
//   })
// }

const useGetDirections = (props: Parameters<typeof trpc.getDirections.useQuery>) => {
  return trpc.getDirections.useQuery([])
}

export default useGetDirections
