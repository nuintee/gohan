import useAddActivity from '@/features/activities/hooks/useAddActivity'
import useModals from '@/hooks/modals'
import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'

const useRestaurants = (props: Parameters<typeof trpc.getRestaurant.useQuery>[0]) => {
  const { status, data: session } = useSession()
  const addActivity = useAddActivity()
  const { open } = useModals()

  return trpc.getRestaurant.useQuery(props, {
    enabled: false,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      console.log(data)

      open('restaurantdiscovered', data)

      if (status !== 'authenticated') return

      addActivity.mutate({
        place_id: data.place_id,
        is_liked: false,
        userId: session.user.id,
      })
    },
  })
}

export default useRestaurants
