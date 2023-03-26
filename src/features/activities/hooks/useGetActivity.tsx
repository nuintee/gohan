import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'

const useGetActivity = (props: Parameters<typeof trpc.getActivity.useQuery>[0]) => {
  const { status } = useSession()
  return trpc.getActivity.useQuery(props, {
    enabled: !!props.place_id && status === 'authenticated',
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useGetActivity
