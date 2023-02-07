import { GohanButton, ToastCatcher } from '@/components/ui'
// import useDirections from '@/features/directions/hooks'
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
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import useGetDirections from '@/features/directions/hooks/useGetDirections'
import useToast from '@/libs/react-toastify'
import useClearDirections from '@/features/directions/hooks/useClearDirections'
import useGeoJSON from '@/features/directions/hooks/useGeoJSON'
import useGetRestaurants from '@/features/restaurants/hooks/useRestaurants/useGetRestaurants'
import useClearRestaurant from '@/features/restaurants/hooks/useRestaurants/useClearRestaurant'
import useRestaurantDetails from '@/features/restaurants/hooks/useRestaurantDetails'
import useGetUser from '@/features/user/hooks/useGetUser'
import useUpdateUser from '@/features/user/hooks/useUpdateUser'

const Index = () => {
  // User
  const session = useSession()

  // Modals
  const { open, close, isOpen, getPayload } = useModals()

  // Restaurants
  const getRestaurants = useGetRestaurants()
  const clearRestaurant = useClearRestaurant()

  // GPS
  const { coords, coordAsString, isLoadingUserLocation } = useMapBox()

  // Directions
  // const {
  //   hasDirections,
  //   directions,
  //   revokeDirections,
  //   getDirections: getDirections,
  // } = useDirections()

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
          <GohanButton />
        </section>
      </div>
      <ActivityPanel />
      <RestaurantDiscoveredModal
        isLocked={session.status === 'unauthenticated'}
        isOpen={isOpen('restaurantdiscovered')}
        onClose={clearRestaurant.mutate}
        // distance={calculateDistance(coords, getRestaurants.data?.geometry?.location, true).auto}
        data={getPayload('restaurantdiscovered')}
        isNavigating={hasDirections}
      />
      <UserAuthConsentDialog />
      <UserSettingsModal />
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
