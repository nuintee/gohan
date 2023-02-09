import { GohanButton, ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import useMapBox from '@/features/mapbox/hooks'

import { signOut, useSession, signIn } from 'next-auth/react'

// Hooks
import User from '@/features/user/components/User'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import useModals from '@/hooks/modals'
import UserAuthConsentDialog from '@/features/user/components/UserAuthConsentDialog'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import UserSettingsModal from '@/features/user/components/UserSettingsModal'
import ActivityPanel from '@/features/activities/components/ActivityPanel'
import RestaurantDiscoveredModal from '@/features/restaurants/components/RestaurantDiscoveredModal'
import useGetDirections from '@/features/directions/hooks/useGetDirections'
import useExperimentalRestaurants from '@/features/restaurants/hooks/useExperimentalRestaurants'
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

  const handleClick = () => {
    restaurants.refetch()
  }

  const isNavigating = () => {
    if (!directions) return false

    const isSource = Object.keys(directions.source).length > 0
    const isLayer = Object.keys(directions.layer).length > 0
    return isSource && isLayer
  }

  const handleNavigate = (activity: ActivityResolved) => {
    if (!activity) return

    if (isNavigating()) {
      setDirections(INITIAL_DIRECTIONS)
    } else {
      setDirections((prev) => ({
        ...prev,
        source: { waypoint: [] },
        layer: { waypoint: [] },
        data: activity,
      }))
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
          {/* {hasDirections() && <RestaurantCard data={restaurants.data} compact />} */}
          {/* <button onClick={handleDirections}>{hasDirections() ? 'Stop' : 'Start'}</button> */}
          {isNavigating() && (
            <RestaurantCard
              data={directions.data}
              compact
              onClick={() => open('restaurantdiscovered', directions.data)}
            />
          )}
          <GohanButton
            onClick={() => handleClick()}
            isLoading={restaurants.isFetching}
            disabled={restaurants.isFetching}
          />
        </section>
      </div>
      {/* <ActivityPanel setPlaceId={setPlaceId} /> */}
      <ActivityPanel onClickItem={(activity) => open('restaurantdiscovered', activity)} />
      <RestaurantDiscoveredModal
        isLocked={status === 'unauthenticated'}
        isOpen={isOpen('restaurantdiscovered')}
        onClose={() => close('restaurantdiscovered')}
        data={getPayload('restaurantdiscovered')}
        onNavigate={handleNavigate}
        isNavigating={
          isNavigating() &&
          getPayload('restaurantdiscovered')?.place_id === directions.data?.place_id
        }
        // distance={calculateDistance(coords, getRestaurants.data?.geometry?.location, true).auto}
        // isNavigating={hasDirections}
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
