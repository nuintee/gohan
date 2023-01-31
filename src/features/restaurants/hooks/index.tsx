import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Env
import { BASE_URL } from '@/config/env'
import useMapBox from '@/features/mapbox/hooks'
import useModals from '@/hooks/modals'
const BASE_KEY = 'restaurants'

const useRestaurants = () => {
  const queryClient = useQueryClient()
  const { coords } = useMapBox()
  const { open } = useModals()

  const get = () => {
    return useQuery({
      queryKey: [BASE_KEY],
      queryFn: () =>
        axios
          .get(
            `${BASE_URL}/api/v1/restaurants?latitude=${coords?.latitude}&longitude=${coords?.longitude}&randomOne=true`,
          )
          .then((res) => res.data),
      onError: (error) => {
        useToast.error(error.message)
      },
      onSuccess: () => {
        open('restaurantdiscovered')
      },
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
