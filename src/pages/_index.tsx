import { GohanButton, ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import useMapBox from '@/features/mapbox/hooks'

import { signOut, useSession, signIn } from 'next-auth/react'

// Hooks
import User from '@/features/user/components/User'
import useModals from '@/hooks/modals'
import UserAuthConsentDialog from '@/features/user/components/UserAuthConsentDialog'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import UserSettingsModal from '@/features/user/components/UserSettingsModal'
import ActivityPanel from '@/features/activities/components/ActivityPanel'
import RestaurantDiscoveredModal from '@/features/restaurants/components/RestaurantDiscoveredModal'
import useGetDirections from '@/features/directions/hooks/useGetDirections'
import useExperimentalRestaurants from '@/features/restaurants/hooks/useRestaurants'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'
import { useCallback, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/libs/trpc'
import useGeoJSON from '@/features/directions/hooks/useGeoJSON'
import { ActivityResolved } from '@/features/activities/types'

const Index = () => {
  const { status, data: session } = useSession()
  const { isOpen, getPayload, close, open } = useModals()
  const { coords } = useMapBox()

  // Directions
  const createGeoJSON = useGeoJSON()
  const INITIAL_DIRECTIONS = { source: {}, layer: {}, data: {} }
  const [directions, setDirections] = useState(INITIAL_DIRECTIONS)

  const restaurants = useExperimentalRestaurants({
    latitude: coords.latitude,
    longitude: coords.longitude,
  })

  const getDirections = useGetDirections(
    {
      start: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      destination: {
        latitude: 0,
        longitude: 0,
      },
    },
    (data) => {
      setDirections((prev) => ({
        ...prev,
        ...createGeoJSON({
          coordinates: data.routes[0].geometry.coordinates,
        }),
      }))
    },
  )

  const isNavigating = () => {
    if (!directions) return false

    const isSource = Object.keys(directions.source).length > 0
    const isLayer = Object.keys(directions.layer).length > 0
    return isSource && isLayer
  }

  const handleNavigate = (activity: ActivityResolved) => {
    if (!activity) return

    if (isNavigating() && directions.data?.place_id === activity?.place_id) {
      setDirections(INITIAL_DIRECTIONS)
    } else {
      setDirections((prev) => ({ ...prev, data: activity }))
      getDirections.refetch()
    }
  }

  const handleClick = () => {
    if (isNavigating()) {
      setDirections(INITIAL_DIRECTIONS)
    } else {
      restaurants.refetch()
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <section className='absolute top-0 left-0 z-[1] w-full p-4 flex gap-4 justify-between'>
          <User />
          <AcitvityButton />
        </section>
        <MapBox />
        <section className='absolute bottom-0 left-0 z-[1] w-full flex items-center justify-center p-4 flex-col gap-4'>
          {isNavigating() && (
            <RestaurantCard
              data={directions.data}
              compact
              onClick={() => open('restaurantdiscovered', directions.data)}
            />
          )}
          <GohanButton
            onClick={() => handleClick()}
            isNavigating={isNavigating()}
            isLoading={restaurants.isFetching}
            disabled={restaurants.isFetching}
          />
        </section>
      </div>
      <ActivityPanel onClickItem={(activity) => open('restaurantdiscovered', activity)} />
      <RestaurantDiscoveredModal
        isLocked={status === 'unauthenticated'}
        isOpen={isOpen('restaurantdiscovered')}
        onClose={() => close('restaurantdiscovered')}
        data={getPayload('restaurantdiscovered')}
        isLoading={getDirections.isFetching}
        onNavigate={handleNavigate}
        isNavigating={
          isNavigating() &&
          getPayload('restaurantdiscovered')?.place_id === directions.data?.place_id
        }
      />
      <UserAuthConsentDialog />
      <UserSettingsModal />
      <ToastCatcher position='top-center' />
    </>
  )
}

export const getServerSideProps = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return { props: {} }
}

export default Index
