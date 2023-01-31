import React, { useEffect, useState } from 'react'

// Components
import Header from '@/components/ui/Header'
import useActivities from '../hooks'

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
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default ActivityPanel
