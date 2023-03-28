import AcitvityButton from '@/features/activities/components/ActivityButton'
import ActivityPanel from '@/features/activities/components/ActivityPanel'

// data
import { ReactElement } from 'react'
import { MainLayout } from '@/layouts/layout'
import { useSession } from 'next-auth/react'
import AuthFallback from '@/components/fallback/AuthFallback'
import MapBox from '@/features/mapbox/components/MapBox'
import Head from '@/components/meta/Head'
import { ROUTES } from '@/constants/routes'
import LoadingFallback from '@/components/fallback/LoadingFallback'

const LibraryPage = () => {
  const { status } = useSession()

  if (status === 'loading') return <LoadingFallback />

  if (status === 'unauthenticated') return <AuthFallback />

  return (
    <>
      <Head title={`Gohan | ${ROUTES.LIBRARY.label}`} url={ROUTES.LIBRARY.path} />
      <main className='relative flex-1 bg-gh-l-gray' data-testid='library__page'>
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
