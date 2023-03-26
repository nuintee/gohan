import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useDeleteActivity = () => {
  return trpc.deleteActivity.useMutation({
    onSuccess: () => {
      useToast.success('ライブラリから削除しました。')
    },
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useDeleteActivity
