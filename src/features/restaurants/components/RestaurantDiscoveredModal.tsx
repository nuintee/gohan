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
  const { isOpen, onClose, data, onNavigate, ...rest } = props
  const { getDirections, revokeDirections, hasDirections } = useDirections()

  const get = getDirections({
    end: `${data?.geometry.location.lat},${data?.geometry.location.lng}`,
  })
  const revoke = revokeDirections()

  const navigateAlter = (activity) => {
    hasDirections ? () => revoke.mutate() : () => get.refetch()
  }

  return (
    <ModalLayout isOpen={isOpen}>
      <RestaurantCard
        onClick={onClose}
        onNavigate={onNavigate ?? navigateAlter}
        data={data}
        {...rest}
      />
    </ModalLayout>
  )
}

export default RestaurantDiscoveredModal
