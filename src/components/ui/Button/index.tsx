// Consts
import { colors } from '@/config/colors'

// Lib
import PulseLoader from 'react-spinners/PulseLoader'

export type Props = {
  text: string
  icon?: {
    position: 'before' | 'after'
    src: React.ReactElement
  }
  loading?: boolean
  danger?: boolean
  outline?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: Props) => {
  const { text, icon, loading, danger, outline, onClick } = props

  const theme = {
    className: danger
      ? 'ring-gh-red ring-1 text-gh-red bg-opacity-0 bg-gh-red active:bg-opacity-100 active:text-white'
      : outline &&
        'ring-gh-l-gray ring-1 text-gh-l-gray bg-opacity-0 bg-gh-l-gray active:bg-gray-200 active:bg-opacity-90',
    icon: danger ? 'gh-red' : outline ? 'gh-l-gray' : 'gh-white',
  }

  const className = `bg-gh-dark text-white px-4 py-2 rounded-md flex gap-2 items-center justify-center active:bg-opacity-90 w-full z-[100] ${theme.className}`

  return (
    <button onClick={onClick} className={className} disabled={loading}>
      {icon?.position === 'before' && icon.src}
      {text || 'BUTTON'}
      {icon?.position === 'after' && icon.src}
      {loading && (
        <PulseLoader
          color={`${colors[theme.icon]}`}
          loading={true}
          size={5}
          speedMultiplier={0.5}
        />
      )}
    </button>
  )
}

export default Button