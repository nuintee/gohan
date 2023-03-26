import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useUpdateUser = () => {
  return trpc.updateUser.useMutation({
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

export default useUpdateUser
