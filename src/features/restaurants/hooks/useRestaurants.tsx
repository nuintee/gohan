import useAddActivity from '@/features/activities/hooks/useAddActivity'
import useGPS from '@/hooks/gps'
import useToast from '@/libs/react-toastify'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'

import useDiscoveredNavigation from './useDiscoveredNavigation'

const useRestaurants = ({
  trigger = false,
  ...rest
}: Parameters<typeof trpc.getRestaurants.useQuery>[0] & {
  successCallback?: <T extends {}>(_data: T) => void
  errorCallback?: (_error: Error) => void
  trigger?: boolean
}) => {
  const { status, data: session } = useSession()
  const addActivity = useAddActivity()
  const { isGPSFetching, isGPSError } = useGPS()
  const { navigate } = useDiscoveredNavigation()

  const isGPSAvailable = !isGPSFetching && !isGPSError

  return trpc.getRestaurants.useQuery(rest, {
    enabled: trigger && isGPSAvailable,
    retry: isGPSError || isGPSFetching ? 0 : 3,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        if (isGPSFetching) {
          useToast.info('Loading user location, please wait')
        } else {
          const message = isGPSError ? `Please allow user geolocaiton tracking` : error.message

          useToast.error(message)
          rest.errorCallback && rest.errorCallback(error)
        }
      }
    },
    onSuccess: async (data) => {
      console.log(data)

      rest?.successCallback && rest?.successCallback(data)

      navigate(data)

      if (status !== 'authenticated') return

      addActivity.mutate({
        place_id: data.place_id,
        reviewStatus: 'NEW',
        memo: '',
        userId: session.user.id,
      })
    },
  })
}

export default useRestaurants
