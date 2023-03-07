import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'
import { getBarePlacesAPI } from '@/features/restaurants/utils/getBarePlacesAPI'
import { MainLayout } from '@/layouts/layout'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import DEV_COORDS from '@/data/geolocation.json'
import { trpc } from '@/libs/trpc'
import useDetails from '@/features/details/hooks/useDetails'
import Image from 'next/image'

const Experiment = () => {
  const getImage = trpc.getImage.useQuery({ photo_reference: '' })

  return (
    <div className='flex flex-col'>
      {/* <Image width={400} src={'https://maps.googleapis.com/maps/api/place/photo'} alt='' /> */}
      <img width={400} height={400} src={getImage.data} alt='' />
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
