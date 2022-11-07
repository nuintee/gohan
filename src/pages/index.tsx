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
  const { mapRef, geoState, flyTo, setDestination } = useGeoLocation()
  const { getRoute } = useDirections()
  const { get } = usePlaces(geoState)

  const isLocationReady = geoState.lat && geoState.lng

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
    getRoute({
      start: [geoState.lng, geoState.lat],
      end,
    })
    setDestination(end)
  }

  const onNavigate = () => {}

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
        <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4'>
          <Action
            mode={searchButton.mode}
            type={searchButton.type}
            onClick={() => manageModal('confirm', true)}
            loading={searchButton.loading}
          />
        </footer>
      </div>
      <Modal.User isOpen={modalsState.user.isOpen} onClose={() => manageModal('user', false)} />
      <Modal.Details
        state='LIKED'
        isOpen={modalsState.details.isOpen}
        onClose={() => manageModal('details', false)}
        onNavigate={() => routeTo(shopDetail?.geometry?.location)}
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
