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

const DetailsPage = memo(({ id }: { id: string }) => {
  const { data: session, status } = useSession()

  const { isSearchModalOpen, manageSearchModal } = useSearch()

  // Modal manage
  const [detailsModal, setDetailsModal] = useState<'BASIC' | 'REVIEW' | 'IMAGE' | ''>('') //ID: BASIC, REVIEW, IMAGE

  const clearModal = () => {
    setDetailsModal('')
  }

  const checkIsOpen = (modalId: 'BASIC' | 'REVIEW' | 'IMAGE') => {
    return detailsModal === modalId
  }

  const { data, isFetching, isError, error, refetch, isFetchedAfterMount } = useGetActivity({
    userId: session?.user.id,
    place_id: id,
  })

  // Memorized
  const memorizedPhoto = useMemo(() => {
    return usePlacePhotos(data?.photos)
  }, [data?.photos])

  if (isFetching) return <DetailsLoadingFallback />

  if (isError) return <ErrorFallBack error={error} />

  return (
    <>
      <div className='flex flex-1 flex-col relative overflow-auto'>
        <Cover color={'black'} />
        <div className='px-[10%] pt-16 pb-6 flex gap-8'>
          <ImageChip
            isLoading={false}
            src={memorizedPhoto.url}
            onClick={() => setDetailsModal('IMAGE')}
          />
          {/* {memorizedImage} */}
          <div className='flex-1 flex flex-col justify-between py-2 min-h-[14rem]'>
            <DetailsTitle data={data} />
            <DetailsActionGroup
              data={data}
              isLoading={isFetching}
              modalSetter={setDetailsModal}
              refetch={refetch}
            />
          </div>
        </div>
        <main className='px-[10%]'>
          <div className='flex-1 flex flex-col justify-between py-2'>
            {status === 'authenticated' && (
              <Texts main='この場所についてのメモ' sub={data?.memo || 'メモ'} />
            )}
          </div>
          <DetailsDescriptiveGroup data={data} isLoading={false} />
          <DetailsSectionGroup data={data} isLoading={false} />
          <section className='fixed bottom-8 right-8'>
            <GohanButton onClick={() => manageSearchModal(true)} size={25} />
          </section>
        </main>
      </div>
      <BasicInfoModal isOpen={checkIsOpen('BASIC')} data={data} onClose={clearModal} />
      <ReviewModal
        isOpen={checkIsOpen('REVIEW')}
        onClose={clearModal}
        onReviewSuccess={refetch}
        data={{
          memo: data.memo,
          status: data?.reviewStatus,
          id: data?.id,
          place_id: data?.place_id,
        }}
      />
      <ImageModal isOpen={checkIsOpen('IMAGE')} data={memorizedPhoto} onClose={clearModal} />
      <SearchModal isOpen={isSearchModalOpen} trigger={isSearchModalOpen} />
    </>
  )
})

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
