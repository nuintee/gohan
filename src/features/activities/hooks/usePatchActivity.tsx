import { BASE_URL } from '@/config/env'
import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const usePatchActivity = () => {
  return trpc.updateActivity.useMutation({
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default usePatchActivity
