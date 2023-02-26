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
      className={`flex gap-2 flex-1 p-2 h-20 sm:h-28 items-center cursor-pointer hover:bg-gh-white active:bg-gh-white active:scale-95 rounded-md ${
        isFocused && 'bg-gh-white'
      }`}
      onClick={onClick}
    >
      <SuspenseImage
        src={memorizedPhoto.url}
        alt={cardConfig.imgAlt(data?.name)}
        className={'aspect-square object-cover h-full rounded-md'}
      />
      <div
        className={
          // 'flex-1 max-w-[10rem] sm:max-w-[20rem] md:max-w-[30rem] flex flex-col gap-1 sm:gap-2'
          // 'flex-1 max-w-[15rem] md:max-w-[17.5rem] flex flex-col gap-1 sm:gap-2'
          'flex flex-col overflow-hidden'
        }
      >
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
