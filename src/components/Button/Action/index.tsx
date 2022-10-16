import Image from 'next/image'

// Lib
import PulseLoader from 'react-spinners/PulseLoader'

// Constans
import { dictionary } from './constants'

// Types
import { Props } from './index.types'

const Action = (props: Props) => {
  const { mode, loading, onClick, type } = props

  const size = type === 'hero' ? 5 : 3.5

  const className = `bg-gh-dark text-white rounded-full flex gap-2 items-center justify-center active:bg-opacity-90`

  const ICON = dictionary.modes[mode]

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={loading}
      style={{
        height: `${size}em`,
        width: `${size}em`,
      }}
    >
      {loading ? (
        <PulseLoader color={`white`} loading={true} size={5} speedMultiplier={0.5} />
      ) : (
        <ICON fill='white' />
      )}
    </button>
  )
}

export default Action
