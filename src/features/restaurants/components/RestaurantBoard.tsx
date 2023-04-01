// components
import { Texts } from '@/components/ui'

// icons

// Types
import { RestaurantProps } from '../types'

// Constants
import { cardConfig } from '../config'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import { useMemo } from 'react'
import SuspenseImage from '@/components/ui/SuspenseImage'
import { getPlacePhoto } from '@/features/details/hooks/getPlacePhoto'

const RestaurantBoard = (props: RestaurantProps) => {
  const { data, onClick, isFocused } = props

  // Memorized
  const memorizedPhoto = useMemo(() => {
    return getPlacePhoto(data?.photos?.at(0))
  }, [data?.photos])

  return (
    <div
      className={`h-24 cursor-pointer w-full flex gap-2 overflow-x-hidden rounded-md p-2 hover:bg-gh-white active:bg-gh-white active:scale-95 ${
        isFocused && 'bg-gh-white'
      }`}
      onClick={onClick}
    >
      <SuspenseImage
        src={memorizedPhoto.url}
        alt={data?.name}
        draggable={false}
        className={'aspect-square object-cover h-full rounded-md'}
      />
      <div className='flex-1 flex flex-col justify-between truncate'>
        <Texts
          main={cardConfig.textsMain(data?.name)}
          sub={cardConfig.textsSub(data?.memo || data?.editorial_summary?.overview)}
          size={'small'}
        />
        <ActivityStatus status={data?.reviewStatus} />
      </div>
    </div>
  )
}

export default RestaurantBoard
