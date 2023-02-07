import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'

const useGetActivity = (props: Parameters<typeof trpc.getActivity.useQuery>[0]) => {
  return trpc.getActivity.useQuery(props, {
    onError: (error) => {
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useGetActivity
