import useAddActivity from '@/features/activities/hooks/useAddActivity'
import useModals from '@/hooks/modals'
import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'

const useExperimentalRestaurants = (
  props: Parameters<typeof trpc.getExperimentalRestaurant.useQuery>[0],
  callbackOnSuccess: () => void,
) => {
  const { status, data: session } = useSession()
  const addActivity = useAddActivity()
  const { open } = useModals()

  return trpc.getExperimentalRestaurant.useQuery(props, {
    enabled: !!props.place_id,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        useToast.error(error.message)
      }
    },
    onSuccess: (data) => {
      console.log(data)
      callbackOnSuccess()

      open('restaurantdiscovered', data)

      if (status !== 'authenticated') return

      if (!!props.place_id) return

      // addActivity.mutate({
      //   place_id: data.place_id,
      //   is_liked: false,
      //   userId: session.user.id,
      // })
    },
  })
}

export default useExperimentalRestaurants
