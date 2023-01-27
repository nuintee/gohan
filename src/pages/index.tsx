import { ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import useRestaurants from '@/features/restaurants/hooks'

const Index = () => {
  const { get, clear } = useRestaurants()

  const handleClear = () => {}

  return (
    <>
      <div className='flex flex-col gap-4'>
        <button>{get()?.ono}</button>
        <button onClick={clear}>CLEAR</button>
        {/* <MapBox /> */}
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
