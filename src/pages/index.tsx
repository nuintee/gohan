import { ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import useMapBox from '@/features/mapbox/hooks'
import { mapBoxState } from '@/features/mapbox/stores'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const Index = () => {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <MapBox />
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
