import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

export function useSendReports() {
  return trpc.addReport.useMutation({
    onSuccess: () => {
      useToast.success('レポートを送信しました。')
    },
    onError: (error) => {
      console.error(error)
      useToast.error(error.message)
    },
  })
}
