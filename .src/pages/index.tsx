import { signIn, signOut, useSession } from 'next-auth/react'

// Hooks
import { useMapBox, useModals, useSidebar, useToast } from '@/hooks/context'

// Components
import Modal from '@/components/Modal'
import MapBox from '@/components/MapBox'
import { Action } from '@/components/Button'
import Acitvity from '@/components/Activity'
import User from '@/components/User'
import Sidebar from '@/components/Sidebar'
import Toast from '@/components/Toast'
import Restaurant from '@/components/Restaurant'
import DevPanel from '@/components/DevPanel'
import useRestaurants from '@/hooks/context/Restaurants'
import useRestaurantSearch from '@/hooks/API/restaurant'

import { IoMdLocate } from 'react-icons/io'
import useGPS from '@/hooks/context/GPS'
import { useEffect } from 'react'

// const Home = (props: Props) => {
//   const [searchButton, setSearchButton] = useState(initialStates)
//   const { modalsState, manageModal } = useModals()
//   const { sidebarState, manageSidebar } = useSidebar()
//   const { toastState, manageToast } = useToast()
//   const { geoState, flyTo, isFindingRoute, shopDetail, setIsFindingRouting } = useGeoLocation()
//   const { data: session, status } = useSession()
//   const {
//     isLocationReady,
//     isAnyNavigation,
//     isNavigatingCurrent,
//     showDetails,
//     routeTo,
//     onGetPlaces,
//     onNavigateClicked,
//     onSearchClick,
//   } = useDirections()

//   const useSearchButton = () => {
//     const setLoading = (is: boolean) => {
//       setSearchButton((prev) => ({ ...prev, loading: is }))
//     }

//     const setMode = (mode: setModePayload) => {
//       setSearchButton((prev) => ({ ...prev, mode }))
//     }

//     return { setLoading, setMode }
//   }

//   const usedSearch = useSearchButton()

//   return (
//     <>
//       <Toast
//         {...toastState}
//         onClose={() =>
//           manageToast({
//             isOpen: false,
//           })
//         }
//       />
//       <div className='relative h-screen w-screen overflow-hidden'>
//         <header className='absolute top-0 left-0 w-full flex justify-between p-4'>
//           <div className='flex gap-2 items-center flex-1 flex-wrap'>
//             <User loading={status === 'loading'} onClick={() => {}} />
//             <DevPanel
//               useragent={{
//                 ip: props.ip,
//               }}
//             />
//           </div>
//           <Acitvity
//             locked={status !== 'authenticated'}
//             onClick={() => manageSidebar('activity', true)}
//           />
//         </header>
//         <main>
//           {isLocationReady && <MapBox />}
//           <div
//             className={`absolute top-0 left-0 z-[-1] bg-gh-white h-screen w-screen flex items-center justify-center duration-500 ${
//               isLocationReady ? 'scale-0' : 'scale-100'
//             }`}
//           >
//             <p>
//               {!geoState.error?.is
//                 ? isLocationReady
//                   ? ''
//                   : 'Loading'
//                 : 'Please Allow Geolocation'}
//             </p>
//           </div>
//           <Sidebar
//             title='Activities'
//             isOpen={sidebarState.activity.isOpen}
//             onClose={() => manageSidebar('activity', false)}
//           />
//         </main>
//         <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4 items-center flex-col'>
//           {isAnyNavigation && Object.keys(shopDetail)?.length ? (
//             <Restaurant.Small
//               info={shopDetail}
//               onClick={() => showDetails(shopDetail)}
//               state={status !== 'authenticated' ? 'LOCKED' : 'UNLIKED'}
//             />
//           ) : null}
//           <Action
//             mode={isAnyNavigation ? 'close' : 'search'}
//             type={searchButton.type}
//             onClick={() => onSearchClick(usedSearch)}
//             loading={searchButton.loading}
//           />
//           {isLocationReady && (
//             <button
//               onClick={() => flyTo(geoState)}
//               className='absolute right-6 bottom-8 bg-white p-4 rounded-full active:bg-opacity-90 active:scale-90'
//             >
//               <IoMdLocate size={20} />
//             </button>
//           )}
//         </footer>
//       </div>
//       <Modal.User isOpen={modalsState.user.isOpen} onClose={() => manageModal('user', false)} />
//       <Modal.Details
//         state={status !== 'authenticated' ? 'LOCKED' : 'UNLIKED'}
//         isOpen={modalsState.details.isOpen}
//         onClose={() => manageModal('details', false)}
//         onNavigate={() =>
//           onNavigateClicked(shopDetail?.geometry?.location, () => usedSearch.setMode('close'))
//         }
//         isNavigating={isNavigatingCurrent}
//         info={shopDetail}
//         isLoading={isFindingRoute}
//       />
//       <Modal.Confirm
//         isOpen={modalsState.confirm.isOpen}
//         type={'like'}
//         onClose={() => manageModal('confirm', false)}
//       />
//     </>
//   )
// }

const Home = (props) => {
  const { toastState, manageToast } = useToast()
  const { modalsState, manageModal } = useModals()
  const { sidebarState, manageSidebar } = useSidebar()
  const { data: session, status } = useSession()
  const { restaurant } = useRestaurants()
  const { getRestaurant, clearRestaurant } = useRestaurantSearch()
  const { locateUser, isNavigating, isReady, clearRoute, drawRoute, directions } = useMapBox()

  useEffect(() => {
    console.log(directions)
  }, [directions])

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
            <User loading={status === 'loading'} onClick={() => manageModal('user', true)} />
            <DevPanel
              useragent={{
                ip: props.ip,
              }}
            />
          </div>
          <Acitvity
            locked={status !== 'authenticated'}
            onClick={
              status === 'authenticated'
                ? () => manageSidebar('activity', true)
                : () => manageModal('user', true)
            }
          />
        </header>
        <main>
          <MapBox />
          <Sidebar
            title='Activities'
            isOpen={sidebarState.activity.isOpen}
            onClose={() => manageSidebar('activity', false)}
          />
        </main>
        <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4 items-center flex-col'>
          {isNavigating && (
            <Restaurant {...restaurant} mode='small' isLocked={status !== 'authenticated'} />
          )}
          <Action
            mode={isNavigating ? 'close' : 'search'}
            type={'hero'}
            onClick={isNavigating ? () => clearRestaurant() : () => getRestaurant()}
            loading={restaurant?.isFetching}
            disabled={!isReady}
          />
          <button
            onClick={locateUser}
            className='absolute right-6 bottom-8 bg-white p-4 rounded-full active:bg-opacity-90 active:scale-90'
          >
            <IoMdLocate size={20} />
          </button>
        </footer>
      </div>
      <Modal.User isOpen={modalsState.user.isOpen} onClose={() => manageModal('user', false)} />
      <Modal.Details
        isOpen={modalsState.details.isOpen}
        data={restaurant?.data || modalsState.details.data}
        isNavigating={isNavigating}
        isLiked={restaurant?.isLiked}
        onClose={() => manageModal('details', false)}
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
  let ip = 'IP_DEFAULT'

  if (ctx.req.headers['x-forwarded-for']) {
    ip = ctx.req.headers['x-forwarded-for']
  } else if (ctx.req.headers['x-real-ip']) {
    ip = ctx.req.headers['x-real-ip']
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
