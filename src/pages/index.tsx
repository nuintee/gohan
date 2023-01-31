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

const Index = () => {
  const session = useSession()
  const { open, close, isOpen } = useModals()
  const { get: getRestaurants, clear } = useRestaurants()
  const { refetch, isFetching, data: restaurant } = getRestaurants()
  const { coords, coordAsString } = useMapBox()
  const { hasDirections, directions, revoke, get: getDirections } = useDirections()
  const { refetch: refetchDirections } = getDirections({
    start: coordAsString(coords),
    end: `${restaurant?.geometry?.location?.lat},${restaurant?.geometry?.location?.lng}`,
  })
  const revokeDirections = revoke()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <section className='absolute top-0 left-0 z-[1] w-full p-4 flex gap-4 justify-between'>
          <User
            session={session}
            isLoading={session.status === 'loading'}
            onClick={() => open(session.status === 'authenticated' ? 'usersettings' : 'userauth')}
          />
          <AcitvityButton isLocked={session.status === 'unauthenticated'} />
        </section>
        <MapBox />
        <section className='absolute bottom-0 left-0 z-[1] w-full flex items-center justify-center p-4 flex-col gap-4'>
          {hasDirections && (
            <RestaurantCard
              compact
              isLocked={session.status === 'unauthenticated'}
              isNavigating={hasDirections}
              data={restaurant}
            />
          )}
          <GohanButton
            onClick={hasDirections ? () => revokeDirections.mutate() : () => refetch()}
            isLoading={isFetching}
            isNavigating={hasDirections}
          />
        </section>
      </div>
      <RestaurantDiscoveredModal
        isLocked={session.status === 'unauthenticated'}
        isOpen={isOpen('restaurantdiscovered')}
        onClose={() => close('restaurantdiscovered')}
        data={restaurant}
        onNavigate={hasDirections ? () => revokeDirections.mutate() : () => refetchDirections()}
      />
      <UserAuthConsentDialog
        isOpen={isOpen('userauth')}
        onClose={() => close('userauth')}
        type={session.status === 'authenticated' ? 'signout' : 'login'}
      />
      <UserSettingsModal
        user={session.data?.user}
        isOpen={isOpen('usersettings')}
        onClose={() => close('usersettings')}
      />
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
