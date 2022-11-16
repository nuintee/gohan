// Icons
import { Locked, Regular } from './icons/index'

type Props = {
  locked: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Acitvity = (props: Props) => {
  const { locked, onClick } = props
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`bg-white h-12 w-12 rounded-full flex justify-center items-center active:bg-opacity-90 shrink-0 z-[1] ${
        locked ? 'active:animate-bounce' : 'active:scale-90'
      }`}
    >
      {locked ? <Locked /> : <Regular />}
    </button>
  )
}

export default Acitvity
