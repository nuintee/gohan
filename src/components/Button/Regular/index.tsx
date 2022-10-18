// Consts
import { colors } from 'config/tailwind'

// Lib
import PulseLoader from 'react-spinners/PulseLoader'

// Types
import { Props } from './index.types'

const Regular = (props: Props) => {
  const { text, icon, loading, danger, outline, onClick } = props

  const theme = {
    className: danger
      ? 'ring-gh-red ring-1 text-gh-red bg-transparent'
      : outline && 'ring-gh-l-gray ring-1 text-gh-l-gray bg-transparent',
    icon: danger ? 'gh-red' : outline ? 'gh-l-gray' : 'gh-white',
  }

  const className = `bg-gh-dark text-white px-4 py-2 rounded-md flex gap-2 items-center justify-center active:bg-opacity-90 w-full ${theme.className}`

  return (
    <button onClick={onClick} className={className} disabled={loading}>
      {icon?.position && icon.src}
      {text || 'BUTTON'}
      {icon?.position && icon.src}
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

export default Regular
