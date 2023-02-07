import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useGetUserActivities = (props: Parameters<typeof trpc.getUserActivities.useQuery>[0]) => {
  return trpc.getUserActivities.useQuery(props, {
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useGetUserActivities
