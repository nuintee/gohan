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
import useDetailsModal from '@/features/details/hooks/useDetailsModal'
import DetailsHero from '@/features/details/components/ui/DetailsHero'
import ToolTip from '@/components/ui/Tootltip'
import { colors } from '@/config/colors'
import Promotion from '@/components/ui/Promotion'
import useDetails from '@/features/details/hooks/useDetails'
import Head from '@/components/meta/Head'
import { ROUTES } from '@/constants/routes'
import { getBareImageAPI } from '@/features/details/hooks/getBareImageAPI'
import Tab from '@/components/ui/Tab'
import { useTab } from '@/hooks/tab'
import { PhotosEntity } from '@/features/restaurants/types'
import { FALLBACK_IMAGE } from '@/config/env'

const TAB_ITEMS = [
  {
    label: '詳細',
  },
  {
    label: '写真',
  },
]

const usePlacePhoto = (photo: PhotosEntity) => {
  if (!photo)
    return {
      url: FALLBACK_IMAGE,
      width: 400,
      height: 400,
      html_attributions: [],
    }

  const url = getBareImageAPI(photo.photo_reference)

  return { ...photo, url: url.toString() }
}

const DetailsPage = ({ id }: { id: string }) => {
  const { status } = useSession()

  const { checkIsOpen, clearLocalModal, openLocalModal } = useDetailsModal()

  const activity = useGetActivity({ place_id: id })
  const details = useDetails({ place_id: id })

  const tab = useTab({ disabled: !Boolean(details.data?.photos?.length) })

  function withAuth(condition: boolean) {
    return status === 'authenticated' && condition
  }

  function openImageModal(photos) {
    setImageModalData(photos)
    openLocalModal('IMAGE')
  }

  // memorized
  const memorizedPhotos = useMemo(() => {
    return details.data?.photos?.map((v) => usePlacePhoto(v))
  }, [details.data?.photos])

  const [imageModalData, setImageModalData] = useState(memorizedPhotos?.at(0))

  if (withAuth(activity.isLoading) || details.isLoading) return <DetailsLoadingFallback />

  if (activity.isError || details.isError)
    return <ErrorFallBack error={activity.error || details.error} />

  return (
    <>
      <Head
        title={details.data?.name || ROUTES.DETAILS.label}
        description={details.data?.editorial_summary?.overview}
        keyword={details.data?.types?.join(',')}
        image={memorizedPhotos?.at(0)?.url}
        url={ROUTES.DETAILS.path}
      />
      <div className='flex flex-1 flex-col relative overflow-auto'>
        <DetailsHero
          data={{ ...details.data, ...activity.data }}
          isFetching={activity.isFetching}
          refetch={activity.refetch}
          memorizedImgURL={memorizedPhotos?.at(0)?.url}
          modalSetter={openLocalModal}
          color={colors['gh-dark']}
          onImageClick={() => openImageModal(memorizedPhotos?.at(0))}
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

          <Tab.Navigation {...tab} tabItems={TAB_ITEMS} />
          <Tab.Page tabIndex={tab.tabIndex} disabled={tab.disabled}>
            <>
              <DetailsDescriptiveGroup data={details.data} isLoading={false} />
              <DetailsSectionGroup data={details.data} isLoading={false} />
            </>
            {details.data.photos?.length ? (
              <div className='h-full overflow-y-auto gap-2 sm:columns-2 md:columns-3 columns-1 py-4'>
                {memorizedPhotos?.map((v) => (
                  <SuspenseImage
                    src={v.url}
                    height={v.height}
                    width={v.width}
                    className={
                      'w-fit h-fit object-scale-down mb-4 hover:scale-105 duration-300 cursor-pointer'
                    }
                    key={v.url}
                    onClick={() => openImageModal(v)}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}
          </Tab.Page>
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
      <ImageModal isOpen={checkIsOpen('IMAGE')} data={imageModalData} onClose={clearLocalModal} />
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
