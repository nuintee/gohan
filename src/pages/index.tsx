import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

// Components
import Map from '@/components/Map'

const Home: NextPage = () => {
  return (
    <div className='relativ'>
      <header className='absolute top-0 left-0 w-full flex justify-between p-4'>
        <button className='bg-gh-white px-4 py-2 rounded-md'>Auth</button>
        <button className='bg-gh-white px-4 py-2 rounded-md'>Lib</button>
      </header>
      <Map />
      <footer className='absolute bottom-0 left-0 w-full flex justify-center gap-4 p-4'>
        <button className='bg-gh-dark text-gh-white px-4 py-2 rounded-md'>Find</button>
      </footer>
    </div>
  )
}

export default Home
