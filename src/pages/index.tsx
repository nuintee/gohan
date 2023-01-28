import { ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import useRestaurants from '@/features/restaurants/hooks'

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
