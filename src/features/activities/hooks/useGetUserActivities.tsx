import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'
import useActivityPanel from './useActivityPanel'

const useGetUserActivities = (props: Parameters<typeof trpc.getUserActivities.useQuery>[0]) => {
  const { status } = useSession()
  const { isPanelOpen } = useActivityPanel()

  return trpc.getUserActivities.useQuery(props, {
    enabled: status === 'authenticated' && isPanelOpen,
    onError: (error) => {
      console.error(error)
      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
  })
}

export default useGetUserActivities
