import { MouseEventHandler } from 'react'

// Icons
import { Logo, Close } from '@/components/icons'
import { PulseLoader } from '@/components/icons'

// Hooks
// import useDirections from '@/features/directions/hooks'
import useMapBox from '@/features/mapbox/hooks'
import useRestaurants from '@/features/restaurants/hooks'
import useGetRestaurants from '@/features/restaurants/hooks/useRestaurants/useGetRestaurants'

type Props = {
  isLoading?: boolean
  isNavigating?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const GohanButton = (props: Props) => {
  // const { hasDirections, revokeDirections } = useDirections()
  const directions = revokeDirections()

  const { isLoadingUserLocation } = useMapBox()

  // const { get } = useRestaurants()
  // const restaurants = get()

  // Restaurants
  const getRestaurants = useGetRestaurants()

  const {
    isLoading = (isLoadingUserLocation || getRestaurants.isFetching) ?? false,
    isNavigating = hasDirections ?? false,
    disabled = isLoadingUserLocation ?? false,
    onClick = hasDirections ? () => directions.mutate() : () => getRestaurants.refetch(),
  } = props

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
        !disabled && 'active:scale-90 cursor-pointer'
      }`}
      disabled={disabled}
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
