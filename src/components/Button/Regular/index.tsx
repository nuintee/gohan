// Lib
import PulseLoader from 'react-spinners/PulseLoader'

// Types
import { Props } from './index.types'

const Regular = (props: Props) => {
  const { text, icon, loading, danger, onClick } = props

  const className = `bg-gh-dark text-white px-4 py-2 rounded-md flex gap-2 items-center active:bg-opacity-90 ${
    danger && 'ring-2 ring-gh-red bg-transparent text-gh-red'
  }`

  return (
    <button onClick={onClick} className={className} disabled={loading}>
      {icon?.position && icon.src}
      {text || 'BUTTON'}
      {icon?.position && icon.src}
      {loading && (
        <PulseLoader
          color={`${danger ? 'red' : 'white'}`}
          loading={true}
          size={5}
          speedMultiplier={0.5}
        />
      )}
    </button>
  )
}

export default Regular
