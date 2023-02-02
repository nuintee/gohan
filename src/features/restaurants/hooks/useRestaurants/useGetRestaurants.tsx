import { User } from 'next-auth'
import { useSession } from 'next-auth/react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useToast from '@/libs/react-toastify'

// Env
import { QUERY_KEY } from '@/features/restaurants/constants'
import { BASE_URL } from '@/config/env'
import useMapBox from '@/features/mapbox/hooks'

// const get = () => {
//   const isGPSAvailable = !!coords.latitude && !!coords.longitude
//   return useQuery<ResultsEntity>({
//     queryKey: [BASE_KEY],
//     queryFn: () => {
//       if (!isGPSAvailable) throw Error('Please allow tracking user position')
//       return axios
//         .get(
//           `${BASE_URL}/api/v1/restaurants?latitude=${coords?.latitude}&longitude=${coords?.longitude}&randomOne=true`,
//         )
//         .then((res) => res.data)
//     },
//     onError: (error) => {
//       useToast.error(error.message)
//     },
//     onSuccess: (data) => {
//       // OpenModal
//       set(data)
//     },
//     retry: !isGPSAvailable ? 0 : 3,
//     enabled: false,
//     refetchOnWindowFocus: false,
//   })
// }

const fetcher = (coords: Partial<GeolocationCoordinates>) => {
  const isGPSAvailable = !!coords.latitude && !!coords.longitude

  if (!isGPSAvailable) throw Error('Please allow tracking user position')

  return axios
    .get(
      `${BASE_URL}/api/v1/restaurants?latitude=${coords?.latitude}&longitude=${coords?.longitude}&randomOne=true`,
    )
    .then((res) => res.data)
}

const useGetRestaurants = (props?: { coords: Partial<GeolocationCoordinates> }) => {
  const { coords: c } = useMapBox()
  const coords = props?.coords || c

  return useQuery({
    queryKey: [QUERY_KEY, { coords }],
    queryFn: () => fetcher(coords),
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    enabled: false,
    refetchOnWindowFocus: false,
  })
}

export default useGetRestaurants
