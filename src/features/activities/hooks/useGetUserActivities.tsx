import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'

const useGetUserActivities = (props: Parameters<typeof trpc.getUserActivities.useQuery>[0]) => {
  const { status } = useSession()

  return trpc.getUserActivities.useQuery(props, {
    enabled: status === 'authenticated',
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })
}

export default useGetUserActivities
