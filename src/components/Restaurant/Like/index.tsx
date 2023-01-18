import Image from 'next/image'

import { Like as LikeIcon } from '@/icons'

// Constants
import { states } from './constants/index'

type Props = {
  isLocked: boolean
  isLiked: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

// Constans
const icon = {
  LIKED: <LikeIcon.Filled />,
  UNLIKED: <LikeIcon.Outline />,
  LOCKED: <LikeIcon.Locked />,
}

const Icon = (props: Props) => {
  const { isLocked, isLiked } = props

  if (isLocked) {
    return <LikeIcon.Locked />
  }

  if (isLiked) {
    return <LikeIcon.Filled />
  } else {
    return <LikeIcon.Outline />
  }
}

const Like = (props: Props) => {
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

export { Like, states }
