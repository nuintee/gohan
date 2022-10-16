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
      bg: 'border-gh-l-red',
      icon: colors['gh-red'],
    },
  },
  success: {
    text: 'Success',
    border: 'border-gh-green',
    badge: {
      bg: 'bg-gh-l-green',
      icon: colors['gh-green'],
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
        className={`h-10 w-10 ${themes[mode].badge.bg} flex items-center justify-center rounded-full`}
      >
        X
      </span>
      <Texts main={main || themes[mode].text} sub={mode} size='small' />
      <button className='ml-auto' onClick={onClose}>
        X
      </button>
    </div>
  )
}

export default Toast
