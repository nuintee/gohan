import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useAddActivity = () => {
  return trpc.addActivity.useMutation({
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useAddActivity
