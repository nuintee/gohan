import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useDeleteActivity = () => {
  return trpc.deleteActivity.useMutation({
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useDeleteActivity
