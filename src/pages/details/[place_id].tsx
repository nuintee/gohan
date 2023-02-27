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

const DetailsPage = ({ id }: { id: string }) => {
  const { data: session, status } = useSession()

  const { checkIsOpen, clearLocalModal, openLocalModal } = useDetailsModal()

  const { data, isFetching, isError, error, refetch } = useDetails({ place_id: id })

  // Memorized
  const memorizedPhoto = useMemo(() => {
    return usePlacePhotos(data?.photos)
  }, [data?.photos])

  if (isFetching) return <DetailsLoadingFallback />

  if (isError) return <ErrorFallBack error={error} />

  return (
    <>
      <div className='flex flex-1 flex-col relative overflow-auto'>
        <DetailsHero
          data={data}
          isFetching={isFetching}
          refetch={refetch}
          memorizedImgURL={memorizedPhoto.url}
          modalSetter={openLocalModal}
        />
        <main className='px-[10%]'>
          {status === 'authenticated' ? (
            <div className='flex-1 flex flex-col justify-between py-2'>
              <Texts
                main='この場所についてのメモ'
                sub={data?.memo || 'メモはまだありません。'}
                mainDecoration={<ToolTip text='評価からメモを追加可能です。' />}
                subColor={data?.memo ? colors['gh-d-gray'] : colors['gh-gray']}
              />
            </div>
          ) : (
            <Promotion />
          )}
          <DetailsDescriptiveGroup data={data} isLoading={false} />
          <DetailsSectionGroup data={data} isLoading={false} />
        </main>
      </div>
      <BasicInfoModal isOpen={checkIsOpen('BASIC')} data={data} onClose={clearLocalModal} />
      <ReviewModal
        isOpen={checkIsOpen('REVIEW')}
        onClose={clearLocalModal}
        onReviewSuccess={refetch}
        data={{
          memo: data.memo,
          status: data?.reviewStatus,
          id: data?.id,
          place_id: data?.place_id,
        }}
      />
      <ImageModal isOpen={checkIsOpen('IMAGE')} data={memorizedPhoto} onClose={clearLocalModal} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  console.log({ query })

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  })

  await ssg.getActivity.prefetch({ userId: '', place_id: query.place_id as string })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: query.place_id,
    },
  }
}

DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default DetailsPage
