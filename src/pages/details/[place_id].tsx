import Header from '@/components/ui/Header'
import { useRouter } from 'next/router'

// data
import { details } from '@/data/details'
import places from '@/data/_places.json'
import { ActivityResolved } from '@/features/activities/types'
import { useEffect, useState } from 'react'
import { GCP_API_KEY, MAPBOX_PUBLIC_TOKEN } from '@/config/env'
import Image from 'next/image'
import { colors } from '@/config/colors'
import { Button, Input, Cover, ImageChip, DescriptiveChip, Texts } from '@/components/ui'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import DetailsSection from '@/features/details/layouts/DetailsSection'
import Price from '@/components/icons/Price'
import { Clock, Dots, Share, Star } from '@/components/icons'
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

const IMG_SRC = images.random()

const DetailsPage = ({ passed, id }: { passed: ActivityResolved; id: string }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const { data, isFetching, isError, error } = useGetActivity({
    userId: session?.user.id,
    place_id: id,
  })

  const [dominant, setDominant] = useState({
    color: colors['gh-l-gray'],
    isLoading: true,
  })

  // Modals states -> later implement with recoil modals
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  useEffect(() => {
    const init = async () => {
      if (!IMG_SRC) return

      const color = await getDominantColor(IMG_SRC)
      console.log(color)
      setDominant({ color, isLoading: false })

      console.log(data)
    }

    init()
  }, [])

  if (isFetching) return <>Loading...</>

  if (isError) return <ErrorFallBack error={error} />

  // Animation
  if (router.query?.effect) return <>Effected!</>

  return (
    <>
      <div className='flex flex-col h-screen w-screen'>
        <Header />
        <div className='flex flex-1 flex-col relative'>
          <Cover color={dominant.color} />
          <div className='px-[10%] pt-16 pb-6 flex gap-8'>
            <ImageChip
              isLoading={dominant.isLoading}
              src={IMG_SRC}
              onClick={() => setIsImageModalOpen(true)}
            />
            <div className='flex-1 flex flex-col justify-between py-2'>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-4'>
                  <h1 className='text-3xl font-bold text-white'>{data.name}</h1>
                  {status === 'authenticated' && <ActivityStatus status={data.reviewStatus} />}
                </div>
                <p className='text-white text-md'>
                  {data.editorial_summary?.overview || data.types?.join('・')}
                </p>
              </div>
              <div className='flex gap-4 w-fit'>
                <Button text='評価を変更' onClick={() => setIsReviewModalOpen(true)} />
                <Button
                  text='基本情報を表示'
                  outline
                  onClick={() => setIsBasicInfoModalOpen(true)}
                />
                <Button
                  text='共有'
                  outline
                  onClick={() => share({ url: location.href })}
                  icon={{
                    position: 'before',
                    src: <Share />,
                  }}
                />
                <Button
                  text=''
                  outline
                  icon={{
                    position: 'after',
                    src: <Dots />,
                  }}
                  square
                />
              </div>
            </div>
          </div>
          <main className='px-[10%]'>
            {status === 'authenticated' && (
              <section className='flex flex-col gap-2 mb-14'>
                <h1 className='text-gh-dark font-semibold text-xl'>この場所についてのメモ</h1>
                <p className='text-gh-gray'>{data.memo}</p>
              </section>
            )}
            <section className='flex items-center justify-between gap-4  mb-14'>
              <DescriptiveChip
                title='超高級'
                description={data.price_level}
                icon={<Price fill={colors['gh-red']} />}
              />
              <DescriptiveChip
                title='営業中'
                description={`営業時間: ${
                  data.opening_hours?.periods && data.opening_hours?.periods[0]
                }`}
                icon={<Clock fill={colors['gh-green']} />}
              />
              {data.user_ratings_total > 0 && (
                <DescriptiveChip
                  title={`悪い評価`}
                  description={`Googleでの評価は${data.rating}です。`}
                  icon={<Star fill={colors['gh-red']} />}
                />
              )}
            </section>
            <DetailsSection margin='5rem' main='ロケーション' sub={data.vicinity}>
              <div className='flex-1 aspect-video w-full'>
                <MapBoxChip
                  latitude={data.geometry.location.lat}
                  longitude={data.geometry.location.lng}
                />
              </div>
            </DetailsSection>
            {data.user_ratings_total > 0 && (
              <DetailsSection
                margin='5rem'
                main={`レビュー・${data.rating}`}
                sub={`${data.user_ratings_total}件のレビュー`}
              />
            )}
          </main>
        </div>
      </div>
      <BasicInfoModal
        isOpen={isBasicInfoModalOpen}
        data={data}
        onClose={() => setIsBasicInfoModalOpen(false)}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        data={{
          memo: data?.memo,
          status: data?.reviewStatus,
          id: data?.id,
        }}
      />
      <ImageModal
        isOpen={isImageModalOpen}
        data={data.photos?.map((v) => ({
          ...v,
          src: IMG_SRC,
          id: v.photo_reference,
        }))}
        onClose={() => setIsImageModalOpen(false)}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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

export default DetailsPage
