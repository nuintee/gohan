import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

// Lib
import mapboxgl from 'mapbox-gl'

// Hooks
import { useModals, useSidebar, useToast, useGeoLocation } from '@/hooks/context'
import usePlaces from '@/hooks/API/Places'

// Components
import Modal from '@/components/Modal'
import MapBox from '@/components/MapBox'
import { Action } from '@/components/Button'
import Acitvity from '@/components/Activity'
import User from '@/components/User'
import Sidebar from '@/components/Sidebar'
import Toast from '@/components/Toast'
import { Restaurant } from '@/components/Restaurant'

// InitialValues
import { initialStates } from '@/components/Button/Action/constants'
import useDirections from '@/components/MapBox/hooks/Directions'

// Types
import { Coords } from '@/types/GeoLocation/index.types'

const Home: NextPage = () => {
  const [searchButton, setSearchButton] = useState(initialStates)
  const [shopDetail, setShopDetail] = useState({})
  const { modalsState, manageModal } = useModals()
  const { sidebarState, manageSidebar } = useSidebar()
  const { toastState, manageToast } = useToast()
  const { mapRef, geoState, flyTo, setDestination, destination, setSources } = useGeoLocation()
  const { getRoute } = useDirections()
  const { get } = usePlaces(geoState)

  const isLocationReady = geoState.lat && geoState.lng
  const IS_NAVIGATING = destination.length

  const onGetPlaces = async () => {
    setSearchButton((prev) => ({
      ...prev,
      loading: true,
    }))
    const place = await get()
    console.log(place)
    const timeout = setTimeout(() => {
      setSearchButton((prev) => ({
        ...prev,
        loading: false,
      }))
      manageModal('details', true)
      setShopDetail(place)
      clearTimeout(timeout)
    }, 1500)
  }

  const routeTo = async (to: Coords) => {
    // To Hooks
    if (!to) return
    const end = [to?.lng, to?.lat]
    await getRoute({
      start: [geoState.lng, geoState.lat],
      end,
    })
    setDestination(end)
  }

  const onNavigate = async (to: Coords) => {
    await routeTo(to)
    manageModal('details', false)
    setSearchButton((prev) => ({ ...prev, mode: 'close' }))
  }

  const onSearchClick = async () => {
    if (IS_NAVIGATING) {
      setDestination([])
      setSources([])
      setShopDetail({})
      setSearchButton((prev) => ({ ...prev, mode: 'search' }))
    } else {
      await onGetPlaces()
      setSearchButton((prev) => ({ ...prev, mode: 'close' }))
    }
  }

  return (
    <>
      <Toast
        {...toastState}
        onClose={() =>
          manageToast({
            isOpen: false,
          })
        }
      />
      <div className='relative h-screen w-screen overflow-hidden'>
        <header className='absolute top-0 left-0 w-full flex justify-between p-4'>
          <div className='flex gap-2 items-center'>
            <User
              loading={false}
              onClick={() =>
                manageToast({
                  isOpen: true,
                })
              }
            />
            {process.env.NODE_ENV === 'development' && (
              <div className='flex gap-2 z-[1]'>
                <button
                  className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
                  onClick={flyTo}
                  disabled={!isLocationReady}
                >
                  ✈️ FlyTo
                </button>
                <button
                  className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
                  onClick={() => flyTo(geoState)}
                  disabled={!isLocationReady}
                >
                  Origin
                </button>
                <button
                  className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
                  onClick={onGetPlaces}
                  disabled={!isLocationReady}
                >
                  getPlace
                </button>
                <button
                  className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
                  onClick={() => routeTo()}
                  disabled={!isLocationReady}
                >
                  Random
                </button>
              </div>
            )}
          </div>
          <Acitvity locked={false} onClick={() => manageSidebar('activity', true)} />
        </header>
        <main>
          {isLocationReady && <MapBox />}
          <div
            className={`absolute top-0 left-0 z-[-1] bg-gh-white h-screen w-screen flex items-center justify-center duration-500 ${
              isLocationReady ? 'scale-0' : 'scale-100'
            }`}
          >
            <p>
              {!geoState.error?.is
                ? isLocationReady
                  ? ''
                  : 'Loading'
                : 'Please Allow Geolocation'}
            </p>
          </div>
          <Sidebar
            isOpen={sidebarState.activity.isOpen}
            onClose={() => manageSidebar('activity', false)}
          />
        </main>
        <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4 items-center flex-col'>
          {IS_NAVIGATING && Object.keys(shopDetail)?.length ? (
            <Restaurant.Small info={shopDetail} />
          ) : null}
          <Action
            mode={IS_NAVIGATING ? 'close' : 'search'}
            type={searchButton.type}
            onClick={onSearchClick}
            loading={searchButton.loading}
          />
        </footer>
      </div>
      <Modal.User isOpen={modalsState.user.isOpen} onClose={() => manageModal('user', false)} />
      <Modal.Details
        state='LIKED'
        isOpen={modalsState.details.isOpen}
        onClose={() => manageModal('details', false)}
        onNavigate={() => onNavigate(shopDetail?.geometry?.location)}
        info={shopDetail}
      />
      <Modal.Confirm
        isOpen={modalsState.confirm.isOpen}
        type={'like'}
        onClose={() => manageModal('confirm', false)}
      />
    </>
  )
}

export default Home
