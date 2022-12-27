import { useEffect, useMemo, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'

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
import useDirections from '@/components/MapBox/hooks/Directions'

// Icons
import { IoMdLocate } from 'react-icons/io'

// Types
type setModePayload = {
  mode: 'close' | 'search'
}

type Props = {
  ip: string
}

const DevPanel = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { ip } = props
  const { data: session } = useSession()
  const { flyTo, geoState, setIsMapClickable, isMapClickable, setGeoState } = useGeoLocation()
  const { isLocationReady } = useDirections()

  const DEFAULT_COORDS = useRef(null as any)
  const [isCoordsMoved, setIsCoordsMoved] = useState(false)

  useEffect(() => {
    if (!geoState.lat || !geoState.lng) return

    if (!DEFAULT_COORDS.current?.IS_FIXED) {
      DEFAULT_COORDS.current = { ...geoState, IS_FIXED: true }
    } else {
      const sameLat = DEFAULT_COORDS.current?.lat === geoState?.lat
      const sameLng = DEFAULT_COORDS.current?.lng === geoState?.lng
      const IS_MOVED = !sameLat || !sameLng
      setIsCoordsMoved(IS_MOVED)
    }
  }, [geoState])

  const setCoordsToDefault = () => {
    console.dir(DEFAULT_COORDS.current)
    setGeoState(DEFAULT_COORDS.current)
  }

  const authHandle = () => {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }

  if (process.env.NODE_ENV !== 'development') return <></>

  if (isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className='z-[100] bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
      >
        DevTools
      </button>
    )

  return (
    <div className='z-[100] absolute left-0 top-0 bg-white h-screen min-w-[20rem]'>
      <header className='flex items-center justify-between gap-4 p-4'>
        <p className='font-bold'>Dev Tools</p>
        <button
          onClick={() => setIsOpen(false)}
          className='z-[100] bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
        >
          CLOSE
        </button>
      </header>
      <hr></hr>
      <main className='flex flex-col gap-4 p-4'>
        <button
          className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
          onClick={flyTo}
          disabled={!isLocationReady}
        >
          ✈️ FlyTo
        </button>
        <button
          className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
          onClick={authHandle}
        >
          {session ? 'SIGNOUT' : 'SIGNIN'}
        </button>
        <p className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none'>IP: {ip}</p>

        <section className='flex flex-col gap-2 justify-between'>
          <div className='flex justify-between'>
            <label className='text-gh-gray'>Coords</label>
            <button
              className={`text text-gh-gray  ${
                isCoordsMoved && 'active:text-opacity-50 text-blue-500'
              }`}
              onClick={setCoordsToDefault}
              disabled={!isCoordsMoved}
            >
              reset
            </button>
          </div>
          <p className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none'>
            Latitude: {geoState.lat}
          </p>
          <p className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none'>
            Longitude: {geoState.lng}
          </p>
          <p className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none'>
            Df-Latitude: {DEFAULT_COORDS.current?.lat}
          </p>
          <p className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none'>
            Df-Longitude: {DEFAULT_COORDS.current?.lng}
          </p>
        </section>

        <fieldset className='flex gap-2 justify-between'>
          <legend className='mb-2 text-gh-gray'>Move position on click</legend>
          <div className='flex gap-2'>
            <input
              type='radio'
              id='map_clickable'
              name='map_click'
              value='true'
              defaultChecked={isMapClickable}
              onInput={(e) => setIsMapClickable(true)}
            />
            <label htmlFor='map_clickable'>On</label>
          </div>
          <div className='flex gap-2'>
            <input
              type='radio'
              id='map_unclickable'
              name='map_click'
              value='false'
              defaultChecked={!isMapClickable}
              onInput={(e) => setIsMapClickable(false)}
            />
            <label htmlFor='map_unclickable'>Off</label>
          </div>
        </fieldset>
      </main>
    </div>
  )
}

const Home = (props: Props) => {
  const [searchButton, setSearchButton] = useState(initialStates)
  const { modalsState, manageModal } = useModals()
  const { sidebarState, manageSidebar } = useSidebar()
  const { toastState, manageToast } = useToast()
  const { geoState, flyTo, isFindingRoute, shopDetail, setIsFindingRouting } = useGeoLocation()
  const {
    isLocationReady,
    isAnyNavigation,
    isNavigatingCurrent,
    showDetails,
    routeTo,
    onGetPlaces,
    onNavigateClicked,
    onSearchClick,
  } = useDirections()

  const useSearchButton = () => {
    const setLoading = (is: boolean) => {
      setSearchButton((prev) => ({ ...prev, loading: is }))
    }

    const setMode = (mode: setModePayload) => {
      setSearchButton((prev) => ({ ...prev, mode }))
    }

    return { setLoading, setMode }
  }

  const usedSearch = useSearchButton()

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
          <div className='flex gap-2 items-center flex-1 flex-wrap'>
            <User
              loading={false}
              onClick={() =>
                manageToast({
                  isOpen: true,
                })
              }
            />
            <DevPanel />
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
            title='Activities'
            isOpen={sidebarState.activity.isOpen}
            onClose={() => manageSidebar('activity', false)}
          />
        </main>
        <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4 items-center flex-col'>
          {isAnyNavigation && Object.keys(shopDetail)?.length ? (
            <Restaurant.Small
              info={shopDetail}
              onClick={() => showDetails(shopDetail)}
              state='LIKED'
            />
          ) : null}
          <Action
            mode={isAnyNavigation ? 'close' : 'search'}
            type={searchButton.type}
            onClick={() => onSearchClick(usedSearch)}
            loading={searchButton.loading}
          />
          {isLocationReady && (
            <button
              onClick={() => flyTo(geoState)}
              className='absolute right-6 bottom-8 bg-white p-4 rounded-full active:bg-opacity-90 active:scale-90'
            >
              <IoMdLocate size={20} />
            </button>
          )}
        </footer>
      </div>
      <Modal.User isOpen={modalsState.user.isOpen} onClose={() => manageModal('user', false)} />
      <Modal.Details
        state='LIKED'
        isOpen={modalsState.details.isOpen}
        onClose={() => manageModal('details', false)}
        onNavigate={() =>
          onNavigateClicked(shopDetail?.geometry?.location, () => usedSearch.setMode('close'))
        }
        isNavigating={isNavigatingCurrent}
        info={shopDetail}
        isLoading={isFindingRoute}
      />
      <Modal.Confirm
        isOpen={modalsState.confirm.isOpen}
        type={'like'}
        onClose={() => manageModal('confirm', false)}
      />
    </>
  )
}

export const getServerSideProps = async (ctx: any) => {
  // Parse token
  // const token = ctx.req.headers['Authorization'].replace('Bearer ', '')

  /**
    Determine source IP address. Alternative methods to determine source IP address may be necessary
    depending on the ho
    sting infrastructure
   **/

  let ip = 'IP_DEFAULT'

  if (ctx.req.headers['x-forwarded-for']) {
    ip = ctx.req.headers['x-forwarded-for']
  } else if (ctx.req.headers['x-real-ip']) {
    ip = ctx.req.connection.remoteAddress
  } else {
    ip = ctx.req.connection.remoteAddress
  }

  return {
    props: {
      ip,
    },
  }
}

export default Home
