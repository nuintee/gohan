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

const RestaurantBoard = (props: RestaurantProps) => {
  const { data, isLocked, distance, isLoading, onLike, onClick, onNavigate, isFocused } = props

  // add image hook
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = (callback?: () => void) => {
    setIsImageLoaded(true)
    callback && callback()
  }

  const handleImageError = (callback?: () => void) => {
    setIsImageLoaded(true)
    callback && callback()
  }

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
      {!isImageLoaded && <PulseLoader color='gray' size={5} />}
      <img
        src={usePlacePhotos(data?.photos).url}
        alt={cardConfig.imgAlt(data?.name)}
        className={theme.img}
        onError={() => handleImageError()}
        onLoad={() => handleImageLoad()}
        style={{
          ...(!isImageLoaded && { display: 'none' }),
        }}
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
