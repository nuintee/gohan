import Image from 'next/image'

import { Like as LikeIcon } from '@/icons'

// Constants
import { states } from './constants/index'

type Props = {
  state: typeof states[number]
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// Constans
const icon = {
  LIKED: <LikeIcon.Filled />,
  UNLIKED: <LikeIcon.Outline />,
  LOCKED: <LikeIcon.Locked />,
}

const Like = (props: Props) => {
  const { state, onClick } = props

  const Icon = icon[state]

  return (
    <button
      className='bg-gh-l-orange w-12 h-12 shrink-0 rounded-full flex items-center justify-center'
      onClick={onClick}
      disabled={state === 'LOCKED'}
    >
      {icon[state]}
    </button>
  )
}

export { Like, states }
