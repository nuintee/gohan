import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useRestaurants = (props: Parameters<typeof trpc.getRestaurant.useQuery>[0]) => {
  return trpc.getRestaurant.useQuery(props, {
    enabled: false,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      console.log(data) // open modal?
    },
  })
}

export default useRestaurants
