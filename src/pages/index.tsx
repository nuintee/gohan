import { Button, DropDown, GohanButton, ToastCatcher } from '@/components/ui'
// import useDirections from '@/features/directions/hooks'
import MapBox from '@/features/mapbox/components/MapBox'
import { mapBoxState } from '@/features/mapbox/stores'
import { useEffect, useState } from 'react'

import { signOut, useSession, signIn, getSession } from 'next-auth/react'

// ENV
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, BASE_URL } from '@/config/env'
import User from '@/features/user/components/User'
import useModals from '@/hooks/modals'
import UserAuthConsentDialog from '@/features/user/components/UserAuthConsentDialog'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import UserSettingsModal from '@/features/user/components/UserSettingsModal'
import ActivityPanel from '@/features/activities/components/ActivityPanel'
import RestaurantDiscoveredModal from '@/features/restaurants/components/RestaurantDiscoveredModal'
import calculateDistance from '@/libs/haversine-distance'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import useToast from '@/libs/react-toastify'
import useGetUser from '@/features/user/hooks/useGetUser'
import useUpdateUser from '@/features/user/hooks/useUpdateUser'

import Header from '@/components/ui/Header'
import { Check, Close, Logo, PulseLoader } from '@/components/icons'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import { Router, useRouter } from 'next/router'
import useGPS from '@/hooks/gps'
import { getDominantColor } from '@/libs/rgbaster'

// data
import images from '@/data/images.json'
import { sleep } from '@/utils/sleep'
import SearchWindow from '@/features/search/components/SearchWindow'

const Index = () => {
  // User
  const router = useRouter()

  const { gps, updateGeolocationStatus, updateSafeGeolocation } = useGPS()

  useEffect(() => {
    if (!gps.isFetching) return

    const watchId = navigator.geolocation.watchPosition(
      ({ timestamp, coords }) => {
        updateSafeGeolocation({
          coords,
          timestamp,
          isFetching: false,
        })
      },
      (error) => {
        updateGeolocationStatus({ isError: true, isFetching: false })
      },
      {
        enableHighAccuracy: true,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return (
    <>
      <div className='flex flex-col gap-4 h-full w-full'>
        <Header />
        <SearchWindow />
      </div>
    </>
  )
}

export default Index
