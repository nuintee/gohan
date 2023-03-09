import { Children, ReactElement, useMemo, useState } from 'react'

import { SuspenseImage, Texts } from '@/components/ui'

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
import { GetStaticProps } from 'next/types'
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
import { getBareImageAPI } from '@/features/details/hooks/getBareImageAPI'

const TAB_ITEMS = [
  {
    label: '詳細',
  },
  {
    label: '写真',
  },
]

const TabPage = ({
  tabIndex = 0,
  children,
}: {
  tabIndex: number
  children: JSX.Element | JSX.Element[]
}) => {
  const childrenArray = Children.toArray(children)

  return childrenArray.at(tabIndex)
}

const TabNavigation = ({
  tabIndex,
  tabItems,
  onSelect,
}: {
  tabIndex: number
  tabItems: Record<'label', string>[]
  onSelect: (_index: number) => void
}) => {
  return (
    <div className='mt-8'>
      {tabItems?.map((v, i) => (
        <button
          onClick={() => onSelect(i)}
          className={`px-8 py-4 bg-white flex-1 border-b-2 outline-none ${
            tabIndex === i ? 'border-gh-orange font-semibold' : 'border-gh-pale text-gh-d-gray'
          }`}
          key={v.label}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}

const DetailsPage = ({ id }: { id: string }) => {
  const { status } = useSession()

  const { checkIsOpen, clearLocalModal, openLocalModal } = useDetailsModal()

  const activity = useGetActivity({ place_id: id })
  const details = useDetails({ place_id: id })

  // TAB
  const [tabIndex, setTabIndex] = useState(0)

  function withAuth(condition: boolean) {
    return status === 'authenticated' && condition
  }

  // Memorized
  const memorizedPhoto = useMemo(() => {
    return usePlacePhotos(details.data?.photos)
  }, [details.data?.photos])

  if (withAuth(activity.isLoading) || details.isLoading) return <DetailsLoadingFallback />

  if (activity.isError || details.isError)
    return <ErrorFallBack error={activity.error || details.error} />

  return (
    <>
      <Head
        title={details.data?.name || ROUTES.DETAILS.label}
        description={details.data?.editorial_summary?.overview}
        keyword={details.data?.types?.join(',')}
        image={memorizedPhoto.url}
        url={ROUTES.DETAILS.path}
      />
      <div className='flex flex-1 flex-col relative overflow-auto'>
        <DetailsHero
          data={{ ...details.data, ...activity.data }}
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

          <TabNavigation
            tabIndex={tabIndex}
            onSelect={(i) => setTabIndex(i)}
            tabItems={TAB_ITEMS}
          />
          <TabPage tabIndex={tabIndex}>
            <>
              <DetailsDescriptiveGroup data={details.data} isLoading={false} />
              <DetailsSectionGroup data={details.data} isLoading={false} />
            </>
            {/* <div className='gap-2 columns-3 py-2 h-full flex flex-wrap'>
              <SuspenseImage src='https://picsum.photos/500/300' />
              <SuspenseImage src='https://picsum.photos/500/300' />
              <SuspenseImage src='https://picsum.photos/500/300' />
              <SuspenseImage src='https://picsum.photos/500/300' />
              <SuspenseImage src='https://picsum.photos/500/300' />
              <SuspenseImage src='https://picsum.photos/500/300' />
              <SuspenseImage src='https://picsum.photos/500/300' />
              <SuspenseImage src='https://picsum.photos/500/300' />
            </div> */}
            {details.data.photos?.length && (
              <div className='gap-2 columns-3 py-2 h-full flex flex-wrap'>
                {details.data.photos?.map((v) => (
                  <SuspenseImage
                    src={getBareImageAPI(v.photo_reference)}
                    key={v.photo_reference}
                    height={v.height}
                    width={v.width}
                  />
                ))}
              </div>
            )}
          </TabPage>
        </main>
      </div>
      <BasicInfoModal isOpen={checkIsOpen('BASIC')} data={details.data} onClose={clearLocalModal} />
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

  const id = params?.place_id as string
  await ssg.getDetails.prefetch({ place_id: id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 60 * 60 * 24 * 7, // 1 week
  }
}

DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default DetailsPage
