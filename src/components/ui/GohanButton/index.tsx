import { MouseEventHandler } from 'react'

// Icons
import { Logo, Close } from '@/components/icons'
import { PulseLoader } from '@/components/icons'
import useGPS from '@/hooks/gps'

// Hooks
// import useDirections from '@/features/directions/hooks'

type Props = {
  isLoading?: boolean
  size?: number
  isNavigating?: boolean
  disabled?: boolean
  onClick?: () => void
}

const GohanButton = (props: Props) => {
  const { isLoading = false, isNavigating = false, disabled = false, onClick, size = 40 } = props

  const { gps, isGPSError, isGPSFetching, updateGeolocationStatus, updateSafeGeolocation } =
    useGPS()

  const ui = () =>
    isLoading ? (
      <PulseLoader color={`white`} loading={true} size={5} speedMultiplier={0.5} />
    ) : isNavigating ? (
      <Close fill='white' />
    ) : (
      <Logo height={size} width={size} />
    )

  return (
    <button
      onClick={onClick}
      className={`bg-gh-dark flex items-center justify-center rounded-full ${
        !disabled && 'active:scale-90 cursor-pointer'
      }`}
      disabled={disabled}
      style={{
        height: size ? `${size / 5}em` : '5em',
        width: size ? `${size / 5}em` : '5em',
      }}
    >
      {ui()}
    </button>
  )
}

export default GohanButton
