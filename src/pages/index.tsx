import { Button, GohanButton, ToastCatcher } from '@/components/ui'
// import useDirections from '@/features/directions/hooks'
import MapBox from '@/features/mapbox/components/MapBox'
import useMapBox from '@/features/mapbox/hooks'
import { mapBoxState } from '@/features/mapbox/stores'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { signOut, useSession, signIn } from 'next-auth/react'

// ENV
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, BASE_URL } from '@/config/env'
import User from '@/features/user/components/User'
import useModals from '@/hooks/modals'
import UserAuthConsentDialog from '@/features/user/components/UserAuthConsentDialog'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import UserSettingsModal from '@/features/user/components/UserSettingsModal'
import ActivityPanel from '@/features/activities/components/ActivityPanel'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'
import RestaurantDiscoveredModal from '@/features/restaurants/components/RestaurantDiscoveredModal'
import calculateDistance from '@/libs/haversine-distance'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import useToast from '@/libs/react-toastify'
import useGetUser from '@/features/user/hooks/useGetUser'
import useUpdateUser from '@/features/user/hooks/useUpdateUser'

import Header from '@/components/ui/Header'
import { Logo } from '@/components/icons'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'

const Index = () => {
  // User
  const session = useSession()
  const { coords } = useMapBox()

  // Modals
  const { open, close, isOpen, getPayload } = useModals()

  const restaurants = useRestaurants({
    latitude: coords.latitude,
    longitude: coords.longitude,
  })

  return (
    <>
      <div className='flex flex-col gap-4 h-full w-full'>
        <Header />
        <div className='flex flex-1 flex-col gap-4 items-center justify-center'>
          {/* Layout */}
          <div className='flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-4xl font-semibold'>Where should I eat</h1>
            <p className='text-gh-d-gray text-lg'>Click to Gohan</p>
          </div>
          <GohanButton
            onClick={() => restaurants.refetch()}
            isLoading={restaurants.isFetching}
            disabled={restaurants.isFetching}
            size={40}
          />
        </div>
      </div>
      <MapBox />
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
