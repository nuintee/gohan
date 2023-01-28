import axios from '@/libs/axios'
import useToast from '@/libs/react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Env
import { BASE_URL } from '@/config/env'
const BASE_KEY = 'restaurants'

const useRestaurants = () => {
  const queryClient = useQueryClient()

  const get = () => {
    return useQuery({
      queryKey: [BASE_KEY],
      queryFn: () =>
        axios
          .get(
            `${BASE_URL}/api/v1/restaurants?latitude=42.64775203224244&longitude=23.40559939582422&randomOne=true`,
          )
          .then((res) => res.data),
      onError: (error) => {
        useToast.error(error.message)
      },
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
      },
    )
  }

  const clear = () => {
    return queryClient.setQueryData([BASE_KEY], {})
  }

  return { get, getDetails, clear }
}

export default useRestaurants
