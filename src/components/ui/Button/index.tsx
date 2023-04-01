// Consts
import { colors } from '@/config/colors'

// Lib
import { PulseLoader } from '@/components/icons'

type Props = {
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
  testId?: string
  ariaLabel?: string
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
    testId,
    ariaLabel,
  } = props

  const iconColor = () => {
    if (danger) {
      return colors['gh-red']
    } else if (outline) {
      return colors['gh-l-gray']
    } else {
      return colors['gh-white']
    }
  }

  const theme = () => {
    if (disabled) {
      return 'bg-gh-d-gray hover:bg-gh-d-gray active:bg-gh-d-gray text-gh-gray'
    } else if (danger) {
      return 'bg-transparent hover:bg-gh-red hover:text-white active:text-white active:bg-gh-red border-[1px] border-gh-red text-gh-red'
    } else if (outline) {
      return 'active:bg-gh-white border-[1px] border-gh-white hover:bg-gh-white bg-transparent text-gh-gray'
    } else {
      return 'active:bg-opacity-90 bg-gh-dark hover:bg-opacity-90 text-white '
    }
  }

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md whitespace-nowrap flex gap-2 min-h-[2.5rem] items-center justify-center box-border duration-700 w-full ${theme()} `}
      disabled={props.disabled || loading}
      style={{
        ...(square && { aspectRatio: '1/1', padding: '0' }),
      }}
      data-testid={testId}
      aria-label={ariaLabel}
    >
      {icon?.position === 'before' && !loading && icon.src}
      {loading ? (
        <PulseLoader color={iconColor()} loading={true} size={5} speedMultiplier={0.5} />
      ) : (
        text
      )}
      {icon?.position === 'after' && !loading && icon.src}
    </button>
  )
}

export default Button
