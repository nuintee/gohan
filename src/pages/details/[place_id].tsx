import Header from '@/components/ui/Header'
import { useRouter } from 'next/router'

// data
import { details } from '@/data/details'
import places from '@/data/_places.json'
import { ActivityResolved } from '@/features/activities/types'
import { ReactElement, useEffect, useState } from 'react'
import { GCP_API_KEY, MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import Image from 'next/image'
import { colors } from '@/config/colors'
import {
  Button,
  Input,
  Cover,
  ImageChip,
  DescriptiveChip,
  Texts,
  DropDown,
  GohanButton,
} from '@/components/ui'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import DetailsSection from '@/features/details/layouts/DetailsSection'
import Price from '@/components/icons/Price'
import { Clock, Dots, Chevron, Share, Star } from '@/components/icons'
import { getRestaurants } from '@/features/restaurants/api'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import useToast from '@/libs/react-toastify'
import { share } from '@/utils/share'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import { getDominantColor } from '@/libs/rgbaster'

import images from '@/data/images.json'
import BasicInfoModal from '@/features/details/components/BasicInfoModal'
import ReviewModal from '@/features/details/components/ReviewModal'
import ModalLayout from '@/layouts/ModalLayout'
import ImageModal from '@/features/details/components/ImageModal'
import { trpc } from '@/libs/trpc'
import useGetActivity from '@/features/activities/hooks/useGetActivity'

// SSG
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '@/server/routers/_app'
import superjson from 'superjson'
import { useSession } from 'next-auth/react'
import ErrorFallBack from '@/components/fallback/ErrorFallback'
import { GetServerSideProps } from 'next/types'
import DetailsLoadingFallback from '@/features/details/components/DetailsLoadingFallback'
import { createContext } from '@/server/context'
import { DetailsAPI } from '@/features/restaurants/types'
import ActivityDropDown from '@/features/activities/components/ActivityDropDown'
import useGPS from '@/hooks/gps'
import useSearch from '@/features/search/hooks/useSearch'
import SearchModal from '@/features/search/components/SearchModal'
import { MainLayout } from '@/layouts/layout'
import DetailsTitle from '@/features/details/components/ui/DeatailsTitle'
import DetailsDescriptiveGroup from '@/features/details/components/ui/DetailsDescriptiveGroup'
import DetailsSectionGroup from '@/features/details/components/ui/DetailsSectionGroup'
import DetailsActionGroup from '@/features/details/components/ui/DetailsActionGroup'

const IMG_SRC = images.random()

const DetailsPage = ({ id }: { id: string }) => {
  const { data: session, status } = useSession()

  const { isSearchModalOpen, manageSearchModal } = useSearch()

  // Modal manage
  const [detailsModal, setDetailsModal] = useState<'BASIC' | 'REVIEW' | 'IMAGE' | ''>('') //ID: BASIC, REVIEW, IMAGE

  const clearModal = () => {
    setDetailsModal('')
  }

  const checkIsOpen = (id: 'BASIC' | 'REVIEW' | 'IMAGE') => {
    return detailsModal === id
  }

  const { data, isFetching, isError, error, refetch, isFetchedAfterMount } = useGetActivity({
    userId: session?.user.id,
    place_id: id,
  })

  if (isFetching) return <DetailsLoadingFallback />

  if (isError) return <ErrorFallBack error={error} />

  if (!data) return <>INVALID DATA</>

  return (
    <>
      <div className='flex flex-1 flex-col relative overflow-auto'>
        <Cover color={'black'} />
        <div className='px-[10%] pt-16 pb-6 flex gap-8'>
          <ImageChip isLoading={false} src={IMG_SRC} onClick={() => setDetailsModal('IMAGE')} />
          <div className='flex-1 flex flex-col justify-between py-2'>
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
          <DetailsDescriptiveGroup data={data} isLoading={isFetching} />
          <DetailsSectionGroup data={data} isLoading={isFetching} />
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
      <ImageModal
        isOpen={checkIsOpen('IMAGE')}
        data={data.photos?.map((v) => ({
          ...v,
          src: IMG_SRC,
          id: v.photo_reference,
        }))}
        onClose={clearModal}
      />
      <SearchModal isOpen={isSearchModalOpen} trigger={isSearchModalOpen} />
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
