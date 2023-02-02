import { QUERY_KEY } from '../constants'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import useToast from '@/libs/react-toastify'
import axios from '@/libs/axios'

// Env
import { BASE_URL } from '@/config/env'
import useMapBox from '@/features/mapbox/hooks'

const fetcher = (coords: Partial<GeolocationCoordinates>) => {
  const isGPSAvailable = !!coords.latitude && !!coords.longitude

  if (!isGPSAvailable) throw new Error('Please allow tracking user position')

  return axios
    .get(
      `${BASE_URL}/api/v1/restaurants?latitude=${coords?.latitude}&longitude=${coords?.longitude}&randomOne=true`,
    )
    .then((res) => res.data)
}

const useRestaurantsQuery = () => {
  const { coords } = useMapBox()

  return useQuery({
    queryKey: [QUERY_KEY, { coords }],
    queryFn: () => fetcher(coords),
    enabled: false,
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error)
        useToast.error(error.message)
      }
    },
  })
}

export default useRestaurantsQuery
