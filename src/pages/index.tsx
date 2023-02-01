import { GohanButton, ToastCatcher } from '@/components/ui'
import useDirections from '@/features/directions/hooks'
import MapBox from '@/features/mapbox/components/MapBox'
import useMapBox from '@/features/mapbox/hooks'
import { mapBoxState } from '@/features/mapbox/stores'
import useUser from '@/features/user/hooks'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { signOut, useSession, signIn } from 'next-auth/react'

// ENV
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, BASE_URL } from '@/config/env'
import User from '@/features/user/components/User'
import useModals from '@/hooks/modals'
import UserAuthConsentDialog from '@/features/user/components/UserAuthConsentDialog'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import useActivities from '@/features/activities/hooks'
import UserSettingsModal from '@/features/user/components/UserSettingsModal'
import ActivityPanel from '@/features/activities/components/ActivityPanel'
import useRestaurants from '@/features/restaurants/hooks'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'
import RestaurantDiscoveredModal from '@/features/restaurants/components/RestaurantDiscoveredModal'
import calculateDistance from '@/libs/haversine-distance'

const Index = () => {
  // User
  const session = useSession()

  // Modals
  const { open, close, isOpen, getPayload } = useModals()

  // Restaurants
  const { restaurant } = useRestaurants()

  // GPS
  const { coords, coordAsString, isLoadingUserLocation } = useMapBox()

  // Directions
  const {
    hasDirections,
    directions,
    revokeDirections,
    getDirections: getDirections,
  } = useDirections()

  const { refetch } = getDirections({
    end: `${restaurant?.geometry?.location?.lat},${restaurant?.geometry?.location?.lng}`,
  })
  const revoke = revokeDirections()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <section className='absolute top-0 left-0 z-[1] w-full p-4 flex gap-4 justify-between'>
          <User />
          <AcitvityButton />
        </section>
        <MapBox />
        <section className='absolute bottom-0 left-0 z-[1] w-full flex items-center justify-center p-4 flex-col gap-4'>
          {hasDirections && (
            <RestaurantCard
              compact
              isLocked={session.status === 'unauthenticated'}
              isNavigating={hasDirections}
              data={restaurant}
              distance={calculateDistance(coords, restaurant?.geometry?.location).auto}
              onClick={() => open('restaurantdiscovered')}
            />
          )}
          <GohanButton />
        </section>
      </div>
      <ActivityPanel />
      <RestaurantDiscoveredModal
        isLocked={session.status === 'unauthenticated'}
        isOpen={isOpen('restaurantdiscovered')}
        onClose={() => close('restaurantdiscovered')}
        distance={calculateDistance(coords, restaurant?.geometry?.location, true).auto}
        data={getPayload('restaurantdiscovered')}
        // onNavigate={hasDirections ? () => revoke.mutate() : () => refetchDirections()}
        onNavigate={(activity) => {}}
        isNavigating={hasDirections}
      />
      <UserAuthConsentDialog />
      <UserSettingsModal />
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
