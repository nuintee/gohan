import { MouseEventHandler } from 'react'

// Icons
import { Logo, Close } from '@/components/icons'
import { PulseLoader } from 'react-spinners'

type Props = {
  isLoading: boolean
  isNavigating: boolean
  disabled: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

const GohanButton = (props: Props) => {
  const { isLoading, isNavigating, disabled, onClick } = props

  const ui = () =>
    isLoading ? (
      <PulseLoader color={`white`} loading={true} size={5} speedMultiplier={0.5} />
    ) : isNavigating ? (
      <Close fill='white' />
    ) : (
      <Logo />
    )

  return (
    <button
      onClick={onClick}
      className={`bg-gh-dark flex items-center justify-center rounded-full ${
        (!isLoading || !disabled) && 'active:scale-90'
      }`}
      disabled={isLoading || disabled}
      style={{
        height: `5em`,
        width: `5em`,
      }}
    >
      {ui()}
    </button>
  )
}

export default GohanButton
