import { Marker } from 'react-map-gl'

const DestinationMarker = (props) => {
  const { coords } = props

  return (
    <Marker longitude={coords?.longitude} latitude={coords?.latitude}>
      <div className='relative'>
        <div className='w-8 h-8 bg-gh-orange bg-opacity-75 rounded-full top-0 left-0 animate-ping'></div>
        <span className='h-6 w-6 bg-gh-orange rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md'></span>
      </div>
    </Marker>
  )
}

export default DestinationMarker
