import React, { useEffect, useState } from 'react'

// Components
import Header from '@/components/ui/Header'
import useActivities from '../hooks'
import { Activity } from '@prisma/client'
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'

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
  activities: Activity[]
  isLocked: boolean
  onLike: Funtion
}

const List = (props: ListProps) => {
  const { activities, isLocked, onLike } = props

  console.log({ activities })

  if (!activities?.length) return <>No contents</>

  return (
    <div>
      {activities?.map((activity) => (
        <RestaurantCard data={activity} compact key={activity.id} />
      ))}
    </div>
  )
}

const ActivityPanel = (props: Props) => {
  const { isOpen } = props
  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'
  const { getUserAll } = useActivities()
  const { data } = getUserAll()

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[0] ${slideIn}`}
    >
      <Header title={'ActivityPanel'} onClose={() => {}} />
      {/* <Tab tabs={tabs} selectedId={selectedId} onSelect={setTabs} />
      <Renderer data={activityList} isLocked={status !== 'authenticated'} onLike={handleOnLike} /> */}
      <List activities={data} />
    </div>
  )
}

export default ActivityPanel
