import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useRouter } from 'next/router'

const useGetActivity = (props: Parameters<typeof trpc.getActivity.useQuery>[0]) => {
  return trpc.getActivity.useQuery(props, {
    enabled: !!props.place_id,
    retry: false,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      if (!props.userId) return // ユーザーIDが不正の場合はトースト表示SKIP
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useGetActivity
