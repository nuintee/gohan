import Image from 'next/image'

// Resources
import Filled from './assets/like-filled.svg'
import Locked from './assets/like-locked.svg'
import Outline from './assets/like-outline.svg'
import Fi from 'public/like-filled.svg'

// Constants
import { states } from './constants/index'

type Props = {
  state: typeof states[number]
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// Constans
const icon = {
  LIKED: Filled,
  UNLIKED: Outline,
  LOCKED: Locked,
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
      {<Icon />}
    </button>
  )
}

export { Like, states }
