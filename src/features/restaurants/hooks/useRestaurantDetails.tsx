import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useRestaurantDetails = (props: Parameters<typeof trpc.getRestaurantDetails.useQuery>[0]) => {
  return trpc.getRestaurantDetails.useQuery(props, {
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

export default useRestaurantDetails
