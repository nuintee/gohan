import { ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'

const Index = () => {
  return (
    <>
      <div>
        <MapBox />
      </div>
      <ToastCatcher position='top-center' />
    </>
  )
}

export default Index
