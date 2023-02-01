// Icons
import { ActivityLocked, ActivityPlain } from '@/components/icons'
import { useSession } from 'next-auth/react'
import useActivities from '../hooks'

type Props = {
  isLocked?: boolean
}

const AcitvityButton = (props: Props) => {
  const { isLocked: locked } = props
  const { openPanel } = useActivities()
  const { status } = useSession()

  // Flag
  const isLocked = locked ?? status === 'unauthenticated'

  return (
    <button
      onClick={openPanel}
      className={`bg-white h-12 w-12 rounded-full flex justify-center items-center active:bg-opacity-90 shrink-0 z-[1] active:scale-90`}
      disabled={isLocked}
    >
      {isLocked ? <ActivityLocked /> : <ActivityPlain />}
    </button>
  )
}

export default AcitvityButton
