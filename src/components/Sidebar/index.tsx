import React, { useEffect, useState } from 'react'

// Components
import Header from '../Modal/Header'
import Modal from '@/components/Modal/index'
import Restaurant from '@/components/Restaurant'
import Tab from '@/components/Tab'
import { useSession } from 'next-auth/react'
import useTables from '@/hooks/API/tables'

// Data
import mapData from '@/data/places/index.json'
import useRestaurants from '@/hooks/context/Restaurants'
import { Activity } from '@prisma/client'

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

// Types
type HeaderProps = React.ComponentProps<typeof Header>

type Props = {
  isOpen: boolean
} & HeaderProps

const Renderer = (props: RendererProps) => {
  const { data, isLocked, onLike } = props

  return (
    <div className='overflow-auto px-4'>
      {data?.map((activity: Activity) => (
        <Restaurant
          mode='small'
          data={mapData.results[0]}
          isLocked={isLocked}
          isLiked={activity?.is_liked}
          onLike={() => onLike(activity)}
        />
      ))}
    </div>
  )
}

const Sidebar = (props: Props) => {
  const { data: session, status } = useSession()
  const [selectedId, setSelectedId] = useState(0)
  const { getUserAllActivities } = useTables()
  const { activityList, setActivityList } = useRestaurants()
  const { isOpen, title, onClose } = props

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  // const filteredData = activityData.filter((v) => v?.state === ['LIKED', 'UNLIKED'][selectedId])

  const setTabs = (id: number) => {
    setSelectedId(id)
  }

  const handleOnLike = (activity: Activity) => {
    setActivityList((prev) =>
      prev.map((a) => (a.place_id === activity.place_id ? { ...a, is_liked: !a.is_liked } : a)),
    )
  }

  useEffect(() => {
    const init = async () => {
      if (!session?.user?.id) return
      const activities = await getUserAllActivities({ user_id: session?.user.id })
      setActivityList(activities)
    }

    init()
  }, [session?.user?.id])

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[2] ${slideIn}`}
    >
      <Header title={title || 'Sidebar'} onClose={onClose} />
      <Tab tabs={tabs} selectedId={selectedId} onSelect={setTabs} />
      <Renderer data={activityList} isLocked={status !== 'authenticated'} onLike={handleOnLike} />
    </div>
  )
}

export default Sidebar
