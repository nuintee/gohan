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
import useMapBox from '@/features/mapbox/hooks'
import Head from '@/components/meta/Head'
import { ROUTES } from '@/constants/routes'

Router.events.on('routeChangeStart', (e) => {
  console.time('start')
})

Router.events.on('routeChangeComplete', (e) => {
  console.timeEnd('start')
})

const LibraryPage = () => {
  const { status } = useSession()

  if (status === 'unauthenticated') return <AuthFallback />

  return (
    <>
      <Head title={ROUTES.LIBRARY.label} url={ROUTES.DETAILS.label} />
      <main className='relative flex-1 bg-gh-l-gray'>
        <section className='absolute top-4 right-4 z-[1]'>
          <AcitvityButton />
        </section>
        <ActivityPanel />
        <MapBox />
      </main>
    </>
  )
}

LibraryPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout searchButtonPosition='bottom-center'>{page}</MainLayout>
}

export default LibraryPage
