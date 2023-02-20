import { GohanButton } from '@/components/ui'
import Header from '@/components/ui/Header'
import { BASE_URL } from '@/config/env'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import ActivityPanel from '@/features/activities/components/ActivityPanel'
import useGetUserActivities from '@/features/activities/hooks/useGetUserActivities'
import MapBox from '@/features/mapbox/components/MapBox'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import useGPS from '@/hooks/gps'
import { getDominantColor } from '@/libs/rgbaster'
import { useRouter } from 'next/router'

// data
import images from '@/data/images.json'
import SearchModal from '@/features/search/components/SearchModal'
import { useState } from 'react'
import useSearch from '@/features/search/hooks/useSearch'

const LibraryPage = () => {
  const { isSearchModalOpen, mangaeSearchModal } = useSearch()

  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <Header />
        <main className='relative flex-1 bg-gh-l-gray'>
          <section className='absolute top-4 right-4 z-[1]'>
            <AcitvityButton />
          </section>
          <ActivityPanel />
          <MapBox />
          <section className='absolute bottom-6 -translate-x-1/2 left-1/2'>
            <GohanButton onClick={() => mangaeSearchModal(true)} size={25} />
          </section>
        </main>
      </div>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => mangaeSearchModal(false)}
        trigger={isSearchModalOpen}
      />
    </>
  )
}

export default LibraryPage
