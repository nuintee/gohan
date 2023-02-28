import { memo, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { Button, Input, Cover, ImageChip, Texts, DropDown, GohanButton } from '@/components/ui'

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
import { GetServerSideProps } from 'next/types'
import DetailsLoadingFallback from '@/features/details/components/DetailsLoadingFallback'
import useSearch from '@/features/search/hooks/useSearch'
import SearchModal from '@/features/search/components/SearchModal'
import { MainLayout } from '@/layouts/layout'
import DetailsTitle from '@/features/details/components/ui/DeatailsTitle'
import DetailsDescriptiveGroup from '@/features/details/components/ui/DetailsDescriptiveGroup'
import DetailsSectionGroup from '@/features/details/components/ui/DetailsSectionGroup'
import DetailsActionGroup from '@/features/details/components/ui/DetailsActionGroup'
import usePlacePhotos from '@/features/details/hooks/usePlacePhotos'
import { useRouter } from 'next/router'
import useDetailsModal from '@/features/details/hooks/useDetailsModal'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import useActivityStatus from '@/features/activities/hooks/useActivityStatus'
import DetailsHero from '@/features/details/components/ui/DetailsHero'
import ToolTip from '@/components/ui/Tootltip'
import { colors } from '@/config/colors'
import Promotion from '@/components/ui/Promotion'
import useDetails from '@/features/details/hooks/useDetails'

const DetailsPage = ({ id, color }: { id: string; color: string }) => {
  const { status } = useSession()

  const { checkIsOpen, clearLocalModal, openLocalModal } = useDetailsModal()

  const details = useDetails({ place_id: id })
  const activity = useGetActivity({ place_id: id })

  // Memorized
  const memorizedPhoto = useMemo(() => {
    return usePlacePhotos(details.data?.photos)
  }, [details.data?.photos])

  if (
    (activity.isFetching && !activity.isFetchedAfterMount) ||
    (details.isFetching && !details.isFetchedAfterMount)
  )
    return <DetailsLoadingFallback />

  if (activity.isError || details.isError)
    return <ErrorFallBack error={activity.error || details.error} />

  return (
    <>
      <div className='flex flex-1 flex-col relative overflow-auto'>
        <DetailsHero
          data={{ ...details.data, ...activity.data }}
          isFetching={activity.isFetching}
          refetch={activity.refetch}
          memorizedImgURL={memorizedPhoto.url}
          modalSetter={openLocalModal}
          color={color}
        />
        <main className='px-[10%]'>
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
          <DetailsDescriptiveGroup data={details.data} isLoading={false} />
          <DetailsSectionGroup data={details.data} isLoading={false} />
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

export const getServerSideProps: GetServerSideProps = async ({ query, req, res, params }) => {
  console.log({ query })
  console.log({ params })

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  await ssg.getActivity.prefetch({ place_id: query.place_id as string })
  await ssg.getDetails.prefetch({ place_id: query.place_id as string })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: query.place_id,
      color: query.color || colors['gh-dark'],
    },
  }
}

DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default DetailsPage
