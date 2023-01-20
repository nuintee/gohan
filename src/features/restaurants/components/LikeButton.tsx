import Image from 'next/image'

import { Like } from '@/components/icons'

type Props = {
  isLocked: boolean
  isLiked: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

// Constans
const icon = {
  LIKED: <Like.Filled />,
  UNLIKED: <Like.Outline />,
  LOCKED: <Like.Locked />,
}

const Icon = (props: Props) => {
  const { isLocked, isLiked } = props

  if (isLocked) {
    return <Like.Locked />
  }

  if (isLiked) {
    return <Like.Filled />
  } else {
    return <Like.Outline />
  }
}

const LikeButton = (props: Props) => {
  const { onClick, isLocked, isLiked } = props

  return (
    <button
      className='bg-gh-l-orange w-12 h-12 shrink-0 rounded-full flex items-center justify-center'
      onClick={onClick}
    >
      <Icon isLocked={isLocked} isLiked={isLiked} />
    </button>
  )
}

export default LikeButton
