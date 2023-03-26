import { MouseEventHandler } from 'react'

// icons
import { LocateUser } from '@/components/icons'
import { colors } from '@/config/colors'

type Props = {
  disabled: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

const LocateUserButton = (props: Props) => {
  const { onClick, disabled } = props

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute right-6 bottom-8 bg-white p-4 rounded-full ${
        !disabled && 'cursor-pointer active:scale-90 active:bg-opacity-90'
      }`}
    >
      <LocateUser size={20} fill={!disabled ? colors['gh-l-blue'] : colors['gh-gray']} />
    </button>
  )
}

export default LocateUserButton
