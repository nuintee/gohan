import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useRouter } from 'next/router'

const useGetActivity = (props: Parameters<typeof trpc.getActivity.useQuery>[0]) => {
  const router = useRouter()

  return trpc.getActivity.useQuery(props, {
    enabled: !!props.place_id,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)

      if (error.message === 'ZERO_RESULTS') {
        return router.push('/404')
      }

      if (error instanceof Error) {
        return useToast.error(error.message)
      }
    },
  })
}

export default useGetActivity
