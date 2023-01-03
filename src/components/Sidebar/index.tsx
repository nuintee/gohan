import React, { useEffect, useState } from 'react'

// Components
import Header from '../Modal/Header'
import Modal from '@/components/Modal/index'
import { Restaurant } from '@/components/Restaurant'
import Tab from '@/components/Tab'
import { Activities, Activity } from '@/data/activities/types'
import { activitiesTable } from '@/hooks/API/activities'
import activities from '@/data/activities/index.json'

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

const Renderer = (props) => {
  const { data } = props
  return (
    <div className='overflow-auto px-4'>
      {data?.map((item) => (
        <Restaurant.Small state={item.state} info={item?.info} />
      ))}
    </div>
  )
}

const Sidebar = (props: Props) => {
  const [selectedId, setSelectedId] = useState(0)
  const [activityData, setActivityData] = useState([])
  const { isOpen, title, onClose } = props

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  const filteredData = activityData.filter((v) => v?.state === ['LIKED', 'UNLIKED'][selectedId])

  const setTabs = (id: number) => {
    setSelectedId(id)
  }

  useEffect(() => {
    const init = async () => {
      setActivityData(activities)
    }

    init()
  }, [])

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md z-[2] ${slideIn}`}
    >
      <Header title={title || 'Sidebar'} onClose={onClose} />
      <Tab tabs={tabs} selectedId={selectedId} onSelect={setTabs} />
      <Renderer data={filteredData} />
    </div>
  )
}

export default Sidebar
