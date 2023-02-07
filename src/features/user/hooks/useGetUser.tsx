import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useGetUser = (props: Parameters<typeof trpc.getUser.useQuery>[0]) => {
  return trpc.getUser.useQuery(props, {
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

export default useGetUser
