import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useRestaurant = (props: Parameters<typeof trpc.getRestaurant.useQuery>[0]) => {
  return trpc.getRestaurant.useQuery(props, {
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

export default useRestaurant
