import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

// Components
import MapBox from '@/components/MapBox'
import { Regular } from '@/components/Button'

const Home: NextPage = () => {
  return (
    <div className='relative'>
      <header className='absolute top-0 left-0 w-full flex justify-between p-4'>
        <button className='bg-gh-white px-4 py-2 rounded-md'>Auth</button>
        <button className='bg-gh-white px-4 py-2 rounded-md'>Lib</button>
      </header>
      <MapBox />
      <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4'>
        {/* <button className='bg-gh-dark text-gh-white px-4 py-2 rounded-md active:bg-opacity-90'>
          Find
        </button> */}
        <Regular />
      </footer>
    </div>
  )
}

export default Home
