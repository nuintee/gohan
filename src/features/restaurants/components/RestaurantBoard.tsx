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
import usePlacePhotos from '@/features/details/hooks/useGoogleImage'
import { useState } from 'react'
import useToast from '@/libs/react-toastify'
import SuspenseImage from '@/components/ui/SuspenseImage'

const RestaurantBoard = (props: RestaurantProps) => {
  const { data, isLocked, distance, isLoading, onLike, onClick, onNavigate, isFocused } = props

  const compactStyle = {
    container: `flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-full ${
      isFocused && 'bg-gh-white'
    } cursor-pointer hover:bg-gh-white active:bg-gh-white active:scale-95`,
    img: 'max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md',
    closeButton: '',
    contents: 'flex flex-1 gap-4 items-center justify-between',
    infoContainer: 'flex flex-col gap-2',
  }

  const theme = compactStyle

  return (
    <div className={theme.container} onClick={onClick}>
      <SuspenseImage
        src={usePlacePhotos(data?.photos).url}
        alt={cardConfig.imgAlt(data?.name)}
        className={theme.img}
      />
      <div className={theme.contents}>
        <div className={theme.infoContainer}>
          <Texts
            main={cardConfig.textsMain(data?.name)}
            sub={cardConfig.textsSub(data?.types?.join('・'))}
            size={cardConfig.textSize}
          />
          <ActivityStatus status={data?.reviewStatus} />
          {/* <Label text={cardConfig.labelDistance(distance)} icon={cardConfig.labelIcon} /> */}
        </div>
      </div>
    </div>
  )
}

export default RestaurantBoard
