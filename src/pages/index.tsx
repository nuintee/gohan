import { ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import useRestaurants from '@/features/restaurants/hooks'

const Index = () => {
  const { get, clear, getDetails } = useRestaurants()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <p>{JSON.stringify(get().data)}</p>
        <p>{JSON.stringify(getDetails(get().data?.place_id).data)}</p>
        <button onClick={clear}>CLEAR</button>
        {/* <MapBox /> */}
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
