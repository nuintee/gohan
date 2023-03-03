import { likeButtonConfig } from '../config'

type Props = {
  isLocked: boolean
  isLiked: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const LikeButton = (props: Props) => {
  const { onClick, isLocked, isLiked } = props

  return (
    <button
      className='bg-gh-l-orange w-12 h-12 shrink-0 rounded-full flex items-center justify-center'
      onClick={onClick}
    >
      {likeButtonConfig.icon({ isLiked, isLocked })}
    </button>
  )
}

export default LikeButton
