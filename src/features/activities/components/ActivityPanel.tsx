import React, { useEffect, useMemo, useState } from 'react'

// Function
import calculateDistance from '@/libs/haversine-distance'

// Components
import Header from '@/components/ui/Header'
import { Activity } from '@prisma/client'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'
import { ActivityResolved } from '../types'
import { useSession } from 'next-auth/react'
import { QueryClient, UseMutationResult } from '@tanstack/react-query'
import useMapBox from '@/features/mapbox/hooks'
import useModals from '@/hooks/modals'
import usePatchActivity from '../hooks/usePatchActivity'
import useGetUserActivities from '../hooks/useGetUserActivities'
import useActivityPanel from '../hooks/useActivityPanel'
import useExperimentalRestaurants from '@/features/restaurants/hooks/useExperimentalRestaurants'
import { RestaurantProps } from '@/features/restaurants/types'

// Constants
const tabs = [
  {
    label: 'History',
    id: 0,
  },
  {
    label: 'Favorites',
    id: 1,
  },
]

const placeholder_data = Array.from(Array(100).keys()).map((v) => ({
  state: ['LIKED', 'UNLIKED'][Math.floor(Math.random() * ['LIKED', 'UNLIKED'].length)],
}))

type Props = {
  isOpen?: boolean
  data?: ActivityResolved[]
  onClose?: React.MouseEventHandler<HTMLButtonElement>
}

type ListProps = {
  activities: ActivityResolved[]
  isLocked: boolean
}

// later move inside to restaurants component
const ActivityWrapper = (props: RestaurantProps) => {
  const { data, isLocked } = props

  const restaurant = useExperimentalRestaurants({ place_id: data?.place_id })
  const patchActivity = usePatchActivity()

  if (!data) return <></>

  const handleUpdate = () => {
    patchActivity.mutate({
      activityId: data?.id,
      payload: {
        is_liked: !data?.is_liked,
      },
    })
  }

  return (
    <RestaurantCard
      data={data}
      // distance={calculateDistance(coords, activity.geometry.location, true).auto}
      compact
      key={data?.id}
      isLocked={isLocked}
      onLike={() => handleUpdate()}
      onClick={() => restaurant.refetch()}
    />
  )
}

// const List = (props: ListProps) => {
//   const { coords } = useMapBox()
//   const { activities, isLocked } = props

//   const handleClick = (activity) => {
//     // manually set restaurant
//     // open('restaurantdiscovered', activity)
//     // console.log(activity)
//   }

//   // Update
//   const patchActivity = usePatchActivity()

//   const handleUpdate = (activity: ActivityResolved) => {
//     patchActivity.mutate({
//       activityId: activity.id,
//       payload: {
//         is_liked: !activity.is_liked,
//       },
//     })
//   }

//   if (!activities?.length) return <>No contents</>

//   return (
//     <div className='flex flex-col overflow-auto'>
//       {activities.map((activity) => (
//         <RestaurantCard
//           data={activity}
//           distance={calculateDistance(coords, activity.geometry.location, true).auto}
//           compact
//           key={activity.id}
//           isLocked={isLocked}
//           onLike={() => handleUpdate(activity)}
//           onClick={() => handleClick(activity)}
//         />
//       ))}
//     </div>
//   )
// }

const List = (props: ListProps) => {
  const { coords } = useMapBox()
  const { activities, isLocked } = props

  if (!activities?.length) return <>No contents</>

  return (
    <div className='flex flex-col overflow-auto'>
      {activities.map((activity) => (
        <ActivityWrapper data={activity} isLocked={isLocked} />
      ))}
    </div>
  )
}

const ActivityPanel = (props: Props) => {
  const { isPanelOpen, closePanel } = useActivityPanel()
  const { status, data: session } = useSession()
  const getUserAll = useGetUserActivities({ userId: session?.user.id as string })

  const {
    isOpen = isPanelOpen ?? false,
    onClose = closePanel,
    data = getUserAll.data ?? [],
  } = props

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[1] ${slideIn}`}
    >
      <Header title={'ActivityPanel'} onClose={onClose} />
      <List activities={data} isLocked={status === 'unauthenticated'} />
    </div>
  )
}

export default ActivityPanel
