import { MouseEventHandler } from 'react'

// icons
import { LocateUser } from '@/components/icons'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

const LocateUserButton = (props: Props) => {
  const { onClick } = props

  return (
    <button
      onClick={onClick}
      className='absolute right-6 bottom-8 bg-white p-4 rounded-full active:bg-opacity-90 active:scale-90'
    >
      <LocateUser size={20} />
    </button>
  )
}

export default LocateUserButton
