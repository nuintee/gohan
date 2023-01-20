// config
import { colors } from '@/config/colors'

// components
import { Button, Texts, Label } from '@/components/ui'
import LikeButton from './LikeButton'

// icons
import { Close, RouteArrow } from '@/components/icons'

// Types
import { RestaurantProps, RestaurantData } from '../types'

// Constants
import { CARD_CONFIG } from '../config'

const Card = (props: RestaurantProps<{ compact?: boolean }>) => {
  const { isLocked, data, compact } = props
  return (
    <div className='max-w-[20rem] rounded-md overflow-hidden bg-white relative'>
      <button className='absolute left-[1rem] top-[1rem] outline-none z-10' onClick={() => {}}>
        <Close fill={CARD_CONFIG.CLOSE_COLOR} />
      </button>
      <img
        src={'getImageURL(props?.data?.photos)'}
        alt={CARD_CONFIG.imgAlt(data?.name)}
        className={`select-none max-h-52 w-full object-cover h-52`}
        draggable={CARD_CONFIG.IMG_DRAGGABLE}
      />
      <div className='p-4 flex flex-col gap-4'>
        <Label
          text={CARD_CONFIG.labelDistance()}
          extraClassName={''}
          icon={CARD_CONFIG.labelIcon}
        />
        <Texts
          main={CARD_CONFIG.textsMain(data?.name)}
          sub={CARD_CONFIG.textsSub(data?.types?.join('・'))}
          size={CARD_CONFIG.textsSize(compact)}
        />
        <footer className='flex w-full gap-4'>
          <Button text={CARD_CONFIG.buttonText()} />
          <LikeButton isLiked={Boolean(data?.is_liked)} isLocked={isLocked} />
        </footer>
      </div>
    </div>
  )
}

const Compact = (props: RestaurantProps<{ compact?: boolean }>) => {
  const { isLocked, data, compact } = props
  return (
    <div
      className='flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95'
      onClick={() => {}}
    >
      <img
        src={'getImageURL(data?.photos)'}
        alt={CARD_CONFIG.imgAlt(data?.name)}
        className={`max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md`}
      />
      <div className='flex flex-1 gap-4 items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <Texts
            main={CARD_CONFIG.textsMain(data?.name)}
            sub={CARD_CONFIG.textsSub(data?.types?.join('・'))}
            size={CARD_CONFIG.textsSize(compact)}
          />
          <Label text={CARD_CONFIG.labelDistance()} icon={CARD_CONFIG.labelIcon} />
        </div>
        <LikeButton onClick={() => {}} isLiked={Boolean(data?.is_liked)} isLocked={isLocked} />
      </div>
    </div>
  )
}

// 共通部分
const QRestaurantCard = (props: RestaurantProps<{ compact?: boolean }>) => {
  const { compact, data } = props

  const cardStyle = {
    container: 'max-w-[20rem] rounded-md overflow-hidden bg-white relative',
    img: `select-none max-h-52 w-full object-cover h-52`,
    closeButton: 'absolute left-[1rem] top-[1rem] outline-none z-10',
    contents: 'p-4 flex flex-col gap-4',
    infoContainer: 'flex flex-col-reverse gap-2',
    actionsContainer: 'flex w-full gap-4',
  }

  const compactStyle = {
    container:
      'flex bg-white p-2 rounded-md justify-between items-center gap-4 h-28 w-fill cursor-pointer active:bg-gray-50 active:scale-95',
    img: 'max-h-full max-w-full h-auto w-auto aspect-square object-cover rounded-md',
    closeButton: '',
    contents: 'flex flex-1 gap-4 items-start justify-between',
    infoContainer: 'flex flex-col gap-2',
    actionsContainer: '',
  }

  const theme = compact ? compactStyle : cardStyle

  return (
    <div className={theme.container}>
      {!compact && (
        <button className={theme.closeButton} onClick={() => {}}>
          <Close fill={CARD_CONFIG.CLOSE_COLOR} />
        </button>
      )}
      <img
        src={'getImageURL(props?.data?.photos)'}
        alt={CARD_CONFIG.imgAlt(data?.name)}
        className={theme.img}
      />
      <div className={theme.contents}>
        <div className={theme.infoContainer}>
          <Texts
            main={CARD_CONFIG.textsMain(data?.name)}
            sub={CARD_CONFIG.textsSub(data?.types?.join('・'))}
            size={CARD_CONFIG.textsSize(compact)}
          />
          <Label text={CARD_CONFIG.labelDistance()} icon={CARD_CONFIG.labelIcon} />
        </div>
        <div className={theme.actionsContainer}>
          {!compact && <Button text={CARD_CONFIG.buttonText()} />}
          <LikeButton onClick={() => {}} isLiked={Boolean(true)} isLocked={true} />
        </div>
      </div>
    </div>
  )
}

const RestaurantCard = (props: RestaurantProps<{ compact?: boolean }>) => {
  const { compact } = props

  if (compact) {
    return <QRestaurantCard {...props} />
  } else {
    return <QRestaurantCard {...props} />
  }
}

export default RestaurantCard
