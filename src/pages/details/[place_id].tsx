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
import { Button, Input } from '@/components/ui'
import HeroImage from '@/features/details/components/HeroImage'
import Cover from '@/features/details/components/Cover'

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
