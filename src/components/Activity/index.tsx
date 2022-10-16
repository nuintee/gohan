// Resources
import Locked from './assets/activity-locked.svg'
import Regular from './assets/activity.svg'

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
      className='bg-white h-12 w-12 rounded-full flex justify-center items-center active:bg-opacity-90'
    >
      {locked ? <Locked /> : <Regular />}
    </button>
  )
}

export default Acitvity
