import { BASE_URL } from '@/config/env'
import useAddActivity from '@/features/activities/hooks/useAddActivity'
import useGPS from '@/hooks/gps'
import useModals from '@/hooks/modals'
import useToast from '@/libs/react-toastify'
import { getDominantColor } from '@/libs/rgbaster'
import { trpc } from '@/libs/trpc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ResultsEntity } from '../types'

//data
import images from '@/data/images.json'
import useDiscoveredNavigation from './useDiscoveredNavigation'

const useRestaurants = (
  props: Parameters<typeof trpc.getRestaurants.useQuery>[0] & {
    successCallback?: (data: ResultsEntity) => void
  },
) => {
  const { status, data: session } = useSession()
  const addActivity = useAddActivity()
  const { isGPSFetching, isGPSError } = useGPS()
  const { navigate } = useDiscoveredNavigation()

  return trpc.getRestaurants.useQuery(props, {
    enabled: !!props.place_id,
    retry: isGPSError || isGPSFetching ? 0 : 3,
    onError: (error) => {
      console.error(error)

      if (error instanceof Error) {
        if (isGPSFetching) {
          useToast.info('Loading user location, please wait')
        } else {
          const message = isGPSError ? `Please allow user geolocaiton tracking` : error.message

          useToast.error(message)
        }
      }
    },
    onSuccess: async (data) => {
      console.log(data)

      props?.successCallback && props?.successCallback(data)

      navigate(data)

      if (status !== 'authenticated') return

      if (!!props.place_id) return

      addActivity.mutate({
        place_id: data?.place_id,
        reviewStatus: 'NEW',
        memo: '',
        userId: session.user.id,
      })
    },
  })
}

export default useRestaurants
