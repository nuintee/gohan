import { CurrentPostion } from '@/icons'
import { Marker } from 'react-map-gl'

const CurrentLocationMarker = (props) => {
  const { coords } = props

  return (
    <Marker longitude={coords?.longitude} latitude={coords?.latitude}>
      <div className='relative'>
        <div className='w-8 h-8 bg-white bg-opacity-75 rounded-full top-0 left-0 animate-ping'></div>
        <span className='h-6 w-6 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center'>
          <CurrentPostion width={12} height={12} />
        </span>
      </div>
    </Marker>
  )
}

export default CurrentLocationMarker
