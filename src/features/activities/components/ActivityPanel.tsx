import React, { useEffect, useMemo, useState } from 'react'

// Function
import calculateDistance from '@/libs/haversine-distance'

// Components
import Header from '@/components/ui/Header'
import useActivities from '../hooks'
import { Activity } from '@prisma/client'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'
import { ActivityResolved } from '../types'
import { useSession } from 'next-auth/react'
import { UseMutationResult } from '@tanstack/react-query'
import useMapBox from '@/features/mapbox/hooks'
import useModals from '@/hooks/modals'
import useRestaurants from '@/features/restaurants/hooks'
import useGetRestaurants from '@/features/restaurants/hooks/useRestaurants/useGetRestaurants'
import usePatchActivity from '../hooks/usePatchActivity'
import useGetUserActivities from '../hooks/useGetUserActivities'
import useActivityPanel from '../hooks/useActivityPanel'

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

const List = (props: ListProps) => {
  const [activityId, setActivityId] = useState('')
  const { activities, isLocked } = props
  const { coords } = useMapBox()
  const { open } = useModals()

  // Update
  const patchActivity = usePatchActivity({ activityId })

  const handleUpdate = (activity) => {
    setActivityId(activity.id)

    if (!activityId) return

    patchActivity.mutate({
      is_liked: true,
    })
  }

  if (!activities?.length) return <>No contents</>

  return (
    <div className='flex flex-col overflow-auto'>
      {activities?.map((activity) => (
        <RestaurantCard
          data={activity}
          // distance={calculateDistance(coords, activity.geometry.location, true).auto}
          compact
          key={activity.id}
          isLocked={isLocked}
          onLike={() => handleUpdate(activity)}
          onClick={() => open('restaurantdiscovered', activity)}
        />
      ))}
    </div>
  )
}

const ActivityPanel = (props: Props) => {
  const { isPanelOpen, closePanel } = useActivityPanel()
  const getUserAll = useGetUserActivities({ details: true })
  const { status } = useSession()

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
