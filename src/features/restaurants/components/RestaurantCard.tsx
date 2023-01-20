// components
import { Button, Texts, Label } from '@/components/ui'
import LikeButton from './LikeButton'

// icons
import { Close } from '@/components/icons'

// Types
import { RestaurantProps } from '../types'

// Constants
import { CARD_CONFIG } from '../config'

// 共通部分
const RestaurantCard = (props: RestaurantProps) => {
  const { compact, data, isLocked } = props

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
        src={CARD_CONFIG.imgSrc(data?.photos)}
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
          <LikeButton onClick={() => {}} isLiked={Boolean(data?.is_liked)} isLocked={isLocked} />
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
