import AcitvityButton from '@/features/activities/components/ActivityButton'
import ActivityPanel from '@/features/activities/components/ActivityPanel'

// data
import { ReactElement } from 'react'
import { MainLayout } from '@/layouts/layout'
import { getSession, useSession } from 'next-auth/react'
import MapBox from '@/features/mapbox/components/MapBox'
import Head from '@/components/meta/Head'
import { ROUTES } from '@/constants/routes'
import LoadingFallback from '@/components/fallback/LoadingFallback'
import { GetServerSidePropsContext } from 'next'

const LibraryPage = () => {
  const { status } = useSession()

  if (status === 'loading') return <LoadingFallback />

  return (
    <>
      <Head title={ROUTES.LIBRARY.label} url={ROUTES.DETAILS.label} />
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: `/signin?referer=${ctx.resolvedUrl}`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default LibraryPage
