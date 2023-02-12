// Consts
import { colors } from '@/config/colors'

// Lib
import { PulseLoader } from '@/components/icons'

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

  const style = {
    container: () => {
      const defaultClass = `px-4 py-2 min-h-[2.5rem] rounded-md flex gap-2 items-center justify-center active:bg-opacity-90 w-full`
      const _fallbackClass = `bg-gh-dark text-white`
      const dangerClass = danger
        ? 'ring-gh-red ring-1 text-red-400 bg-transparent hover:text-white hover:bg-red-400'
        : _fallbackClass
      const outLineClass = outline
        ? 'ring-gh-l-gray ring-1 text-gh-l-gray bg-transparent hover:text-gh-dark hover:bg-gh-white'
        : _fallbackClass

      return `${defaultClass} ${danger ? dangerClass : outLineClass}`
    },
    icon: () => {
      if (danger) {
        return colors['gh-red']
      } else if (outline) {
        return colors['gh-l-gray']
      } else {
        return colors['gh-white']
      }
    },
  }

  return (
    <button onClick={onClick} className={style.container()} disabled={loading}>
      {icon?.position === 'before' && icon.src}
      {loading ? (
        <PulseLoader color={style.icon()} loading={true} size={5} speedMultiplier={0.5} />
      ) : (
        text || 'BUTTON'
      )}
      {icon?.position === 'after' && icon.src}
    </button>
  )
}

export default Button
