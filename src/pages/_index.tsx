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
      <img
        width={400}
        height={400}
        src={
          'http://localhost:3000/api/image/Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT'
        }
        alt=''
      />
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
