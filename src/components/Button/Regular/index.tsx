// Components
import Spinner from '@/lib/Spinner'

// Types
import { Props } from './index.types'

const Regular = (props: Props) => {
  const { text, icon, loading, danger, onClick } = props

  const className = `bg-gh-dark text-white px-4 py-2 rounded-md flex gap-2 items-center ${
    danger && 'ring-2 ring-gh-red bg-transparent text-gh-red'
  }`

  return (
    <button onClick={onClick} className={className}>
      {icon?.position && icon.src}
      {text || 'BUTTON'}
      {icon?.position && icon.src}
      {loading && <Spinner />}
    </button>
  )
}

export default Regular
