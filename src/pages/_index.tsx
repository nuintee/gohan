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
import { QueryClient } from '@tanstack/react-query'

const Index = () => {
  // Session
  const session = useSession()
  // Modals
  const { isOpen, close, getPayload } = useModals()

  // GPS
  const { coords } = useMapBox()

  // Place_id
  const [place_id, setPlaceId] = useState('')

  const restaurants = useExperimentalRestaurants(
    {
      place_id,
      latitude: coords.latitude,
      longitude: coords.longitude,
    },
    () => {
      setPlaceId('')
    },
  ) // if place_id is falsy and ephemeral === true, get random by refetch, otherwise if ephemeral === true and place_id is truthy, refetch

  const handleClick = () => {
    restaurants.refetch()
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
          {/* {hasDirections && (
            <RestaurantCard
              compact
              isLocked={session.status === 'unauthenticated'}
              isNavigating={hasDirections}
              data={getRestaurants.data}
              // distance={calculateDistance(coords, getRestaurants.data?.geometry?.location).auto}
              onClick={() => open('restaurantdiscovered')}
            />
          )} */}
          {/* {restaurants.data && <RestaurantCard data={restaurants.data} compact />} */}
          <GohanButton
            onClick={() => handleClick()}
            isLoading={restaurants.isFetching}
            disabled={restaurants.isFetching}
          />
        </section>
      </div>
      <ActivityPanel setPlaceId={setPlaceId} />
      <RestaurantDiscoveredModal
        isLocked={session.status === 'unauthenticated'}
        isOpen={isOpen('restaurantdiscovered')}
        onClose={() => close('restaurantdiscovered')}
        data={getPayload('restaurantdiscovered')}
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
