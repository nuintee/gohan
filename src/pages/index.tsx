import { ToastCatcher } from '@/components/ui'
import useDirections from '@/features/directions/hooks'
import MapBox from '@/features/mapbox/components/MapBox'
import useMapBox from '@/features/mapbox/hooks'
import { mapBoxState } from '@/features/mapbox/stores'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const Index = () => {
  const { get, revoke } = useDirections()
  const directions = get({
    start: '42.64903396598628,23.405960892317047',
    end: '42.6481422486837, 23.40411553266531',
  })
  const revoking = revoke()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='absolute top-0 left-0 bg-white z-[2]'>
          <button onClick={() => directions.refetch()} disabled={directions.isFetching}>
            GET
          </button>
          <button onClick={() => revoking.mutate()} disabled={!directions.isSuccess}>
            Revoke
          </button>
        </div>
        <MapBox />
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
