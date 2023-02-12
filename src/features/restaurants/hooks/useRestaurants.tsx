import useAddActivity from '@/features/activities/hooks/useAddActivity'
import useMapBox from '@/features/mapbox/hooks'
import useModals from '@/hooks/modals'
import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'

const useRestaurants = (props: Parameters<typeof trpc.getRestaurants.useQuery>[0]) => {
  const { status, data: session } = useSession()
  const addActivity = useAddActivity()
  const { open } = useModals()
  const { isLoadingUserLocation } = useMapBox()

  const isGPSValid = props.latitude && props.longitude

  return trpc.getRestaurants.useQuery(props, {
    enabled: !!props.place_id,
    retry: isGPSValid ? 3 : 0,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        if (isLoadingUserLocation) {
          useToast.info('Loading user location, please wait')
        } else {
          const message = !isGPSValid ? `Please allow user geolocaiton tracking` : error.message

          useToast.error(message)
        }
      }
    },
    onSuccess: (data) => {
      console.log(data)

      open('restaurantdiscovered', data)

      if (status !== 'authenticated') return

      if (!!props.place_id) return

      addActivity.mutate({
        place_id: data.place_id,
        is_liked: false,
        userId: session.user.id,
      })
    },
  })
}

export default useRestaurants
