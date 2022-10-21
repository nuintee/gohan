import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

// Components
import MapBox from '@/components/MapBox'
import { Action } from '@/components/Button'
import Acitvity from '@/components/Activity'
import User from '@/components/User'
import Sidebar from '@/components/Sidebar'
import { Restaurant } from '@/components/Restaurant'

// InitialValues
import { initialStates } from '@/components/Button/Action/constants'

const Home: NextPage = () => {
  const [searchButton, setSearchButton] = useState(initialStates)
  const [isSidebarOpen, setisSidebarOpen] = useState(true) // to Hook

  const clickHandle = () => {
    if (searchButton.mode === 'search') {
      setSearchButton((prev) => ({ ...prev, loading: true }))
      setTimeout(() => {
        setSearchButton((prev) => ({ ...prev, loading: false }))
      }, 1000)
    } else if (searchButton.mode === 'close') {
    }
  }

  return (
    <div className='relative'>
      <header className='absolute top-0 left-0 w-full flex justify-between p-4'>
        <User loading={false} onClick={() => {}} />
        <Acitvity locked={false} onClick={() => setisSidebarOpen(true)} />
      </header>
      <main>
        <MapBox />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setisSidebarOpen(false)} />
      </main>
      <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4'>
        <Action
          mode={searchButton.mode}
          type={searchButton.type}
          onClick={clickHandle}
          loading={searchButton.loading}
        />
      </footer>
    </div>
  )
}

export default Home
