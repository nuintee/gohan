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
import calculateDistance from '@/libs/haversine-distance'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import useGetDirections from '@/features/directions/hooks/useGetDirections'
import useToast from '@/libs/react-toastify'

// const Index = () => {
//   // User
//   const session = useSession()

//   // Modals
//   const { open, close, isOpen, getPayload } = useModals()

//   // Restaurants
//   const { restaurant, set } = useRestaurants()

//   // GPS
//   const { coords, coordAsString, isLoadingUserLocation } = useMapBox()

//   // Directions
//   const {
//     hasDirections,
//     directions,
//     revokeDirections,
//     getDirections: getDirections,
//   } = useDirections()

//   return (
//     <>
//       <div className='flex flex-col gap-4'>
//         <section className='absolute top-0 left-0 z-[1] w-full p-4 flex gap-4 justify-between'>
//           <User />
//           <AcitvityButton />
//         </section>
//         <MapBox />
//         <section className='absolute bottom-0 left-0 z-[1] w-full flex items-center justify-center p-4 flex-col gap-4'>
//           {hasDirections && (
//             <RestaurantCard
//               compact
//               isLocked={session.status === 'unauthenticated'}
//               isNavigating={hasDirections}
//               data={restaurant}
//               distance={calculateDistance(coords, restaurant?.geometry?.location).auto}
//               onClick={() => open('restaurantdiscovered')}
//             />
//           )}
//           <GohanButton />
//         </section>
//       </div>
//       <ActivityPanel />
//       <RestaurantDiscoveredModal
//         isLocked={session.status === 'unauthenticated'}
//         isOpen={isOpen('restaurantdiscovered')}
//         onClose={() => close('restaurantdiscovered')}
//         distance={calculateDistance(coords, restaurant?.geometry?.location, true).auto}
//         data={restaurant}
//         isNavigating={hasDirections}
//       />
//       <UserAuthConsentDialog />
//       <UserSettingsModal />
//       <ToastCatcher position='top-center' />
//     </>
//   )
// }

const Index = () => {
  // Activities [OK]
  const getActivity = useGetActivity({ activityId: '2' })
  const getUserActivities = useGetUserActivities({ userId: '268119a3-cc69-4cff-b86d-35ee46ef43ad' })

  // Directions
  const getDirections = useGetDirections({ end: `23.408622,42.648763` })

  return (
    <>
      <div>
        <div className='absolute top-0 left-0 z-[2]'>
          <p>{getActivity.isFetching ? '...' : JSON.stringify(getActivity.data)}</p>
          <button onClick={getActivity.refetch}>GetActivity</button>
          <hr></hr>
          <p>{getUserActivities.isFetching ? '...' : JSON.stringify(getUserActivities.data)}</p>
          <button onClick={getUserActivities.refetch}>GetActivities</button>
          <hr></hr>
          <p>{getDirections.isFetching ? '...' : JSON.stringify(getDirections.data)}</p>
          <button onClick={getDirections.refetch}>GetDirections</button>
          <hr></hr>
          <button onClick={() => useToast('S')}>useToast</button>
        </div>
        <MapBox />
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
