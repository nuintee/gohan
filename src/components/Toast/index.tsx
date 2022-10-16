// Icons
import Close from '../icons/Close'
import Check from '../icons/Check'

// Components
import Texts from '../Restaurant/Texts'

// Constans
import { colors } from '@/../config/tailwind/index'
const modes = ['success', 'error'] as const

const themes = {
  error: {
    text: 'Error',
    border: 'border-gh-red',
    badge: {
      bg: 'bg-gh-l-red',
      icon: <Close fill='' />,
    },
  },
  success: {
    text: 'Success',
    border: 'border-gh-green',
    badge: {
      bg: 'bg-gh-l-green',
      icon: <Check fill='' />,
    },
  },
}

type Props = {
  mode: typeof modes[number]
  main: string
  sub?: string
  onClose: React.MouseEventHandler<HTMLButtonElement>
  infinite?: boolean
  timeout?: number // Millisecond
}

const Toast = (props: Props) => {
  const { mode, main, sub, onClose, infinite, timeout } = props

  return (
    <div className={`bg-white p-4 rounded-md border-l-8 ${themes[mode].border} flex gap-4`}>
      <span
        className={`h-10 w-10 flex items-center justify-center rounded-full ${themes[mode].badge.bg}`}
      >
        {themes[mode].badge.icon}
      </span>
      <Texts main={main || themes[mode].text} sub={mode} size='small' />
      <button className='ml-auto' onClick={onClose}>
        <Close fill={colors['gh-dark']} />
      </button>
    </div>
  )
}

export default Toast
