import AcitvityButton from '@/features/activities/components/ActivityButton'
import ActivityPanel from '@/features/activities/components/ActivityPanel'

// data
import { ReactElement } from 'react'
import { MainLayout } from '@/layouts/layout'
import { useSession } from 'next-auth/react'
import AuthFallback from '@/components/fallback/AuthFallback'
import MapBox from '@/features/mapbox/components/MapBox'
import { Router } from 'next/router'
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
