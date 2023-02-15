import { Marker } from 'react-map-gl'

const Pin = ({
  latitude,
  longitude,
  focused = false,
}: {
  latitude?: number
  longitude?: number
  focused?: boolean
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div
        className='h-14 w-14 bg-white flex items-center justify-center rounded-full p-1 duration-700 ease-in-out'
        style={{
          ...(focused && { scale: '1.5' }),
        }}
      >
        <span className='bg-gh-l-gray w-full aspect-square rounded-full flex items-center justify-center text-xl'>
          😄
        </span>
      </div>
    </Marker>
  )
}

export default Pin
