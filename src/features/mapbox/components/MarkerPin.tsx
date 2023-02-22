import { Close, Chevron } from '@/components/icons'
import { Texts } from '@/components/ui'
import SuspenseImage from '@/components/ui/SuspenseImage'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import { ActivityResolved } from '@/features/activities/types'
import usePlacePhotos from '@/features/details/hooks/usePlacePhotos'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
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
  const router = useRouter()

  const handleDetailsClick = (e) => {
    e.stopPropagation()
    router.push(`/details/[place_id]`, `/details/${data.place_id}`, { shallow: true })
  }

  const memorizedImage = useMemo(() => {
    return usePlacePhotos(data.photos)
  }, [data.photos])

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      onClick={(e) => {
        e.originalEvent.stopPropagation()
        onClick && onClick()
      }}
      style={{
        ...(focused && { zIndex: '10' }),
      }}
    >
      <section>
        <div
          className={`absolute group  bg-white p-2 rounded-md duration-700 shadow-sm top-0 left-1/2 -translate-x-1/2 -translate-y-full -my-4 ${
            focused ? 'scale-100' : 'scale-0'
          }`}
          onClick={handleDetailsClick}
          role='button'
        >
          <div className='flex gap-4 items-center group-hover:bg-gh-pale p-2 rounded-md'>
            <Texts main={data.name} sub='2km' />
            <Chevron scale={1.2} />
          </div>
          <span className='h-3 w-3 bg-white rotate-45 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-sm'></span>
        </div>
        <div className='h-14 w-14 bg-white flex items-center justify-center relative rounded-full p-1 duration-700 ease-in-out shadow-sm'>
          <SuspenseImage
            src={memorizedImage.url}
            className='aspect-square rounded-full object-cover z-10'
            disabled
          />
          {/* <span className='h-3 w-3 bg-white rotate-45 absolute bottom-0 translate-y-1/2 my-[2px] left-1/2 -translate-x-1/2  shadow-sm'></span> */}
        </div>
      </section>
    </Marker>
  )
}

export default Pin
