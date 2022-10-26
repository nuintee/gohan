import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

// Lib
import mapboxgl from 'mapbox-gl'

// Hooks
import { useModals, useSidebar, useToast, useGeoLocation } from '@/hooks/context'

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

const Home: NextPage = () => {
  const [searchButton, setSearchButton] = useState(initialStates)
  const { modalsState, manageModal } = useModals()
  const { sidebarState, manageSidebar } = useSidebar()
  const { toastState, manageToast } = useToast()
  const { mapRef, geoState } = useGeoLocation()

  const flyTo = () => {
    mapRef.current.flyTo({
      center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    })
  }

  const addMarker = () => {
    new mapboxgl.Marker().setLngLat([12.554729, 55.70651]).addTo(mapRef.current)
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
      <div className='relative'>
        <header className='absolute top-0 left-0 w-full flex justify-between p-4'>
          <User
            loading={false}
            onClick={() =>
              manageToast({
                isOpen: true,
              })
            }
          />
          <Acitvity locked={false} onClick={() => manageSidebar('activity', true)} />
        </header>
        <main>
          {/* <MapBox /> */}
          {geoState.lat && geoState.lng ? <MapBox /> : <div>Loading</div>}
          <Sidebar
            isOpen={sidebarState.activity.isOpen}
            onClose={() => manageSidebar('activity', false)}
          />
        </main>
        <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4'>
          {/* <Action
            mode={searchButton.mode}
            type={searchButton.type}
            onClick={() => manageModal('confirm', true)}
            loading={searchButton.loading}
          /> */}
          <Action
            mode={searchButton.mode}
            type={searchButton.type}
            onClick={addMarker}
            loading={searchButton.loading}
          />
        </footer>
      </div>
      <Modal.User isOpen={modalsState.user.isOpen} onClose={() => manageModal('user', false)} />
      <Modal.Details isOpen={modalsState.details.isOpen} />
      <Modal.Confirm
        isOpen={modalsState.confirm.isOpen}
        type={'like'}
        onClose={() => manageModal('confirm', false)}
      />
    </>
  )
}

export default Home
