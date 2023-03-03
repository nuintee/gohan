// Consts
import { colors } from '@/config/colors'

// Lib
import { PulseLoader } from '@/components/icons'

export type Props = {
  text: string
  icon?: {
    position: 'before' | 'after'
    src: JSX.Element | string
  }
  loading?: boolean
  danger?: boolean
  outline?: boolean
  square?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button = (props: Props) => {
  const {
    text = '',
    icon,
    loading,
    danger,
    outline,
    square = false,
    onClick,
    disabled = false,
  } = props

  const style = {
    container: () => {
      const defaultClass = `px-4 py-2 min-h-[2.5rem] duration-500 ease-in-out ${
        square && 'min-w-[2.5rem] aspect-square px-0 py-0'
      } rounded-md flex gap-2 items-center justify-center active:bg-opacity-90 w-full whitespace-nowrap ${
        disabled && 'bg-gh-gray text-gh-l-gray'
      }`
      const _fallbackClass = `bg-gh-dark text-white`
      const dangerClass = danger
        ? 'border-gh-red border-[1px] text-red-400 bg-transparent hover:text-white hover:bg-red-400'
        : _fallbackClass
      const outLineClass = outline
        ? 'border-gray-200 border-[1px] text-gh-gray bg-transparent hover:text-gh-dark hover:bg-gh-white'
        : _fallbackClass

      return `${defaultClass} ${!disabled && danger ? dangerClass : outLineClass}`
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
    <button onClick={onClick} className={style.container()} disabled={props.disabled || loading}>
      {icon?.position === 'before' && !loading && icon.src}
      {loading ? (
        <PulseLoader color={style.icon()} loading={true} size={5} speedMultiplier={0.5} />
      ) : (
        text
      )}
      {icon?.position === 'after' && !loading && icon.src}
    </button>
  )
}

export default Button
