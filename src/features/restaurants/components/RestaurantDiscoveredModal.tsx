import useDirections from '@/features/directions/hooks'
import useMapBox from '@/features/mapbox/hooks'
import ModalLayout from '@/layouts/ModalLayout'
import { RestaurantProps } from '../types'

import RestaurantCard from './RestaurantCard'

type Props = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
} & RestaurantProps

const RestaurantDiscoveredModal = (props: Props) => {
  const { getDirections, revokeDirections } = useDirections()

  const get = getDirections({
    end: `${props.data?.geometry?.location?.lat},${props.data?.geometry?.location?.lng}`,
  })
  const revoke = revokeDirections()

  const {
    isOpen,
    onClose,
    data,
    isNavigating,
    onNavigate = isNavigating
      ? () => {
          revoke.mutate()
        }
      : () => {
          get.refetch()
        },
    ...rest
  } = props

  return (
    <ModalLayout isOpen={isOpen}>
      <RestaurantCard
        onClick={onClose}
        onNavigate={onNavigate}
        data={props.data}
        isNavigating={isNavigating}
        {...rest}
      />
    </ModalLayout>
  )
}

export default RestaurantDiscoveredModal
