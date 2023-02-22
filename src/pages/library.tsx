import { GohanButton } from '@/components/ui'
import AcitvityButton from '@/features/activities/components/ActivityButton'
import ActivityPanel from '@/features/activities/components/ActivityPanel'

// data
import SearchModal from '@/features/search/components/SearchModal'
import { ReactElement, useEffect, useState } from 'react'
import useSearch from '@/features/search/hooks/useSearch'
import { MainLayout } from '@/layouts/layout'
import { useSession } from 'next-auth/react'
import AuthFallback from '@/components/fallback/AuthFallback'
import MapBox from '@/features/mapbox/components/MapBox'
import { useQueryClient } from '@tanstack/react-query'
import { Router, useRouter } from 'next/router'

Router.events.on('routeChangeStart', (e) => {
  console.time('start')
})

Router.events.on('routeChangeComplete', (e) => {
  console.timeEnd('start')
})

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
