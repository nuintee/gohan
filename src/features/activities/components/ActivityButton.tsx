// Icons
import { ActivityLocked, ActivityPlain } from '@/components/icons'

type Props = {
  isLocked: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const AcitvityButton = (props: Props) => {
  const { isLocked, onClick } = props
  return (
    <button
      onClick={onClick}
      className={`bg-white h-12 w-12 rounded-full flex justify-center items-center active:bg-opacity-90 shrink-0 z-[1] active:scale-90`}
    >
      {isLocked ? <ActivityLocked /> : <ActivityPlain />}
    </button>
  )
}

export default AcitvityButton
