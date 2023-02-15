import { Texts } from '@/components/ui'
import { ActivityResolved } from '@/features/activities/types'
import { Marker } from 'react-map-gl'

const Pin = ({
  latitude,
  longitude,
  focused = false,
  onClick,
  data,
}: {
  latitude?: number
  longitude?: number
  focused?: boolean
  onClick?: () => void
  data: ActivityResolved
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude} onClick={onClick}>
      <section>
        <div
          className={`absolute bg-white p-4 rounded-md duration-700 shadow-sm top-0 left-1/2 -translate-x-1/2 -translate-y-full -my-4 ${
            focused ? 'scale-100' : 'scale-0'
          }`}
        >
          <Texts main={data.name} />
          <span className='h-3 w-3 bg-white rotate-45 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-sm'></span>
        </div>
        <div className='h-14 w-14 bg-white flex items-center justify-center rounded-full p-1 duration-700 ease-in-out'>
          <span className='bg-gh-l-gray w-full aspect-square rounded-full flex items-center justify-center text-xl'>
            😄
          </span>
        </div>
      </section>
    </Marker>
  )
}

export default Pin
