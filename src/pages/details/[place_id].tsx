import { ReactElement, useMemo } from 'react'

import { Texts } from '@/components/ui'

import BasicInfoModal from '@/features/details/components/BasicInfoModal'
import ReviewModal from '@/features/details/components/ReviewModal'
import ImageModal from '@/features/details/components/ImageModal'
import useGetActivity from '@/features/activities/hooks/useGetActivity'

// SSG
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '@/server/routers/_app'
import superjson from 'superjson'
import { useSession } from 'next-auth/react'
import ErrorFallBack from '@/components/fallback/ErrorFallback'
import { GetServerSideProps, GetStaticProps } from 'next/types'
import DetailsLoadingFallback from '@/features/details/components/DetailsLoadingFallback'
import { MainLayout } from '@/layouts/layout'
import DetailsDescriptiveGroup from '@/features/details/components/ui/DetailsDescriptiveGroup'
import DetailsSectionGroup from '@/features/details/components/ui/DetailsSectionGroup'
import usePlacePhotos from '@/features/details/hooks/usePlacePhotos'
import useDetailsModal from '@/features/details/hooks/useDetailsModal'
import DetailsHero from '@/features/details/components/ui/DetailsHero'
import ToolTip from '@/components/ui/Tootltip'
import { colors } from '@/config/colors'
import Promotion from '@/components/ui/Promotion'
import useDetails from '@/features/details/hooks/useDetails'
import Head from '@/components/meta/Head'
import { ROUTES } from '@/constants/routes'
import { ActivityResolved } from '@/features/activities/types'

const DetailsPage = ({ id, details, serverError }: { id: string; details: ActivityResolved }) => {
  const { status } = useSession()

  const { checkIsOpen, clearLocalModal, openLocalModal } = useDetailsModal()

  const activity = useGetActivity({ place_id: id })

  if (serverError) return <h1>{JSON.stringify(serverError)}</h1>

  console.dir(details)
  console.dir(activity)

  // Memorized
  const memorizedPhoto = useMemo(() => {
    return usePlacePhotos(details?.photos)
  }, [details?.photos])

  if (activity.isFetching && !activity.isFetchedAfterMount) return <DetailsLoadingFallback />

  if (activity.isError) return <ErrorFallBack error={activity.error} />

  return (
    <>
      <Head
        title={details?.name || ROUTES.DETAILS.label}
        description={details?.editorial_summary?.overview}
        keyword={details?.types?.join(',')}
        image={memorizedPhoto.url}
        url={ROUTES.DETAILS.path}
      />
      <div className='flex flex-1 flex-col relative overflow-auto'>
        <DetailsHero
          data={{ ...details, ...activity.data }}
          isFetching={activity.isFetching}
          refetch={activity.refetch}
          memorizedImgURL={memorizedPhoto.url}
          modalSetter={openLocalModal}
          color={colors['gh-dark']}
        />
        <main className='sm:px-[10%] px-4'>
          {status === 'authenticated' ? (
            <div className='flex-1 flex flex-col justify-between py-2'>
              <Texts
                main='この場所についてのメモ'
                sub={activity.data?.memo || 'メモはまだありません。'}
                mainDecoration={<ToolTip text='評価からメモを追加可能です。' />}
                subColor={activity.data?.memo ? colors['gh-d-gray'] : colors['gh-gray']}
              />
            </div>
          ) : (
            <Promotion />
          )}
          <DetailsDescriptiveGroup data={details} isLoading={false} />
          <DetailsSectionGroup data={details} isLoading={false} />
        </main>
      </div>
      <BasicInfoModal isOpen={checkIsOpen('BASIC')} data={details} onClose={clearLocalModal} />
      <ReviewModal
        isOpen={checkIsOpen('REVIEW')}
        onClose={clearLocalModal}
        onReviewSuccess={activity.refetch}
        data={{
          memo: activity.data?.memo,
          status: activity.data?.reviewStatus,
          id: activity.data?.id,
          place_id: id,
        }}
      />
      <ImageModal isOpen={checkIsOpen('IMAGE')} data={memorizedPhoto} onClose={clearLocalModal} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  try {
    const details = await ssg.getDetails.fetch({ place_id: params?.place_id as string })
    console.log({ details })

    return {
      props: {
        details,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        serverError: error,
      },
    }
  }
}

// export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
//   console.log({ query })
//   console.log({ params })

//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: {},
//     transformer: superjson,
//   })

//   const tasks = [ssg.getActivity, ssg.getDetails]

//   await Promise.all(
//     tasks.map(async (v) => await v.prefetch({ place_id: query.place_id as string })),
//   )

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       id: query.place_id,
//       color: query.color || colors['gh-dark'],
//     },
//   }
// }

DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default DetailsPage
