import React, { useEffect, useState } from 'react'

// Components
import Header from '@/components/ui/Header'
import useActivities from '../hooks'
import { Activity } from '@prisma/client'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'
import { ActivityResolved } from '../types'
import { useSession } from 'next-auth/react'
import { UseMutationResult } from '@tanstack/react-query'

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
  isOpen: boolean
}

type ListProps = {
  activities: ActivityResolved[]
  isLocked: boolean
  updater: UseMutationResult
}

const List = (props: ListProps) => {
  const { activities, isLocked, updater } = props

  if (!activities?.length) return <>No contents</>

  return (
    <div>
      {activities?.map((activity) => (
        <RestaurantCard
          data={activity}
          compact
          key={activity.id}
          isLocked={isLocked}
          onLike={() =>
            updater.mutate({ activityId: activity.id, payload: { is_liked: !activity.is_liked } })
          }
        />
      ))}
    </div>
  )
}

const ActivityPanel = (props: Props) => {
  const { isOpen } = props
  const { getUserAll, update } = useActivities()
  const { data } = getUserAll()
  const { data: session, status } = useSession()
  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'
  const updateActity = update()

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[0] ${slideIn}`}
    >
      <Header title={'ActivityPanel'} onClose={() => {}} />
      {/* <Tab tabs={tabs} selectedId={selectedId} onSelect={setTabs} />
      <Renderer data={activityList} isLocked={status !== 'authenticated'} onLike={handleOnLike} /> */}
      <List activities={data} isLocked={status === 'unauthenticated'} updater={updateActity} />
    </div>
  )
}

export default ActivityPanel
