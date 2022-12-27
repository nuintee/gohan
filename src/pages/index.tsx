import { useState } from 'react'
import type { NextPage } from 'next'

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

const Home = (props: Props) => {
  const { ip } = props
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
                  onClick={() => onGetPlaces(() => usedSearch.setLoading(false))}
                  disabled={!isLocationReady}
                >
                  getPlace
                </button>
                <button
                  className='bg-gh-dark py-2 px-4 rounded-md text-white outline-none active:scale-90'
                  onClick={() => setIsFindingRouting((prev) => !prev)}
                  disabled={!isLocationReady}
                >
                  Update Finding {isFindingRoute.toString()}
                </button>
                <p className='bg-gh-white py-2 px-4 rounded-md text-gh-black outline-none'>
                  IP: {ip}
                </p>
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
