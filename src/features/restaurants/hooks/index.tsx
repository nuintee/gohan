import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Env
import { BASE_URL } from '@/config/env'
import useMapBox from '@/features/mapbox/hooks'
import useModals from '@/hooks/modals'
import { ResultsEntity } from '../types'

const BASE_KEY = 'restaurants'

const useRestaurants = () => {
  const queryClient = useQueryClient()
  const { coords } = useMapBox()
  const { open } = useModals()

  const get = () => {
    const isGPSAvailable = !!coords.latitude && !!coords.longitude
    return useQuery<ResultsEntity>({
      queryKey: [BASE_KEY],
      queryFn: () => {
        if (!isGPSAvailable) throw Error('Please allow tracking user position')
        return axios
          .get(
            `${BASE_URL}/api/v1/restaurants?latitude=${coords?.latitude}&longitude=${coords?.longitude}&randomOne=true`,
          )
          .then((res) => res.data)
      },
      onError: (error) => {
        useToast.error(error.message)
      },
      onSuccess: () => {
        // open('restaurantdiscovered')
      },
      retry: !isGPSAvailable ? 0 : 3,
      enabled: false,
      refetchOnWindowFocus: false,
    })
  }

  const getDetails = (place_id: string) => {
    return useQuery(
      [BASE_KEY, place_id],
      () => axios.get(`${BASE_URL}/api/v1/restaurants/${place_id}`).then((res) => res.data),
      {
        onError: (error) => {
          useToast.error(error.message)
        },
        refetchOnWindowFocus: false,
      },
    )
  }

  const clear = () => {
    return queryClient.setQueryData([BASE_KEY], {})
  }

  return { get, getDetails, clear }
}

export default useRestaurants
