// Components
import Texts from '../Restaurant/Texts'

const modes = ['success', 'error']

const themes = {
  success: {
    border: 'border-gh-red',
    badge: {
      bg: '',
      icon: '',
    },
    main: '#00D160',
    sub: '#ACE5C7',
  },
  error: {
    border: 'border-gh-green',
    badge: {
      bg: 'bg-gh-l-green',
      icon: '',
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
    <div className='bg-white p-4 rounded-md border-l-8  flex gap-4'>
      <span className='h-10 w-10 bg-red-200 flex items-center justify-center rounded-full'>X</span>
      <Texts main='Error' sub='Message' size='small' />
      <button className='ml-auto' onClick={onClose}>
        X
      </button>
    </div>
  )
}

export default Toast
