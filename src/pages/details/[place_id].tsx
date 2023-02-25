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

const SPSizeHeroContents = (props: React.ComponentProps<typeof HEROContents>) => {
  const { data, memorizedImgURL, modalSetter } = props

  return (
    <div className='block sm:hidden'>
      <Cover color={'black'} />
      <div className='px-[10%] pt-8 pb-10 flex gap-4 flex-col items-center justify-center'>
        <ImageChip isLoading={false} src={memorizedImgURL} onClick={() => modalSetter('IMAGE')} />
        <DetailsTitle
          data={data}
          gap={false}
          size={'normal'}
          textAlign={'center'}
          mainDecoration={false}
        />
      </div>
      <div className='flex items-center justify-center my-2'>
        <DetailsActionGroup
          data={props.data}
          isLoading={props.isLoading}
          modalSetter={props.modalSetter}
          refetch={props.refetcher}
        />
      </div>
    </div>
  )
}

const NormalSizeHeroContents = (props: React.ComponentProps<typeof HEROContents>) => {
  return (
    <div className='hidden sm:block'>
      <Cover color={'black'} />
      <div className='px-[10%] pt-16 pb-6 flex gap-8'>
        <ImageChip
          isLoading={false}
          src={props.memorizedImgURL}
          onClick={() => props.modalSetter('IMAGE')}
        />
        <div className='flex-1 flex flex-col justify-between py-2 min-h-[14rem]'>
          <DetailsTitle data={props.data} />
          <DetailsActionGroup
            data={props.data}
            isLoading={props.isLoading}
            modalSetter={props.modalSetter}
            refetch={props.refetcher}
          />
        </div>
      </div>
    </div>
  )
}

const HEROContents = (props: {
  memorizedImgURL: string
  data: any
  isLoading: boolean
  refetcher: any
  modalSetter: ReturnType<typeof useDetailsModal>['openLocalModal']
}) => {
  return (
    <>
      <SPSizeHeroContents {...props} />
      <NormalSizeHeroContents {...props} />
    </>
  )
}

const DetailsPage = memo(({ id }: { id: string }) => {
  const { data: session, status } = useSession()

  const { checkIsOpen, clearLocalModal, openLocalModal } = useDetailsModal()

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

  // return (
  //   <>
  //     <div className='flex flex-1 flex-col relative overflow-auto'>
  //       <Cover color={'black'} />
  //       <div className='px-[10%] pt-16 pb-6 flex gap-8'>
  //         <ImageChip
  //           isLoading={false}
  //           src={memorizedPhoto.url}
  //           onClick={() => openLocalModal('IMAGE')}
  //         />
  //         <div className='flex-1 flex flex-col justify-between py-2 min-h-[14rem]'>
  //           <DetailsTitle data={data} />
  //           <DetailsActionGroup
  //             data={data}
  //             isLoading={isFetching}
  //             modalSetter={openLocalModal}
  //             refetch={refetch}
  //           />
  //         </div>
  //       </div>
  //       <main className='px-[10%]'>
  //         <div className='flex-1 flex flex-col justify-between py-2'>
  //           {status === 'authenticated' && (
  //             <Texts main='この場所についてのメモ' sub={data?.memo || 'メモ'} />
  //           )}
  //         </div>
  //         <DetailsDescriptiveGroup data={data} isLoading={false} />
  //         <DetailsSectionGroup data={data} isLoading={false} />
  //       </main>
  //     </div>
  //     <BasicInfoModal isOpen={checkIsOpen('BASIC')} data={data} onClose={clearLocalModal} />
  //     <ReviewModal
  //       isOpen={checkIsOpen('REVIEW')}
  //       onClose={clearLocalModal}
  //       onReviewSuccess={refetch}
  //       data={{
  //         memo: data.memo,
  //         status: data?.reviewStatus,
  //         id: data?.id,
  //         place_id: data?.place_id,
  //       }}
  //     />
  //     <ImageModal isOpen={checkIsOpen('IMAGE')} data={memorizedPhoto} onClose={clearLocalModal} />
  //   </>
  // )
  return (
    <>
      <div className='flex flex-1 flex-col relative overflow-auto'>
        {/* <Cover color='black' />
        <div className='flex items-center px-[10%] pt-16 pb-6 gap-4 sm:gap-8'>
          <ImageChip
            isLoading={false}
            src={memorizedPhoto.url}
            onClick={() => openLocalModal('IMAGE')}
          />
          <div className='flex-1 flex flex-col gap-4 justify-between sm:min-h-[14rem]'>
            <DetailsTitle data={data} />
            <DetailsActionGroup
              data={data}
              isLoading={isFetching}
              modalSetter={openLocalModal}
              refetch={refetch}
            />
          </div>
        </div> */}
        <HEROContents
          data={data}
          isLoading={isFetching}
          refetcher={refetch}
          memorizedImgURL={memorizedPhoto.url}
          modalSetter={openLocalModal}
        />
        {/* <Cover color={'black'} />
        <div className='px-[10%] pt-16 pb-6 flex gap-8'>
          <ImageChip
            isLoading={false}
            src={memorizedPhoto.url}
            onClick={() => openLocalModal('IMAGE')}
          />
          <div className='flex-1 flex flex-col justify-between py-2 min-h-[14rem]'>
            <DetailsTitle data={data} />
            <DetailsActionGroup
              data={data}
              isLoading={isFetching}
              modalSetter={openLocalModal}
              refetch={refetch}
            />
          </div>
        </div> */}
        <main className='px-[10%]'>
          <div className='flex-1 flex flex-col justify-between py-2'>
            {status === 'authenticated' && (
              <Texts main='この場所についてのメモ' sub={data?.memo || 'メモ'} />
            )}
          </div>
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
