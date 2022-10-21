import React, { useState } from 'react'

// Components
import Header from '../Modal/Header'
import Modal from '@/components/Modal/index'
import { Restaurant } from '@/components/Restaurant'
import Tab from '@/components/Tab'

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

const Renderer = (props: any) => {
  const { data } = props
  return (
    <div className='overflow-auto px-4'>
      {data?.map((item) => (
        <Restaurant.Small state={item.state} />
      ))}
    </div>
  )
}

const Sidebar = (props: Props) => {
  const [selectedId, setSelectedId] = useState(0)
  const { isOpen, title, onClose } = props

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  const setTabs = (id: number) => {
    setSelectedId(id)
  }

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col min-w-[20rem] w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md ${slideIn}`}
    >
      <Header title={title || 'Sidebar'} onClose={onClose} />
      <Tab tabs={tabs} selectedId={selectedId} onSelect={setTabs} />
      <Renderer data={placeholder_data} />
    </div>
  )
}

export default Sidebar
