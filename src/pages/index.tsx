import { ToastCatcher } from '@/components/ui'
import MapBox from '@/features/mapbox/components/MapBox'
import useModals from '@/hooks/modals'

const Index = () => {
  const { isOpen } = useModals()
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
