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
import MapBox from '@/features/mapbox/components/MapBox'
import DetailsSection from '@/layouts/DetailsSection'

const DetailsPage = ({ data }: { data: ActivityResolved }) => {
  const [dominant, setDominant] = useState({
    color: colors['gh-l-gray'],
    isLoading: true,
  })

  useEffect(() => {
    const init = async () => {
      //   const color = await getColor(`https://source.unsplash.com/random`)
      setDominant({ color: colors['gh-dark'], isLoading: false })
    }

    init()
  }, [])

  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />
      <div className='flex flex-1 flex-col relative'>
        {/* <div
          className={`h-[13rem] w-full`}
          style={{
            backgroundColor: dominant.color,
          }}
        >
          <div className='px-[10%] pt-16 pb-6 flex gap-8'>
            <HeroImage isLoading={dominant.isLoading} />
            <div className='flex-1 flex flex-col justify-between py-2'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-bold text-white'>{data.name}</h1>
                <p className='text-white text-md'>
                  {data.editorial_summary?.overview || data.types?.join('・')}
                </p>
              </div>
              <div className='flex gap-4 w-fit'>
                <Button text='BUTTON' />
                <Button text='BUTTON' outline />
                <Button text='BUTTON' outline />
              </div>
            </div>
          </div>
          <main className='px-[10%]'>
            <section className='flex flex-col gap-2'>
              <h1 className='text-gh-dark font-semibold text-xl'>この場所についてのメモ</h1>
              <Input placeholder='メモ' />
            </section>
            <section>
              <div></div>
            </section>
          </main>
        </div> */}

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
              <Button text='BUTTON' />
              <Button text='BUTTON' outline />
              <Button text='BUTTON' outline />
            </div>
          </div>
        </div>
        <main className='px-[10%]'>
          <section className='flex flex-col gap-2 mb-14'>
            <h1 className='text-gh-dark font-semibold text-xl'>この場所についてのメモ</h1>
            <Input placeholder='メモ' />
          </section>
          <section className='flex items-center justify-between gap-4  mb-14'>
            <DescriptiveChip />
            <DescriptiveChip />
            <DescriptiveChip />
          </section>
          {/* <section className='outline rounded-md p-4 outline-gh-pale'>
            <header className='flex gap-2 justify-between'>
              <Texts main='ロケーション' sub='Pamukkale, Turkey' />
              <Button text='グローバルマップで場所を確認' outline />
            </header>
            <main className='flex-1 min-h-[20rem]'>
              <MapBox />
            </main>
          </section> */}
          <DetailsSection margin='5rem' main='ロケーション' sub='Pamukkale, Turkey' />
          <DetailsSection margin='5rem' main='ロケーション' sub='Pamukkale, Turkey' />
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
