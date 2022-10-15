import Image from 'next/image'

// Lib
import PulseLoader from 'react-spinners/PulseLoader'

// Constans
import { dictionary } from './constants'

// Types
import { Props } from './index.types'

const Action = (props: Props) => {
  const { icon, loading, onClick, type } = props

  const size = type === 'hero' ? 5 : 3.5

  const className = `bg-gh-dark text-white rounded-full flex gap-2 items-center justify-center active:bg-opacity-90`

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
        <Image
          src={dictionary.icons[icon].src}
          alt={'action'}
          height={`${size * 3}em`}
          width={`${size * 3}em`}
        />
      )}
    </button>
  )
}

export default Action
