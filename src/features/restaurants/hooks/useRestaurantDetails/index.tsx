import { BASE_URL } from '@/config/env'
import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/features/restaurants/constants'

const fetcher = (place_id: string) => {
  return axios.get(`${BASE_URL}/api/v1/restaurants/${place_id}`).then((res) => res.data)
}

const useRestaurantDetails = ({ place_id }: { place_id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY, { place_id }],
    queryFn: () => fetcher(place_id),
    enabled: false,
    onError: (error) => {
      if (error instanceof Error) {
        console.error(error)
        useToast.error(error.message)
      }
    },
  })
}

export default useRestaurantDetails
