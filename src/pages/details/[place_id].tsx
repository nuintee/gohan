import Header from '@/components/ui/Header'
import { useRouter } from 'next/router'

// data
import { details } from '@/data/details'
import places from '@/data/_places.json'
import { ActivityResolved } from '@/features/activities/types'
import { useEffect, useState } from 'react'
import { GCP_API_KEY } from '@/config/env'
import Image from 'next/image'
import { colors } from '@/config/colors'
import { Button, Input, Cover, ImageChip, DescriptiveChip, Texts } from '@/components/ui'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import DetailsSection from '@/layouts/DetailsSection'
import Price from '@/components/icons/Price'
import { Clock, Share, Star } from '@/components/icons'
import { getRestaurants } from '@/features/restaurants/api'
import useRestaurants from '@/features/restaurants/hooks/useRestaurants'
import useToast from '@/libs/react-toastify'
import { share } from '@/utils/share'

const DetailsPage = ({ data }: { data: ActivityResolved }) => {
  const [dominant, setDominant] = useState({
    color: colors['gh-l-gray'],
    isLoading: true,
  })

  useEffect(() => {
    const init = async () => {
      //   const color = await getColor(`https://source.unsplash.com/random`)
      setDominant({ color: colors['gh-dark'], isLoading: false })

      console.log(data)
    }

    init()
  }, [])

  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />
      <div className='flex flex-1 flex-col relative'>
        <Cover color={dominant.color} />
        <div className='px-[10%] pt-16 pb-6 flex gap-8'>
          <ImageChip isLoading={dominant.isLoading} />
          <div className='flex-1 flex flex-col justify-between py-2'>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-4'>
                <h1 className='text-3xl font-bold text-white'>{data.name}</h1>
                <ActivityStatus status='good' />
              </div>
              <p className='text-white text-md'>
                {data.editorial_summary?.overview || data.types?.join('・')}
              </p>
            </div>
            <div className='flex gap-4 w-fit'>
              <Button text='評価を変更' />
              <Button text='基本情報を表示' outline />
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
                  src: <p>1</p>,
                }}
              />
            </div>
          </div>
        </div>
        <main className='px-[10%]'>
          <section className='flex flex-col gap-2 mb-14'>
            <h1 className='text-gh-dark font-semibold text-xl'>この場所についてのメモ</h1>
            <Input placeholder='メモ' />
          </section>
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
          <DetailsSection margin='5rem' main='ロケーション' sub={data.vicinity}></DetailsSection>
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
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      data:
        details.result(query.place_id) ||
        places.results[Math.floor(Math.random() * places.results.length - 1)],
    },
  }
}

export default DetailsPage
