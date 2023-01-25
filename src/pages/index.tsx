import { ToastCatcher } from '@/components/ui'
import useDirections from '@/features/directions/hooks'
import MapBox from '@/features/mapbox/components/MapBox'

const Index = () => {
  const { set, clear, directions, hasDirections } = useDirections()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <p>hasDirections: {hasDirections.toString()}</p>
        <p>{JSON.stringify(directions)}</p>
        <button onClick={() => set([])}>SET</button>
        <button onClick={clear}>CLEAR</button>
        {/* <MapBox /> */}
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
