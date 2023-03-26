// Icons
import { ActivityLocked, ActivityPlain } from '@/components/icons'
import { useSession } from 'next-auth/react'
import useActivityPanel from '../hooks/useActivityPanel'

type Props = {
  isLocked?: boolean
  onClick?: Function
}

const AcitvityButton = (props: Props) => {
  const { openPanel } = useActivityPanel()
  const { status } = useSession()

  const { isLocked = status === 'unauthenticated' ?? false } = props

  return (
    <button
      onClick={openPanel}
      className={`bg-white h-12 w-12 rounded-full flex justify-center items-center active:bg-opacity-90 shrink-0 z-[1] border-2 border-gh-white active:scale-90`}
      disabled={isLocked}
    >
      {isLocked ? <ActivityLocked /> : <ActivityPlain />}
    </button>
  )
}

export default AcitvityButton
