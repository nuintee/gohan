import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useRouter } from 'next/router'

const useGetActivity = (props: Parameters<typeof trpc.getActivity.useQuery>[0]) => {
  return trpc.getActivity.useQuery(props, {
    enabled: !!props.place_id,
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useGetActivity
