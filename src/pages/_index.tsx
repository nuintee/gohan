import { getBareDetailsAPI } from '@/features/restaurants/utils/getBareDetailsAPI'
import { getBarePlacesAPI } from '@/features/restaurants/utils/getBarePlacesAPI'
import { MainLayout } from '@/layouts/layout'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import DEV_COORDS from '@/data/geolocation.json'

const Experiment = () => {
  const handleDetails = async () => {
    const r = await getBareDetailsAPI({ place_id: '' })
    console.log(r)
  }

  const handlePlaces = async () => {
    const r = await getBarePlacesAPI({
      latitude: DEV_COORDS.coords.latitude,
      longitude: DEV_COORDS.coords.longitude,
    })
    console.log(r)
  }

  return (
    <div className='flex flex-col'>
      <h1>1</h1>
      <button onClick={handleDetails}>Fetch details</button>
      <button onClick={handlePlaces}>Fetch Places</button>
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
