// components
import { Button, Texts, Label, DropDown } from '@/components/ui'
import LikeButton from './LikeButton'

// icons
import { Close, Dots, PulseLoader } from '@/components/icons'

// Types
import { RestaurantProps } from '../types'

// Constants
import { cardConfig } from '../config'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import usePlacePhotos from '@/features/details/hooks/usePlacePhotos'
import { useMemo, useState } from 'react'
import useToast from '@/libs/react-toastify'
import SuspenseImage from '@/components/ui/SuspenseImage'

const RestaurantBoard = (props: RestaurantProps) => {
  const { data, isLocked, distance, isLoading, onLike, onClick, onNavigate, isFocused } = props

  // Memorized
  const memorizedPhoto = useMemo(() => {
    return usePlacePhotos(data?.photos)
  }, [data?.photos])

  return (
    <div
      className={`h-24 cursor-pointer flex-1 flex gap-2 overflow-x-hidden rounded-md p-2 hover:bg-gh-white active:bg-gh-white active:scale-95 ${
        isFocused && 'bg-gh-white'
      }`}
      onClick={onClick}
    >
      <SuspenseImage
        src={memorizedPhoto.url}
        alt={data?.name}
        className={'aspect-square object-cover h-full rounded-md'}
      />
      <div className='flex-1 flex flex-col justify-between truncate'>
        <Texts
          main={cardConfig.textsMain(data?.name)}
          sub={cardConfig.textsSub(data?.types?.join('・'))}
          size={'small'}
        />
        <ActivityStatus status={data?.reviewStatus} />
      </div>
    </div>
  )
}

export default RestaurantBoard
