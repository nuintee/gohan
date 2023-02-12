import Header from '@/components/ui/Header'
import { useRouter } from 'next/router'
import analyze from 'rgbaster'

// data
import place from '@/data/_places.json'
import { ActivityResolved } from '@/features/activities/types'
import { useEffect, useState } from 'react'
import { GCP_API_KEY } from '@/config/env'
import Image from 'next/image'
import { colors } from '@/config/colors'

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
          className={`h-[10rem] w-full`}
          style={{
            backgroundColor: dominant.color,
          }}
        >
          {/* Cover */}
          <div className='px-[10%] py-16'>
            <img
              src={!dominant.isLoading && `https://source.unsplash.com/random`}
              alt={!dominant.isLoading && 'Image'}
              className='aspect-square object-cover h-52 w-52 rounded-md shadow-md cursor-pointer hover:scale-105 duration-300 ease-out bg-gh-l-gray'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const randomPlace =
    place.results.find((v) => v.place_id === query.place_id) ||
    place.results[Math.floor(Math.random() * place.results.length - 1)]

  return {
    props: {
      data: randomPlace,
    }, // will be passed to the page component as props
  }
}

export default DetailsPage
