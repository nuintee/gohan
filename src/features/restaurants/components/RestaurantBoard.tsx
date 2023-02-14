// components
import { Button, Texts, Label } from '@/components/ui'
import LikeButton from './LikeButton'

// icons
import { Close, Dots } from '@/components/icons'

// Types
import { RestaurantProps } from '../types'

// Constants
import { cardConfig } from '../config'
import ActivityStatus from '@/features/activities/components/ActivityStatus'

const RestaurantBoard = (props: RestaurantProps) => {
  const {
    compact,
    data,
    isLocked,
    isNavigating,
    distance,
    isLoading,
    onLike,
    onClick,
    onNavigate,
  } = props

  const compactStyle = {
    container:
      'flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95',
    img: 'max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md',
    closeButton: '',
    contents: 'flex flex-1 gap-4 items-center justify-between',
    infoContainer: 'flex flex-col gap-2',
  }

  const theme = compactStyle

  return (
    <div className={theme.container} onClick={compact && onClick}>
      <img
        src={cardConfig.imgSrc(data?.photos)}
        alt={cardConfig.imgAlt(data?.name)}
        className={theme.img}
      />
      <div className={theme.contents}>
        <div className={theme.infoContainer}>
          <Texts
            main={cardConfig.textsMain(data?.name)}
            sub={cardConfig.textsSub(data?.types?.join('・'))}
            size={cardConfig.textsSize(compact)}
          />
          <ActivityStatus status='good' />
          {/* <Label text={cardConfig.labelDistance(distance)} icon={cardConfig.labelIcon} /> */}
        </div>
        <button className='p-4'>
          <Dots />
        </button>
      </div>
    </div>
  )
}

export default RestaurantBoard
