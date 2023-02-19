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

const DetailsModal = ({
  isOpen = false,
  onClose = () => {},
  duration = 1000,
  title,
  description,
}: {
  isOpen: boolean
  onClose?: () => void
  duration?: number
  title?: string
  description?: string
}) => {
  const openClassName = isOpen ? 'scale-100' : 'scale-0'
  const router = useRouter()

  return (
    <div
      className={`h-screen w-screen bg-red-400 absolute top-0 left-0 flex items-center justify-center flex-col duration-200 ease-in-out ${openClassName}`}
    >
      <h1 className='text-4xl text-white'>{title || 'Manuever Cafe'}</h1>
      <p className='text-xl text-white'>{description || 'Description'}</p>
    </div>
  )
}

const LocationLoader = ({
  isLoading,
  isError,
  error,
}: {
  isLoading: boolean
  isError: boolean
  error?: string | null
}) => {
  const ui = () => {
    switch (true) {
      case isLoading:
        return (
          <>
            <PulseLoader size={5} color={'gray'} />
            <p className='text-gh-dark'>現在地を取得中</p>
          </>
        )
      case isError:
        return (
          <>
            <Close />
            <p className='text-gh-dark'>{error || '現在地の取得に失敗'}</p>
          </>
        )
      default:
        return (
          <>
            <Check />
            <p className='text-gh-dark'>現在地取得済み</p>
          </>
        )
    }
  }

  return (
    <div className='absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-2 items-center justify-center border-2 px-4 py-2 border-gray-100 rounded-full'>
      {ui()}
    </div>
  )
}

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

  const restaurants = useRestaurants({
    latitude: gps.coords.latitude,
    longitude: gps.coords.longitude,
    successCallback: async (data) => {
      const abortController = new AbortController()

      // getColor
      const dominantColor = await getDominantColor(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAA1BMVEX3ycnvcU6cAAAASElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIC3AcUIAAFkqh/QAAAAAElFTkSuQmCC',
      )

      const url = new URL(`${BASE_URL}/discover`)
      url.searchParams.append('place_id', data.place_id)
      url.searchParams.append('main', data.name)
      url.searchParams.append('color', dominantColor)
      url.searchParams.append(
        'sub',
        data.editorial_summary?.overview || (data?.types?.join('・') as string),
      )
      router.push(url.toString(), `/details/${data.place_id}`)
    },
  })

  return (
    <>
      <div className='flex flex-col gap-4 h-full w-full'>
        <Header />
        <div className='flex flex-1 flex-col gap-4 items-center justify-center'>
          {/* Layout */}
          <div className='flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-4xl font-semibold'>
              {restaurants.isFetching
                ? 'あなたにピッタリのレストランを探しています。'
                : '「どこで食べようかな」を解決'}
            </h1>
            {!restaurants.isFetching && (
              <p className='text-gh-d-gray text-lg'>クリックしてGohanする</p>
            )}
          </div>
          <GohanButton
            onClick={() => restaurants.refetch()}
            isLoading={restaurants.isFetching}
            disabled={restaurants.isFetching || gps.isFetching}
            size={40}
          />
          <LocationLoader isLoading={gps.isFetching} isError={gps.isError} error={gps.error} />
        </div>
      </div>
      {/* <DetailsModal isOpen={restaurants.isFetchedAfterMount} /> */}
      {/* <MapBox /> */}
    </>
  )
}

export default Index
