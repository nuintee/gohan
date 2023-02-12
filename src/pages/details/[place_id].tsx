import Header from '@/components/ui/Header'
import { useRouter } from 'next/router'
import analyze from 'rgbaster'

// data
import { details } from '@/data/details'
import places from '@/data/_places.json'
import { ActivityResolved } from '@/features/activities/types'
import { useEffect, useState } from 'react'
import { GCP_API_KEY } from '@/config/env'
import Image from 'next/image'
import { colors } from '@/config/colors'
import { Button } from '@/components/ui'

const getColor = async (url) => {
  const result = await analyze(url)
  const dominant = result[0].color
  return dominant
}

const DetailsPage = ({ data }: { data: ActivityResolved }) => {
  const [dominant, setDominant] = useState({
    color: colors['gh-l-gray'],
    isLoading: true,
  })

  useEffect(() => {
    const init = async () => {
      const color = await getColor(`https://source.unsplash.com/random`)
      setDominant({ color, isLoading: false })
    }

    init()
  }, [])

  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />
      <div className='flex flex-1'>
        <div
          className={`h-[13rem] w-full`}
          style={{
            backgroundColor: dominant.color,
          }}
        >
          {/* Cover */}
          <div className='px-[10%] py-16 flex gap-8'>
            <img
              src={!dominant.isLoading && `https://source.unsplash.com/random`}
              alt={!dominant.isLoading && 'Image'}
              className='aspect-square object-cover h-60 w-60 rounded-md shadow-md cursor-pointer hover:scale-105 duration-300 ease-out bg-gh-l-gray'
            />
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
        </div>
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
