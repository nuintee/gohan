import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'
import { getBarePlacesAPI } from '@/features/restaurants/utils/getBarePlacesAPI'
import { MainLayout } from '@/layouts/layout'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import DEV_COORDS from '@/data/geolocation.json'
import { trpc } from '@/libs/trpc'

const Experiment = () => {
  const handleImage = trpc.getImage.useQuery(
    {
      photo_reference:
        'CnRvAAAAwMpdHeWlXl-lH0vp7lez4znKPIWSWvgvZFISdKx45AwJVP1Qp37YOrH7sqHMJ8C-vBDC546decipPHchJhHZL94RcTUfPa1jWzo-rSHaTlbNtjh-N68RkcToUCuY9v2HNpo5mziqkir37WU8FJEqVBIQ4k938TI3e7bf8xq-uwDZcxoUbO_ZJzPxremiQurAYzCTwRhE_V0',
    },
    {
      enabled: true,
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <div className='flex flex-col'>
      <img src={handleImage.data} />
      <button onClick={() => handleImage.refetch()}>Fetch Image</button>
    </div>
  )
}

Experiment.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const data = await getBarePlacesAPI({ latitude: 0, longitude: 0 })
  console.log(data)
  return {
    props: {},
  }
}

export default Experiment
