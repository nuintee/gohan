// Resources
import Filled from './assets/like-filled.svg'
import Locked from './assets/like-locked.svg'
import Outline from './assets/like-outline.svg'

// Constants
import { states } from './constants/index'

type Props = {
  state: typeof states[number]
  onClick: Function
}

// Constans
const icon = {
  LIKED: Filled,
  UNLIKED: Outline,
  LOCKED: Locked,
}

const Like = (props: Props) => {
  const { state, onClick } = props

  return (
    <button
      className='bg-gh-l-orange w-12 rounded-full flex items-center justify-center'
      onClick={onClick}
      disabled={state === 'LOCKED'}
    >
      <img src={icon[state].src} />
    </button>
  )
}

export { Like, states }
