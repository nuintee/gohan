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
import SearchModal from '@/features/search/components/SearchModal'
import { ReactElement, useState } from 'react'
import useSearch from '@/features/search/hooks/useSearch'
import { MainLayout } from '@/layouts/layout'
import { useSession } from 'next-auth/react'
import AuthFallback from '@/components/fallback/AuthFallback'

const LibraryPage = () => {
  const { isSearchModalOpen, manageSearchModal } = useSearch()
  const { status } = useSession()

  if (status === 'unauthenticated') return <AuthFallback />

  return (
    <>
      <main className='relative flex-1 bg-gh-l-gray'>
        <section className='absolute top-4 right-4 z-[1]'>
          <AcitvityButton />
        </section>
        <ActivityPanel />
        <MapBox />
      </main>
      <MapBox />
      <section className='absolute bottom-4 -translate-x-1/2 left-1/2'>
        <GohanButton onClick={() => manageSearchModal(true)} size={25} />
      </section>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => manageSearchModal(false)}
        trigger={isSearchModalOpen}
      />
    </>
  )
}

LibraryPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default LibraryPage
